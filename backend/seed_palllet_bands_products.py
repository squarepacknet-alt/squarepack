import os
import json
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    print("DATABASE_URL not found")
    exit(1)

engine = create_engine(DATABASE_URL)

# ---------------------------------------------------------------------------
# Pallet Bands – 1 product
# Category slug: pallet-bands
# ---------------------------------------------------------------------------

CATEGORY = {
    "slug": "pallet-bands",
    "name": "Pallet Bands",
    "name_ar": "أحزمة البليت",
}

CATEGORY_IMAGE = "https://bulkrubberbands.com/cdn/shop/articles/palletbands-vs-shrinkwrap.png?v=1746680259&width=1200"

products = [

]


def seed():
    with engine.connect() as conn:
        conn.execute(
            text("DELETE FROM products WHERE category = :cat"),
            {"cat": CATEGORY["slug"]},
        )

        for p in products:
            query = text("""
                INSERT INTO products (
                    id, name, name_ar, "desc", desc_ar,
                    category, category_ar, tag, tag_ar,
                    image_url, details, details_ar
                )
                VALUES (
                    :id, :name, :name_ar, :desc, :desc_ar,
                    :category, :category_ar, :tag, :tag_ar,
                    :image_url, :details, :details_ar
                )
                ON CONFLICT (id) DO UPDATE SET
                    name       = EXCLUDED.name,
                    name_ar    = EXCLUDED.name_ar,
                    "desc"     = EXCLUDED."desc",
                    desc_ar    = EXCLUDED.desc_ar,
                    category   = EXCLUDED.category,
                    category_ar= EXCLUDED.category_ar,
                    tag        = EXCLUDED.tag,
                    tag_ar     = EXCLUDED.tag_ar,
                    image_url  = EXCLUDED.image_url,
                    details    = EXCLUDED.details,
                    details_ar = EXCLUDED.details_ar
            """)
            conn.execute(query, {
                "id": p["id"],
                "name": p["name"],
                "name_ar": p["name_ar"],
                "desc": p["desc"],
                "desc_ar": p["desc_ar"],
                "category": CATEGORY["slug"],
                "category_ar": CATEGORY["name_ar"],
                "tag": p["tag"] or "",
                "tag_ar": p["tag_ar"] or "",
                "image_url": p["image_url"],
                "details": json.dumps(p["details"]),
                "details_ar": json.dumps(p["details_ar"]),
            })

        conn.commit()

    print(f"Seeded {len(products)} Pallet Band product successfully.")
    for p in products:
        tag_str = f"  [{p['tag']}]" if p["tag"] else ""
        print(f"   • {p['id']}{tag_str}")


if __name__ == "__main__":
    seed()