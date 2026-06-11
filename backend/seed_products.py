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
# Product catalogue – derived from squarepack-sigma.vercel.app/en/products
#
# Columns: (id_slug, name, description, category_slug, category_name, tag)
# Categories match the 6 nav columns visible on the Products page:
#   - Self Adhesive Labels → self-adhesive-products
#   - Security Labels → security-labels
#   - Speciality Labels → speciality-labels
#   - Printers → printers
#   - Packaging Products → packaging-products
#   - Barcode Ribbons → barcode-ribbons
# ---------------------------------------------------------------------------

# Category mapping for normalization
CATEGORY_MAP = {
    "Self Adhesive Labels": {
        "slug": "self-adhesive-products",
        "name": "Self Adhesive Labels",
        "name_ar": "ملصقات لاصقة ذاتية"
    },
    "Security Labels": {
        "slug": "security-labels",
        "name": "Security Labels",
        "name_ar": "ملصقات أمنية"
    },
    "Speciality Labels": {
        "slug": "speciality-labels",
        "name": "Speciality Labels",
        "name_ar": "ملصقات متخصصة"
    },
    "Printers": {
        "slug": "printers",
        "name": "Printers",
        "name_ar": "طابعات"
    },
    "Packaging Products": {
        "slug": "packaging-products",
        "name": "Packaging Products",
        "name_ar": "منتجات التعبئة"
    },
    "Barcode Ribbons": {
        "slug": "barcode-ribbons",
        "name": "Barcode Ribbons",
        "name_ar": "أشرطة الباركود"
    },
}

