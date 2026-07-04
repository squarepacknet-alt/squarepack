import uuid

from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.products import DBProduct
from schemas.products_schema import Product
from utils.localization import localize_product


class ProductService:
    def __init__(self, db: Session):
        self.db = db

    def get_all(
        self,
        lang: str = "en",
        all: bool = False,
    ):

        products = self.db.query(DBProduct).all()

        if all:
            return products

        return [localize_product(p, lang) for p in products]

    def get_best_sellers(
        self,
        lang: str = "en",
        all: bool = False,
    ):

        products = self.db.query(DBProduct).filter(
            (DBProduct.tag.ilike("%Best Seller%")) | (DBProduct.tag.ilike("%BestSeller%"))
        ).all()

        if all:
            return products

        return [localize_product(p, lang) for p in products]

    def get_by_id(
        self,
        product_id: str,
        lang: str = "en",
        all: bool = False,
    ):

        product = self.db.query(DBProduct).filter(DBProduct.id == product_id).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        if all:
            return product

        return localize_product(
            product,
            lang,
        )

    def create(
        self,
        product: Product,
    ):

        db_product = DBProduct(
            id=product.id or str(uuid.uuid4()),
            name=product.name,
            name_ar=product.name_ar or "",
            desc=product.desc,
            desc_ar=product.desc_ar or "",
            image_url=product.image_url or "",
            tag=product.tag or "",
            tag_ar=product.tag_ar or "",
            category=product.category,
            category_ar=product.category_ar or "",
            details=product.details,
            details_ar=product.details_ar,
        )

        self.db.add(db_product)

        self.db.commit()

        self.db.refresh(db_product)

        return db_product

    def update(
        self,
        product_id: str,
        updated_product: Product,
    ):

        db_product = self.db.query(DBProduct).filter(DBProduct.id == product_id).first()

        if not db_product:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        for key, value in updated_product.model_dump(exclude={"id"}).items():

            setattr(db_product, key, value)

        self.db.commit()

        self.db.refresh(db_product)

        return db_product

    def delete(
        self,
        product_id: str,
    ):

        db_product = self.db.query(DBProduct).filter(DBProduct.id == product_id).first()

        if not db_product:
            raise HTTPException(
                status_code=404,
                detail="Product not found",
            )

        self.db.delete(db_product)

        self.db.commit()

        return {"message": "Product deleted successfully"}
