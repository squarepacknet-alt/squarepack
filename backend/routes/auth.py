from fastapi import (
    APIRouter,
    Depends,
)
from sqlalchemy.orm import Session

from db.database import get_db
from schemas.auth_schema import LoginRequest, TokenResponse
from services.auth_service import AuthService
from core.security import get_current_user
from models.user import DBUser

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"],
)


@router.post("/login", response_model=TokenResponse)
def login(
    request: LoginRequest,
    db: Session = Depends(get_db),
):
    service = AuthService(db)
    return service.login(request)


@router.get("/validate")
def validate_token(current_user: DBUser = Depends(get_current_user)):
    return {"valid": True, "email": current_user.email, "role": current_user.role}


@router.get("/me")
def get_me(current_user: DBUser = Depends(get_current_user)):
    return {"id": current_user.id, "email": current_user.email, "role": current_user.role}
