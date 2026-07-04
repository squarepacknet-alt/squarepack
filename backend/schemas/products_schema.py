from typing import Optional

from pydantic import BaseModel, ConfigDict


class Product(BaseModel):
    id: Optional[str] = None
    name: str
    name_ar: Optional[str] = None
    desc: str
    desc_ar: Optional[str] = None
    image_url: Optional[str] = None
    tag: Optional[str] = None
    tag_ar: Optional[str] = None
    category: str = "General"
    category_ar: Optional[str] = "عام"
    details: Optional[dict] = None
    details_ar: Optional[dict] = None

    model_config = ConfigDict(from_attributes=True)


class LocalizedProduct(BaseModel):
    id: str
    name: str
    desc: str
    name_en: Optional[str] = None
    desc_en: Optional[str] = None
    image_url: Optional[str]
    tag: Optional[str]
    category: str
    details: Optional[dict] = None
