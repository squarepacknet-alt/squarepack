// components/navbar/ProductMegaMenu.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";

const productCategories: ProductCategory[] = [
  {
    title: "Self Adhesive Labels",
    categorySlug: "self-adhesive-products",
    items: [
      {
        name: "Plain Labels",
        slug: "plain-labels",
      },
      {
        name: "Customizable Labels",
        slug: "customizable-labels",
      },
      {
        name: "Promotional Labels",
        slug: "promotional-labels",
      },
      {
        name: "Barcode Labels",
        slug: "barcode-labels",
      },
      {
        name: "Shrink Sleeve Labels",
        slug: "shrink-sleeve-labels",
      },
    ],
  },
  {
    title: "Security Labels",
    categorySlug: "security-labels",
    items: [
      {
        name: "Void Labels",
        slug: "void-labels",
      },
      {
        name: "RFID Tags",
        slug: "rfid-tags",
      },
      {
        name: "RFID Labels",
        slug: "rfid-labels",
      },
      {
        name: "Asset Labels",
        slug: "asset-labels-security",
      },
      {
        name: "Custom Asset Labels",
        slug: "custom-asset-labels",
      },
      {
        name: "Tamper Evident Labels",
        slug: "tamper-evident-labels",
      },
    ],
  },
  {
    title: "Speciality Labels",
    categorySlug: "speciality-labels",
    items: [
      {
        name: "Rack Labels",
        slug: "rack-labels",
      },
      {
        name: "Location Labels",
        slug: "location-labels",
      },
      {
        name: "Variable Print Solutions",
        slug: "variable-print-solutions",
      },
      {
        name: "Warehouse solutions",
        slug: "warehouse-solutions",
      },
      {
        name: "POS Rolls",
        slug: "pos-rolls",
      },
      {
        name: "Hot Stamping Foil",
        slug: "hot-stamping-foil",
      },
      {
        name: "Jewellery Tags",
        slug: "jewellery-tags",
      },
    ],
  },
  {
    title: "Printers",
    categorySlug: "printers",
    items: [
      {
        name: "Printer",
        slug: "printer",
      },
      {
        name: "Pricing Slide Gum",
        slug: "pricing-slide-gum",
      },
    ],
  },
  {
    title: "Packaging Products",
    categorySlug: "packaging-products",
    items: [
      {
        name: "Brown Tapes",
        slug: "brown-tapes",
      },
      {
        name: "Masking Tape",
        slug: "masking-tape",
      },
      {
        name: "Clear Tapes",
        slug: "clear-tapes",
      },
      {
        name: "Printed Tapes",
        slug: "printed-tapes",
      },
      {
        name: "Bubble Wrap",
        slug: "bubble-wrap",
      },
      {
        name: "Stretch Films",
        slug: "stretch-films",
      },
      {
        name: "Pallet Bands",
        slug: "pallet-bands",
      },
    ],
  },
  {
    title: "Barcode Ribbons",
    categorySlug: "barcode-ribbons",
    items: [
      {
        name: "Barcode Ribbon",
        slug: "barcode-ribbon",
      },
    ],
  },
];

// Type definitions
interface ProductCategory {
  title: string;
  categorySlug: string;
  items: ProductItem[];
}

interface ProductItem {
  name: string;
  slug: string;
}

interface ProductMegaMenuProps {
  open: boolean;
  topOffset: number;
}

export default function ProductMegaMenu({ open, topOffset }: ProductMegaMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.22 }}
          className="fixed left-0 w-full z-20"
          style={{ top: topOffset }}
        >
          {/* Background blur layer */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(255,255,255,0.78)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          />

          {/* Content */}
          <div className="relative">
            <div
              className="px-6 lg:px-10 py-10"
              style={{
                maxWidth: "1440px",
                margin: "0 auto",
              }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-12">
                {productCategories.map((category) => (
                  <div key={category.title}>
                    <h3 className="text-[20px] font-semibold text-[#1D1D1D] mb-3">
                      {category.title}
                    </h3>

                    <div className="w-10 h-[3px] bg-[#34E8BB] rounded-full mb-5" />

                    <div className="flex flex-col gap-3">
                      {category.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/products/${item.slug}`}
                          className="text-[15px] leading-[1.4] text-[#1D1D1D]/65 hover:text-[#34E8BB] transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
