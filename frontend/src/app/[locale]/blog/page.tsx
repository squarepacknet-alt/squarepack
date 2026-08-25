import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Blog } from "@/components/admin/types";
import { setRequestLocale } from "next-intl/server";
import { API_URL } from "@/config/api";
import BlogListClient from "@/components/blog/BlogListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights | SquarePack Packaging & Labeling",
  description: "Explore the latest insights, technological breakthroughs, packaging innovations, and industrial labeling guides from SquarePack.",
};

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const blogs = await getBlogs();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white font-sans pt-32 sm:pt-36 md:pt-44 pb-24 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full">
          {/* ── Page Hero Header ── */}
          <div className="relative mb-14 text-center max-w-3xl mx-auto">
            {/* Subtle turquoise glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-[#26D0A8]/20 blur-3xl rounded-full pointer-events-none" />

            <span className="relative z-10 px-3.5 py-1.5 bg-[#26D0A8]/10 text-[#1ba988] text-xs font-extrabold uppercase tracking-widest rounded-full inline-block mb-3 border border-[#26D0A8]/20">
              Knowledge & Insights
            </span>
            <h1 className="relative z-10 text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-slate-900 tracking-tight leading-tight mb-4">
              SquarePack Blog
            </h1>
            <p className="relative z-10 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Industry trends, barcode guides, advanced materials, and expert insights on packaging excellence.
            </p>
          </div>

          {/* ── Client List Component with Search, Filter & Featured Story ── */}
          <BlogListClient blogs={blogs} locale={resolvedParams.locale} />
        </div>
      </main>
      <Footer />
    </>
  );
}

