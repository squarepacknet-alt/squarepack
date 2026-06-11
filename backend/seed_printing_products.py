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

    # ── 1. Printing ─────────────────────────────────────────────────────────
    {
        "id": "printing",
        "name": "Printing",
        "name_ar": "الطباعة",
        "desc": (
            "Industrial and desktop label printing solutions supporting thermal "
            "transfer and direct thermal technologies for every volume. From "
            "entry-level models to high-throughput industrial systems, our "
            "printer portfolio delivers reliable, high-quality output for "
            "barcode, shipping, and product labeling applications."
        ),
        "desc_ar": (
            "حلول طباعة ملصقات صناعية ومكتبية تدعم تقنيات النقل الحراري والطباعة الحرارية المباشرة "
            "لجميع الأحجام. من الطرازات المبتدئة إلى الأنظمة الصناعية عالية الإنتاجية."
        ),
        "tag": "Best Seller",
        "tag_ar": "الأكثر مبيعاً",
        "image_url": "https://m.media-amazon.com/images/I/51cOBojSGVL._AC_UF350,350_QL80_.jpg",
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

    # ── 2. Print Care ───────────────────────────────────────────────────────
    {
        "id": "print-care",
        "name": "Print Care",
        "name_ar": "العناية بالطباعة",
        "desc": (
            "Comprehensive printer maintenance, servicing, and spare-parts supply "
            "to maximise uptime and extend the life of your printing equipment. "
            "From preventive maintenance kits to emergency on-site repairs, our "
            "certified technicians keep your label printing operations running "
            "at peak performance."
        ),
        "desc_ar": (
            "صيانة شاملة للطابعات وخدمات وتوريد قطع غيار لتعظيم وقت التشغيل "
            "وإطالة عمر معدات الطباعة لديك."
        ),
        "tag": "Essential",
        "tag_ar": "أساسي",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0kvwJyhOsw3Hup1e_SHgeMtYCdVJaEIDcQ&s",
        "details": {
            "quick_specs": [
                {"label": "Service Types", "value": "Preventive Maintenance, On-Site Repair, Remote Support"},
                {"label": "Response Time", "value": "Next-day (standard) / 4-hour (premium)"},
                {"label": "Parts Coverage", "value": "Printheads, Platens, Motors, Sensors, Boards"},
                {"label": "Warranty", "value": "90 days (repairs) / 1 year (new parts)"},
                {"label": "Contract Options", "value": "Pay-per-click, Annual, Time & Materials"},
            ],
            "features": [
                {"title": "Certified technicians trained on all major printer brands (Zebra, Honeywell, TSC, SATO)"},
                {"title": "Preventive maintenance kits including printheads, platen rollers, and cleaning supplies"},
                {"title": "Printhead performance optimization for maximum life and consistent density"},
                {"title": "Firmware updates and configuration optimization for legacy printers"},
                {"title": "Emergency on-site repair within 4 hours for critical production lines"},
                {"title": "Spare parts inventory with overnight shipping availability"},
                {"title": "Remote diagnostics and telemetry monitoring for proactive maintenance"},
            ],
            "specifications": [
                {"label": "Service Coverage", "value": "Nationwide (on-site) / Global (remote)"},
                {"label": "Supported Brands", "value": "Zebra, Honeywell (Intermec), TSC, SATO, Citizen, Epson"},
                {"label": "Printer Types", "value": "Desktop, Industrial, Mobile, RFID-enabled"},
                {"label": "Cleaning Frequency", "value": "After each ribbon roll (standard) / Daily (heavy use)"},
                {"label": "Printhead Life", "value": "30–50 km (203 dpi) / 20–30 km (300 dpi)"},
                {"label": "SLA Options", "value": "Standard (NBD), Premium (4-hour), 24/7 Critical"},
                {"label": "Certification", "value": "ISO 9001, Zebra Certified, Honeywell Partner"},
            ],
            "applications": [
                {"title": "Manufacturing line printer uptime protection"},
                {"title": "Warehouse and distribution center printer fleets"},
                {"title": "Healthcare and pharmaceutical labeling compliance"},
                {"title": "Retail and logistics multi-site printer management"},
                {"title": "Airline baggage tag printing systems"},
                {"title": "Postal and courier shipping label printers"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أنواع الخدمة", "value": "صيانة وقائية، إصلاح في الموقع، دعم عن بُعد"},
                {"label": "وقت الاستجابة", "value": "اليوم التالي (قياسي) / 4 ساعات (مميز)"},
                {"label": "تغطية القطع", "value": "رؤوس الطباعة، بكرات، محركات، حساسات، لوحات"},
            ],
            "features": [
                {"title": "فنيون معتمدون على جميع ماركات الطابعات الرئيسية"},
                {"title": "مجموعات صيانة وقائية تشمل رؤوس الطباعة وبكرات التثبيت ومواد التنظيف"},
                {"title": "تشخيص عن بُعد ومراقبة عن بعد للصيانة الاستباقية"},
                {"title": "إصلاح طارئ في الموقع خلال 4 ساعات لخطوط الإنتاج الحرجة"},
            ],
            "specifications": [
                {"label": "تغطية الخدمة", "value": "على مستوى الدولة (في الموقع) / عالمي (عن بُعد)"},
                {"label": "العلامات المدعومة", "value": "زيبرا، هانيويل، TSC، SATO، سيتيزن، إبسون"},
                {"label": "أنواع الطابعات", "value": "مكتبية، صناعية، متنقلة، مزودة بتقنية RFID"},
            ],
            "applications": [
                {"title": "حماية وقت تشغيل طابعات خط الإنتاج"},
                {"title": "أساطيل طابعات المستودعات ومراكز التوزيع"},
                {"title": "أنظمة طباعة ملصقات الشحن البريدية والسعوية"},
            ],
        },
    },

    # ── 3. Labels (Printers compatible labels) ──────────────────────────────
    {
        "id": "labels-printers",
        "name": "Labels",
        "name_ar": "الملصقات",
        "desc": (
            "Pre-tested label media optimised for specific printer models, "
            "ensuring consistent print quality and ribbon compatibility. "
            "Our certified media program eliminates trial-and-error, delivering "
            "perfect adhesion, smear-free printing, and maximum printhead life."
        ),
        "desc_ar": (
            "وسائط ملصقات تم اختبارها مسبقاً ومحسّنة لطرازات طابعات محددة، "
            "مما يضمن جودة طباعة متسقة وتوافق مع الشريط."
        ),
        "tag": "Certified",
        "tag_ar": "معتمد",
        "image_url": "https://m.media-amazon.com/images/I/61ewOR0OUDL._AC_UF1000,1000_QL80_.jpg",
        "details": {
            "quick_specs": [
                {"label": "Media Types", "value": "Thermal Paper, Polyester, Polypropylene, Vinyl"},
                {"label": "Printer Compatibility", "value": "Zebra, Honeywell, TSC, SATO, Epson, Citizen"},
                {"label": "Ribbon Matching", "value": "Wax, Wax-Resin, Resin – pre-qualified pairs"},
                {"label": "Sample Program", "value": "Free print testing on your equipment"},
                {"label": "Shelf Life", "value": "2–5 years (substrate dependent)"},
            ],
            "features": [
                {"title": "Printer-certified media – eliminates guesswork and production delays"},
                {"title": "Optimised ribbon-label pairings for maximum printhead protection"},
                {"title": "Guaranteed barcode scan quality – ISO Grade A verification included"},
                {"title": "Custom sizes and materials available with short lead times"},
                {"title": "Static-free liners for smooth feeding in high-speed printers"},
                {"title": "Temperature-specific adhesives for cold storage and high-heat applications"},
                {"title": "FDA-compliant options for food-contact and pharmaceutical labeling"},
            ],
            "specifications": [
                {"label": "Label Sizes", "value": "Any custom size from 15×15 mm to 200×300 mm"},
                {"label": "Print Resolution Support", "value": "203 dpi, 300 dpi, 600 dpi"},
                {"label": "Adhesive Options", "value": "Permanent, Removable, Freezer-grade, High-tack"},
                {"label": "Testing Protocol", "value": "Scratch, smear, adhesion, temperature cycling"},
                {"label": "Certification", "value": "Printer brand validation report included with order"},
                {"label": "Minimum Order", "value": "250 labels (sample) / 5,000 labels (production)"},
                {"label": "Quality Standard", "value": "ISO 9001, Barcode Verification Grade A"},
            ],
            "applications": [
                {"title": "Printer fleet standardization across multiple sites"},
                {"title": "Mission-critical labeling where print failures are not an option"},
                {"title": "FDA-regulated pharmaceutical and medical device labeling"},
                {"title": "Retail and e-commerce fulfilment centers"},
                {"title": "Automotive parts traceability and warranty labels"},
                {"title": "Electronics manufacturing and component labeling"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أنواع الوسائط", "value": "ورق حراري، بوليستر، بولي بروبيلين، فينيل"},
                {"label": "توافق الطابعة", "value": "زيبرا، هانيويل، TSC، SATO، إبسون، سيتيزن"},
                {"label": "مطابقة الشريط", "value": "شمع، شمع-ريزين، ريزين – أزواج معتمدة مسبقاً"},
            ],
            "features": [
                {"title": "وسائط معتمدة للطابعة – يلغي التخمين وتأخيرات الإنتاج"},
                {"title": "أزواج شريط-ملصق محسّنة لحماية أقصى لرأس الطباعة"},
                {"title": "جودة مسح باركود مضمونة – تشمل التحقق من الدرجة A ISO"},
                {"title": "بطانة خالية من الكهرباء الساكنة للتغذية السلسة في الطابعات عالية السرعة"},
            ],
            "specifications": [
                {"label": "أحجام الملصقات", "value": "أي حجم مخصص من 15×15 ملم إلى 200×300 ملم"},
                {"label": "خيارات اللاصق", "value": "دائم، قابل للإزالة، درجة تجميد، عالي الالتصاق"},
                {"label": "بروتوكول الاختبار", "value": "خدش، تلطيخ، التصاق، تدوير حراري"},
            ],
            "applications": [
                {"title": "توحيد أسطول الطابعات عبر مواقع متعددة"},
                {"title": "وسم حرج للمهمة حيث لا يُسمح بفشل الطباعة"},
                {"title": "وسم الأدوية والأجهزة الطبية الخاضعة لـ FDA"},
                {"title": "مراكز تلبية طلبات التجارة الإلكترونية والتجزئة"},
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