products = [
    # ── Self Adhesive Labels ─────────────────────────────────────────────────
    (
        "plain-labels",
        "Plain Labels",
        "High-quality blank labels in various sizes and materials. Perfect for "
        "thermal transfer and direct thermal printing applications.",
        "Self Adhesive Labels",
        "Best Seller",
    ),
    (
        "customizable-labels",
        "Customizable Labels",
        "Fully customizable labels designed to make your brand stand out. "
        "Available in vibrant colours and premium finishes.",
        "Self Adhesive Labels",
        "Trending",
    ),
    (
        "promotional-labels",
        "Promotional Labels",
        "Eye-catching promotional stickers and labels ideal for marketing "
        "campaigns, giveaways, and seasonal promotions.",
        "Self Adhesive Labels",
        None,
    ),
    (
        "barcode-labels",
        "Barcode Labels",
        "Precision-printed barcode labels compatible with all major scanners "
        "and barcode standards including GS1, Code 128, and QR.",
        "Self Adhesive Labels",
        "High Volume",
    ),
    (
        "shrink-sleeve-labels",
        "Shrink Sleeve Labels",
        "Full 360-degree printed sleeves that conform perfectly to any "
        "container shape, delivering maximum shelf impact.",
        "Self Adhesive Labels",
        None,
    ),
    (
        "masking-tape",
        "Masking Tape",
        "Durable, easy-tear masking tapes suitable for painting, bundling, "
        "and general-purpose industrial or office use.",
        "Self Adhesive Labels",
        None,
    ),

    # ── Security Labels ──────────────────────────────────────────────────────
    (
        "void-labels",
        "Void Labels",
        "Tamper-evident void labels that display a clear 'VOID' message when "
        "removed, protecting products and assets from unauthorised access.",
        "Security Labels",
        "Security",
    ),
    (
        "rfid-tags",
        "RFID Tags",
        "High-performance RFID tags for contactless identification and "
        "real-time tracking of assets, inventory, and shipments.",
        "Security Labels",
        None,
    ),
    (
        "rfid-labels",
        "RFID Labels",
        "Slim, printable RFID labels that combine standard barcode printing "
        "with embedded RFID inlays for dual-mode identification.",
        "Security Labels",
        None,
    ),
    (
        "asset-labels-security",
        "Asset Labels",
        "Ultra-destructible or polyester asset labels engineered to deter "
        "removal and clearly identify ownership of valuable equipment.",
        "Security Labels",
        None,
    ),
    (
        "tamper-evident-labels",
        "Tamper Evident Labels",
        "Specialised labels that provide visible evidence of tampering, "
        "ensuring product integrity throughout the supply chain.",
        "Security Labels",
        "Security",
    ),
    (
        "custom-asset-labels",
        "Custom Asset Labels",
        "Bespoke asset labels with custom serialisation, QR codes, logos, "
        "and materials tailored to your specific tracking requirements.",
        "Security Labels",
        None,
    ),

    # ── Speciality Labels ────────────────────────────────────────────────────
    (
        "asset-labels-speciality",
        "Asset Labels",
        "Durable speciality labels for long-term asset tracking, available in "
        "anodised aluminium, polyester, and polycarbonate substrates.",
        "Speciality Labels",
        None,
    ),
    (
        "rack-labels",
        "Rack Labels",
        "Colour-coded rack and shelf labels designed for warehouses, "
        "data centres, and storage facilities to optimise space utilisation.",
        "Speciality Labels",
        None,
    ),
    (
        "location-labels",
        "Location Labels",
        "Bold, high-visibility floor, aisle, and location labels that "
        "streamline navigation and stock management in busy facilities.",
        "Speciality Labels",
        None,
    ),
    (
        "variable-print-solutions",
        "Variable Print Solutions",
        "On-demand variable data printing services for labels requiring "
        "unique barcodes, serial numbers, or personalised information.",
        "Speciality Labels",
        "Trending",
    ),
    (
        "washing-care-labels",
        "Washing Care Labels",
        "Soft, woven or printed care instruction labels compliant with "
        "international textile labelling standards for garments and apparel.",
        "Speciality Labels",
        None,
    ),
    (
        "pos-rolls",
        "POS Rolls",
        "Premium thermal paper rolls for POS terminals, credit card machines, "
        "and receipt printers — available in BPA-free variants.",
        "Speciality Labels",
        "High Volume",
    ),
    (
        "hot-stamping-foil",
        "Hot Stamping Foil",
        "Metallic and holographic hot stamping foils that add a luxurious, "
        "premium finish to labels, packaging, and printed materials.",
        "Speciality Labels",
        None,
    ),
    (
        "jewellery-tags",
        "Jewellery Tags",
        "Elegant, fine-detail jewellery tags and string tickets available in "
        "a wide range of shapes, sizes, and finishing options.",
        "Speciality Labels",
        None,
    ),

    # ── Printers ─────────────────────────────────────────────────────────────
    (
        "printing",
        "Printing",
        "Industrial and desktop label printing solutions supporting thermal "
        "transfer and direct thermal technologies for every volume.",
        "Printers",
        None,
    ),
    (
        "print-care",
        "Print Care",
        "Comprehensive printer maintenance, servicing, and spare-parts supply "
        "to maximise uptime and extend the life of your printing equipment.",
        "Printers",
        None,
    ),
    (
        "labels-printers",
        "Labels",
        "Pre-tested label media optimised for specific printer models, "
        "ensuring consistent print quality and ribbon compatibility.",
        "Printers",
        None,
    ),

    # ── Packaging Products ───────────────────────────────────────────────────
    (
        "brown-tapes",
        "Brown Tapes",
        "Strong, water-activated and pressure-sensitive brown packing tapes "
        "for secure carton sealing in warehouse and shipping environments.",
        "Packaging Products",
        None,
    ),
    (
        "clear-tapes",
        "Clear Tapes",
        "Crystal-clear adhesive tapes offering reliable bonding for "
        "packaging, stationery, and light industrial applications.",
        "Packaging Products",
        None,
    ),
    (
        "printed-tapes",
        "Printed Tapes",
        "Custom-printed packing tapes featuring your brand logo or security "
        "messages, doubling as a marketing tool on every shipment.",
        "Packaging Products",
        "Trending",
    ),
    (
        "bubble-wrap",
        "Bubble Wrap",
        "Multi-layer bubble wrap rolls and pouches providing superior cushion "
        "protection for fragile items during storage and transit.",
        "Packaging Products",
        None,
    ),
    (
        "stretch-films",
        "Stretch Films",
        "High-clarity, high-elongation stretch films for pallet wrapping and "
        "load stabilisation in logistics and warehousing operations.",
        "Packaging Products",
        "High Volume",
    ),

    # ── Barcode Ribbons ──────────────────────────────────────────────────────
    (
        "barcode-ribbon",
        "Barcode Ribbon",
        "Premium wax, wax-resin, and full-resin thermal transfer ribbons "
        "delivering sharp, durable prints on all label substrates.",
        "Barcode Ribbons",
        "Best Seller",
    ),
]

