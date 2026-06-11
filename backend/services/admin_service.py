from fastapi import HTTPException
from sqlalchemy.orm import Session

from core.security import (
    create_access_token,
    verify_password,
)

from models.admin import DBAdmin

from schemas.auth_schema import LoginRequest


class AdminService:

    def __init__(self, db: Session):
        self.db = db

    def login(
        self,
        request: LoginRequest,
    ):

        admin = self.db.query(DBAdmin).filter(DBAdmin.username == "admin").first()

        if not admin:

            raise HTTPException(
                status_code=401,
                detail="Admin not found",
            )

        if not verify_password(
            request.password,
            admin.hashed_password,
        ):

            raise HTTPException(
                status_code=401,
                detail="Invalid password",
            )

        access_token = create_access_token(data={"sub": admin.username})

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }
