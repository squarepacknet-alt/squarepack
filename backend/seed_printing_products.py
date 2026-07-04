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
# Printers – 3 products
# Category slug: printers
# ---------------------------------------------------------------------------

CATEGORY = {
    "slug": "printers",
    "name": "Printers",
    "name_ar": "الطابعات",
}

CATEGORY_IMAGE = "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?q=80&w=1470&auto=format&fit=crop"

products = [

    # ── 1. Printers ─────────────────────────────────────────────────────────
    {
        "id": "printers",
        "name": "Printers",
        "name_ar": "الطابعات",
        "desc": (
            "Industrial and desktop label printers supporting thermal "
            "transfer and direct thermal technologies for every volume. From "
            "entry-level models to high-throughput industrial systems, our "
            "printer portfolio delivers reliable, high-quality output for "
            "barcode, shipping, and product labeling applications."
        ),
        "desc_ar": (
            "طابعات ملصقات صناعية ومكتبية تدعم تقنيات النقل الحراري والطباعة الحرارية المباشرة "
            "لجميع الأحجام. من الطرازات المبتدئة إلى الأنظمة الصناعية عالية الإنتاجية."
        ),
        "tag": "Best Seller",
        "tag_ar": "الأكثر مبيعاً",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/printers.jpg",
        "details": {
            "quick_specs": [
                {"label": "Print Technologies", "value": "Thermal Transfer, Direct Thermal"},
                {"label": "Print Resolution", "value": "203 dpi, 300 dpi, 600 dpi"},
                {"label": "Print Width", "value": "Up to 4\" (104 mm) / 6\" (168 mm) industrial"},
                {"label": "Print Speed", "value": "Up to 14 ips (356 mm/s)"},
                {"label": "Connectivity", "value": "USB, Ethernet, Serial, Bluetooth, Wi-Fi"},
            ],
            "features": [
                {"title": "Thermal transfer and direct thermal printing in one device"},
                {"title": "203, 300, and 600 dpi options for high-density barcodes and small text"},
                {"title": "Industrial-grade construction for 24/7 operation in harsh environments"},
                {"title": "User-friendly LCD interface for on-printer configuration"},
                {"title": "Wide media compatibility – rolls, fanfold, tags, wristbands"},
                {"title": "Automatic ribbon save and label gap/black mark sensing"},
                {"title": "Compatible with Zebra, EPL, ZPL, and industry-standard languages"},
            ],
            "specifications": [
                {"label": "Print Method", "value": "Thermal Transfer / Direct Thermal"},
                {"label": "Resolution", "value": "203 dpi (8 dots/mm), 300 dpi (12 dots/mm), 600 dpi"},
                {"label": "Max Print Width", "value": "104 mm (4.09\") standard / 168 mm (6.6\") wide"},
                {"label": "Max Print Speed", "value": "356 mm/s (14 ips)"},
                {"label": "Media Types", "value": "Roll-fed, fanfold, die-cut, continuous, tags"},
                {"label": "Ribbon Length", "value": "Up to 450 m (industrial) / 74 m (desktop)"},
                {"label": "Memory", "value": "256 MB RAM / 512 MB Flash (expandable)"},
            ],
            "applications": [
                {"title": "Shipping and logistics label printing"},
                {"title": "Product identification and barcode labeling"},
                {"title": "Retail price marking and shelf-edge labels"},
                {"title": "Healthcare patient ID and specimen tracking"},
                {"title": "Manufacturing work-in-progress (WIP) tracking"},
                {"title": "Warehouse bin and location labeling"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "تقنيات الطباعة", "value": "نقل حراري، طباعة حرارية مباشرة"},
                {"label": "دقة الطباعة", "value": "203 نقطة/بوصة، 300 نقطة/بوصة، 600 نقطة/بوصة"},
                {"label": "سرعة الطباعة", "value": "حتى 14 بوصة/ثانية (356 ملم/ثانية)"},
            ],
            "features": [
                {"title": "طباعة نقل حراري وحراري مباشر في جهاز واحد"},
                {"title": "خيارات 203 و300 و600 نقطة/بوصة للباركود عالي الكثافة"},
                {"title": "بناء صناعي للتشغيل 24/7 في البيئات القاسية"},
                {"title": "توافق واسع مع وسائط الطباعة – لفائف، ورق مطوي، علامات، أساور"},
            ],
            "specifications": [
                {"label": "طريقة الطباعة", "value": "نقل حراري / حراري مباشر"},
                {"label": "أقصى عرض طباعة", "value": "104 ملم (قياسي) / 168 ملم (عريض)"},
                {"label": "أنواع الوسائط", "value": "لفائف، مطوي، مقطع، مستمر، علامات"},
            ],
            "applications": [
                {"title": "طباعة ملصقات الشحن واللوجستيات"},
                {"title": "تحديد المنتجات وطباعة الباركود"},
                {"title": "تسعير التجزئة وملصقات أرفف العرض"},
                {"title": "تتبع المرضى والعينات في الرعاية الصحية"},
            ],
        },
    },


    # ── 2. Pricing Sticker Gun ───────────────────────────────────────────────────────
    {
        "id": "pricing-sticker-gun",
        "name": "Pricing Sticker Gun",
        "name_ar": "مسدس ملصقات التسعير",
        "desc": (
            "Professional-grade pricing guns and label applicators for fast, "
            "accurate price marking in retail, grocery, and warehouse environments. "
            "Designed for one-handed operation with ergonomic grips and quick-load "
            "mechanisms that reduce repetitive strain and boost throughput in "
            "high-volume pricing operations."
        ),
        "desc_ar": (
            "مسدسات تسعير وملصقات احترافية لوضع علامات الأسعار بسرعة ودقة "
            "في بيئات التجزئة والبقالة والمستودعات."
        ),
        "tag": "Essential",
        "tag_ar": "أساسي",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/Pricing%20sticker%20gun.jpg",
        "details": {
            "quick_specs": [
                {"label": "Label Type", "value": "Pre-printed rolls, Blank rolls, Custom printed"},
                {"label": "Label Sizes", "value": "21×12 mm to 26×16 mm (standard guns)"},
                {"label": "Operation", "value": "Manual trigger, One-hand operation"},
                {"label": "Label Capacity", "value": "1,000 – 5,000 labels per roll"},
                {"label": "Print Options", "value": "1-line, 2-line, 3-line price markers"},
            ],
            "features": [
                {"title": "Ergonomic pistol-grip design reduces hand fatigue during extended use"},
                {"title": "Quick-load drop-in roll mechanism for fast label roll changes"},
                {"title": "Adjustable label positioning for consistent placement accuracy"},
                {"title": "Durable metal and high-impact plastic construction for daily retail use"},
                {"title": "Compatible with standard pricing labels in multiple sizes and colours"},
                {"title": "Available in 1-line, 2-line, and 3-line print band configurations"},
                {"title": "Custom ink rollers and print bands for branded price marking"},
            ],
            "specifications": [
                {"label": "Label Width", "value": "21 mm – 26 mm (standard) / custom sizes available"},
                {"label": "Label Length", "value": "12 mm – 16 mm (standard pricing labels)"},
                {"label": "Roll Capacity", "value": "Up to 5,000 labels per roll"},
                {"label": "Print Lines", "value": "1, 2, or 3 lines (model dependent)"},
                {"label": "Characters per Line", "value": "Up to 12 characters"},
                {"label": "Print Band Type", "value": "Rubber print bands / Custom logo bands"},
                {"label": "Ink Roller Life", "value": "Up to 10,000 impressions"},
            ],
            "applications": [
                {"title": "Retail price marking and markdown labeling"},
                {"title": "Supermarket and grocery shelf pricing"},
                {"title": "Warehouse bin and pallet identification"},
                {"title": "Inventory date coding and batch labeling"},
                {"title": "Convenience store and pharmacy pricing"},
                {"title": "Clearance and sale item marking"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "نوع الملصق", "value": "لفات مطبوعة مسبقاً، لفات فارغة، طباعة مخصصة"},
                {"label": "أحجام الملصقات", "value": "21×12 ملم إلى 26×16 ملم (قياسي)"},
                {"label": "سعة الملصقات", "value": "1,000 – 5,000 ملصق لكل لفة"},
            ],
            "features": [
                {"title": "تصميم قبضة مسدس مريح يقلل من إجهاد اليد أثناء الاستخدام المطول"},
                {"title": "آلية تحميل سريع للفة لتبديل لفات الملصقات بسرعة"},
                {"title": "وضع ملصق قابل للتعديل لدقة تحديد الموضع"},
                {"title": "بناء متين من المعدن والبلاستيك عالي التحمل للاستخدام اليومي في التجزئة"},
            ],
            "specifications": [
                {"label": "عرض الملصق", "value": "21 ملم – 26 ملم (قياسي) / أحجام مخصصة متاحة"},
                {"label": "خطوط الطباعة", "value": "خط واحد، خطان، أو 3 خطوط"},
                {"label": "عمر بكرة الحبر", "value": "حتى 10,000 طبعة"},
            ],
            "applications": [
                {"title": "تسعير المنتجات وتحديد التخفيضات في التجزئة"},
                {"title": "تسعير أرفف السوبرماركت والبقالة"},
                {"title": "تعريف صناديق وبالتات المستودعات"},
                {"title": "ترميز التاريخ والدفعات للمخزون"},
            ],
        },
    },
]


def seed():
    with engine.connect() as conn:
        # Remove existing Printers products only
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

    print(f"✅ Seeded {len(products)} Printer products successfully.")
    for p in products:
        tag_str = f"  [{p['tag']}]" if p["tag"] else ""
        print(f"   • {p['id']}{tag_str}")


if __name__ == "__main__":
    seed()