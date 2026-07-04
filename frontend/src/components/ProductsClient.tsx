"use client";

import { useState, useMemo } from "react";
import {
  Package,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Box,
  Barcode,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductShowcase from "@/components/ProductShowcase";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import AppButton from "./appButton/AppButton";

interface Product {
  id: string;
  name: string;
  desc: string;
  image_url: string | null;
  tag: string | null;
  category: string;
}

type ProductTab =
  | "all"
  | "self-adhesive-products"
  | "security-labels"
  | "speciality-labels"
  | "printers"
  | "packaging-products"
  | "barcode"
  | "pallet-bands"
  | "other";

interface ProductsClientProps {
  initialProducts: Product[];
}

const features = [
  { icon: Sparkles, label: "Custom Design", desc: "Tailored to your brand" },
  { icon: Shield, label: "Premium Quality", desc: "ISO certified materials" },
  { icon: Zap, label: "Fast Turnaround", desc: "Express production lines" },
];

export default function ProductsClient({
  initialProducts,
}: ProductsClientProps) {
  const t = useTranslations("Products");
  const [activeTab, setActiveTab] = useState<ProductTab>("all");

  const [visibleCount, setVisibleCount] = useState(10);

  const handleTabChange = (tabId: ProductTab) => {
    setActiveTab(tabId);
    setVisibleCount(10);
  };

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return initialProducts;

    return initialProducts.filter((p) => {
      const categoryLower = p.category.toLowerCase();

      switch (activeTab) {
        case "self-adhesive-products":
          return categoryLower.includes("self-adhesive-products");
        case "security-labels":
          return categoryLower.includes("security-labels");
        case "speciality-labels":
          return categoryLower.includes("speciality-labels");
        case "printers":
          return categoryLower.includes("printers");
        case "packaging-products":
          return categoryLower.includes("packaging-products");
        case "barcode":
          return categoryLower.includes("barcode");
        case "other":
          return (
            categoryLower.includes("other") || categoryLower === "specialized"
          );
        default:
          return false;
      }
    });
  }, [initialProducts, activeTab]);

  // Tab configuration with icons
  const tabs = [
    {
      id: "all",
      icon: Package,
      label: t("tabs.all.title"),
      subtitle: t("tabs.all.subtitle"),
    },
    {
      id: "self-adhesive-products",
      icon: Box,
      label: t("tabs.self-adhesive-products.title"),
      subtitle: t("tabs.self-adhesive-products.subtitle"),
    },
    {
      id: "security-labels",
      icon: Shield,
      label: t("tabs.security-labels.title"),
      subtitle: t("tabs.security-labels.subtitle"),
    },
    {
      id: "speciality-labels",
      icon: Sparkles,
      label: t("tabs.speciality-labels.title"),
      subtitle: t("tabs.speciality-labels.subtitle"),
    },
    {
      id: "printers",
      icon: Zap,
      label: t("tabs.printers.title"),
      subtitle: t("tabs.printers.subtitle"),
    },
    {
      id: "packaging-products",
      icon: Package,
      label: t("tabs.packaging-products.title"),
      subtitle: t("tabs.packaging-products.subtitle"),
    },
    {
      id: "barcode",
      icon: Barcode,
      label: t("tabs.barcode.title"),
      subtitle: t("tabs.barcode.subtitle"),
    },
  ] as const;

  return (
    <main className="min-h-screen bg-[#f8fafb] overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-[#e8fdf7] via-[#f4fdfb] to-white overflow-hidden pt-32 pb-20">
        {/* bg glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#26D0A8] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />
        {/* grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(38,208,168,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(38,208,168,0.04) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-[#26D0A8]" />
              <span className="text-[#26D0A8] text-[11px] font-extrabold tracking-[0.2em] uppercase">
                Our Product Portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-black text-slate-900 leading-[1.02] tracking-tight text-4xl sm:text-5xl lg:text-[4rem] mb-6"
            >
              Packaging <span className="text-[#26D0A8]">Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-500 text-[16px] leading-[1.75] max-w-[520px] mb-10"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm"
                >
                  <f.icon className="w-3.5 h-3.5 text-[#26D0A8]" />
                  <span className="text-slate-700 text-[13px] font-semibold">
                    {f.label}
                  </span>
                  <span className="text-slate-400 text-[12px]">· {f.desc}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Video Section ── */}
      <section className="container pt-16 pb-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900 aspect-video shadow-2xl group border border-slate-200/50"
          >
            <video
              src="/videos/pallet_bands_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none" />

            {/* Coming Soon Glassmorphism Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md px-10 py-8 rounded-3xl border border-white/20 flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] transform transition-transform duration-500 group-hover:-translate-y-2"
              >
                <div className="inline-flex items-center gap-2 bg-[#3de0be]/20 px-4 py-1.5 rounded-full mb-4 border border-[#3de0be]/30">
                  <div className="w-2 h-2 rounded-full bg-[#3de0be] animate-pulse" />
                  <span className="text-[#3de0be] font-bold tracking-[0.2em] uppercase text-xs">Product Preview</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tight drop-shadow-lg">
                  Coming Soon
                </h2>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tab toggle ── */}
      <section className="container py-10">
        <div className="flex flex-col gap-6">
          {/* Tabs buttons - scrollable on mobile */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-[13.5px] font-bold transition-all duration-300 ${isActive
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-slate-200"
                      }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-[#3de0be]" : "text-slate-400"}`}
                    />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active tab subtitle and product count */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-slate-600 text-[14px] font-medium">
                {tabs.find((tab) => tab.id === activeTab)?.subtitle}
              </p>
            </div>
            <p className="text-slate-400 text-[13px] font-medium">
              <span className="text-slate-700 font-bold">
                {filteredProducts.length}
              </span>{" "}
              products available
            </p>
          </div>
        </div>
      </section>

      {/* ── Products grid ── */}
      <section className="container pb-24">
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <Package className="w-12 h-12 text-slate-300 mb-4" />
              <p className="text-slate-400 text-[15px] font-medium">
                No products in this category yet.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center w-full"
            >
              <ProductShowcase
                products={filteredProducts.slice(0, visibleCount)}
                columns={3}
              />

              {visibleCount < filteredProducts.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-12"
                >
                  <AppButton isDark={true} onClick={() => setVisibleCount((prev) => prev + 10)}>Load More</AppButton>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── CTA ── */}
      <section className="container pb-24">
        <div
          className="bg-slate-900 rounded-[2rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          data-navbar-dark="true"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#26D0A8] opacity-[0.08] blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white mb-2 tracking-tight">
              {t("cta.title")}
            </h2>
            <p className="text-slate-400 text-[15px] max-w-md">
              {t("cta.subtitle")}
            </p>
          </div>
          <Link href="/contact-us" className="relative z-10 shrink-0">
            <button className="bg-[#26D0A8] hover:bg-[#1fba97] text-slate-900 font-bold text-[14.5px] px-8 py-4 rounded-full transition-all hover:scale-[1.03] flex items-center gap-2 shadow-lg shadow-[#26D0A8]/20">
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}