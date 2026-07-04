# --- UTILS ---
from models.products import DBProduct
from models.testimonials import DBTestimonial
from schemas.products_schema import LocalizedProduct
from schemas.testimonials_schema import LocalizedTestimonial


def localize_product(p: DBProduct, lang: str) -> LocalizedProduct:
    is_ar = lang == "ar"
    return LocalizedProduct(
        id=p.id,
        name=(p.name_ar if p.name_ar else p.name) if is_ar else p.name,
        desc=(p.desc_ar if p.desc_ar else p.desc) if is_ar else p.desc,
        name_en=p.name,
        desc_en=p.desc,
        image_url=p.image_url,
        tag=(p.tag_ar if p.tag_ar else p.tag) if is_ar else p.tag,
        category=(
            (p.category_ar if p.category_ar else p.category) if is_ar else p.category
        ),
        details=(p.details_ar if p.details_ar else p.details) if is_ar else p.details,
    )


def localize_testimonial(t: DBTestimonial, lang: str) -> LocalizedTestimonial:
    is_ar = lang == "ar"
    return LocalizedTestimonial(
        id=t.id,
        author=(t.author_ar if t.author_ar else t.author) if is_ar else t.author,
        role=(t.role_ar if t.role_ar else t.role) if is_ar else (t.role or ""),
        content=(t.content_ar if t.content_ar else t.content) if is_ar else t.content,
        rating=t.rating,
        company=(t.company_ar if t.company_ar else t.company) if is_ar else t.company,
    )
