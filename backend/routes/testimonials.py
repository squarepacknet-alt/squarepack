from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from core.security import verify_admin
from db.database import get_db

from schemas.testimonials_schema import Testimonial
from services.testimonial_service import TestimonialService

router = APIRouter(
    prefix="/api/testimonials",
    tags=["Testimonials"],
)


@router.get("")
def get_testimonials(
    lang: str = "en",
    all: bool = False,
    db: Session = Depends(get_db),
):

    service = TestimonialService(db)

    return service.get_all(
        lang=lang,
        all=all,
    )


@router.get("/{testimonial_id}")
def get_testimonial(
    testimonial_id: str,
    lang: str = "en",
    all: bool = False,
    db: Session = Depends(get_db),
):

    service = TestimonialService(db)

    return service.get_by_id(
        testimonial_id=testimonial_id,
        lang=lang,
        all=all,
    )


@router.post(
    "",
    response_model=Testimonial,
    status_code=status.HTTP_201_CREATED,
)
def create_testimonial(
    testimonial: Testimonial,
    db: Session = Depends(get_db),
):

    service = TestimonialService(db)

    return service.create(testimonial)


@router.put(
    "/{testimonial_id}",
    response_model=Testimonial,
)
def update_testimonial(
    testimonial_id: str,
    updated_testimonial: Testimonial,
    db: Session = Depends(get_db),
    _admin: str = Depends(verify_admin),
):

    service = TestimonialService(db)

    return service.update(
        testimonial_id,
        updated_testimonial,
    )


@router.patch("/{testimonial_id}/approve")
def approve_testimonial(
    testimonial_id: str,
    db: Session = Depends(get_db),
    _admin: str = Depends(verify_admin),
):

    service = TestimonialService(db)

    return service.approve(testimonial_id)


@router.delete("/{testimonial_id}")
def delete_testimonial(
    testimonial_id: str,
    db: Session = Depends(get_db),
    _admin: str = Depends(verify_admin),
):

    service = TestimonialService(db)

    return service.delete(testimonial_id)
