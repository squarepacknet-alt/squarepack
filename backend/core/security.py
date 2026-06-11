from datetime import datetime, timedelta, timezone
import os
from typing import Optional
import uuid

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from jose import JWTError, jwt

from core.config import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    ADMIN_PASSWORD,
    ALGORITHM,
    SECRET_KEY,
)
from db.database import SessionLocal, get_db
from models.admin import DBAdmin

# --- SECURITY ---


pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


security = HTTPBearer()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_admin(
    auth: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = auth.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")

        # Verify user still exists in DB
        admin = db.query(DBAdmin).filter(DBAdmin.username == username).first()
        if not admin:
            raise HTTPException(status_code=401, detail="User no longer exists")

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return username


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def seed_admin(db: Optional[Session] = None):
    should_close = False
    if db is None:
        db = SessionLocal()
        should_close = True
    try:
        admin_exists = db.query(DBAdmin).filter(DBAdmin.username == "admin").first()
        if not admin_exists:
            new_admin = DBAdmin(
                id=str(uuid.uuid4()),
                username="admin",
                hashed_password=get_password_hash(ADMIN_PASSWORD),
            )
            db.add(new_admin)
            db.commit()
            print("DEBUG: Seeded default admin user.")
    finally:
        if should_close:
            db.close()
