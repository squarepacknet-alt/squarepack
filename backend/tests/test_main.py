import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from db.database import get_db, Base
from core.config import ADMIN_PASSWORD
import os

# Setup Test Database (SQLite in-memory)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    from core.security import seed_admin
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    seed_admin(db)
    db.close()
    yield
    Base.metadata.drop_all(bind=engine)

# --- PUBLIC API TESTS ---

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to SquarePack API!"}

def test_get_products_empty():
    response = client.get("/api/products")
    assert response.status_code == 200
    assert response.json() == []

def test_create_contact_inquiry():
    payload = {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "topic": "General Inquiry",
        "message": "Hello, I am interested in your products."
    }
    response = client.post("/api/contact", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "John Doe"
    assert data["email"] == "john@example.com"
    assert "id" in data

# --- ADMIN API TESTS ---

def test_admin_login_success():
    response = client.post("/api/admin/login", json={"password": ADMIN_PASSWORD})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_admin_login_fail():
    response = client.post("/api/admin/login", json={"password": "wrongpassword"})
    assert response.status_code == 401

def test_protected_route_without_token():
    response = client.get("/api/contact")
    assert response.status_code == 403 # HTTPBearer returns 403 if missing

def test_crud_with_token():
    # 1. Login to get token
    login_res = client.post("/api/admin/login", json={"password": ADMIN_PASSWORD})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Create a product
    prod_payload = {
        "name": "Test Box",
        "name_ar": "صندوق تجريبي",
        "desc": "A test packaging box",
        "desc_ar": "صندوق تغليف تجريبي",
        "image_url": "http://example.com/img.jpg",
        "tag": "New",
        "tag_ar": "جديد",
        "category": "Boxes",
        "category_ar": "صناديق"
    }
    create_res = client.post("/api/products", json=prod_payload, headers=headers)
    assert create_res.status_code == 201
    prod_id = create_res.json()["id"]

    # 3. Read products (all=true)
    read_res = client.get("/api/products?all=true", headers=headers)
    assert read_res.status_code == 200
    assert len(read_res.json()) == 1
    assert read_res.json()[0]["name"] == "Test Box"

    # 4. Update product
    update_res = client.put(f"/api/products/{prod_id}", json={**prod_payload, "name": "Updated Box"}, headers=headers)
    assert update_res.status_code == 200
    assert update_res.json()["name"] == "Updated Box"

    # 5. Delete product
    del_res = client.delete(f"/api/products/{prod_id}", headers=headers)
    assert del_res.status_code == 200

    # 6. Verify deleted
    final_read = client.get("/api/products")
    assert len(final_read.json()) == 0
