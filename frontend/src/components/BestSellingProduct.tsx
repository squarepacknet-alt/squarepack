"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const CARD_IMAGES = [
  "/images/hero1.png",
  "/images/gallery3.png",
  "/images/hero2.png",
  "/images/hero1.png",
  "/images/gallery3.png",
  "/images/hero2.png",
];

const TAG_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  "Best Seller": { bg: "bg-[#34E8BB]/12", text: "text-[#0c9e7b]", dot: "bg-[#34E8BB]" },
  Trending: { bg: "bg-amber-400/10", text: "text-amber-600", dot: "bg-amber-400" },
  "High Volume": { bg: "bg-sky-400/10", text: "text-sky-600", dot: "bg-sky-400" },
  "High Demand": { bg: "bg-rose-400/10", text: "text-rose-500", dot: "bg-rose-400" },
  Popular: { bg: "bg-violet-400/10", text: "text-violet-500", dot: "bg-violet-400" },
  Premium: { bg: "bg-yellow-400/10", text: "text-yellow-600", dot: "bg-yellow-400" },
};

function ProductCard({
  product,
  index,
  image,
}: {
  product: { id?: string; name: string; desc: string; tag: string };
  index: number;
  image: string;
}) {
  const id =
    product.id ||
    product.name.toLowerCase().trim().replace(/[\s/]+/g, "-");
  const tag = TAG_STYLES[product.tag] ?? TAG_STYLES["Best Seller"];
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link href={`/products/${id}`} className="group block shrink-0 w-[280px] md:w-[300px]">
      <div
        className="relative h-[400px] md:h-[440px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_48px_rgba(52,232,187,0.14)]"
        style={{ willChange: "transform" }}
      >
        {/* Image layer */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />

        {/* Soft light overlay — not as dark as before */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/90 via-[#0c0c0c]/40 to-[#0c0c0c]/10" />

        {/* Teal glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#34E8BB]/15 to-transparent" />

        {/* Index number */}
        <span
          className="absolute top-4 left-5 font-black leading-none select-none pointer-events-none transition-colors duration-300 group-hover:text-[#34E8BB]/20"
          style={{
            fontSize: "clamp(4rem, 8vw, 6rem)",
            color: "rgba(12,12,12,0.06)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {num}
        </span>

        {/* Tag badge */}
        <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-sm`}>
          <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`} />
          <span className={`text-[11px] font-bold tracking-wide uppercase ${tag.text}`}>
            {product.tag}
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="w-8 h-[2px] bg-[#34E8BB] mb-4 transition-all duration-300 group-hover:w-14" />
          <h3 className="text-white font-black text-[19px] leading-tight tracking-tight mb-2">
            {product.name}
          </h3>
          <p className="text-white/55 text-[13px] leading-relaxed line-clamp-2 mb-5">
            {product.desc}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-[#34E8BB] text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              View Details
            </span>
            <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center transition-all duration-300 group-hover:bg-[#34E8BB] group-hover:border-[#34E8BB]">
              <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-[#0c0c0c] transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BestSellingProducts() {
  const t = useTranslations("BestSellers");
  const products = t.raw("items") as Array<{
    id?: string;
    name: string;
    desc: string;
    tag: string;
  }>;

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
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

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
              key={i}
              product={product}
              index={i}
              image={CARD_IMAGES[i % CARD_IMAGES.length]}
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