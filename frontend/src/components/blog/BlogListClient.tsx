"use client";

import { useState, useMemo } from "react";
import { Blog } from "@/components/admin/types";
import { Link } from "@/i18n/routing";
import {
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  Tag,
  BookOpen,
  Send,
} from "lucide-react";
import Image from "next/image";

interface Props {
  blogs: Blog[];
  locale: string;
}

function calculateReadingTime(text: string): string {
  const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export default function BlogListClient({ blogs, locale }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extract all unique keywords/tags across published articles
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogs.forEach((b) => {
      if (b.keywords) {
        b.keywords.split(",").forEach((k) => {
          const trimmed = k.trim();
          if (trimmed) tagSet.add(trimmed);
        });
      }
    });
    return ["All", ...Array.from(tagSet).slice(0, 8)];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Must be published or default true
      if (blog.is_published === false) return false;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        (blog.summary && blog.summary.toLowerCase().includes(query)) ||
        (blog.keywords && blog.keywords.toLowerCase().includes(query)) ||
        (blog.author && blog.author.toLowerCase().includes(query));

      const matchesTag =
        selectedTag === "All" ||
        (blog.keywords &&
          blog.keywords
            .toLowerCase()
            .split(",")
            .map((k) => k.trim())
            .includes(selectedTag.toLowerCase()));

      return matchesSearch && matchesTag;
    });
  }, [blogs, searchQuery, selectedTag]);

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingBlogs = filteredBlogs.length > 0 ? filteredBlogs.slice(1) : [];

  return (
    <div className="w-full">
      {/* ── Search and Filter Bar ── */}
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-5 bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm backdrop-blur-sm">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles, topics, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#26D0A8]/30 focus:border-[#26D0A8] transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedTag === tag
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── No Results State ── */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200 my-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">No articles found</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            We couldn&apos;t find any articles matching &quot;{searchQuery || selectedTag}&quot;. Try adjusting your search query or filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("All");
            }}
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ── Featured Article Spotlight (Hero Card) ── */}
      {featuredBlog && (
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#1ba988] mb-4">
            <Sparkles className="w-4 h-4" />
            Featured Story
          </div>

          <Link
            href={`/blog/${featuredBlog.slug || featuredBlog.id}`}
            className="group block bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image */}
              <div className="lg:col-span-7 relative h-72 sm:h-80 lg:h-[420px] bg-slate-100 overflow-hidden">
                {featuredBlog.cover_image ? (
                  <img
                    src={featuredBlog.cover_image}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-slate-300" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg">
                    Latest Insight
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Meta items */}
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#26D0A8]" />
                      {new Date(featuredBlog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#26D0A8]" />
                      {calculateReadingTime(featuredBlog.content)}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 group-hover:text-[#1ba988] transition-colors leading-snug mb-4 tracking-tight">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
                    {featuredBlog.summary ||
                      featuredBlog.content.replace(/<[^>]*>/g, "").substring(0, 160) + "..."}
                  </p>
                </div>

                <div>
                  {/* Author and Read link */}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#26D0A8]/20 flex items-center justify-center text-[#1ba988] font-bold text-xs">
                        {featuredBlog.author ? featuredBlog.author[0].toUpperCase() : "A"}
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {featuredBlog.author || "Admin"}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#1ba988] group-hover:translate-x-1 transition-all">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ── Grid of Remaining Articles ── */}
      {remainingBlogs.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Recent Publications
            </h3>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {remainingBlogs.length} Article{remainingBlogs.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingBlogs.map((blog) => (
              <article key={blog.id} className="group flex flex-col h-full">
                <Link
                  href={`/blog/${blog.slug || blog.id}`}
                  className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Card Image */}
                  <div className="aspect-[16/10] relative w-full bg-slate-100 overflow-hidden">
                    {blog.cover_image ? (
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-slate-300" />
                      </div>
                    )}

                    {blog.keywords && (
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                        <span className="px-2.5 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-full shadow">
                          #{blog.keywords.split(",")[0].trim()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                        <span>
                          {new Date(blog.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>{calculateReadingTime(blog.content)}</span>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-heading font-bold text-slate-900 group-hover:text-[#1ba988] transition-colors leading-snug line-clamp-2 mb-3">
                        {blog.title}
                      </h4>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                        {blog.summary ||
                          blog.content.replace(/<[^>]*>/g, "").substring(0, 120) + "..."}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#26D0A8]/20 flex items-center justify-center text-[#1ba988] font-bold text-[10px]">
                          {blog.author ? blog.author[0].toUpperCase() : "A"}
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                          {blog.author || "Admin"}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-[#1ba988] transition-colors">
                        Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* ── Consultation / Inquiry Banner Strip ── */}
      <div className="mt-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-slate-800">
        {/* Glow decoration */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#26D0A8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#26D0A8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 bg-[#26D0A8]/20 text-[#5ce7c8] text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-4 border border-[#26D0A8]/30">
            Partner with SquarePack
          </span>
          <h3 className="text-2xl sm:text-4xl font-heading font-black tracking-tight mb-3">
            Looking for Custom Packaging or Industrial Labeling?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            From barcodes and security stickers to high-speed thermal printers and custom luxury boxes, our engineering team provides tailored solutions for your business.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact-us"
              className="px-6 py-3.5 bg-[#26D0A8] hover:bg-[#1ba988] text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-[#26D0A8]/20"
            >
              Get Free Consultation
            </Link>
            <Link
              href="/products"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all border border-slate-700"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
