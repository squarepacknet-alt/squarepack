from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session

from db.database import get_db

from schemas.auth_schema import (
    LoginRequest,
    TokenResponse,
)

from services.admin_service import (
    AdminService,
)

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"],
)


@router.post(
    "/login",
    response_model=TokenResponse,
)
def admin_login(
    request: LoginRequest,
    db: Session = Depends(get_db),
):

    service = AdminService(db)

    return service.login(request)
