from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.security import (
    create_access_token,
    verify_password,
)

from models.user import DBUser

from schemas.auth_schema import LoginRequest


class AuthService:

    def __init__(self, db: Session):
        self.db = db

    def login(self, request: LoginRequest):
        user = self.db.query(DBUser).filter(DBUser.email == request.email).first()

        if not user:
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials",
            )

        if not verify_password(request.password, user.hashed_password):
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials",
            )

        access_token = create_access_token(data={"sub": user.email, "role": user.role})

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "role": user.role,
        }
