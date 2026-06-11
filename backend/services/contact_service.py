import uuid
from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.contact import DBContactInquiry
from schemas.contact_schema import ContactInquiry

from services.email_service import (
    send_notification_email,
)


class ContactService:

    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        inquiry: ContactInquiry,
    ):

        db_inquiry = DBContactInquiry(
            id=str(uuid.uuid4()),
            name=inquiry.name,
            email=inquiry.email,
            phone=inquiry.phone or "",
            topic=inquiry.topic or "",
            message=inquiry.message,
            created_at=datetime.now().isoformat(),
        )

        self.db.add(db_inquiry)

        self.db.commit()

        self.db.refresh(db_inquiry)

        inquiry_data = {
            "name": db_inquiry.name,
            "email": db_inquiry.email,
            "phone": db_inquiry.phone,
            "topic": db_inquiry.topic,
            "message": db_inquiry.message,
            "created_at": db_inquiry.created_at,
        }

        send_notification_email(inquiry_data)

        return db_inquiry

    def get_all(self):

        return (
            self.db.query(DBContactInquiry)
            .order_by(DBContactInquiry.created_at.desc())
            .all()
        )

    def delete(
        self,
        inquiry_id: str,
    ):

        inquiry = (
            self.db.query(DBContactInquiry)
            .filter(DBContactInquiry.id == inquiry_id)
            .first()
        )

        if not inquiry:
            raise HTTPException(
                status_code=404,
                detail="Inquiry not found",
            )

        self.db.delete(inquiry)

        self.db.commit()

        return {"message": "Inquiry deleted"}
