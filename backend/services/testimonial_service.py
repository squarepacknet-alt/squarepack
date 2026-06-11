# --- TESTIMONIAL CRUD ---
import uuid
from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.testimonials import DBTestimonial
from schemas.testimonials_schema import Testimonial
from utils.localization import localize_testimonial


class TestimonialService:
    def __init__(self, db: Session):
        self.db = db

    def get_all(
        self,
        lang: str = "en",
        all: bool = False,
    ):

        query = self.db.query(DBTestimonial)

        if not all:
            query = query.filter(DBTestimonial.is_approved == True)

        testimonials = query.all()

        if all:
            return testimonials

        return [localize_testimonial(t, lang) for t in testimonials]

    def get_by_id(self, testimonial_id: str, lang: str = "en", all: bool = False):
        testimonial = (
            self.db.query(DBTestimonial)
            .filter(DBTestimonial.id == testimonial_id)
            .first()
        )
        if not testimonial:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        if all:
            return testimonial
        return localize_testimonial(t=testimonial, lang=lang)

    def create(
        self,
        testimonial: Testimonial,
    ):

        db_testimonial = DBTestimonial(
            id=testimonial.id or str(uuid.uuid4()),
            author=testimonial.author,
            author_ar=testimonial.author_ar or "",
            role=testimonial.role or "",
            role_ar=testimonial.role_ar or "",
            content=testimonial.content,
            content_ar=testimonial.content_ar or "",
            rating=testimonial.rating,
            company=testimonial.company,
            company_ar=testimonial.company_ar or "",
            is_approved=False,
        )

        self.db.add(db_testimonial)

        self.db.commit()

        self.db.refresh(db_testimonial)

        return db_testimonial

    def update(
        self,
        testimonial_id: str,
        updated_testimonial: Testimonial,
    ):

        db_testimonial = (
            self.db.query(DBTestimonial)
            .filter(DBTestimonial.id == testimonial_id)
            .first()
        )

        if not db_testimonial:
            raise HTTPException(
                status_code=404,
                detail="Testimonial not found",
            )

        for key, value in updated_testimonial.model_dump(exclude={"id"}).items():

            setattr(db_testimonial, key, value)

        self.db.commit()

        self.db.refresh(db_testimonial)

        return db_testimonial

    def approve(
        self,
        testimonial_id: str,
    ):

        db_testimonial = (
            self.db.query(DBTestimonial)
            .filter(DBTestimonial.id == testimonial_id)
            .first()
        )

        if not db_testimonial:
            raise HTTPException(
                status_code=404,
                detail="Testimonial not found",
            )

        db_testimonial.is_approved = True

        self.db.commit()

        return {"message": "Testimonial approved"}

    def delete(
        self,
        testimonial_id: str,
    ):

        db_testimonial = (
            self.db.query(DBTestimonial)
            .filter(DBTestimonial.id == testimonial_id)
            .first()
        )

        if not db_testimonial:
            raise HTTPException(
                status_code=404,
                detail="Testimonial not found",
            )

        self.db.delete(db_testimonial)

        self.db.commit()

        return {"message": "Testimonial deleted successfully"}
