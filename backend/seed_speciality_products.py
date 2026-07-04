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
# Speciality Labels – 8 products
# Category slug: speciality-labels
# ---------------------------------------------------------------------------

CATEGORY = {
    "slug": "speciality-labels",
    "name": "Speciality Labels",
    "name_ar": "ملصقات متخصصة",
}

CATEGORY_IMAGE = "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop"

products = [

    # ── 1. Rack Labels ──────────────────────────────────────────────────────
    {
        "id": "rack-labels",
        "name": "Rack Labels",
        "name_ar": "ملصقات الرفوف",
        "desc": (
            "High-visibility warehouse rack labels designed for easy scanning from "
            "floor level to top-tier pallet positions. Engineered with retro-reflective "
            "or high-contrast matte finishes that perform flawlessly in low-light "
            "warehouse conditions and automated storage environments."
        ),
        "desc_ar": (
            "ملصقات رفوف مستودعات عالية الوضوح مصممة للمسح السهل من مستوى الأرضية "
            "إلى مواقع المنصات العلوية."
        ),
        "tag": "High Volume",
        "tag_ar": "حجم كبير",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/Rack%20labels.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Material Options", "value": "Polyester (PET), Vinyl, Reflective Film"},
                {"label": "Finish Options", "value": "Matte, Gloss, Retro-Reflective"},
                {"label": "Size Range", "value": "50×50 mm to 300×200 mm"},
                {"label": "Read Distance", "value": "Up to 15 meters with industrial scanners"},
                {"label": "Adhesive", "value": "High-Tack Permanent (Low-Temp optional)"},
            ],
            "features": [
                {"title": "Retro-reflective finish for long-range scanning up to 15 meters"},
                {"title": "High-contrast black-on-white for optimal barcode readability"},
                {"title": "Cold-storage grade adhesive available for freezer environments (-40°C)"},
                {"title": "Resists dust, dirt, and forklift abrasion in busy warehouses"},
                {"title": "Pre-printed with location codes or blank for on-site printing"},
                {"title": "Magnetic backing option for frequent rack reconfiguration"},
                {"title": "Color-coded zone identification strips available"},
            ],
            "specifications": [
                {"label": "Material", "value": "50 µm white polyester (PET)"},
                {"label": "Reflective Grade", "value": "Class 1 or Class 2 Engineer Grade"},
                {"label": "Adhesion", "value": "≥ 28 N/25 mm on powder-coated steel"},
                {"label": "Operating Temp", "value": "-40°C to +110°C"},
                {"label": "Print Method", "value": "Thermal Transfer (Resin)"},
                {"label": "Barcode Standards", "value": "Code 128, GS1-128, DataMatrix"},
            ],
            "applications": [
                {"title": "Pallet rack beam and upright labeling"},
                {"title": "Drive-in and push-back rack systems"},
                {"title": "Cantilever rack for long goods storage"},
                {"title": "Automated Storage and Retrieval Systems (AS/RS)"},
                {"title": "Mezzanine and shelving location marking"},
                {"title": "Cross-docking and staging area identification"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "خيارات المادة", "value": "بوليستر، فينيل، فيلم عاكس"},
                {"label": "خيارات الإنهاء", "value": "مطفأ، لامع، عاكس"},
                {"label": "مدى القراءة", "value": "حتى 15 متراً مع الماسحات الصناعية"},
            ],
            "features": [
                {"title": "إنهاء عاكس للمسح بعيد المدى حتى 15 متراً"},
                {"title": "تباين عالٍ أسود على أبيض لقراءة باركود مثالية"},
                {"title": "لاصق مقاوم للتجميد متاح لبيئات التجميد (-40 درجة مئوية)"},
            ],
            "applications": [
                {"title": "وسم عوارض وأعمدة رفوف المنصات"},
                {"title": "أنظمة الرفوف الدافعة والخلفية"},
                {"title": "أنظمة التخزين والاسترجاع الآلية (AS/RS)"},
            ],
        },
    },

    # ── 2. Location Labels ───────────────────────────────────────────────────
    {
        "id": "location-labels",
        "name": "Location Labels",
        "name_ar": "ملصقات المواقع",
        "desc": (
            "Versatile floor, aisle, and bin location labeling system for lean "
            "warehousing and 5S visual management. High-traction overlaminate "
            "protects against foot and forklift traffic, while bold graphics "
            "enable instant location identification at a glance."
        ),
        "desc_ar": (
            "نظام وسم مواقع متعدد الاستخدامات للأرضيات والممرات والحاويات "
            "للتخزين الهزيل والإدارة البصرية 5S."
        ),
        "tag": None,
        "tag_ar": None,
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/location%20labels.jpg",
        "details": {
            "quick_specs": [
                {"label": "Material", "value": "Floor-grade Vinyl, Polyester, Anti-Slip Laminate"},
                {"label": "Adhesive", "value": "Ultra High-Tack, Floor-grade"},
                {"label": "Abrasion Rating", "value": "≥ 500,000 scuffs (Taber test)"},
                {"label": "Size Options", "value": "50×50 mm to 300×600 mm"},
                {"label": "Finish", "value": "Gloss Laminate, Anti-Slip Textured"},
            ],
            "features": [
                {"title": "Heavy-duty floor-grade vinyl with non-slip textured surface"},
                {"title": "Chemical-resistant overlaminate for industrial cleaning agents"},
                {"title": "Available in standard 5S colors: red, yellow, blue, green, white"},
                {"title": "Ultra high-tack adhesive bonds to concrete, epoxy, and tile floors"},
                {"title": "Pre-printed with zone numbers, arrows, or custom facility codes"},
                {"title": "Easy-apply hinged design for large floor decals without bubbles"},
                {"title": "Glow-in-the-dark variants for emergency egress marking"},
            ],
            "specifications": [
                {"label": "Total Thickness", "value": "200 – 500 µm (including laminate)"},
                {"label": "Adhesion", "value": "≥ 35 N/25 mm on concrete"},
                {"label": "Temperature Range", "value": "-30°C to +80°C"},
                {"label": "Slip Resistance", "value": "ASTM D2047 – >0.6 COF"},
                {"label": "UV Resistance", "value": "2+ years outdoor"},
                {"label": "Certification", "value": "UL 410 (slip resistance)"},
            ],
            "applications": [
                {"title": "Warehouse aisle and zone identification"},
                {"title": "Floor marking for pedestrian walkways and forklift routes"},
                {"title": "Bin, shelf, and drawer location labeling"},
                {"title": "5S visual management and lean manufacturing systems"},
                {"title": "Emergency equipment and fire extinguisher location markers"},
                {"title": "Parking lot and facility directional signage"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "المادة", "value": "فينيل للأرضيات، بوليستر، صفيحة مضادة للانزلاق"},
                {"label": "اللاصق", "value": "فائق الالتصاق، درجة أرضيات"},
                {"label": "مقاومة الاحتكاك", "value": "≥ 500,000 احتكاك"},
            ],
            "features": [
                {"title": "فينيل ثقيل للأرضيات بسطح محكم غير قابل للانزلاق"},
                {"title": "صفيحة علوية مقاومة للمواد الكيميائية لعوامل التنظيف الصناعية"},
                {"title": "لاصق فائق الالتصاق يلتصق بالأرضيات الخرسانية والإيبوكسية"},
            ],
            "applications": [
                {"title": "تحديد ممرات ومناطق المستودعات"},
                {"title": "علامات أرضية لممرات المشاة ومسارات الرافعات الشوكية"},
                {"title": "أنظمة الإدارة البصرية 5S"},
            ],
        },
    },

    # ── 3. Variable Print Solutions ──────────────────────────────────────────
    {
        "id": "variable-print-solutions",
        "name": "Variable Print Solutions",
        "name_ar": "حلول الطباعة المتغيرة",
        "desc": (
            "On-demand variable data printing for serial numbers, QR codes, "
            "batch numbers, and unique identifiers. Perfect for traceability, "
            "anti-counterfeiting, and personalized product applications with "
            "high-speed digital press technology and guaranteed print quality."
        ),
        "desc_ar": (
            "طباعة بيانات متغيرة حسب الطلب للأرقام التسلسلية ورموز QR وأرقام الدفعات "
            "والمعرفات الفريدة. مثالية لتطبيقات التتبع ومكافحة التزييف."
        ),
        "tag": "Trending",
        "tag_ar": "رائج",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/variable-print-solutions.jpg",
        "details": {
            "quick_specs": [
                {"label": "Variable Data Types", "value": "Serial #, Batch #, QR, DataMatrix, Date/Lot Codes"},
                {"label": "Print Technology", "value": "Digital, Thermal Transfer, Inkjet"},
                {"label": "Resolution", "value": "Up to 1200 dpi"},
                {"label": "Min Order", "value": "100 labels (digital) – No setup fee"},
                {"label": "Turnaround", "value": "1 – 3 business days"},
            ],
            "features": [
                {"title": "Sequential numbering from 1 to 1,000,000+ with leading zero formatting"},
                {"title": "Dynamic QR and DataMatrix codes with URL or batch data embedding"},
                {"title": "High-speed variable printing at up to 50 meters per minute"},
                {"title": "Integration with MES, WMS, and ERP systems for automated workflows"},
                {"title": "UV-curable inks for scratch and chemical resistance"},
                {"title": "Anti-counterfeiting features: microtext, hidden marks, color-shift"},
                {"title": "Barcode verification to ISO 15416 Grade A standards"},
            ],
            "specifications": [
                {"label": "Print Width", "value": "20 – 210 mm"},
                {"label": "Label Size", "value": "15×15 mm to 200×300 mm"},
                {"label": "Substrates", "value": "Paper, PET, PP, Vinyl, Synthetic"},
                {"label": "Variable Speed", "value": "Up to 60,000 labels per hour"},
                {"label": "Print Resolution", "value": "300 / 600 / 1200 dpi"},
                {"label": "Data Formats", "value": "CSV, TXT, XLS, JSON, API integration"},
                {"label": "Verification", "value": "ISO/IEC 15416 (1D) / ISO 15415 (2D) Grade A"},
            ],
            "applications": [
                {"title": "Product serialization for warranty registration"},
                {"title": "Pharmaceutical track-and-trace (serialization)"},
                {"title": "E-commerce personalization (customer name, order number)"},
                {"title": "Supply chain traceability from manufacturer to retailer"},
                {"title": "Event ticketing and access control wristbands"},
                {"title": "Marketing campaigns with unique QR codes per label"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أنواع البيانات المتغيرة", "value": "رقم تسلسلي، رقم دفعة، QR، رمز تاريخ"},
                {"label": "تقنية الطباعة", "value": "رقمي، نقل حراري، نفث حبر"},
                {"label": "الدقة", "value": "حتى 1200 نقطة في البوصة"},
            ],
            "features": [
                {"title": "ترقيم تسلسلي من 1 إلى 1,000,000+ مع تنسيق أصفار بادئة"},
                {"title": "رموز QR وDataMatrix ديناميكية مع تضمين URL أو بيانات الدفعة"},
                {"title": "ميزات مكافحة التزييف: نصوص دقيقة، علامات مخفية"},
            ],
            "applications": [
                {"title": "تسلسل المنتجات لتسجيل الضمان"},
                {"title": "تتبع الأدوية (الترقيم التسلسلي)"},
                {"title": "تخصيص التجارة الإلكترونية (اسم العميل، رقم الطلب)"},
            ],
        },
    },

    # ── 4. Warehouse Solutions ───────────────────────────────────────────────
    {
        "id": "warehouse-solutions",
        "name": "Warehouse Solutions",
        "name_ar": "حلول المستودعات",
        "desc": (
            "Comprehensive warehouse labeling and identification solutions designed "
            "to optimize inventory management, streamline picking operations, and "
            "maximize storage efficiency. From rack and location labels to floor "
            "markings and dock management, our industrial-grade products ensure "
            "clear, durable identification throughout your facility."
        ),
        "desc_ar": (
            "حلول شاملة لوسم وتعريف المستودعات مصممة لتحسين إدارة المخزون "
            "وتبسيط عمليات الانتقاء وزيادة كفاءة التخزين."
        ),
        "tag": None,
        "tag_ar": None,
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/warehouse-solutions.jpg",
        "details": {
            "quick_specs": [
                {"label": "Label Types", "value": "Rack, Location, Floor, Dock, Aisle, Bay, Shelf"},
                {"label": "Material Options", "value": "Polyester, Polypropylene, Vinyl, Reflective, Magnetic"},
                {"label": "Durability", "value": "Indoor 10+ years / Outdoor 5+ years"},
                {"label": "Adhesive", "value": "Permanent, High-tack, Removable, Magnetic"},
                {"label": "Compliance", "value": "OSHA, ANSI, ISO, GS1-compatible"},
            ],
            "features": [
                {"title": "Complete warehouse identification system: rack, location, aisle, bay, shelf, and floor labels"},
                {"title": "Industrial-grade polyester and polypropylene materials for long-term durability"},
                {"title": "Reflective and high-visibility options for low-light warehouse environments"},
                {"title": "Magnetic labels for flexible, repositionable rack and shelf identification"},
                {"title": "Compatible with WMS, ERP, and inventory management software systems"},
                {"title": "Pre-printed barcodes, QR codes, and sequential numbering available"},
                {"title": "Chemical, moisture, and abrasion-resistant for harsh warehouse conditions"},
            ],
            "specifications": [
                {"label": "Label Sizes", "value": "25×50 mm to 300×400 mm (custom sizes available)"},
                {"label": "Material Thickness", "value": "80 – 300 µm"},
                {"label": "Temperature Range", "value": "-40°C to +120°C"},
                {"label": "Adhesive Type", "value": "Permanent acrylic, Removable, High-tack rubber"},
                {"label": "Print Method", "value": "Thermal Transfer, UV Digital, Screen Printing"},
                {"label": "Barcode Types", "value": "Code 128, Code 39, QR, DataMatrix, GS1-128"},
                {"label": "Standards", "value": "ANSI MH10.8.1, GS1 General Specifications"},
            ],
            "applications": [
                {"title": "Pallet rack and shelving identification for efficient picking and putaway"},
                {"title": "Floor marking and aisle signage for safety and navigation"},
                {"title": "Dock door and bay identification for receiving and shipping operations"},
                {"title": "Cold storage and freezer warehouse labeling systems"},
                {"title": "Cross-docking and staging area management"},
                {"title": "Automated storage and retrieval system (AS/RS) integration"},
                {"title": "Inventory cycle counting and stock-take optimization"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أنواع الملصقات", "value": "رفوف، مواقع، أرضيات، منصات، ممرات، خليج، أرفف"},
                {"label": "خيارات المادة", "value": "بوليستر، بولي بروبيلين، فينيل، عاكس، مغناطيسي"},
                {"label": "المتانة", "value": "داخلي 10+ سنوات / خارجي 5+ سنوات"},
            ],
            "features": [
                {"title": "نظام تعريف كامل للمستودعات: ملصقات الرفوف والمواقع والممرات والأرضيات"},
                {"title": "مواد بوليستر وبولي بروبيلين صناعية لمتانة طويلة الأمد"},
                {"title": "خيارات عاكسة وعالية الرؤية لبيئات المستودعات منخفضة الإضاءة"},
                {"title": "ملصقات مغناطيسية لتعريف مرن وقابل لإعادة الوضع على الرفوف والأرفف"},
            ],
            "specifications": [
                {"label": "نطاق الحرارة", "value": "-40°C إلى +120°C"},
                {"label": "أنواع الباركود", "value": "Code 128، Code 39، QR، DataMatrix، GS1-128"},
            ],
            "applications": [
                {"title": "تعريف رفوف البالتات والأرفف للانتقاء والتخزين الفعال"},
                {"title": "علامات الأرضيات ولافتات الممرات للسلامة والملاحة"},
                {"title": "تعريف أبواب المنصات ومناطق الاستلام والشحن"},
                {"title": "أنظمة وسم مستودعات التخزين البارد والمجمدات"},
            ],
        },
    },


    # ── 5. POS Rolls ─────────────────────────────────────────────────────────
    {
        "id": "pos-rolls",
        "name": "POS Rolls",
        "name_ar": "لفائف نقاط البيع",
        "desc": (
            "High-performance receipt and label rolls for Point-of-Sale systems, "
            "kitchen printers, and ticket dispensing. Engineered for jam-free "
            "operation with premium thermal paper or direct thermal labels "
            "optimized for all major POS printer brands."
        ),
        "desc_ar": (
            "لفائف إيصالات وملصقات عالية الأداء لأنظمة نقاط البيع وطابعات المطابخ "
            "وموزعي التذاكر. مصممة لتشغيل خالٍ من الانحشار."
        ),
        "tag": "High Volume",
        "tag_ar": "حجم كبير",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/POS%20thermal%20rolls.jpg",
        "details": {
            "quick_specs": [
                {"label": "Paper Types", "value": "Thermal Paper, Bond Paper, Direct Thermal Labels"},
                {"label": "Core Sizes", "value": "12 mm, 25 mm, 38 mm, 76 mm"},
                {"label": "Roll Widths", "value": "40 mm to 210 mm (1.6\" to 8.3\")"},
                {"label": "Roll Length", "value": "20 m to 300 m"},
                {"label": "Shelf Life", "value": "5+ years (thermal paper – BPA-free)"},
            ],
            "features": [
                {"title": "BPA-free thermal paper – FDA-compliant for food contact applications"},
                {"title": "Ultra-smooth coating for superior print head protection and longevity"},
                {"title": "Jam-free precision winding with consistent tension throughout the roll"},
                {"title": "Black mark or notch sensing available for kitchen and ticket printers"},
                {"title": "Linerless label rolls for reduced waste and increased roll capacity"},
                {"title": "Top-coat protection prevents fading from light, heat, and plasticizers"},
                {"title": "Custom-printed receipt backs for branding and promotional messages"},
            ],
            "specifications": [
                {"label": "Paper Weight", "value": "48 – 80 gsm (thermal) / 60 – 100 gsm (bond)"},
                {"label": "Opacity", "value": "≥ 85%"},
                {"label": "Smoothness", "value": "≥ 200 ml/min (Bekk)"},
                {"label": "Print Sensitivity", "value": "Class A or B thermal sensitivity"},
                {"label": "Core Material", "value": "Cardboard, Plastic, or Paper (recyclable)"},
                {"label": "Compatibility", "value": "Epson, Star, Zebra, Bixolon, HP, Citizen, NCR"},
                {"label": "Standards", "value": "GS1, ISO 9001, FSC Certified"},
            ],
            "applications": [
                {"title": "Retail POS receipts and transaction records"},
                {"title": "Restaurant kitchen order tickets (KDS backup)"},
                {"title": "Banking and ATM transaction receipts"},
                {"title": "Parking and event ticketing systems"},
                {"title": "Gas station pay-at-pump receipts"},
                {"title": "Medical and veterinary patient visit summaries"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أنواع الورق", "value": "ورق حراري، ورق عادي، ملصقات حرارية"},
                {"label": "أحجام النواة", "value": "12 ملم، 25 ملم، 38 ملم، 76 ملم"},
                {"label": "عرض اللفة", "value": "40 ملم إلى 210 ملم"},
            ],
            "features": [
                {"title": "ورق حراري خالٍ من BPA – متوافق مع إدارة الغذاء والدواء FDA"},
                {"title": "لف دقيق خالٍ من الانحشار بثبات ثابت طوال اللفة"},
                {"title": "لفائف بدون بطانة لتقليل النفايات وزيادة سعة اللفة"},
            ],
            "applications": [
                {"title": "إيصالات نقاط البيع في التجزئة"},
                {"title": "تذاكر طلبات المطابخ في المطاعم"},
                {"title": "إيصالات الصراف الآلي والمعاملات المصرفية"},
            ],
        },
    },

    # ── 6. Hot Stamping Foil ─────────────────────────────────────────────────
    {
        "id": "hot-stamping-foil",
        "name": "Hot Stamping Foil",
        "name_ar": "رقائق الختم الساخن",
        "desc": (
            "Premium metallic and pigment hot stamping foils for luxury packaging, "
            "stationery, and high-end label embellishment. Available in gold, silver, "
            "holographic, and custom Pantone-matched colors with gloss, matte, or "
            "textured finishes for exceptional brand elevation."
        ),
        "desc_ar": (
            "رقائق ختم ساخن معدنية ومصبوغة فاخرة للتغليف الفاخر والقرطاسية "
            "وتزيين الملصقات الراقية. متوفرة بالذهب والفضة والهولوغرافي."
        ),
        "tag": "Premium",
        "tag_ar": "ممتاز",
        "image_url": "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/hotstamp%20foil.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Foil Types", "value": "Metallic, Pigment, Holographic, Scratch-Off"},
                {"label": "Colors", "value": "Gold, Silver, Copper, Red, Blue, Green, Custom"},
                {"label": "Finish Options", "value": "Gloss, Matte, Brushed, Mirror, Textured"},
                {"label": "Roll Width", "value": "10 mm to 650 mm"},
                {"label": "Roll Length", "value": "120 m, 240 m, 500 m"},
            ],
            "features": [
                {"title": "High-definition sharpness for fine text, logos, and intricate patterns"},
                {"title": "Metallic foils with brilliant mirror-like finish or brushed texture"},
                {"title": "Holographic foils with diffraction patterns for anti-counterfeit security"},
                {"title": "Scratch-off foils for lottery and instant-win promotions"},
                {"title": "Heat-activated adhesive system for paper, film, and select plastics"},
                {"title": "Available in 12 mm to 650 mm widths for all press sizes"},
                {"title": "Custom Pantone color matching for brand-aligned foils"},
            ],
            "specifications": [
                {"label": "Foil Thickness", "value": "12 – 25 µm"},
                {"label": "Application Temp.", "value": "100°C – 150°C (212°F – 302°F)"},
                {"label": "Dwell Time", "value": "0.3 – 0.8 seconds"},
                {"label": "Pressure", "value": "3 – 5 bar (depending on substrate)"},
                {"label": "Compatible Presses", "value": "Flatbed, Rotary, Roll-Fed, Semi-auto"},
                {"label": "Substrates", "value": "Paper, Cardboard, Coated films, PU leather, PVC"},
                {"label": "Certification", "value": "RoHS, REACH, food-contact options"},
            ],
            "applications": [
                {"title": "Luxury cosmetic and perfume packaging"},
                {"title": "Premium wine, spirits, and champagne labels"},
                {"title": "Wedding invitations and fine stationery"},
                {"title": "High-end chocolate and confectionery boxes"},
                {"title": "Book covers, leather goods, and gift cards"},
                {"title": "Security labels and authentication seals"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "أنواع الرقائق", "value": "معدنية، مصبوغة، هولوغرافية، كشط"},
                {"label": "الألوان", "value": "ذهب، فضة، نحاس، أحمر، أزرق، أخضر، مخصص"},
                {"label": "خيارات الإنهاء", "value": "لامع، مطفأ، مصقول، مرآة، محكم"},
            ],
            "features": [
                {"title": "وضوح عالٍ للدقة للنصوص الدقيقة والشعارات والأنماط المعقدة"},
                {"title": "رقائق هولوغرافية بأنماط حيود لأمان ضد التزييف"},
                {"title": "مطابقة ألوان بانتون مخصصة لرقائق متوافقة مع العلامة التجارية"},
            ],
            "applications": [
                {"title": "تغليف مستحضرات التجميل والعطور الفاخرة"},
                {"title": "ملصقات النبيذ والمشروبات الروحية الفاخرة"},
                {"title": "بطاقات الهدايا وأغلفة الكتب والمنتجات الجلدية"},
            ],
        },
    },

    # ── 7. Jewellery Tags ────────────────────────────────────────────────────
    {
        "id": "jewellery-tags",
        "name": "Jewellery Tags",
        "name_ar": "بطاقات المجوهرات",
        "desc": (
            "Premium jewellery tags for retail and wholesale applications, featuring "
            "soft-touch finishes, secure attachment options, and barcode-ready "
            "surfaces. Available in elegant matte white, kraft, metallic, or "
            "custom-branded designs that enhance perceived product value."
        ),
        "desc_ar": (
            "بطاقات مجوهرات فاخرة لتطبيقات البيع بالتجزئة والجملة، مع تشطيبات ناعمة "
            "وخيارات تثبيت آمنة وأسطح جاهزة للباركود."
        ),
        "tag": None,
        "tag_ar": None,
        "image_url":  "https://ubsmrihzrvqmdvzfqoyu.supabase.co/storage/v1/object/public/squarepack-images/Jewellery%20tags.jpeg",
        "details": {
            "quick_specs": [
                {"label": "Materials", "value": "Premium Paper, Kraft, PVC, Metallized, Velvet"},
                {"label": "Sizes", "value": "25×15 mm to 80×50 mm (standard or custom)"},
                {"label": "Attachment", "value": "String loop, Elastic cord, Barb clip, Adhesive"},
                {"label": "Finish", "value": "Matte, Gloss, Soft-Touch, Velvet Lamination"},
                {"label": "Print Options", "value": "Offset, Digital, Hot Stamping, Embossing"},
            ],
            "features": [
                {"title": "Premium 300–400 gsm cardstock with elegant soft-touch or velvet finish"},
                {"title": "Barcode and price marking ready – thermal transfer compatible"},
                {"title": "Reinforced attachment holes prevent tearing from heavy jewellery"},
                {"title": "Available with pre-attached elastic cords, barb clips, or string loops"},
                {"title": "Hot foil stamping option for luxury brand logos and pricing"},
                {"title": "Kraft and recycled paper options for eco-conscious brands"},
                {"title": "Two-part adhesive tags for earring and ring display attachment"},
            ],
            "specifications": [
                {"label": "Paper Weight", "value": "250 – 400 gsm (cardstock)"},
                {"label": "Hole Reinforcement", "value": "Eyelet or reinforced coating"},
                {"label": "Print Method", "value": "Offset, Digital, Thermal Transfer"},
                {"label": "Attachment Types", "value": "Elastic, String, Barb Clip, Tuck-in"},
                {"label": "Perforations", "value": "Micro-perf for easy detachment"},
                {"label": "Custom Shapes", "value": "Round, oval, rectangle, scalloped, custom die-cut"},
                {"label": "Sustainability", "value": "FSC-certified, Recyclable, Compostable options"},
            ],
            "applications": [
                {"title": "Fine jewellery retail pricing and description tags"},
                {"title": "Costume jewellery and fashion accessory labeling"},
                {"title": "Watch display tags with barcode and warranty info"},
                {"title": "Gemstone and diamond certification tags"},
                {"title": "Vintage and antique jewellery provenance labeling"},
                {"title": "Wholesale jewellery inventory and stock control"},
            ],
        },
        "details_ar": {
            "quick_specs": [
                {"label": "المواد", "value": "ورق ممتاز، كرافت، PVC، ممعدن، مخمل"},
                {"label": "الأحجام", "value": "25×15 ملم إلى 80×50 ملم"},
                {"label": "التثبيت", "value": "حلقة خيط، حبل مرن، مشبك شائك، لاصق"},
            ],
            "features": [
                {"title": "بطاقات 300–400 جم/م² ممتازة بتشطيب ناعم أو مخملي"},
                {"title": "جاهزة للباركود والأسعار – متوافقة مع النقل الحراري"},
                {"title": "خيارات ختم رقائق ساخن لشعارات العلامات التجارية الفاخرة والتسعير"},
            ],
            "applications": [
                {"title": "بطاقات أسعار ووصف المجوهرات الثمينة"},
                {"title": "تسمية المجوهرات العصرية وإكسسوارات الموضة"},
                {"title": "بطاقات عرض الساعات مع الباركود ومعلومات الضمان"},
            ],
        },
    },
]


def seed():
    with engine.connect() as conn:
        # Remove existing Speciality Labels products only
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

    print(f"✅ Seeded {len(products)} Speciality Label products successfully.")
    for p in products:
        tag_str = f"  [{p['tag']}]" if p["tag"] else ""
        print(f"   • {p['id']}{tag_str}")


if __name__ == "__main__":
    seed()