from typing import Optional

from pydantic import BaseModel


class ContactInquiry(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    phone: Optional[str] = None
    topic: Optional[str] = None
    message: str
    created_at: Optional[str] = None