# ---------------------------------------------------------------------------
# Shared mock details – reused across all products
# ---------------------------------------------------------------------------
mock_details = {
    "quick_specs": [
        {"label": "Material Options", "value": "Paper, PP, PET, Vinyl"},
        {"label": "Adhesion Type", "value": "Permanent, Removable, Freezer-grade"},
    ],
    "features": [
        {"title": "Materials: Paper, Polypropylene, Polyester"},
        {"title": "Superior adhesive strength for various surfaces"},
        {"title": "Custom die-cutting available"},
        {"title": "Temperature resistant up to 150°C"},
        {"title": "Compatible with Zebra, TSC, Honeywell, and all major printers"},
    ],
    "specifications": [
        {"label": "Core Size", "value": "1 inch, 3 inch, or Custom"},
        {"label": "Roll Capacity", "value": "1000 – 5000 labels per roll"},
        {"label": "Finish Options", "value": "Matte, Glossy, Uncoated"},
    ],
    "applications": [
        {"title": "Retail packaging and barcode labels"},
        {"title": "Logistics and shipping labels"},
        {"title": "Pharmaceutical and medical labeling"},
    ],
}

# ---------------------------------------------------------------------------
# Category → representative Unsplash image
# ---------------------------------------------------------------------------
CATEGORY_IMAGES = {
    "self-adhesive-products": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
    "security-labels":        "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
    "speciality-labels":      "https://images.unsplash.com/photo-1606206522426-e61e4cdf0af7?q=80&w=2070&auto=format&fit=crop",
    "printers":               "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?q=80&w=2070&auto=format&fit=crop",
    "packaging-products":     "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
    "barcode-ribbons":        "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2070&auto=format&fit=crop",
}


def seed():
    with engine.connect() as conn:
        # Clear existing products to avoid duplicates
        conn.execute(text("DELETE FROM products"))

        for slug, name, desc, category_display, tag in products:
            # Get normalized category data
            category_data = CATEGORY_MAP[category_display]
            
            query = text("""
                INSERT INTO products (
                    id, name, name_ar, "desc", desc_ar,
                    category, category_ar, tag, tag_ar,
                    image_url, details
                )
                VALUES (
                    :id, :name, :name_ar, :desc, :desc_ar,
                    :category, :category_ar, :tag, :tag_ar,
                    :image_url, :details
                )
            """)
            conn.execute(query, {
                "id":            slug,
                "name":          name,
                "name_ar":       "",
                "desc":          desc,
                "desc_ar":       "",
                "category":      category_data["slug"],      # normalized slug
                "category_ar":   category_data["name_ar"],   # Arabic display label
                "tag":           tag or "",
                "tag_ar":        "",
                "image_url":     CATEGORY_IMAGES.get(
                                     category_data["slug"],
                                     "https://images.unsplash.com/photo-1589939705384-5185137a7f0f"
                                     "?q=80&w=2070&auto=format&fit=crop"
                                 ),
                "details":       json.dumps(mock_details),
            })

        conn.commit()

    total = len(products)
    cats  = len(CATEGORY_MAP)
    print(f"✅  Seeded {total} products across {cats} categories successfully.")


if __name__ == "__main__":
    seed()