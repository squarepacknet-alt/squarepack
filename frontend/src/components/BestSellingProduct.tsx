"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function BestSellingProducts() {
  const t = useTranslations("BestSellers");
  const locale = useLocale();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft ?? 0));
    setScrollLeft(trackRef.current?.scrollLeft ?? 0);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const dist = (x - startX) * 1.4;
    trackRef.current.scrollLeft = scrollLeft - dist;
  };
  const stopDrag = () => setIsDragging(false);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        const apiUrl = rawApiUrl.replace(/\/$/, "");
        const res = await fetch(`${apiUrl}/api/products/best-sellers?lang=${locale}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching best sellers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBestSellers();
  }, [locale]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [products]);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  if (loading || products.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #f0fdf9 0%, #f7fffe 40%, #edfbf7 70%, #f5fffe 100%)",
      }}
    >
      {/* Soft teal blobs */}
      <div
        className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(52,232,187,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(52,232,187,0.08) 0%, transparent 70%)" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(52,232,187,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(52,232,187,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="container flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-[2px] bg-[#34E8BB]" />
              <span className="text-[11px] font-extrabold tracking-[0.22em] uppercase" style={{ color: "#0c9e7b" }}>
                {t("badge")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-black text-[#0c0c0c] leading-[1.02] tracking-tight">
              {t("title")}
            </h2>
          </div>
        </div>

        {/* ── Scroll track ── */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className="flex gap-5 overflow-x-auto pb-4 select-none"
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
            paddingRight: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
          }}
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.id || i}
              product={product}
              className="shrink-0 w-[280px] md:w-[300px]"
            />
          ))}

          {/* End CTA card */}
          <div className="shrink-0 w-[180px] md:w-[200px] h-[400px] md:h-[440px] rounded-2xl border border-[#34E8BB]/25 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center gap-5 p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full border border-[#34E8BB]/50 bg-[#34E8BB]/8 flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-[#0c9e7b]" />
            </div>
            <p className="text-slate-400 text-[13px] leading-relaxed">
              See our full product catalog
            </p>
            <Link
              href="/products"
              className="text-[#0c9e7b] text-[11px] font-bold uppercase tracking-widest hover:underline underline-offset-4 transition-all"
            >
              All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}