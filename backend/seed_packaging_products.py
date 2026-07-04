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
# Packaging Products – 5 products
# Category slug: packaging-products
# ---------------------------------------------------------------------------

CATEGORY = {
    "slug": "packaging-products",
    "name": "Packaging Products",
    "name_ar": "منتجات التغليف",
}

CATEGORY_IMAGE = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop"

products = [

    # ── 1. Brown Tapes ───────────────────────────────────────────────────────
    {
        "id": "brown-tapes",
        "name": "Brown Tapes",
        "name_ar": "الأشرطة البنية",
        "desc": (
            "Heavy-duty brown packing tapes for carton sealing, bundling, and "
            "general packaging applications. Available in water-activated gummed "
            "paper (Kraft) and pressure-sensitive BOPP variants, offering secure "
            "carton closure with excellent adhesion to corrugated cardboard, "
            "recycled boxes, and fibreboard containers."
        ),
        "desc_ar": (
            "أشرطة تعبئة بنية شديدة التحمل لإغلاق الكرتون والتجميع وتطبيقات التغليف العامة. "
            "متوفرة بورق منشط بالماء (كرافت) وبدائل BOPP الحساسة للضغط."
        ),
        "tag": "Best Seller",
        "tag_ar": "الأكثر مبيعاً",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/brown%20tape.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Material Types", "value": "Kraft Paper (Gummed), BOPP, PVC"},
                {"label": "Width Options", "value": "36 mm, 48 mm, 72 mm, 96 mm (1.5\" – 4\")"},
                {"label": "Length Options", "value": "50 m, 100 m, 200 m, 500 m, 1000 m"},
                {"label": "Thickness", "value": "40 – 65 µm (BOPP) / 150 – 300 µm (Kraft)"},
                {"label": "Adhesive Type", "value": "Water-activated (Kraft) / Solvent/Acrylic (BOPP)"},
            ],
            "features": [
                {"title": "Water-activated kraft tape bonds permanently to cardboard for tamper-evident sealing"},
                {"title": "Reinforced fiberglass filament options for heavy cartons up to 30 kg"},
                {"title": "Eco-friendly – kraft paper tape is 100% recyclable with the carton"},
                {"title": "Silent unwind technology reduces noise in packing stations"},
                {"title": "Solvent-free acrylic adhesive BOPP for indoor application without VOCs"},
                {"title": "Printable surface available for branded packing tape with logos"},
                {"title": "Cold-weather adhesive variants for freezer and winter shipping"},
            ],
            "specifications": [
                {"label": "Backing Material", "value": "Biaxially Oriented Polypropylene (BOPP) / Kraft Paper"},
                {"label": "Adhesion to Steel", "value": "≥ 6 N/25 mm (BOPP) / ≥ 8 N/25 mm (Kraft)"},
                {"label": "Tensile Strength", "value": "≥ 80 N/25 mm (BOPP) / ≥ 120 N/25 mm (Reinforced)"},
                {"label": "Elongation at Break", "value": "120 – 180% (BOPP) / 5 – 10% (Kraft)"},
                {"label": "Temperature Range", "value": "-20°C to +60°C (BOPP) / +5°C to +50°C (Kraft)"},
                {"label": "Core Size", "value": "76 mm (3\") standard / 25 mm (1\") for hand dispensers"},
                {"label": "Certification", "value": "FSC Certified, FDA food-contact, ASTM D5486"},
            ],
            "applications": [
                {"title": "Carton and corrugated box sealing for e-commerce shipping"},
                {"title": "Warehouse packing and order fulfilment operations"},
                {"title": "Moving and storage box closure"},
                {"title": "Reinforced bundling of heavy or irregular packages"},
                {"title": "Pallet unitizing and stretch wrap reinforcement"},
                {"title": "Manufacturing line carton erecting and sealing"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أنواع المواد", "value": "ورق كرافت (منشط بالماء)، BOPP، PVC"},
                {"label": "خيارات العرض", "value": "36 ملم، 48 ملم، 72 ملم، 96 ملم"},
                {"label": "خيارات الطول", "value": "50 م، 100 م، 200 م، 500 م، 1000 م"},
                {"label": "نوع اللاصق", "value": "منشط بالماء (كرافت) / مذيب/أكريليك (BOPP)"},
            ],
            "features": [
                {"title": "شريط كرافت منشط بالماء يلتصق بشكل دائم بالكرتون لإغلاق مقاوم للعبث"},
                {"title": "خيارات ألياف زجاجية مقواة للكرتون الثقيل حتى 30 كجم"},
                {"title": "صديق للبيئة – شريط ورق الكرافت قابل لإعادة التدوير بنسبة 100% مع الكرتون"},
                {"title": "سطح قابل للطباعة لشريط تغليف يحمل علامة تجارية مع شعارات"},
            ],
            "specifications": [
                {"label": "مادة الدعامة", "value": "بولي بروبيلين ثنائي المحور / ورق كرافت"},
                {"label": "الالتصاق بالفولاذ", "value": "≥ 6 نيوتن/25 ملم (BOPP) / ≥ 8 نيوتن/25 ملم (كرافت)"},
                {"label": "قوة الشد", "value": "≥ 80 نيوتن/25 ملم (BOPP) / ≥ 120 نيوتن/25 ملم (مقوى)"},
            ],
            "applications": [
                {"title": "إغلاق الكرتون والصناديق المموجة لشحن التجارة الإلكترونية"},
                {"title": "عمليات التعبئة وتلبية الطلبات في المستودعات"},
                {"title": "توحيد المنصات وتعزيز لف التمدد"},
            ],
        },
    },

    # ── 2. Masking Tape ──────────────────────────────────────────────────────
    {
        "id":       "masking-tape",
        "name":     "Masking Tape",
        "name_ar":  "شريط الإخفاء",
        "desc":     (
            "Durable, easy-tear masking tapes suitable for painting, bundling, "
            "and general-purpose industrial or office use. Engineered with a "
            "conformable crepe backing and a clean-release adhesive system that "
            "leaves no residue on sensitive surfaces."
        ),
        "desc_ar":  (
            "أشرطة إخفاء متينة وسهلة التمزيق مناسبة للطلاء والتجميع "
            "والاستخدام الصناعي والمكتبي متعدد الأغراض."
        ),
        "tag":      None,
        "tag_ar":   None,
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/masking%20tape.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Backing",           "value": "Crepe paper, Flatback paper, Washi"},
                {"label": "Adhesive",          "value": "Natural rubber, Acrylic"},
                {"label": "Width Range",       "value": "6 mm – 100 mm"},
                {"label": "Temperature Rating","value": "Up to 120 °C (60 min dwell)"},
                {"label": "Residue",           "value": "Clean removal up to 7 days"},
            ],
            "features": [
                {"title": "Conformable crepe backing tears cleanly by hand – no tools needed"},
                {"title": "Clean-release adhesive leaves zero residue on paint, glass, and trim"},
                {"title": "Heat-resistant up to 120 °C for oven and automotive paint applications"},
                {"title": "UV-resistant variants available for outdoor masking up to 30 days"},
                {"title": "High elongation for masking curved surfaces, mouldings, and profiles"},
                {"title": "Available in general-purpose, medium, and high-temp performance grades"},
                {"title": "Custom widths and core sizes for automated dispensing equipment"},
            ],
            "specifications": [
                {"label": "Backing Type",      "value": "Crepe paper (standard) / Flatback / Washi"},
                {"label": "Adhesive Type",     "value": "Natural rubber resin / Acrylic"},
                {"label": "Thickness",         "value": "130 – 185 µm (backing + adhesive)"},
                {"label": "Tensile Strength",  "value": "≥ 50 N/25 mm"},
                {"label": "Elongation",        "value": "8 – 14 %"},
                {"label": "Temp. Resistance",  "value": "Up to 80 °C (standard) / 120 °C (high-temp)"},
                {"label": "Widths Available",  "value": "6, 9, 12, 18, 24, 36, 48, 72, 100 mm"},
            ],
            "applications": [
                {"title": "Automotive and industrial spray painting"},
                {"title": "Interior decoration and wall painting"},
                {"title": "PCB and electronics protection during soldering"},
                {"title": "Bundling, holding, and splicing in manufacturing"},
                {"title": "Office general-purpose fixing and labeling"},
                {"title": "Carpentry and woodworking surface protection"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "الدعامة",           "value": "ورق مجعد، ورق مسطح، واشي"},
                {"label": "اللاصق",            "value": "مطاط طبيعي، أكريليك"},
                {"label": "نطاق العرض",        "value": "6 ملم – 100 ملم"},
                {"label": "درجة الحرارة",      "value": "حتى 120 درجة مئوية"},
            ],
            "features": [
                {"title": "دعامة ورق مجعد تتمزق بيسر باليد دون أدوات"},
                {"title": "لاصق نظيف الإزالة لا يترك أثراً على الطلاء والزجاج"},
                {"title": "مقاوم للحرارة حتى 120 درجة مئوية لتطبيقات طلاء السيارات"},
                {"title": "خيارات مقاومة للأشعة فوق البنفسجية للإخفاء الخارجي"},
            ],
            "applications": [
                {"title": "طلاء بالرش للسيارات والصناعة"},
                {"title": "الديكور الداخلي وطلاء الجدران"},
                {"title": "حماية ألواح الدوائر الإلكترونية أثناء اللحام"},
                {"title": "التجميع والتثبيت في التصنيع"},
            ],
        },
    },

    # ── 3. Clear Tapes ──────────────────────────────────────────────────────
    {
        "id": "clear-tapes",
        "name": "Clear Tapes",
        "name_ar": "الأشرطة الشفافة",
        "desc": (
            "Premium transparent packing tapes that provide invisible carton "
            "closure without obscuring box graphics, barcodes, or shipping labels. "
            "Engineered with high-clarity BOPP film and ultra-clear acrylic or "
            "hot-melt adhesives for a professional, nearly invisible finish "
            "suitable for retail-ready and branded packaging."
        ),
        "desc_ar": (
            "أشرطة تغليف شفافة فاخرة توفر إغلاقاً غير مرئي للكرتون دون حجب رسومات الصندوق "
            "أو الباركود أو ملصقات الشحن."
        ),
        "tag": "Trending",
        "tag_ar": "رائج",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/clear%20tape.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Film Material", "value": "High-Clarity BOPP, PVC, PLA (bio-based)"},
                {"label": "Width Options", "value": "36 mm, 48 mm, 72 mm, 96 mm"},
                {"label": "Adhesive Type", "value": "Acrylic (UV-resistant), Hot-Melt, Solvent"},
                {"label": "Clarity Rating", "value": "≥ 92% light transmission (BOPP)"},
                {"label": "Length Options", "value": "50 m, 100 m, 200 m, 500 m"},
            ],
            "features": [
                {"title": "Optically clear film with 92%+ light transmission for invisible box sealing"},
                {"title": "UV-resistant acrylic adhesive prevents yellowing on long-term storage"},
                {"title": "Non-yellowing formula maintains clarity for years on retail shelves"},
                {"title": "Low-noise unwind for quiet packing station operation"},
                {"title": "Static-reduced treatment prevents cling during high-speed dispensing"},
                {"title": "Solvent-free acrylic options for food-contact packaging"},
                {"title": "Printable surface for discreet brand messaging or security patterns"},
            ],
            "specifications": [
                {"label": "Film Thickness", "value": "35 – 65 µm (2.0 – 3.0 mil)"},
                {"label": "Adhesion to Steel", "value": "≥ 5 N/25 mm (acrylic) / ≥ 7 N/25 mm (hot-melt)"},
                {"label": "Tensile Strength", "value": "≥ 70 N/25 mm"},
                {"label": "Elongation", "value": "100 – 160%"},
                {"label": "Temperature Range", "value": "-15°C to +65°C"},
                {"label": "UV Resistance", "value": "1,000+ hours QUV (no yellowing)"},
                {"label": "Certification", "value": "FDA 21 CFR 177.1520, RoHS, REACH"},
            ],
            "applications": [
                {"title": "Retail-ready packaging where graphics must remain visible"},
                {"title": "E-commerce 'ship-in-own-box' without obscuring branding"},
                {"title": "Food and beverage case sealing with visible product imagery"},
                {"title": "Pharmaceutical and cosmetic secondary packaging"},
                {"title": "Gift wrapping and premium product presentation"},
                {"title": "Window carton and clear plastic box sealing"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "مادة الفيلم", "value": "BOPP عالي الوضوح، PVC، PLA (قائم على المواد الحيوية)"},
                {"label": "خيارات العرض", "value": "36 ملم، 48 ملم، 72 ملم، 96 ملم"},
                {"label": "نوع اللاصق", "value": "أكريليك (مقاوم للأشعة فوق البنفسجية)، مصهور بالحرارة، مذيب"},
                {"label": "تصنيف الوضوح", "value": "≥ 92% لنفاذية الضوء"},
            ],
            "features": [
                {"title": "فيلم شفاف بصرياً مع نفاذية ضوء 92%+ لإغلاق صندوق غير مرئي"},
                {"title": "لاصق أكريليك مقاوم للأشعة فوق البنفسجية يمنع الاصفرار عند التخزين طويل المدى"},
                {"title": "صيغة غير مصفرة تحافظ على الوضوح لسنوات على أرفف البيع بالتجزئة"},
                {"title": "سطح قابل للطباعة لرسائل العلامة التجارية أو أنماط الأمان"},
            ],
            "specifications": [
                {"label": "سمك الفيلم", "value": "35 – 65 ميكرومتر"},
                {"label": "الالتصاق بالفولاذ", "value": "≥ 5 نيوتن/25 ملم (أكريليك) / ≥ 7 نيوتن/25 ملم (مصهور بالحرارة)"},
                {"label": "قوة الشد", "value": "≥ 70 نيوتن/25 ملم"},
                {"label": "مقاومة الأشعة فوق البنفسجية", "value": "1000+ ساعة QUV (بدون اصفرار)"},
            ],
            "applications": [
                {"title": "تغليف جاهز للبيع بالتجزئة حيث يجب أن تبقى الرسومات مرئية"},
                {"title": "شحن التجارة الإلكترونية في الصندوق الخاص دون حجب العلامة التجارية"},
                {"title": "إغلاق علب المواد الغذائية والمشروبات بصور المنتج المرئية"},
            ],
        },
    },

    # ── 4. Printed Tapes ────────────────────────────────────────────────────
    {
        "id": "printed-tapes",
        "name": "Printed Tapes",
        "name_ar": "الأشرطة المطبوعة",
        "desc": (
            "Custom-branded packing tape that turns every carton into a "
            "mobile billboard for your brand. Available in flexographic and "
            "digital printing with up to 6 colours, featuring logos, safety "
            "messages, barcodes, or handling instructions. Premium adhesion "
            "to all box types without smudging or delamination."
        ),
        "desc_ar": (
            "شريط تغليف يحمل علامة تجارية مخصصة يحول كل كرتون إلى لوحة إعلانات متنقلة لعلامتك التجارية. "
            "متوفر بالطباعة الفلكسوغرافية والرقمية بما يصل إلى 6 ألوان."
        ),
        "tag": None,
        "tag_ar": None,
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/printed%20tape.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Print Technology", "value": "Flexographic (up to 6 colours), Digital (4 colours)"},
                {"label": "Tape Materials", "value": "BOPP (clear/brown/white), Kraft Paper"},
                {"label": "Print Width", "value": "36 mm to 200 mm"},
                {"label": "Repeat Length", "value": "50 mm to 500 mm (custom pattern)"},
                {"label": "Minimum Order", "value": "500 rolls (digital) / 5,000 rolls (flexo)"},
            ],
            "features": [
                {"title": "Full-colour custom printing with PMS colour matching for brand accuracy"},
                {"title": "Anti-smudge overprint varnish protects graphics during shipping"},
                {"title": "Sequential barcodes or QR codes for track-and-trace applications"},
                {"title": "Tear-resistant BOPP or eco-friendly kraft paper substrates"},
                {"title": "Safety message printing – 'FRAGILE', 'THIS WAY UP', 'KEEP DRY'"},
                {"title": "Low minimum quantities available via digital print-on-demand"},
                {"title": "Security printed tapes with void patterns for tamper evidence"},
            ],
            "specifications": [
                {"label": "Print Resolution", "value": "175 lpi (flexo) / 1200 dpi (digital)"},
                {"label": "Colour Options", "value": "Up to 6 colours + white + spot varnish"},
                {"label": "Ink Type", "value": "Water-based, UV-cured, Solvent-based"},
                {"label": "Adhesive", "value": "Acrylic (clear) or Hot-Melt (brown/white)"},
                {"label": "Film Thickness", "value": "45 – 60 µm"},
                {"label": "Roll Length", "value": "50 m, 100 m, 200 m, 500 m"},
                {"label": "Certification", "value": "FSC, FDA food-contact (direct and indirect)"},
            ],
            "applications": [
                {"title": "Branded e-commerce shipping – turns boxes into marketing"},
                {"title": "Warehouse safety and handling instruction tapes"},
                {"title": "Promotional and seasonal packaging campaigns"},
                {"title": "Fragile and hazardous goods warning labeling"},
                {"title": "Luxury and premium product unboxing experience"},
                {"title": "Retail store box branding and gift packaging"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "تقنية الطباعة", "value": "فلكسوغرافية (حتى 6 ألوان)، رقمية (4 ألوان)"},
                {"label": "مواد الشريط", "value": "BOPP (شفاف/بني/أبيض)، ورق كرافت"},
                {"label": "عرض الطباعة", "value": "36 ملم إلى 200 ملم"},
                {"label": "الحد الأدنى للطلب", "value": "500 لفة (رقمي) / 5,000 لفة (فلكسو)"},
            ],
            "features": [
                {"title": "طباعة مخصصة بألوان كاملة مع مطابقة ألوان PMS لدقة العلامة التجارية"},
                {"title": "ورنيش علوي مضاد للتلطخ يحمي الرسومات أثناء الشحن"},
                {"title": "رموز باركود تسلسلية أو رموز QR لتطبيقات التتبع"},
                {"title": "أشرطة مطبوعة أمنية بأنماط باطلة لدليل العبث"},
            ],
            "specifications": [
                {"label": "دقة الطباعة", "value": "175 خط/بوصة (فلكسو) / 1200 نقطة/بوصة (رقمي)"},
                {"label": "خيارات الألوان", "value": "حتى 6 ألوان + أبيض + ورنيش موضعي"},
                {"label": "نوع الحبر", "value": "قائم على الماء، معالج بالأشعة فوق البنفسجية، قائم على المذيب"},
            ],
            "applications": [
                {"title": "شحن التجارة الإلكترونية ذو العلامة التجارية – يحول الصناديق إلى تسويق"},
                {"title": "أشرطة تعليمات السلامة والمناولة في المستودعات"},
                {"title": "تحذيرات وضع العلامات على البضائع الهشة والخطرة"},
            ],
        },
    },

    # ── 5. Bubble Wrap ──────────────────────────────────────────────────────
    {
        "id": "bubble-wrap",
        "name": "Bubble Wrap",
        "name_ar": "غلاف الفقاعات",
        "desc": (
            "Premium cushioning bubble wrap for protecting fragile items during "
            "shipping, storage, and handling. Available in multiple bubble sizes, "
            "film thicknesses, and anti-static or biodegradable variants. "
            "Engineered to absorb shock and vibration, reducing damage rates "
            "for electronics, glassware, ceramics, and other delicate products."
        ),
        "desc_ar": (
            "غلاف فقاعات فاخر لحماية العناصر الهشة أثناء الشحن والتخزين والمناولة. "
            "متوفر بأحجام فقاعات متعددة وسماكات أفلام ومتغيرات مضادة للكهرباء الساكنة أو قابلة للتحلل."
        ),
        "tag": "Essential",
        "tag_ar": "أساسي",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/bubble%20wrap.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Bubble Sizes", "value": "Small (3/16\"), Medium (5/16\"), Large (1/2\"), Jumbo (1\")"},
                {"label": "Film Thickness", "value": "30 – 120 µm (single / double / triple layer)"},
                {"label": "Width Options", "value": "300 mm to 1500 mm (12\" – 60\")"},
                {"label": "Roll Length", "value": "10 m to 200 m"},
                {"label": "Material", "value": "LDPE, LLDPE, Biodegradable, Anti-Static"},
            ],
            "features": [
                {"title": "Air cushion technology absorbs up to 80% of impact shock"},
                {"title": "Multiple bubble sizes for different weight and fragility requirements"},
                {"title": "Anti-static grade available for electronics and PCB protection"},
                {"title": "Biodegradable and recycled-content options for sustainable packaging"},
                {"title": "Perforated every 30 cm for easy tear-by-hand without tools"},
                {"title": "Double-layer (bubble-on-bubble) for extra heavy-duty protection"},
                {"title": "Flat lay-flat film with consistent bubble inflation across entire roll"},
            ],
            "specifications": [
                {"label": "Material", "value": "Low-Density Polyethylene (LDPE) / LLDPE Blend"},
                {"label": "Bubble Height", "value": "3 mm to 25 mm (depending on bubble size)"},
                {"label": "Tear Resistance", "value": "≥ 20 N (MD) / ≥ 15 N (TD)"},
                {"label": "Puncture Resistance", "value": "≥ 5 N (ASTM D1709)"},
                {"label": "Static Decay", "value": "< 0.01 seconds (anti-static grade)"},
                {"label": "Temperature Range", "value": "-20°C to +60°C"},
                {"label": "Recyclability", "value": "100% recyclable (LDPE #4)"},
            ],
            "applications": [
                {"title": "Electronics and computer component packaging"},
                {"title": "Glassware, ceramics, and artisanal product shipping"},
                {"title": "Furniture corner and edge protection during moving"},
                {"title": "Automotive parts and precision machinery shipping"},
                {"title": "Pharmaceutical and medical device cushioning"},
                {"title": "E-commerce void fill and void fill replacement"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أحجام الفقاعات", "value": "صغير (3/16 بوصة)، متوسط (5/16 بوصة)، كبير (1/2 بوصة)، عملاق (1 بوصة)"},
                {"label": "سمك الفيلم", "value": "30 – 120 ميكرومتر (طبقة واحدة / مزدوجة / ثلاثية)"},
                {"label": "عرض الخيارات", "value": "300 ملم إلى 1500 ملم"},
                {"label": "المادة", "value": "LDPE، LLDPE، قابل للتحلل، مضاد للكهرباء الساكنة"},
            ],
            "features": [
                {"title": "تقنية الوسادة الهوائية تمتص ما يصل إلى 80% من صدمات الاصطدام"},
                {"title": "درجة مضادة للكهرباء الساكنة متاحة للإلكترونيات وحماية لوحات الدوائر المطبوعة"},
                {"title": "خيارات قابلة للتحلل ومحتوى معاد تدويره للتغليف المستدام"},
                {"title": "طبقة مزدوجة (فقاعة فوق فقاعة) لحماية إضافية فائقة التحمل"},
            ],
            "specifications": [
                {"label": "المادة", "value": "بولي إيثيلين منخفض الكثافة / مزيج LLDPE"},
                {"label": "ارتفاع الفقاعة", "value": "3 ملم إلى 25 ملم"},
                {"label": "مقاومة الثقب", "value": "≥ 5 نيوتن"},
                {"label": "قابلية إعادة التدوير", "value": "قابلة لإعادة التدوير بنسبة 100% (LDPE #4)"},
            ],
            "applications": [
                {"title": "تغليف الإلكترونيات ومكونات الكمبيوتر"},
                {"title": "شحن الزجاجيات والسيراميك والمنتجات الحرفية"},
                {"title": "حماية زوايا وحواف الأثاث أثناء النقل"},
            ],
        },
    },

    # ── 6. Stretch Films ────────────────────────────────────────────────────
    {
        "id": "stretch-films",
        "name": "Stretch Films",
        "name_ar": "أفلام التمدد",
        "desc": (
            "High-performance hand and machine stretch wrap films for pallet "
            "unitizing, load containment, and warehouse protection. Engineered "
            "with advanced pre-stretch technology that reduces material usage "
            "by up to 50% while providing superior load stability, puncture "
            "resistance, and cling performance across all pallet types."
        ),
        "desc_ar": (
            "أفلام لف تمدد عالية الأداء يدوية وآلية لتوحيد المنصات واحتواء الأحمال وحماية المستودعات. "
            "مصممة بتقنية تمدد مسبق متقدمة تقلل استخدام المواد بنسبة تصل إلى 50%."
        ),
        "tag": "High Volume",
        "tag_ar": "حجم كبير",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/stretch%20film.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Film Grades", "value": "Hand Grade, Machine Grade, Ultra Pre-Stretch"},
                {"label": "Thickness", "value": "12 µm to 35 µm (0.5 – 1.4 mil)"},
                {"label": "Film Width", "value": "250 mm to 1500 mm (10\" – 60\")"},
                {"label": "Roll Length", "value": "100 m to 3,000 m"},
                {"label": "Core Size", "value": "50 mm (2\") or 76 mm (3\")"},
            ],
            "features": [
                {"title": "Advanced pre-stretch technology – up to 300% elongation for material savings"},
                {"title": "High cling performance – superior load stability without adhesive transfer"},
                {"title": "Puncture and tear-resistant films for sharp-cornered or irregular loads"},
                {"title": "UV-treated films for outdoor pallet storage (up to 12 months)"},
                {"title": "Colour-coded films for inventory management (clear, black, blue, green, red)"},
                {"title": "Vented films for produce and cold-chain airflow requirements"},
                {"title": "Pre-stretched hand wrap reduces operator fatigue and improves efficiency"},
            ],
            "specifications": [
                {"label": "Material", "value": "Linear Low-Density Polyethylene (LLDPE)"},
                {"label": "Tensile Strength", "value": "≥ 25 MPa (MD) / ≥ 20 MPa (TD)"},
                {"label": "Elongation at Break", "value": "400 – 600% (MD) / 700 – 900% (TD)"},
                {"label": "Puncture Resistance", "value": "≥ 50 N"},
                {"label": "Cling Force", "value": "≥ 150 g/25 mm (inside cling)"},
                {"label": "Haze Rating", "value": "< 15% (clear film)"},
                {"label": "Certification", "value": "FDA food-contact, Recyclable #4, BPA-free"},
            ],
            "applications": [
                {"title": "Pallet wrapping for warehouse and distribution centers"},
                {"title": "Load containment for cross-docking and LTL shipping"},
                {"title": "Automated pallet wrapping systems (turntable and rotary arm)"},
                {"title": "Outdoor storage and yard protection (UV-stabilized)"},
                {"title": "Produce and cold-chain pallet stabilization (vented films)"},
                {"title": "Manufacturing work-in-progress pallet consolidation"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "درجات الفيلم", "value": "يدوي، آلي، تمدد مسبق فائق"},
                {"label": "السماكة", "value": "12 ميكرومتر إلى 35 ميكرومتر"},
                {"label": "عرض الفيلم", "value": "250 ملم إلى 1500 ملم"},
                {"label": "طول اللفة", "value": "100 م إلى 3,000 م"},
            ],
            "features": [
                {"title": "تقنية تمدد مسبق متقدمة – استطالة تصل إلى 300% لتوفير المواد"},
                {"title": "أداء التصاق عالٍ – ثبات حمولة فائق دون انتقال اللاصق"},
                {"title": "أفلام معالجة بالأشعة فوق البنفسجية للتخزين الخارجي للمنصات (حتى 12 شهراً)"},
                {"title": "أفلام ملونة لرمزية اللون لإدارة المخزون (شفاف، أسود، أزرق، أخضر، أحمر)"},
            ],
            "specifications": [
                {"label": "المادة", "value": "بولي إيثيلين خطي منخفض الكثافة"},
                {"label": "قوة الشد", "value": "≥ 25 ميجاباسكال (اتجاه الآلة) / ≥ 20 ميجاباسكال (الاتجاه العرضي)"},
                {"label": "الاستطالة عند الكسر", "value": "400 – 600% (اتجاه الآلة) / 700 – 900% (الاتجاه العرضي)"},
                {"label": "قوة مقاومة الثقب", "value": "≥ 50 نيوتن"},
            ],
            "applications": [
                {"title": "لف المنصات للمستودعات ومراكز التوزيع"},
                {"title": "احتواء الأحمال للشحن عبر الرصيف والشحن الأقل من حمولة الشاحنة"},
                {"title": "أنظمة لف المنصات الآلية (طاولة دوارة وذراع دوار)"},
            ],
        },
    },

    # ── 7. Pallet Bands ─────────────────────────────────────────────────────
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
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/pallet_bands.jpeg",
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
        # Remove existing Packaging Products products only
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

    print(f"✅ Seeded {len(products)} Packaging Product products successfully.")
    for p in products:
        tag_str = f"  [{p['tag']}]" if p["tag"] else ""
        print(f"   • {p['id']}{tag_str}")


if __name__ == "__main__":
    seed()