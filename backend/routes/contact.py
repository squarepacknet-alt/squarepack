from typing import List

from fastapi import (
    APIRouter,
    Depends,
    status,
)

from sqlalchemy.orm import Session

from core.security import require_editor_role, require_admin_role
from db.database import get_db

from schemas.contact_schema import (
    ContactInquiry,
)

from services.contact_service import (
    ContactService,
)

router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"],
)


@router.post(
    "",
    response_model=ContactInquiry,
    status_code=status.HTTP_201_CREATED,
)
def create_contact_inquiry(
    inquiry: ContactInquiry,
    db: Session = Depends(get_db),
):

    service = ContactService(db)

    return service.create(inquiry)


@router.get(
    "",
    response_model=List[ContactInquiry],
)
def get_contact_inquiries(
    db: Session = Depends(get_db),
    _user=Depends(require_editor_role),
):

    service = ContactService(db)

    return service.get_all()


@router.delete("/{inquiry_id}")
def delete_contact_inquiry(
    inquiry_id: str,
    db: Session = Depends(get_db),
    _user=Depends(require_admin_role),
):

    service = ContactService(db)

    return service.delete(inquiry_id)
