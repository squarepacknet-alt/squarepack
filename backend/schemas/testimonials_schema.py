from typing import Optional

from pydantic import BaseModel, ConfigDict


class Testimonial(BaseModel):
    id: Optional[str] = None
    author: str
    author_ar: str = ""
    role: str = ""
    role_ar: str = ""
    content: str
    content_ar: str = ""
    rating: int = 5
    company: str
    company_ar: str = ""

    model_config = ConfigDict(from_attributes=True)


class LocalizedTestimonial(BaseModel):
    id: str
    author: str
    role: str
    content: str
    rating: int
    company: str
