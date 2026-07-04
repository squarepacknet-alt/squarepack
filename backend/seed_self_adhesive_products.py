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
# Self Adhesive Labels – 6 products
# Category slug: self-adhesive-products
# ---------------------------------------------------------------------------

CATEGORY = {
    "slug": "self-adhesive-products",
    "name": "Self Adhesive Labels",
    "name_ar": "ملصقات لاصقة ذاتية",
}

CATEGORY_IMAGE = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"

products = [

    # ── 1. Plain Labels ──────────────────────────────────────────────────────
    {
        "id":       "plain-labels",
        "name":     "Plain Labels",
        "name_ar":  "ملصقات عادية",
        "desc":     (
            "High-quality blank labels in various sizes and materials. "
            "Perfect for thermal transfer and direct thermal printing applications. "
            "Engineered for reliable adhesion across a wide range of surfaces and "
            "environments, from ambient warehouses to cold-storage facilities."
        ),
        "desc_ar":  (
            "ملصقات فارغة عالية الجودة بأحجام ومواد متنوعة، مثالية لتطبيقات "
            "الطباعة الحرارية والنقل الحراري."
        ),
        "tag":      "Best Seller",
        "tag_ar":   "الأكثر مبيعاً",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/plain-labels.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Material Options",  "value": "Paper, Polypropylene (PP), Polyester (PET), Vinyl"},
                {"label": "Adhesive Type",     "value": "Permanent, Removable, Freezer-grade"},
                {"label": "Core Size",         "value": "1 inch, 3 inch, or Custom"},
                {"label": "Roll Capacity",     "value": "500 – 5,000 labels per roll"},
                {"label": "Finish Options",    "value": "Matte, Glossy, Uncoated"},
            ],
            "features": [
                {"title": "Materials: Paper, Polypropylene, Polyester – choose the right substrate for every application"},
                {"title": "Temperature resistant up to 150 °C for industrial environments"},
                {"title": "Superior adhesive strength for flat, curved, and textured surfaces"},
                {"title": "Compatible with Zebra, TSC, Honeywell, and all major thermal printers"},
                {"title": "Custom die-cutting available – any shape or size on request"},
                {"title": "BPA-free options available for food-contact and pharmaceutical use"},
                {"title": "High-opacity face stock for crisp, scan-ready barcode printing"},
            ],
            "specifications": [
                {"label": "Label Width",       "value": "25 mm – 210 mm (custom widths available)"},
                {"label": "Label Length",      "value": "15 mm – 300 mm (custom lengths available)"},
                {"label": "Core Diameter",     "value": "25 mm (1\") or 76 mm (3\")"},
                {"label": "Outer Roll Dia.",   "value": "Up to 300 mm"},
                {"label": "Temp. Range",       "value": "-40 °C to +150 °C (substrate-dependent)"},
                {"label": "Adhesion",          "value": "Permanent / Removable / Ultra-tack / Freezer"},
                {"label": "Printing Method",   "value": "Thermal Transfer, Direct Thermal, Laser, Inkjet"},
            ],
            "applications": [
                {"title": "Retail product labeling and price marking"},
                {"title": "Warehouse inventory management and shelf marking"},
                {"title": "Shipping and logistics address labels"},
                {"title": "Asset tracking in offices and facilities"},
                {"title": "Manufacturing process control and WIP labels"},
                {"title": "Cold-chain and freezer storage labeling"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "خيارات المادة",     "value": "ورق، بولي بروبيلين، بوليستر، فينيل"},
                {"label": "نوع اللاصق",        "value": "دائم، قابل للإزالة، مقاوم للتجميد"},
                {"label": "حجم النواة",        "value": "1 بوصة، 3 بوصات، أو مخصص"},
                {"label": "سعة اللفة",         "value": "500 – 5,000 ملصق لكل لفة"},
                {"label": "خيارات الإنهاء",    "value": "مطفأ، لامع، غير مطلي"},
            ],
            "features": [
                {"title": "مواد متنوعة: ورق، بولي بروبيلين، بوليستر"},
                {"title": "مقاومة درجات الحرارة حتى 150 درجة مئوية"},
                {"title": "قوة لصق فائقة على الأسطح المختلفة"},
                {"title": "متوافقة مع طابعات زيبرا وTSC وهانيويل وغيرها"},
                {"title": "قطع مخصص متاح بأي شكل أو حجم"},
            ],
            "specifications": [
                {"label": "عرض الملصق",        "value": "25 ملم – 210 ملم"},
                {"label": "طول الملصق",        "value": "15 ملم – 300 ملم"},
                {"label": "نطاق درجة الحرارة", "value": "-40 °C إلى +150 °C"},
                {"label": "طريقة الطباعة",     "value": "نقل حراري، حراري مباشر، ليزر، نفاثة حبر"},
            ],
            "applications": [
                {"title": "وسم منتجات التجزئة وتسعيرها"},
                {"title": "إدارة مخزون المستودعات"},
                {"title": "ملصقات عناوين الشحن واللوجستيات"},
                {"title": "تتبع الأصول في المكاتب والمنشآت"},
            ],
        },
    },

    # ── 2. Customizable Labels ───────────────────────────────────────────────
    {
        "id":       "customizable-labels",
        "name":     "Customizable Labels",
        "name_ar":  "ملصقات قابلة للتخصيص",
        "desc":     (
            "Fully customizable labels designed to make your brand stand out. "
            "Available in vibrant colours and premium finishes including gloss "
            "lamination, soft-touch, and hot-foil stamping. From logo placement "
            "to Pantone colour matching, every detail is crafted to your specification."
        ),
        "desc_ar":  (
            "ملصقات قابلة للتخصيص الكامل مصممة لإبراز علامتك التجارية، "
            "متوفرة بألوان زاهية وإنهاءات فاخرة."
        ),
        "tag":      "Trending",
        "tag_ar":   "رائج",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/customizable%20labels.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Print Process",     "value": "Digital, Flexo, Offset, Screen"},
                {"label": "Colour Matching",   "value": "Pantone, CMYK, Custom Spot Colours"},
                {"label": "Finish Options",    "value": "Gloss, Matte, Soft-Touch, Foil, Emboss"},
                {"label": "Minimum Order",     "value": "500 labels (digital) / 2,000 (flexo)"},
                {"label": "Turnaround",        "value": "5 – 10 business days (standard)"},
            ],
            "features": [
                {"title": "Full-colour printing with Pantone and CMYK colour accuracy"},
                {"title": "Premium finishes: gloss/matte laminate, soft-touch, hot-foil stamping"},
                {"title": "Materials: paper, BOPP, PET, metalized, and speciality substrates"},
                {"title": "Embossing and debossing available for tactile brand effects"},
                {"title": "Variable data printing (serial numbers, QR codes) on the same run"},
                {"title": "Die-cut to any custom shape – rounds, ovals, complex contours"},
                {"title": "Food-safe inks and adhesives available for F&B packaging"},
            ],
            "specifications": [
                {"label": "Printing Colours",  "value": "Up to 8 colours + spot UV / foil"},
                {"label": "Resolution",        "value": "Up to 1200 dpi (digital press)"},
                {"label": "Label Thickness",   "value": "60 – 200 µm (substrate-dependent)"},
                {"label": "Adhesive",          "value": "Permanent, Removable, Repositionable"},
                {"label": "Liner",             "value": "Silicone-coated glassine or kraft"},
                {"label": "Certification",     "value": "FDA-compliant food-safe options"},
            ],
            "applications": [
                {"title": "Premium product packaging and branding labels"},
                {"title": "Wine, spirits, and beverage bottle labels"},
                {"title": "Cosmetics and personal care product labeling"},
                {"title": "Gourmet food and speciality grocery labeling"},
                {"title": "Health & wellness and nutraceutical packaging"},
                {"title": "Corporate gift and promotional merchandise labeling"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "عملية الطباعة",     "value": "رقمي، فليكسو، أوفست، شاشة حرير"},
                {"label": "مطابقة الألوان",    "value": "بانتون، CMYK، ألوان مخصصة"},
                {"label": "خيارات الإنهاء",    "value": "لامع، مطفأ، ناعم اللمس، رقاقة ذهبية، نقش بارز"},
                {"label": "الحد الأدنى للطلب", "value": "500 ملصق (رقمي) / 2,000 (فليكسو)"},
            ],
            "features": [
                {"title": "طباعة ألوان كاملة بدقة بانتون وCMYK"},
                {"title": "إنهاءات فاخرة: لمينيت لامع/مطفأ، ناعم اللمس، ختم بالرقاقة الساخنة"},
                {"title": "طباعة بيانات متغيرة (أرقام تسلسلية، رموز QR)"},
                {"title": "قطع مخصص لأي شكل – دوائر، بيضاوي، خطوط معقدة"},
            ],
            "specifications": [
                {"label": "ألوان الطباعة",     "value": "حتى 8 ألوان + UV موضعي / رقاقة"},
                {"label": "الدقة",             "value": "حتى 1200 نقطة في البوصة"},
                {"label": "نوع اللاصق",        "value": "دائم، قابل للإزالة، قابل لإعادة الوضع"},
            ],
            "applications": [
                {"title": "تغليف المنتجات المميزة والعلامات التجارية"},
                {"title": "ملصقات زجاجات المشروبات والنبيذ"},
                {"title": "ملصقات مستحضرات التجميل والعناية الشخصية"},
                {"title": "تسمية المواد الغذائية والبقالة المتخصصة"},
            ],
        },
    },

    # ── 3. Promotional Labels ────────────────────────────────────────────────
    {
        "id":       "promotional-labels",
        "name":     "Promotional Labels",
        "name_ar":  "ملصقات ترويجية",
        "desc":     (
            "Eye-catching promotional stickers and labels ideal for marketing "
            "campaigns, giveaways, and seasonal promotions. Engineered to grab "
            "attention on the shelf with bold graphics, scratch-off coatings, and "
            "peel-reveal constructions that drive consumer engagement."
        ),
        "desc_ar":  (
            "ملصقات ترويجية لافتة للنظر مثالية للحملات التسويقية والهدايا "
            "والعروض الموسمية."
        ),
        "tag":      None,
        "tag_ar":   None,
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/promotional%20labels.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Special Effects",   "value": "Scratch-off, Peel-reveal, Holographic, Fluorescent"},
                {"label": "Shapes",            "value": "Circle, Square, Star, Custom Die-cut"},
                {"label": "Material Options",  "value": "Paper, BOPP, Foil, Holographic"},
                {"label": "Adhesive",          "value": "Permanent, Removable, Low-tack"},
                {"label": "Minimum Order",     "value": "1,000 labels"},
            ],
            "features": [
                {"title": "Scratch-off coating available for instant-win and loyalty promotions"},
                {"title": "Peel-and-reveal multi-layer construction for hidden messages or prizes"},
                {"title": "Holographic and metallic foil effects for high shelf-appeal"},
                {"title": "Fluorescent and Day-Glo inks for maximum visual impact"},
                {"title": "Moisture and smudge-resistant coatings for outdoor display"},
                {"title": "Sequential numbering and barcodes for redemption tracking"},
                {"title": "Food-safe variants available for direct food-contact promotions"},
            ],
            "specifications": [
                {"label": "Coating Options",   "value": "Scratch-off silver/gold, UV gloss spot, soft-touch"},
                {"label": "Printing",          "value": "Full-colour digital or flexographic"},
                {"label": "Liner",             "value": "Easy-peel glassine or EDP liner"},
                {"label": "Adhesion",          "value": "Low-tack (repositionable) to high-tack permanent"},
                {"label": "Durability",        "value": "Indoor: 2 years; Outdoor (laminated): 5 years"},
            ],
            "applications": [
                {"title": "In-store seasonal and sale promotions"},
                {"title": "Scratch-card and instant-win marketing campaigns"},
                {"title": "Product launch teasers and limited-edition packaging"},
                {"title": "Trade show giveaways and branded merchandise"},
                {"title": "Loyalty programme reward stickers"},
                {"title": "QR-code-linked digital engagement campaigns"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "تأثيرات خاصة",      "value": "كشط، كشف عند تقشير، هولوغرافي، فلوري"},
                {"label": "الأشكال",           "value": "دائري، مربع، نجمة، قطع مخصص"},
                {"label": "خيارات المادة",     "value": "ورق، BOPP، رقاقة، هولوغرافي"},
            ],
            "features": [
                {"title": "طلاء كشط متاح لعروض الفوز الفوري وبرامج الولاء"},
                {"title": "بناء متعدد الطبقات يكشف عند التقشير للرسائل المخفية"},
                {"title": "تأثيرات هولوغرافية ورقاقة معدنية لجاذبية عالية على الرفوف"},
            ],
            "applications": [
                {"title": "العروض الموسمية وتخفيضات المتاجر"},
                {"title": "حملات الكشط والفوز الفوري"},
                {"title": "إطلاق المنتجات والتغليف المحدود الإصدار"},
            ],
        },
    },

    # ── 4. Barcode Labels ────────────────────────────────────────────────────
    {
        "id":       "barcode-labels",
        "name":     "Barcode Labels",
        "name_ar":  "ملصقات الباركود",
        "desc":     (
            "Precision-printed barcode labels compatible with all major scanners "
            "and barcode standards including GS1, Code 128, and QR. Optimised for "
            "first-scan read rates, these labels maintain legibility across the "
            "harshest supply chain conditions – heat, cold, moisture, and abrasion."
        ),
        "desc_ar":  (
            "ملصقات باركود مطبوعة بدقة عالية، متوافقة مع جميع الماسحات الضوئية "
            "الرئيسية ومعايير الباركود بما فيها GS1 وCode 128 ورمز QR."
        ),
        "tag":      "High Volume",
        "tag_ar":   "حجم كبير",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/barcode%20labels.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Barcode Standards",  "value": "GS1-128, Code 39, Code 128, EAN-13, QR, DataMatrix"},
                {"label": "Material",           "value": "Thermal paper, Polypropylene, Polyester"},
                {"label": "Print Method",       "value": "Thermal Transfer, Direct Thermal"},
                {"label": "Scan Guarantee",     "value": "Grade A (ISO 15416 / ISO 15415)"},
                {"label": "Minimum X-dim",      "value": "0.25 mm (10 mil)"},
            ],
            "features": [
                {"title": "Supports all 1D and 2D barcode symbologies: GS1, Code 128, QR, DataMatrix, PDF417"},
                {"title": "ISO-certified Grade A scan quality for first-pass read rates above 99.9 %"},
                {"title": "Thermal transfer and direct thermal printing compatibility"},
                {"title": "High-density printing down to 0.25 mm X-dimension"},
                {"title": "Chemical, moisture, and abrasion-resistant face stocks"},
                {"title": "Available with sequential numbering and variable data pre-printed"},
                {"title": "GS1-compliant for retail, healthcare, and logistics applications"},
            ],
            "specifications": [
                {"label": "Label Size Range",   "value": "20 × 10 mm up to 200 × 150 mm"},
                {"label": "Print Resolution",   "value": "203 dpi, 300 dpi, 600 dpi"},
                {"label": "Scan Grade",         "value": "ISO/IEC 15416 Grade A (1D) / ISO 15415 (2D)"},
                {"label": "Material Options",   "value": "Thermal paper, PP, PET, synthetic"},
                {"label": "Adhesive",           "value": "Permanent high-tack; freezer-grade available"},
                {"label": "Operating Temp.",    "value": "-40 °C to +110 °C"},
                {"label": "Compliance",         "value": "GS1, FDA, UDI-compatible options"},
            ],
            "applications": [
                {"title": "Retail POS and inventory scanning"},
                {"title": "Warehouse management system (WMS) integration"},
                {"title": "Healthcare UDI and pharmaceutical track-and-trace"},
                {"title": "E-commerce fulfilment and shipping labels"},
                {"title": "Manufacturing production line tracking"},
                {"title": "Library and document management systems"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "معايير الباركود",   "value": "GS1-128، Code 39، Code 128، EAN-13، QR، DataMatrix"},
                {"label": "المادة",            "value": "ورق حراري، بولي بروبيلين، بوليستر"},
                {"label": "ضمان المسح",        "value": "درجة A (ISO 15416 / ISO 15415)"},
            ],
            "features": [
                {"title": "يدعم جميع رموز الباركود أحادية وثنائية الأبعاد"},
                {"title": "جودة مسح ISO معتمدة بدرجة A ومعدل قراءة أول مسح أكثر من 99.9%"},
                {"title": "متوافق مع الطباعة الحرارية والنقل الحراري"},
            ],
            "applications": [
                {"title": "مسح نقاط البيع وإدارة المخزون"},
                {"title": "تكامل نظام إدارة المستودعات (WMS)"},
                {"title": "تتبع الأدوية والرعاية الصحية (UDI)"},
                {"title": "ملصقات الشحن والتجارة الإلكترونية"},
            ],
        },
    },

    # ── 5. Shrink Sleeve Labels ──────────────────────────────────────────────
    {
        "id":       "shrink-sleeve-labels",
        "name":     "Shrink Sleeve Labels",
        "name_ar":  "ملصقات الأكمام الانكماشية",
        "desc":     (
            "Full 360-degree printed sleeves that conform perfectly to any "
            "container shape, delivering maximum shelf impact. Made from premium "
            "PVC, PETG, or OPS films, they shrink tightly around bottles, jars, "
            "and cans to create a seamless, billboard-quality brand presentation."
        ),
        "desc_ar":  (
            "أكمام مطبوعة بزاوية 360 درجة تتشكل بشكل مثالي حول أي حاوية، "
            "مما يوفر أقصى قدر من التأثير على الرفوف."
        ),
        "tag":      None,
        "tag_ar":   None,
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/shrink%20sleeves%20labels.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Film Materials",    "value": "PVC, PETG, OPS, PLA (eco-friendly)"},
                {"label": "Shrink Rate",       "value": "Up to 70% radial shrinkage"},
                {"label": "Print Process",     "value": "Gravure, Flexo, Digital"},
                {"label": "Colours",           "value": "Up to 10 colours + white"},
                {"label": "Seam Type",         "value": "Solvent-bonded or heat-sealed"},
            ],
            "features": [
                {"title": "360-degree full-body coverage for complete branding canvas"},
                {"title": "Films: PVC, PETG, OPS, and compostable PLA for eco-conscious brands"},
                {"title": "Radial shrinkage up to 70% – fits standard to extreme contour shapes"},
                {"title": "High-gloss or matte surface for vibrant, premium aesthetics"},
                {"title": "Tamper-evidence capability when applied over closures"},
                {"title": "Reverse-printed for vivid colour pop from inside the film"},
                {"title": "Perforated tear lines for easy consumer removal"},
            ],
            "specifications": [
                {"label": "Film Gauge",        "value": "35 – 60 µm"},
                {"label": "Shrink Rate",       "value": "40 – 70% (TD direction)"},
                {"label": "Shrink Tunnel Temp","value": "80 – 100 °C (steam) / 120 – 180 °C (hot air)"},
                {"label": "Print Colours",     "value": "Up to 10 colours gravure / 8 colours flexo"},
                {"label": "Minimum Order",     "value": "10,000 sleeves"},
                {"label": "Container Types",   "value": "Bottles, jars, cans, cups, pouches"},
                {"label": "Certification",     "value": "FDA food-contact compliant; PETG recyclable"},
            ],
            "applications": [
                {"title": "Beverage bottles: water, juice, energy drinks, dairy"},
                {"title": "Personal care and cosmetics containers"},
                {"title": "Household cleaning product bottles"},
                {"title": "Pharmaceutical bottle tamper-evidence"},
                {"title": "Food jars and condiment containers"},
                {"title": "Promotional limited-edition packaging"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "مواد الفيلم",       "value": "PVC، PETG، OPS، PLA (صديق للبيئة)"},
                {"label": "نسبة الانكماش",     "value": "حتى 70% انكماش شعاعي"},
                {"label": "عملية الطباعة",     "value": "حفر، فليكسو، رقمي"},
            ],
            "features": [
                {"title": "تغطية كاملة 360 درجة لمساحة علامة تجارية كاملة"},
                {"title": "أفلام: PVC، PETG، OPS، وPLA قابل للتحلل للعلامات الصديقة للبيئة"},
                {"title": "انكماش شعاعي حتى 70% يناسب الأشكال الاعتيادية والمعقدة"},
            ],
            "applications": [
                {"title": "زجاجات المشروبات: ماء، عصير، مشروبات طاقة، ألبان"},
                {"title": "حاويات العناية الشخصية ومستحضرات التجميل"},
                {"title": "زجاجات منتجات التنظيف المنزلي"},
                {"title": "تأمين زجاجات الأدوية ضد العبث"},
            ],
        },
    },
]


def seed():
    with engine.connect() as conn:
        # Remove existing Self Adhesive Labels products only
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
                "id":           p["id"],
                "name":         p["name"],
                "name_ar":      p["name_ar"],
                "desc":         p["desc"],
                "desc_ar":      p["desc_ar"],
                "category":     CATEGORY["slug"],
                "category_ar":  CATEGORY["name_ar"],
                "tag":          p["tag"] or "",
                "tag_ar":       p["tag_ar"] or "",
                "image_url":    p["image_url"],
                "details":      json.dumps(p["details"]),
                "details_ar":   json.dumps(p["details_ar"]),
            })

        conn.commit()

    print(f"✅  Seeded {len(products)} Self Adhesive Label products successfully.")
    for p in products:
        tag_str = f"  [{p['tag']}]" if p["tag"] else ""
        print(f"   • {p['id']}{tag_str}")


if __name__ == "__main__":
    seed()