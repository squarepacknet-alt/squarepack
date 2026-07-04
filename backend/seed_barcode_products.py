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
# Barcode Ribbons – 1 product (Barcode Ribbon)
# Category slug: barcode-ribbons
# ---------------------------------------------------------------------------

CATEGORY = {
    "slug": "barcode-ribbons",
    "name": "Barcode Ribbons",
    "name_ar": "أشرطة الباركود",
}

CATEGORY_IMAGE = "https://images.unsplash.com/photo-1581092335412-2f5f8d5c92d1?q=80&w=1470&auto=format&fit=crop"

products = [

    # ── 1. Barcode Ribbon ───────────────────────────────────────────────────
    {
        "id": "barcode-ribbon",
        "name": "Barcode Ribbon",
        "name_ar": "شريط الباركود",
        "desc": (
            "Premium thermal transfer ribbons engineered for high-definition "
            "barcode printing on paper, synthetic, and film label stocks. "
            "Available in wax, wax-resin, and resin formulations to match every "
            "application requirement – from standard shipping labels to chemical-"
            "resistant industrial asset tags and high-temperature applications."
        ),
        "desc_ar": (
            "أشرطة نقل حراري فاخرة مصممة لطباعة باركود عالية الوضوح على الورق "
            "والملصقات الاصطناعية والفيلم. متوفرة بتركيبات شمع وشمع-ريزين وريزين "
            "لتتناسب مع كل متطلبات التطبيق."
        ),
        "tag": "Best Seller",
        "tag_ar": "الأكثر مبيعاً",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/barcode%20ribbons.png",
        "details": {
            "quick_specs": [
                {"label": "Ribbon Types", "value": "Wax, Wax-Resin, Resin, Premium Resin"},
                {"label": "Width Options", "value": "40 mm to 220 mm (1.6\" – 8.7\")"},
                {"label": "Length Options", "value": "74 m, 150 m, 300 m, 450 m, 600 m, 1000 m"},
                {"label": "Core Size", "value": "12.7 mm (0.5\"), 25 mm (1\"), 38 mm (1.5\")"},
                {"label": "Ink Side", "value": "Outside wound (standard) / Inside wound"},
            ],
            "features": [
                {"title": "Premium black formulation for superior barcode edge definition and Grade A scan quality"},
                {"title": "Wax ribbons – cost-effective for paper labels in shipping and logistics"},
                {"title": "Wax-Resin ribbons – enhanced durability for synthetic labels and mild chemical exposure"},
                {"title": "Resin ribbons – maximum durability for polyester, polyimide, and harsh environments"},
                {"title": "Anti-static coated back for reduced printer head wear and static buildup"},
                {"title": "Ultra-low extractable halogens for cleanroom and electronics manufacturing"},
                {"title": "Consistent coating thickness across full roll length for streak-free printing"},
            ],
            "specifications": [
                {"label": "Ink Melting Point", "value": "Wax: 70°C / Wax-Resin: 85°C / Resin: 110°C"},
                {"label": "Print Speed Compatibility", "value": "Up to 14 ips (356 mm/s)"},
                {"label": "Optical Density", "value": "≥ 1.8 (wax) / ≥ 2.0 (wax-resin) / ≥ 2.2 (resin)"},
                {"label": "Smear Resistance", "value": "Low (wax) / Medium (wax-resin) / High (resin)"},
                {"label": "Chemical Resistance", "value": "Poor (wax) / Medium (wax-resin) / Excellent (resin)"},
                {"label": "Temperature Resistance", "value": "-20°C to +50°C (wax) / -40°C to +150°C (resin)"},
                {"label": "Shelf Life", "value": "2 years (unopened, <35°C, <65% RH)"},
            ],
            "applications": [
                {"title": "Shipping and logistics barcode labels (wax ribbons)"},
                {"title": "Warehouse shelf and bin location labels (wax-resin)"},
                {"title": "Industrial asset and equipment tracking (resin)"},
                {"title": "Pharmaceutical and laboratory labels (resin, low-halogen)"},
                {"title": "Outdoor and UV-exposed labeling (resin)"},
                {"title": "Retail price marking and product labeling (wax or wax-resin)"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أنواع الشريط", "value": "شمع، شمع-ريزين، ريزين، ريزين ممتاز"},
                {"label": "خيارات العرض", "value": "40 ملم إلى 220 ملم"},
                {"label": "خيارات الطول", "value": "74 م، 150 م، 300 م، 450 م، 600 م، 1000 م"},
                {"label": "حجم النواة", "value": "12.7 ملم، 25 ملم، 38 ملم"},
                {"label": "جانب الحبر", "value": "ملفوف من الخارج (قياسي) / ملفوف من الداخل"},
            ],
            "features": [
                {"title": "تركيبة سوداء فائقة الجودة لدقة حافة باركود فائقة وجودة مسح من الدرجة A"},
                {"title": "أشرطة شمع – فعالة من حيث التكلفة لملصقات الورق في الشحن والخدمات اللوجستية"},
                {"title": "أشرطة شمع-ريزين – متانة محسنة للملصقات الاصطناعية والتعرض الخفيف للمواد الكيميائية"},
                {"title": "أشرطة ريزين – متانة قصوى للملصقات المصنوعة من البوليستر والبولي إيميد والبيئات القاسية"},
                {"title": "طلاء خلفي مضاد للكهرباء الساكنة لتقليل تآكل رأس الطابعة وتراكم الكهرباء الساكنة"},
            ],
            "specifications": [
                {"label": "نقطة انصهار الحبر", "value": "شمع: 70°C / شمع-ريزين: 85°C / ريزين: 110°C"},
                {"label": "سرعة الطباعة", "value": "حتى 14 بوصة/ثانية (356 ملم/ثانية)"},
                {"label": "الكثافة البصرية", "value": "≥ 1.8 (شمع) / ≥ 2.0 (شمع-ريزين) / ≥ 2.2 (ريزين)"},
                {"label": "مقاومة المواد الكيميائية", "value": "ضعيف (شمع) / متوسط (شمع-ريزين) / ممتاز (ريزين)"},
                {"label": "مقاومة درجة الحرارة", "value": "-20°C إلى +50°C (شمع) / -40°C إلى +150°C (ريزين)"},
                {"label": "مدة الصلاحية", "value": "سنتان (غير مفتوح، <35°C، <65% رطوبة نسبية)"},
            ],
            "applications": [
                {"title": "ملصقات باركود الشحن والخدمات اللوجستية (أشرطة شمع)"},
                {"title": "ملصقات مواقع الرفوف والحاويات في المستودعات (شمع-ريزين)"},
                {"title": "تتبع الأصول والمعدات الصناعية (ريزين)"},
                {"title": "ملصقات المستحضرات الصيدلانية والمختبرات (ريزين، منخفض الهالوجين)"},
                {"title": "وسم الأسعار والتجزئة للمنتجات (شمع أو شمع-ريزين)"},
            ],
        },
    },
]


def seed():
    with engine.connect() as conn:
        # Remove existing Barcode Ribbons products only
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

    print(f"✅ Seeded {len(products)} Barcode Ribbon product successfully.")
    for p in products:
        tag_str = f"  [{p['tag']}]" if p["tag"] else ""
        print(f"   • {p['id']}{tag_str}")


if __name__ == "__main__":
    seed()