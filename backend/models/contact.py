from db.database import Base

from sqlalchemy import Column, String, Text


class DBContactInquiry(Base):
    __tablename__ = "contact_inquiries"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    topic = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(String, nullable=False)
