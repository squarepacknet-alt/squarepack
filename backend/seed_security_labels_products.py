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
# Security Labels – 6 products
# Category slug: security-labels
# ---------------------------------------------------------------------------

CATEGORY = {
    "slug":    "security-labels",
    "name":    "Security Labels",
    "name_ar": "ملصقات أمنية",
}

CATEGORY_IMAGE = (
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7"
    "?q=80&w=2070&auto=format&fit=crop"
)

products = [

    # ── 1. Void Labels ───────────────────────────────────────────────────────
    {
        "id":      "void-labels",
        "name":    "Void Labels",
        "name_ar": "ملصقات فويد",
        "desc": (
            "Tamper-evident void labels that display a clear 'VOID' message when "
            "removed, protecting products and assets from unauthorised access. "
            "Once applied, any attempt to peel the label permanently reveals the "
            "hidden 'VOID' pattern on both the label face and the substrate surface, "
            "providing instant visual proof of tampering."
        ),
        "desc_ar": (
            "ملصقات فويد تكشف عن العبث بعرض رسالة 'VOID' واضحة عند إزالتها، "
            "مما يحمي المنتجات والأصول من الوصول غير المصرح به."
        ),
        "tag":     "Security",
        "tag_ar":  "أمان",
        "image_url": "https://images.surferseo.art/a13ff2cf-3cf3-47d7-bc4a-981d7d9c6420.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Tamper Pattern",    "value": "VOID, Checkerboard, Custom Text/Logo"},
                {"label": "Material",          "value": "Polyester (PET), Vinyl, Metalized PET"},
                {"label": "Adhesive",          "value": "Aggressive permanent, surface-destructible"},
                {"label": "Reveal Method",     "value": "Residue transfer on substrate + face change"},
                {"label": "Finish",            "value": "Gloss, Matte, Silver Metalized"},
            ],
            "features": [
                {"title": "Permanent 'VOID' residue transfers to substrate on any removal attempt"},
                {"title": "Dual-evidence: label face changes AND substrate surface is marked"},
                {"title": "Available in silver, white, clear, and custom-coloured face stocks"},
                {"title": "Custom void patterns: company logo, serial numbers, honeycomb, checkerboard"},
                {"title": "Printable surface for barcodes, QR codes, and sequential numbering"},
                {"title": "Resistant to solvents, UV light, and extreme temperatures"},
                {"title": "Conforms to curved, textured, and powder-coated metal surfaces"},
            ],
            "specifications": [
                {"label": "Face Stock",        "value": "38 µm – 50 µm PET / metalized PET"},
                {"label": "Total Thickness",   "value": "90 – 130 µm"},
                {"label": "Peel Strength",     "value": "≥ 18 N/25 mm (on stainless steel)"},
                {"label": "Temp. Range",       "value": "-30 °C to +100 °C"},
                {"label": "Solvent Resistance","value": "IPA, MEK, acetone resistant"},
                {"label": "Custom Pattern",    "value": "Yes – logo, text, sequential numbering"},
                {"label": "Sizes",             "value": "20×10 mm to 150×100 mm, custom available"},
            ],
            "applications": [
                {"title": "Product warranty seals and anti-tamper packaging closures"},
                {"title": "Electronic device and consumer goods tamper-evidence"},
                {"title": "Pharmaceutical and medical device seal of integrity"},
                {"title": "IT equipment and server rack security seals"},
                {"title": "Document and envelope security"},
                {"title": "Retail anti-shoplifting and returns fraud prevention"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "نمط العبث",         "value": "VOID، مربعات، نص/شعار مخصص"},
                {"label": "المادة",            "value": "بوليستر (PET)، فينيل، PET معدني"},
                {"label": "اللاصق",            "value": "لاصق دائم قوي، مدمر للسطح"},
                {"label": "طريقة الكشف",       "value": "نقل بقايا على السطح + تغيير وجه الملصق"},
            ],
            "features": [
                {"title": "تنقل 'VOID' بشكل دائم إلى السطح عند أي محاولة إزالة"},
                {"title": "دليلان على العبث: تغيير وجه الملصق وتعليم السطح"},
                {"title": "أنماط فويد مخصصة: شعار الشركة، أرقام تسلسلية، شبكة عسل"},
                {"title": "سطح قابل للطباعة للباركود ورموز QR والترقيم التسلسلي"},
            ],
            "specifications": [
                {"label": "السطح الخارجي",     "value": "38 – 50 ميكرون PET / PET معدني"},
                {"label": "السُّمك الإجمالي",  "value": "90 – 130 ميكرون"},
                {"label": "نطاق الحرارة",      "value": "-30 °C إلى +100 °C"},
            ],
            "applications": [
                {"title": "أختام ضمان المنتج ومقاومة العبث في التغليف"},
                {"title": "أدلة العبث للأجهزة الإلكترونية والسلع الاستهلاكية"},
                {"title": "أختام تكامل الأجهزة الطبية والصيدلانية"},
                {"title": "أختام أمان معدات تكنولوجيا المعلومات وخوادم الرف"},
            ],
        },
    },

    # ── 2. RFID Tags ─────────────────────────────────────────────────────────
    {
        "id":      "rfid-tags",
        "name":    "RFID Tags",
        "name_ar": "علامات RFID",
        "desc": (
            "High-performance RFID tags for contactless identification and "
            "real-time tracking of assets, inventory, and shipments. "
            "Available in UHF, HF, and NFC configurations, these hard and soft "
            "tags are engineered for reliability in demanding environments including "
            "metal surfaces, liquids, and high-RF-noise industrial settings."
        ),
        "desc_ar": (
            "علامات RFID عالية الأداء للتعريف اللاتلامسي والتتبع الفوري "
            "للأصول والمخزون والشحنات في جميع البيئات."
        ),
        "tag":     None,
        "tag_ar":  None,
        "image_url": "https://5.imimg.com/data5/SELLER/Default/2023/6/317290030/DL/LX/AC/8217514/paper-garment-barcode-stickers.jpg",
        "details": {
            "quick_specs": [
                {"label": "Frequency",         "value": "UHF 860–960 MHz, HF 13.56 MHz, NFC"},
                {"label": "Read Range",        "value": "Up to 12 m (UHF) / 1 m (HF/NFC)"},
                {"label": "Memory",            "value": "EPC 96-bit to 512-bit; user memory up to 4 KB"},
                {"label": "Form Factors",      "value": "Hard tag, Soft label, On-metal, Laundry, Cable tie"},
                {"label": "Protocols",         "value": "EPC Gen 2 / ISO 18000-6C, ISO 15693, ISO 14443"},
            ],
            "features": [
                {"title": "UHF Gen 2 / ISO 18000-6C for long-range supply chain and logistics"},
                {"title": "On-metal variants with ferrite spacer for direct metal surface attachment"},
                {"title": "NFC-enabled tags for smartphone-based consumer engagement"},
                {"title": "IP68-rated enclosures for harsh outdoor and wet environments"},
                {"title": "Wide operating temperature: -40 °C to +85 °C (industrial grade)"},
                {"title": "Anti-collision protocol supports reading 1,000+ tags per second"},
                {"title": "Passive (battery-free) and active (battery-assisted) options available"},
            ],
            "specifications": [
                {"label": "Frequency Bands",   "value": "UHF: 860–960 MHz; HF: 13.56 MHz"},
                {"label": "Standard",          "value": "EPC Class 1 Gen 2 / ISO 18000-6C"},
                {"label": "Chip Options",      "value": "Impinj Monza, NXP UCODE, Alien Higgs"},
                {"label": "Read Range (UHF)",  "value": "Up to 12 m (free field)"},
                {"label": "Read Range (HF)",   "value": "Up to 100 cm"},
                {"label": "Data Retention",    "value": "50 years"},
                {"label": "Write Endurance",   "value": "100,000 write cycles"},
                {"label": "Operating Temp.",   "value": "-40 °C to +85 °C"},
                {"label": "IP Rating",         "value": "IP67 / IP68 (encapsulated hard tags)"},
            ],
            "applications": [
                {"title": "Warehouse and distribution centre inventory management"},
                {"title": "Retail apparel and footwear loss prevention"},
                {"title": "Healthcare equipment and pharmaceutical track-and-trace"},
                {"title": "Fixed asset management for IT and office equipment"},
                {"title": "Supply chain visibility and container tracking"},
                {"title": "Library book and media management systems"},
                {"title": "Laundry and textile rental tracking"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "التردد",            "value": "UHF 860–960 ميغاهرتز، HF 13.56 ميغاهرتز، NFC"},
                {"label": "نطاق القراءة",      "value": "حتى 12 م (UHF) / 1 م (HF/NFC)"},
                {"label": "الذاكرة",           "value": "EPC 96 بت إلى 512 بت؛ ذاكرة مستخدم حتى 4 كيلوبايت"},
                {"label": "أشكال التصميم",     "value": "علامة صلبة، ملصق ناعم، على المعدن، غسيل، ربطة كابل"},
            ],
            "features": [
                {"title": "UHF Gen 2 / ISO 18000-6C للتتبع بعيد المدى في سلاسل التوريد"},
                {"title": "أنواع على المعدن مع فاصل فيريت للتركيب المباشر على الأسطح المعدنية"},
                {"title": "علامات NFC لتفاعل المستهلكين عبر الهاتف الذكي"},
                {"title": "تصنيف IP68 للبيئات القاسية والرطبة"},
            ],
            "specifications": [
                {"label": "النطاقات الترددية",  "value": "UHF: 860–960 ميغاهرتز؛ HF: 13.56 ميغاهرتز"},
                {"label": "الاحتفاظ بالبيانات", "value": "50 عاماً"},
                {"label": "درجة الحرارة",       "value": "-40 °C إلى +85 °C"},
            ],
            "applications": [
                {"title": "إدارة مخزون المستودعات ومراكز التوزيع"},
                {"title": "منع خسائر ملابس التجزئة والأحذية"},
                {"title": "تتبع المعدات الطبية والأدوية"},
                {"title": "إدارة الأصول الثابتة لمعدات تكنولوجيا المعلومات"},
            ],
        },
    },

    # ── 3. RFID Labels ───────────────────────────────────────────────────────
    {
        "id":      "rfid-labels",
        "name":    "RFID Labels",
        "name_ar": "ملصقات RFID",
        "desc": (
            "Slim, printable RFID labels that combine standard barcode printing "
            "with embedded RFID inlays for dual-mode identification. "
            "Compatible with leading thermal-transfer RFID printers, these "
            "smart labels allow you to encode, verify, and print human-readable "
            "data and barcodes on a single label in one pass."
        ),
        "desc_ar": (
            "ملصقات RFID نحيلة وقابلة للطباعة تجمع بين طباعة الباركود القياسية "
            "والشرائح RFID المدمجة للتعريف المزدوج."
        ),
        "tag":     None,
        "tag_ar":  None,
        "image_url": "https://images.unsplash.com/photo-1647815567270-2f2fb94fc532?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "details": {
            "quick_specs": [
                {"label": "Frequency",         "value": "UHF 860–960 MHz / HF 13.56 MHz"},
                {"label": "Inlay Chips",       "value": "Impinj Monza R6, NXP UCODE 9, Alien Higgs 4"},
                {"label": "Face Stock",        "value": "Thermal transfer paper, PET, synthetic"},
                {"label": "Print Method",      "value": "Thermal Transfer (TTR) / Direct Thermal"},
                {"label": "Printer Compat.",   "value": "Zebra ZD500R, ZT411R; Honeywell PM45; TSC"},
            ],
            "features": [
                {"title": "Encode, print, and verify RFID + barcode data in a single printer pass"},
                {"title": "UHF and HF inlay options for both long-range and proximity reading"},
                {"title": "Dry-inlay and wet-inlay constructions for different adhesive needs"},
                {"title": "Pre-encoded (EPC written at factory) or blank for on-site encoding"},
                {"title": "Face stocks: thermal paper, PP, PET – matched to application environment"},
                {"title": "Optional void security layer to detect label removal attempts"},
                {"title": "GS1-compliant EPC encoding for retail and supply chain standards"},
            ],
            "specifications": [
                {"label": "Frequency",         "value": "UHF: 860–960 MHz; HF: 13.56 MHz"},
                {"label": "EPC Memory",        "value": "96-bit to 496-bit (chip dependent)"},
                {"label": "User Memory",       "value": "Up to 512 bits"},
                {"label": "Label Sizes",       "value": "50×25 mm to 148×210 mm (custom available)"},
                {"label": "Adhesive",          "value": "Permanent, Removable, Freezer-grade"},
                {"label": "Operating Temp.",   "value": "-20 °C to +70 °C"},
                {"label": "Read Range",        "value": "Up to 6 m (UHF, optimised label)"},
                {"label": "Certification",     "value": "EPC Gen 2 / ISO 18000-6C; GS1 compliant"},
            ],
            "applications": [
                {"title": "Retail supply chain item-level tracking (apparel, footwear, electronics)"},
                {"title": "Warehouse receiving, put-away, and shipping verification"},
                {"title": "Healthcare patient wristbands and specimen tracking"},
                {"title": "Document and file management with RFID portals"},
                {"title": "Airline baggage and cargo tracking"},
                {"title": "Manufacturing work-in-progress (WIP) tracking"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "التردد",            "value": "UHF 860–960 ميغاهرتز / HF 13.56 ميغاهرتز"},
                {"label": "شرائح الإدراج",    "value": "Impinj Monza R6، NXP UCODE 9، Alien Higgs 4"},
                {"label": "طريقة الطباعة",    "value": "نقل حراري (TTR) / حراري مباشر"},
            ],
            "features": [
                {"title": "ترميز وطباعة والتحقق من RFID + الباركود في تمرير طابعة واحد"},
                {"title": "خيارات إدراج UHF وHF للقراءة بعيدة المدى والقريبة"},
                {"title": "تراكيب إدراج جاف ورطب لاحتياجات لاصق مختلفة"},
                {"title": "طبقة أمان فويد اختيارية لاكتشاف محاولات إزالة الملصق"},
            ],
            "specifications": [
                {"label": "ذاكرة EPC",         "value": "96 بت إلى 496 بت (حسب الشريحة)"},
                {"label": "نطاق القراءة",       "value": "حتى 6 م (UHF، ملصق محسّن)"},
                {"label": "درجة الحرارة",       "value": "-20 °C إلى +70 °C"},
            ],
            "applications": [
                {"title": "تتبع العناصر في سلاسل توريد التجزئة (ملابس، أحذية، إلكترونيات)"},
                {"title": "استلام المستودعات والتحقق من الشحن"},
                {"title": "أساور المرضى وتتبع العينات في الرعاية الصحية"},
            ],
        },
    },

    # ── 4. Asset Labels (Security) ───────────────────────────────────────────
    {
        "id":      "asset-labels-security",
        "name":    "Asset Labels",
        "name_ar": "ملصقات الأصول",
        "desc": (
            "Ultra-destructible or polyester asset labels engineered to deter "
            "removal and clearly identify ownership of valuable equipment. "
            "Designed to fragment into tiny pieces on any peel attempt, these "
            "labels make removal and re-application impossible, ensuring permanent "
            "asset identification in IT, facilities, and field environments."
        ),
        "desc_ar": (
            "ملصقات أصول قابلة للتدمير الفائق أو من البوليستر مصممة لردع الإزالة "
            "وتحديد ملكية المعدات الثمينة بوضوح."
        ),
        "tag":     None,
        "tag_ar":  None,
        "image_url": "https://plus.unsplash.com/premium_photo-1707146615054-5f801caa43b5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "details": {
            "quick_specs": [
                {"label": "Material Options",  "value": "Ultra-destructible vinyl, Polyester (PET), Anodised aluminium"},
                {"label": "Adhesive",          "value": "Aggressive permanent, ultra-high-bond"},
                {"label": "Numbering",         "value": "Sequential, barcode, QR code, UID"},
                {"label": "Finish",            "value": "Gloss, Matte, Brushed silver, Gold"},
                {"label": "Durability",        "value": "5–10 years outdoor / permanent indoor"},
            ],
            "features": [
                {"title": "Ultra-destructible vinyl disintegrates into fragments on removal – cannot be reapplied"},
                {"title": "Polyester (PET) variant resists chemicals, UV, abrasion, and moisture"},
                {"title": "Anodised aluminium option for extreme-environment industrial asset tagging"},
                {"title": "Pre-printed sequential numbering, barcodes, QR codes, and logos"},
                {"title": "Custom colour schemes and branding to match corporate identity"},
                {"title": "Laser-engraved or thermal-transfer printable surface"},
                {"title": "Compliant with BS EN ISO 9001 asset management requirements"},
            ],
            "specifications": [
                {"label": "Face Stock Options","value": "Ultra-destructible vinyl / 50 µm PET / aluminium foil"},
                {"label": "Adhesive Tack",     "value": "Ultra-high-bond (≥ 25 N/25 mm)"},
                {"label": "Thickness",         "value": "80 – 200 µm (material dependent)"},
                {"label": "Temp. Resistance",  "value": "-40 °C to +150 °C"},
                {"label": "UV Resistance",     "value": "5+ years outdoor (laminated PET)"},
                {"label": "Chemical Resist.",  "value": "IPA, oils, hydraulic fluids"},
                {"label": "Custom Sizes",      "value": "25×12 mm to 200×100 mm"},
            ],
            "applications": [
                {"title": "IT equipment: laptops, monitors, servers, and networking gear"},
                {"title": "Office furniture and fixed facilities management"},
                {"title": "Medical and laboratory equipment identification"},
                {"title": "Industrial machinery and production equipment"},
                {"title": "Vehicle and fleet asset tagging"},
                {"title": "School and government property management"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "خيارات المادة",     "value": "فينيل قابل للتدمير الفائق، بوليستر (PET)، ألومنيوم مؤكسد"},
                {"label": "اللاصق",            "value": "دائم عدواني، فائق الالتصاق"},
                {"label": "الترقيم",           "value": "تسلسلي، باركود، رمز QR، UID"},
                {"label": "المتانة",           "value": "5–10 سنوات خارجي / دائم داخلي"},
            ],
            "features": [
                {"title": "الفينيل القابل للتدمير الفائق يتفتت عند الإزالة – لا يمكن إعادة تطبيقه"},
                {"title": "خيار بوليستر (PET) مقاوم للمواد الكيميائية والأشعة فوق البنفسجية والبلى"},
                {"title": "خيار الألومنيوم المؤكسد لوسم الأصول الصناعية في البيئات القاسية"},
                {"title": "ترقيم تسلسلي مطبوع مسبقاً وباركود ورموز QR وشعارات"},
            ],
            "specifications": [
                {"label": "مقاومة الحرارة",    "value": "-40 °C إلى +150 °C"},
                {"label": "مقاومة الأشعة UV",  "value": "أكثر من 5 سنوات خارجي (PET مُرقق)"},
            ],
            "applications": [
                {"title": "معدات تكنولوجيا المعلومات: لابتوب، شاشات، خوادم، شبكات"},
                {"title": "أثاث المكاتب وإدارة المرافق الثابتة"},
                {"title": "تعريف المعدات الطبية والمختبرية"},
                {"title": "الآلات الصناعية ومعدات الإنتاج"},
            ],
        },
    },

    # ── 5. Tamper Evident Labels ─────────────────────────────────────────────
    {
        "id":      "tamper-evident-labels",
        "name":    "Tamper Evident Labels",
        "name_ar": "ملصقات مقاومة العبث",
        "desc": (
            "Specialised labels that provide visible evidence of tampering, "
            "ensuring product integrity throughout the supply chain. "
            "Engineered with multiple security layers – from void patterns and "
            "destructible face stocks to holographic overlaminates – these labels "
            "deliver unambiguous proof of interference at every stage of distribution."
        ),
        "desc_ar": (
            "ملصقات متخصصة توفر دليلاً مرئياً على العبث، مما يضمن سلامة المنتج "
            "في جميع أنحاء سلسلة التوريد."
        ),
        "tag":     "Security",
        "tag_ar":  "أمان",
        "image_url": "https://images.unsplash.com/photo-1776241732359-e283bf413901?q=80&w=1423&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "details": {
            "quick_specs": [
                {"label": "Tamper Methods",    "value": "VOID residue, Destructible face, Holographic, Brittle"},
                {"label": "Material",          "value": "PET, Destructible vinyl, Holographic PET, Paper"},
                {"label": "Security Level",    "value": "Level 1 (covert) to Level 3 (overt + covert)"},
                {"label": "Adhesive",          "value": "Aggressive permanent, surface-marking"},
                {"label": "Custom Options",    "value": "Logo, serial number, hologram, UV ink"},
            ],
            "features": [
                {"title": "Multi-layer security: void residue + destructible substrate + holographic overlam"},
                {"title": "Covert UV-fluorescent ink features visible only under UV light"},
                {"title": "Overt holographic elements with custom-designed secure patterns"},
                {"title": "Brittle face stock that shatters on removal – impossible to transfer intact"},
                {"title": "Sequential numbering and barcodes for audit trail documentation"},
                {"title": "Heat and cold-resistant formulations for pharmaceutical cold-chain"},
                {"title": "Tailored security levels: cosmetic, moderate, or high-security specification"},
            ],
            "specifications": [
                {"label": "Face Stock",        "value": "38–80 µm PET / destructible vinyl / holographic PET"},
                {"label": "Security Layers",   "value": "Up to 4 (face + adhesive + residue + overlaminate)"},
                {"label": "UV Ink",            "value": "Optional covert UV-reactive feature"},
                {"label": "Hologram Type",     "value": "Standard DOVIDs or custom-branded masterwork"},
                {"label": "Temp. Range",       "value": "-25 °C to +90 °C"},
                {"label": "Peel Strength",     "value": "≥ 20 N/25 mm on stainless steel"},
                {"label": "Sizes",             "value": "20×10 mm to 200×100 mm (custom available)"},
            ],
            "applications": [
                {"title": "Pharmaceutical blister packs and bottle neck seals"},
                {"title": "Food and beverage cap seals and freshness indicators"},
                {"title": "Cosmetics and luxury goods anti-counterfeiting"},
                {"title": "Electronic component and PCB board seals"},
                {"title": "Legal and government document seals"},
                {"title": "Customs and logistics carton seals"},
                {"title": "Insurance and warranty void seals for durable goods"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "طرق مقاومة العبث",  "value": "بقايا VOID، وجه قابل للتدمير، هولوغرافي، هش"},
                {"label": "المادة",            "value": "PET، فينيل قابل للتدمير، PET هولوغرافي، ورق"},
                {"label": "مستوى الأمان",      "value": "مستوى 1 (خفي) إلى مستوى 3 (ظاهر + خفي)"},
            ],
            "features": [
                {"title": "أمان متعدد الطبقات: بقايا void + ركيزة قابلة للتدمير + طلاء هولوغرافي"},
                {"title": "حبر UV-فلوري خفي مرئي فقط تحت ضوء الأشعة فوق البنفسجية"},
                {"title": "عناصر هولوغرافية ظاهرة بأنماط أمان مخصصة"},
                {"title": "ترقيم تسلسلي وباركود لتوثيق مسار التدقيق"},
            ],
            "specifications": [
                {"label": "طبقات الأمان",      "value": "حتى 4 طبقات"},
                {"label": "نطاق الحرارة",      "value": "-25 °C إلى +90 °C"},
            ],
            "applications": [
                {"title": "أختام عنق زجاجات الأدوية وألواح النفطة"},
                {"title": "أختام غطاء المنتجات الغذائية والمشروبات"},
                {"title": "مكافحة التزوير في مستحضرات التجميل والسلع الفاخرة"},
                {"title": "أختام المستندات القانونية والحكومية"},
            ],
        },
    },

    # ── 6. Custom Asset Labels ───────────────────────────────────────────────
    {
        "id":      "custom-asset-labels",
        "name":    "Custom Asset Labels",
        "name_ar": "ملصقات أصول مخصصة",
        "desc": (
            "Bespoke asset labels with custom serialisation, QR codes, logos, "
            "and materials tailored to your specific tracking requirements. "
            "From concept to delivery, our design team works with you to create "
            "a fully personalised asset labelling system that integrates seamlessly "
            "with your existing CMMS, EAM, or inventory management platforms."
        ),
        "desc_ar": (
            "ملصقات أصول مخصصة بترقيم مخصص ورموز QR وشعارات ومواد مُصمَّمة "
            "وفقًا لمتطلبات التتبع الخاصة بك."
        ),
        "tag":     None,
        "tag_ar":  None,
        "image_url": "https://m.media-amazon.com/images/S/aplus-media-library-service-media/ff628424-7e42-4659-b494-4db1f5ccb618.__CR0,0,300,300_PT0_SX300_V1___.jpg",
        "details": {
            "quick_specs": [
                {"label": "Customisation",     "value": "Logo, colour, serial, barcode, QR, UID, NFC"},
                {"label": "Material Options",  "value": "Polyester, Aluminium, Polycarbonate, Ultra-destructible"},
                {"label": "Print Technology",  "value": "Thermal transfer, Laser engraving, Digital print"},
                {"label": "Integration",       "value": "CMMS, EAM, SAP, ServiceNow, custom API"},
                {"label": "Min. Order",        "value": "100 labels (digital) / 500 (specialist materials)"},
            ],
            "features": [
                {"title": "Fully bespoke design: size, shape, colour, substrate, and finish to specification"},
                {"title": "Sequential, random, or alphanumeric serialisation with check digits"},
                {"title": "Embedded QR codes linked to your asset management database or CMMS"},
                {"title": "Optional NFC chip integration for smartphone tap-to-read asset records"},
                {"title": "Laser-engraved aluminium and polycarbonate for permanent, unalterable marking"},
                {"title": "Overlaminate options: gloss, matte, anti-scratch, chemical-resistant"},
                {"title": "Pre-populated data file provided in CSV/Excel for instant system import"},
            ],
            "specifications": [
                {"label": "Substrate Options", "value": "50 µm PET / anodised aluminium / 250 µm polycarbonate / ultra-destructible vinyl"},
                {"label": "Print Methods",     "value": "Thermal-transfer ribbon / laser engraving / UV digital"},
                {"label": "Serialisation",     "value": "Sequential, random, GS1 GIAI, custom format"},
                {"label": "Barcode Types",     "value": "Code 128, QR, DataMatrix, GS1-128, Code 39"},
                {"label": "NFC Chip",          "value": "Optional – NXP NTAG213/216 (NFC Forum Type 2/4)"},
                {"label": "Temp. Range",       "value": "-40 °C to +150 °C (material dependent)"},
                {"label": "Minimum Qty",       "value": "From 100 labels (digital short run)"},
            ],
            "applications": [
                {"title": "Corporate IT asset lifecycle management"},
                {"title": "Facilities management – furniture, fixtures, and equipment (FF&E)"},
                {"title": "Healthcare biomedical equipment maintenance tracking"},
                {"title": "Oil & gas and utilities field asset inspection labels"},
                {"title": "Education: school and university equipment inventories"},
                {"title": "Government and public sector asset registers"},
                {"title": "Rental and leasing company fleet and equipment marking"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "التخصيص",           "value": "شعار، لون، تسلسل، باركود، QR، UID، NFC"},
                {"label": "خيارات المادة",     "value": "بوليستر، ألومنيوم، بولي كربونات، قابل للتدمير الفائق"},
                {"label": "تقنية الطباعة",     "value": "نقل حراري، حفر ليزر، طباعة رقمية"},
                {"label": "التكامل",           "value": "CMMS، EAM، SAP، ServiceNow، API مخصص"},
            ],
            "features": [
                {"title": "تصميم مخصص بالكامل: الحجم والشكل واللون والركيزة والإنهاء حسب المواصفات"},
                {"title": "ترقيم تسلسلي أو عشوائي أو رقمي أبجدي مع أرقام تحقق"},
                {"title": "رموز QR مدمجة مرتبطة بقاعدة بيانات إدارة الأصول أو CMMS"},
                {"title": "تكامل شريحة NFC اختياري للوصول عبر النقر بالهاتف الذكي"},
                {"title": "ألومنيوم وبولي كربونات منقوشان بالليزر للتعليم الدائم"},
            ],
            "specifications": [
                {"label": "خيارات الركيزة",    "value": "50 µm PET / ألومنيوم مؤكسد / 250 µm بولي كربونات"},
                {"label": "أنواع الباركود",    "value": "Code 128، QR، DataMatrix، GS1-128، Code 39"},
                {"label": "الحد الأدنى للكمية","value": "من 100 ملصق (طباعة رقمية قصيرة)"},
            ],
            "applications": [
                {"title": "إدارة دورة حياة أصول تكنولوجيا المعلومات المؤسسية"},
                {"title": "إدارة المرافق – الأثاث والتجهيزات والمعدات"},
                {"title": "تتبع صيانة المعدات الطبية الحيوية"},
                {"title": "تسميات فحص الأصول الميدانية في النفط والغاز والمرافق"},
            ],
        },
    },
]


