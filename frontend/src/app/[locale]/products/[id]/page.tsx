import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";
import BrochureButton from "@/components/brochure/BrochureButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  try {
    const rawApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const apiUrl = rawApiUrl.replace(/\/$/, "");
    const res = await fetch(`${apiUrl}/api/products/${id}?lang=${locale}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      return {
        title: `${data.name} | SquarePack`,
        description: data.desc,
      };
    }
  } catch {}

  const t = await getTranslations({ locale, namespace: "Products.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

async function getProduct(locale: string, id: string) {
  try {
    const rawApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const apiUrl = rawApiUrl.replace(/\/$/, "");
    const res = await fetch(`${apiUrl}/api/products/${id}?lang=${locale}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("API error");
    }
    const data = await res.json();
    return data;
  } catch {
    // Fallback data for common products if API fails
    const fallbacks: Record<string, unknown> = {
      "plain-labels": {
        id: "plain-labels",
        name: "Plain Labels",
        desc: "High-quality blank labels for thermal transfer and direct thermal printing.",
        category: "Labels",
        details: {
          quick_specs: [
            { label: "Material", value: "Premium Paper" },
            { label: "Adhesive", value: "Permanent" },
          ],
          features: [
            { title: "Weather resistant" },
            { title: "High adhesive strength" },
            { title: "Custom sizes available" },
          ],
          specifications: [
            { label: "Material", value: "Premium Paper/Film" },
            { label: "Finish", value: "Matte or Gloss" },
            { label: "Adhesive", value: "Permanent Acrylic" },
          ],
          applications: [
            { title: "Inventory tracking" },
            { title: "Shipping labels" },
            { title: "Warehouse organization" },
          ],
        },
      },
      "product-labels": {
        id: "product-labels",
        name: "Product Labels",
        desc: "Custom full-color labels for branding and product identification.",
        category: "Branding",
        details: {
          quick_specs: [
            { label: "Printing", value: "Digital" },
            { label: "Finish", value: "UV Coated" },
          ],
          features: [
            { title: "Vibrant color reproduction" },
            { title: "Durable finishes" },
            { title: "Food-safe inks available" },
          ],
          specifications: [
            { label: "Printing", value: "High-res Digital" },
            { label: "Material", value: "BOPP / Paper / Vinyl" },
            { label: "Finishing", value: "UV Coating / Lamination" },
          ],
          applications: [
            { title: "Cosmetics" },
            { title: "Food & Beverage" },
            { title: "Consumer Goods" },
          ],
        },
      },
      "barcode-ribbons": {
        id: "barcode-ribbons",
        name: "Barcode Ribbons",
        desc: "Premium thermal transfer ribbons for crisp, durable barcode printing.",
        category: "Supplies",
        details: {
          quick_specs: [
            { label: "Type", value: "Wax/Resin" },
            { label: "Compatibility", value: "Universal" },
          ],
          features: [
            { title: "High-speed printing" },
            { title: "Smudge resistant" },
            { title: "Wide substrate compatibility" },
          ],
          specifications: [
            { label: "Type", value: "Wax / Resin / Wax-Resin" },
            { label: "Width", value: "Custom" },
            { label: "Core", value: "1 inch / 0.5 inch" },
          ],
          applications: [
            { title: "Compliance labeling" },
            { title: "Asset tracking" },
            { title: "Retail barcodes" },
          ],
        },
      },
      "pallet-bands": {
        id: "pallet-bands",
        name: "Pallet Bands",
        desc: "Heavy-duty pallet bands built for secure bundling and safe transport of palletized loads.",
        category: "Pallet Bands",
        details: {
          quick_specs: [
            { label: "Material", value: "Virgin stretch film" },
            { label: "Width", value: "120 mm" },
            { label: "Core", value: "76 mm" },
            { label: "Finish", value: "Clear / Printed" },
          ],
          features: [
            { title: "High elasticity for strong pallet retention" },
            { title: "Excellent tear resistance and load stability" },
            { title: "Quick application for fast packing lines" },
          ],
          specifications: [
            { label: "Band Width", value: "120 mm" },
            { label: "Film Gauge", value: "20 - 30 microns" },
            { label: "Length", value: "600 - 900 mm" },
            { label: "Color", value: "Clear or custom printed" },
          ],
          applications: [
            { title: "Pallet bundling and cargo stabilization" },
            { title: "Storage and shipment security" },
            { title: "Warehouse handling and logistics" },
          ],
        },
      },
    };
    return fallbacks[id] || null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const product = await getProduct(locale, id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProductDetailClient product={product} locale={locale} />
      <Footer />
      <BrochureButton />
    </>
  );
}
