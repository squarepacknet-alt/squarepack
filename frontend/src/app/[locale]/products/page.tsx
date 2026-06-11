import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import ProductsClient from "@/components/ProductsClient";
import BrochureButton from "@/components/brochure/BrochureButton";
import WhatsAppButton from "@/components/whatsapp/WhatsappButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

interface Product {
  id: string;
  name: string;
  desc: string;
  image_url: string | null;
  tag: string | null;
  category: string;
}

// 2 fallback products per category (used when backend is unavailable)
const FALLBACK_PRODUCTS: Product[] = [
  // ── self-adhesive-products ──────────────────────────────────────────────
  {
    id: "plain-labels",
    name: "Plain Labels",
    desc: "High-quality blank labels for thermal transfer and direct thermal printing. Available in rolls or sheets.",
    image_url:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
    tag: "Best Seller",
    category: "self-adhesive-products",
  },
  {
    id: "product-labels",
    name: "Product Labels",
    desc: "Custom full-color self-adhesive labels for branding and product identification across every industry.",
    image_url:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=1974&auto=format&fit=crop",
    tag: "Trending",
    category: "self-adhesive-products",
  },

  // ── security-labels ─────────────────────────────────────────────────────
  {
    id: "tamper-evident-labels",
    name: "Tamper-Evident Labels",
    desc: "Void or destructible labels that reveal tampering instantly, protecting your products and brand integrity.",
    image_url:
      "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=1974&auto=format&fit=crop",
    tag: "High Demand",
    category: "security-labels",
  },
  {
    id: "holographic-labels",
    name: "Holographic Security Labels",
    desc: "Durable holographic stickers with custom patterns and serial numbers to prevent counterfeiting.",
    image_url:
      "https://images.unsplash.com/photo-1607000975509-de2f74eb8d36?q=80&w=2070&auto=format&fit=crop",
    tag: "Premium",
    category: "security-labels",
  },

  // ── speciality-labels ────────────────────────────────────────────────────
  {
    id: "heat-resistant-labels",
    name: "Heat-Resistant Labels",
    desc: "Engineered for extreme temperatures — ideal for automotive, electronics, and industrial applications.",
    image_url:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    tag: "Industrial",
    category: "speciality-labels",
  },
  {
    id: "clear-labels",
    name: "Clear Transparent Labels",
    desc: "No-label look labels on glass or plastic bottles — perfect for cosmetics and premium beverages.",
    image_url:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop",
    tag: "Popular",
    category: "speciality-labels",
  },

  // ── printers ────────────────────────────────────────────────────────────
  {
    id: "desktop-label-printer",
    name: "Desktop Label Printer",
    desc: "Compact, high-resolution thermal label printers for offices, pharmacies, and small-run production lines.",
    image_url:
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?q=80&w=2070&auto=format&fit=crop",
    tag: "New",
    category: "printers",
  },
  {
    id: "industrial-label-printer",
    name: "Industrial Label Printer",
    desc: "Heavy-duty industrial-grade printers built for continuous, high-volume barcode and label production.",
    image_url:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    tag: "High Volume",
    category: "printers",
  },

  // ── packaging-products ──────────────────────────────────────────────────
  {
    id: "shrink-sleeve",
    name: "Shrink Sleeve Labels",
    desc: "360° full-body shrink sleeves that conform to any container shape — ideal for beverages and food products.",
    image_url:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1935&auto=format&fit=crop",
    tag: "Trending",
    category: "packaging-products",
  },
  {
    id: "flexible-pouches",
    name: "Flexible Pouches",
    desc: "High-barrier, resealable flexible pouches for snacks, powders, and liquids with custom printing.",
    image_url:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    tag: "Eco-Friendly",
    category: "packaging-products",
  },
  {
    id: "pallet-bands",
    name: "Pallet Bands",
    desc: "Industrial pallet bands for secure bundling and transport of heavy pallet loads.",
    image_url:
      "https://images.unsplash.com/photo-1536739156489-7239558bf035?q=80&w=1974&auto=format&fit=crop",
    tag: "Heavy Duty",
    category: "pallet-bands",
  },

  // ── barcode ─────────────────────────────────────────────────────────────
  {
    id: "wax-ribbons",
    name: "Wax Transfer Ribbons",
    desc: "Cost-effective wax ribbons for printing on paper labels — sharp barcodes at high throughput speeds.",
    image_url:
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=2070&auto=format&fit=crop",
    tag: "Best Seller",
    category: "barcode",
  },
  {
    id: "resin-ribbons",
    name: "Resin Transfer Ribbons",
    desc: "Premium resin ribbons for synthetic labels — smear, chemical, and scratch resistant for harsh environments.",
    image_url:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2127&auto=format&fit=crop",
    tag: "Industrial",
    category: "barcode",
  },
];

async function getProducts(locale: string): Promise<Product[]> {
  try {
    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const apiUrl = rawApiUrl.replace(/\/$/, "");
    const res = await fetch(`${apiUrl}/api/products?lang=${locale}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return FALLBACK_PRODUCTS;
    return data;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = await getProducts(locale);

  return (
    <>
      <Navbar />
      <ProductsClient initialProducts={products} />
      <Footer />
      <BrochureButton />
      <WhatsAppButton />
    </>
  );
}