def seed():
    with engine.connect() as conn:
        # Remove existing Security Labels products only
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
                    name        = EXCLUDED.name,
                    name_ar     = EXCLUDED.name_ar,
                    "desc"      = EXCLUDED."desc",
                    desc_ar     = EXCLUDED.desc_ar,
                    category    = EXCLUDED.category,
                    category_ar = EXCLUDED.category_ar,
                    tag         = EXCLUDED.tag,
                    tag_ar      = EXCLUDED.tag_ar,
                    image_url   = EXCLUDED.image_url,
                    details     = EXCLUDED.details,
                    details_ar  = EXCLUDED.details_ar
            """)
            conn.execute(query, {
                "id":          p["id"],
                "name":        p["name"],
                "name_ar":     p["name_ar"],
                "desc":        p["desc"],
                "desc_ar":     p["desc_ar"],
                "category":    CATEGORY["slug"],
                "category_ar": CATEGORY["name_ar"],
                "tag":         p["tag"] or "",
                "tag_ar":      p["tag_ar"] or "",
                "image_url":   p["image_url"],
                "details":     json.dumps(p["details"]),
                "details_ar":  json.dumps(p["details_ar"]),
            })

        conn.commit()

    print(f"✅  Seeded {len(products)} Security Label products successfully.")
    for p in products:
        tag_str = f"  [{p['tag']}]" if p["tag"] else ""
        print(f"   • {p['id']}{tag_str}")


if __name__ == "__main__":
    seed()