from db.database import Base
from sqlalchemy import Column, String, Text, DateTime, Boolean
import datetime
import uuid

class DBBlog(Base):
    __tablename__ = "blogs"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=True)
    summary = Column(Text, nullable=True)
    content = Column(Text, nullable=False)
    cover_image = Column(String, nullable=True)
    author = Column(String, default="Admin")
    is_published = Column(Boolean, default=False, nullable=False)
    # SEO Fields
    meta_title = Column(String, nullable=True)
    meta_description = Column(Text, nullable=True)
    keywords = Column(String, nullable=True)  # comma-separated keywords
    permalink = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
