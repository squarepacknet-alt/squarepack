from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from core.security import verify_admin
from db.database import get_db

from schemas.products_schema import Product
from services.product_service import ProductService

router = APIRouter(
    prefix="/api/products",
    tags=["Products"],
)


@router.get("")
def get_products(
    lang: str = "en",
    all: bool = False,
    db: Session = Depends(get_db),
):

    service = ProductService(db)

    return service.get_all(
        lang=lang,
        all=all,
    )


@router.get("/best-sellers")
def get_best_sellers(
    lang: str = "en",
    all: bool = False,
    db: Session = Depends(get_db),
):

    service = ProductService(db)

    return service.get_best_sellers(
        lang=lang,
        all=all,
    )


@router.get("/{product_id}")
def get_product(
    product_id: str,
    lang: str = "en",
    all: bool = False,
    db: Session = Depends(get_db),
):

    service = ProductService(db)

    return service.get_by_id(
        product_id=product_id,
        lang=lang,
        all=all,
    )


@router.post(
    "",
    response_model=Product,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    product: Product,
    db: Session = Depends(get_db),
    _admin: str = Depends(verify_admin),
):

    service = ProductService(db)

    return service.create(product)


@router.put(
    "/{product_id}",
    response_model=Product,
)
def update_product(
    product_id: str,
    updated_product: Product,
    db: Session = Depends(get_db),
    _admin: str = Depends(verify_admin),
):

    service = ProductService(db)

    return service.update(
        product_id,
        updated_product,
    )


@router.delete("/{product_id}")
def delete_product(
    product_id: str,
    db: Session = Depends(get_db),
    _admin: str = Depends(verify_admin),
):

    service = ProductService(db)

    return service.delete(product_id)
