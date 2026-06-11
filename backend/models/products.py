from db.database import Base

from sqlalchemy import Column, String, Text, JSON

""" Slugs for categories for products listings

All Products: all
Self Adhesive Products: self-adhesive-products
Security Labels: security-labels
Speciality Labels: speciality-labels
Printers: printers
Packaging Products: packaging-products
Barcode Ribbons: barcode


"""


class DBProduct(Base):
    __tablename__ = "products"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    name_ar = Column(String, nullable=True)
    desc = Column(Text, nullable=False)
    desc_ar = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    tag = Column(String, nullable=True)
    tag_ar = Column(String, nullable=True)
    category = Column(String, default="General")
    category_ar = Column(String, default="عام")
    details = Column(JSON, nullable=True)
    details_ar = Column(JSON, nullable=True)
