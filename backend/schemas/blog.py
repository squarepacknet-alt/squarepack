from pydantic import BaseModel, model_validator
from typing import Optional, List, Any
from datetime import datetime
import re


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    text = re.sub(r"^-+|-+$", "", text)
    return text


class BlogFAQ(BaseModel):
    question: str
    answer: str


class BlogBase(BaseModel):
    title: str
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: str
    cover_image: Optional[str] = None
    author: Optional[str] = "Admin"
    is_published: Optional[bool] = False
    # SEO
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    keywords: Optional[str] = None          # comma-separated
    permalink: Optional[str] = None
    faqs: Optional[List[BlogFAQ]] = None


class BlogCreate(BlogBase):
    @model_validator(mode="after")
    def auto_slug(self) -> "BlogCreate":
        if not self.slug and self.title:
            self.slug = slugify(self.title)
        return self


class BlogUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    author: Optional[str] = None
    is_published: Optional[bool] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    keywords: Optional[str] = None
    permalink: Optional[str] = None
    faqs: Optional[List[BlogFAQ]] = None

    @model_validator(mode="after")
    def auto_slug(self) -> "BlogUpdate":
        if self.title and not self.slug:
            self.slug = slugify(self.title)
        return self


class BlogResponse(BlogBase):
    id: str
    slug: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
