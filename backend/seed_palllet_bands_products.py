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

    # ── 1. Pallet Bands ─────────────────────────────────────────────────────
    {
        "id": "pallet-bands",
        "name": "Pallet Bands",
        "name_ar": "أحزمة البليت",
        "desc": (
            "Heavy-duty reusable pallet bands that secure palletized loads in seconds "
            "without tools, machines, or single-use plastic. Unlike disposable shrink wrap, "
            "these bands reuse across many loads, lowering cost per pallet and cutting "
            "plastic waste for warehouses with steady pallet volume."
        ),
        "desc_ar": (
            "أحزمة بليت مطاطية قابلة لإعادة الاستخدام تثبت الأحمال الموضوعة على البليتات في ثوانٍ "
            "دون أدوات أو آلات أو بلاستيك للاستخدام مرة واحدة. على عكس الغلاف البلاستيكي القابل للتخلص بعد مرة واحدة، "
            "يمكن إعادة استخدام هذه الأحزمة لعدة شحنات، مما يقلل التكلفة لكل بليت ويخفض نفايات البلاستيك في المستودعات ذات حجم البليت الثابت."
        ),
        "tag": "Best Seller",
        "tag_ar": "الأكثر مبيعاً",
        "image_url": "https://bulkrubberbands.com/cdn/shop/articles/palletbands-vs-shrinkwrap.png?v=1746680259&width=1200",
        "details": {
            "quick_specs": [
                {"label": "Available Sizes", "value": "84\", 92\", 112\""},
                {"label": "Material", "value": "Premium natural rubber, UV and temperature resistant"},
                {"label": "Reuse Cycles", "value": "Dozens to hundreds of pallets per band"},
                {"label": "Application Time", "value": "Under 10 seconds per pallet"},
                {"label": "Equipment Required", "value": "None"},
                {"label": "Best For", "value": "Stacked, boxed, and returnable loads"},
            ],
            "features": [
                {"title": "Reusable across many loads so cost per pallet drops with each cycle"},
                {"title": "Applies in one motion with no wrap machine, heat gun, or tools"},
                {"title": "Ideal for stacked, uniform, or boxed loads with strong horizontal compression"},
                {"title": "Outperforms shrink wrap for closed-loop routes, returns, and internal transfer"},
                {"title": "Eliminates single-use plastic film waste from every load it replaces"},
                {"title": "American-made by Alliance Rubber Company in Hot Springs, Arkansas"},
            ],
            "specifications": [
                {"label": "Band Sizes", "value": "84\" (standard), 92\" (tall loads), 112\" (oversized)"},
                {"label": "Typical Use", "value": "Closed-loop distribution, internal transfer, and returnable routes"},
                {"label": "Material", "value": "Premium natural rubber"},
                {"label": "Durability", "value": "Many reuse cycles until wear requires replacement"},
                {"label": "Application", "value": "Fast hand application in seconds"},
                {"label": "Manufacturer", "value": "Alliance Rubber Company, Hot Springs, Arkansas, USA"},
            ],
            "applications": [
                {"title": "Warehouse shipping – secure palletized inventory for trailers, racks, and cross docks"},
                {"title": "Internal transfer – reuse bands across multiple loads in closed-loop systems"},
                {"title": "Distribution centers – stabilize stacked cartons without disposable film"},
                {"title": "Returnable routes – keep pallet loads secure on the return trip too"},
                {"title": "Fulfillment operations – speed up pallet preparation with no walk-around wrapping"},
                {"title": "When you want to cut plastic waste and lower recurring packaging cost"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "الأحجام المتاحة", "value": "84\" و92\" و112\""},
                {"label": "المادة", "value": "مطاط طبيعي ممتاز مقاوم للأشعة فوق البنفسجية ودرجات الحرارة"},
                {"label": "دورات إعادة الاستخدام", "value": "عشرات إلى مئات الأعباء لكل حزام"},
                {"label": "وقت التطبيق", "value": "أقل من 10 ثوانٍ لكل بليت"},
                {"label": "المعدات المطلوبة", "value": "لا شيء"},
                {"label": "الأفضل لـ", "value": "الأحمال المكدسة والمغلفة والمسارات القابلة للإرجاع"},
            ],
            "features": [
                {"title": "قابلة لإعادة الاستخدام عبر العديد من الأعباء بحيث تنخفض التكلفة لكل بليت مع كل دورة"},
                {"title": "تُطبَّق بحركة واحدة دون آلة لف أو مسدس حراري أو أدوات"},
                {"title": "مثالية للأحمال المكدسة أو الموحدة أو المعبأة بضغط أفقي قوي"},
                {"title": "تفوق على الغلاف البلاستيكي في المسارات ذات الحلقة المغلقة والعودة والنقل الداخلي"},
                {"title": "تلغي نفايات الفيلم البلاستيكي للاستخدام الواحد من كل حمولة"},
                {"title": "صُنع في أمريكا بواسطة Alliance Rubber Company في هوت سبرينغز، أركنساس"},
            ],
            "specifications": [
                {"label": "أحجام الحزام", "value": "84\" (قياسي)، 92\" (أحمال طويلة)، 112\" (مقاس كبير)"},
                {"label": "الاستخدام النموذجي", "value": "التوزيع ذو الحلقة المغلقة، النقل الداخلي، والمسارات القابلة للإرجاع"},
                {"label": "المادة", "value": "مطاط طبيعي ممتاز"},
                {"label": "المتانة", "value": "العديد من دورات إعادة الاستخدام حتى يتطلب الاستبدال"},
                {"label": "التطبيق", "value": "تطبيق يدوي سريع في ثوانٍ"},
                {"label": "الجهة المصنعة", "value": "Alliance Rubber Company، هوت سبرينغز، أركنساس، الولايات المتحدة الأمريكية"},
            ],
            "applications": [
                {"title": "شحن المستودعات – تثبيت البضائع على البليتات للشاحنات والرفوف ومحطات التبديل"},
                {"title": "النقل الداخلي – إعادة استخدام الأحزمة عبر العديد من الأعباء في أنظمة الحلقة المغلقة"},
                {"title": "مراكز التوزيع – تثبيت الكراتين المكدسة بدون فيلم يمكن التخلص منه"},
                {"title": "المسارات القابلة للإرجاع – إبقاء الأحمال آمنة في رحلة العودة أيضًا"},
                {"title": "عمليات التلبية – تسريع إعداد البليت دون الحاجة للمشي حوله"},
                {"title": "عندما تريد تقليل نفايات البلاستيك وخفض تكلفة التعبئة المتكررة"},
            ],
        },
    },
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