from db.database import Base

from sqlalchemy import Boolean, Column, Integer, String, Text


class DBTestimonial(Base):
    __tablename__ = "testimonials"
    id = Column(String, primary_key=True, index=True)
    author = Column(String, nullable=False)
    author_ar = Column(String, nullable=True)
    role = Column(String, nullable=True)
    role_ar = Column(String, nullable=True)
    content = Column(Text, nullable=False)
    content_ar = Column(Text, nullable=True)
    rating = Column(Integer, default=5)
    company = Column(String, nullable=False)
    company_ar = Column(String, nullable=True)
    is_approved = Column(Boolean, default=False)
