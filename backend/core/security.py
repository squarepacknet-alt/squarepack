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
from models.user import DBUser

# --- SECURITY ---

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

security = HTTPBearer()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_current_user(
    auth: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> DBUser:
    """Decode token and return the DBUser. Raises 401 if invalid."""
    token = auth.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = db.query(DBUser).filter(DBUser.email == email).first()
        if not user:
            raise HTTPException(status_code=401, detail="User no longer exists")

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


def require_editor_role(current_user: DBUser = Depends(get_current_user)) -> DBUser:
    """Allow both 'admin' and 'editor' roles."""
    if current_user.role not in ("admin", "editor"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
    return current_user


def require_admin_role(current_user: DBUser = Depends(get_current_user)) -> DBUser:
    """Allow only 'admin' role."""
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin role required",
        )
    return current_user


# Keep verify_admin as an alias for backward-compat references (routes will be updated)
verify_admin = require_editor_role


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def seed_users(db: Optional[Session] = None):
    """Seed the two initial users on startup."""
    should_close = False
    if db is None:
        db = SessionLocal()
        should_close = True
    try:
        users_to_seed = [
            {
                "email": "admin@squarepack.net",
                "password": ADMIN_PASSWORD,
                "role": "admin",
            },
            {
                "email": "user@squarepack.net",
                "password": ADMIN_PASSWORD,
                "role": "editor",
            },
        ]
        for u in users_to_seed:
            existing = db.query(DBUser).filter(DBUser.email == u["email"]).first()
            if not existing:
                new_user = DBUser(
                    id=str(uuid.uuid4()),
                    email=u["email"],
                    hashed_password=get_password_hash(u["password"]),
                    role=u["role"],
                )
                db.add(new_user)
                print(f"DEBUG: Seeded user {u['email']} ({u['role']})")
        db.commit()
    finally:
        if should_close:
            db.close()


# Legacy alias so old imports don't break immediately
def seed_admin(db=None):
    seed_users(db)
