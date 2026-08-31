import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Blog, BlogFAQ } from "@/components/admin/types";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { API_URL } from "@/config/api";

const API = API_URL;

async function getBlog(slugOrId: string): Promise<Blog | null> {
  try {
    let res = await fetch(`${API}/api/blogs/slug/${slugOrId}`, { cache: "no-store" });
    if (res.ok) return res.json();
    res = await fetch(`${API}/api/blogs/${slugOrId}`, { cache: "no-store" });
    if (res.ok) return res.json();
    return null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.id);
  if (!blog) {
    return { title: "Blog Post | SquarePack" };
  }

  const title = blog.meta_title || blog.title;
  const description = blog.meta_description || blog.summary || "Read the latest packaging and labeling insights from SquarePack.";

  return {
    title: `${title} | SquarePack`,
    description,
    keywords: blog.keywords ? blog.keywords.split(",").map((k) => k.trim()) : undefined,
    openGraph: {
      title,
      description,
      images: blog.cover_image ? [{ url: blog.cover_image }] : undefined,
      type: "article",
      publishedTime: blog.created_at,
      authors: [blog.author || "SquarePack"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.cover_image ? [blog.cover_image] : undefined,
    },
  };
}

function buildFAQSchema(faqs: BlogFAQ[]) {
  const validFaqs = faqs.filter((f) => f.question?.trim().endsWith("?") && f.answer?.trim());
  if (validFaqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: validFaqs.map((f) => ({
      "@type": "Question",
      name: f.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer.trim(),
      },
    })),
  };
}

export default async function SingleBlogPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const blog = await getBlog(resolvedParams.id);

  if (!blog) {
    notFound();
  }

  const faqs: BlogFAQ[] = Array.isArray(blog.faqs) ? blog.faqs : [];
  const faqSchema = faqs.length > 0 ? buildFAQSchema(faqs) : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />
      <main className="min-h-screen bg-white font-sans pt-32 sm:pt-36 md:pt-44 pb-24 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden">
        <article className="max-w-3xl mx-auto w-full">
          {/* Back link */}
          <div className="mb-8">
            <a
              href={`/${resolvedParams.locale}/blog`}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← Back to all articles
            </a>
          </div>

          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center gap-3 text-slate-500 text-sm sm:text-base">
              <span className="font-bold text-slate-900">{blog.author || "Admin"}</span>
              <span>·</span>
              <span>
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}
              </span>
            </div>
            {blog.summary && (
              <p className="mt-4 text-slate-600 text-base sm:text-lg italic max-w-2xl mx-auto leading-relaxed">
                {blog.summary}
              </p>
            )}
          </header>

          {blog.cover_image && (
            <div className="mb-12 sm:mb-14 rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
              <img
                src={blog.cover_image}
                alt={blog.title}
                className="w-full max-h-[520px] object-cover"
              />
            </div>
          )}

          <div
            className="blog-content font-serif text-[17px] sm:text-[18px] md:text-[19px] leading-relaxed text-slate-800 w-full"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* ── FAQ Section ── */}
          {faqs.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-100">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-1 h-6 bg-[#26D0A8] rounded-full inline-block" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden open:border-[#26D0A8]/40 transition-all"
                  >
                    <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none select-none font-semibold text-slate-900 text-sm sm:text-base hover:bg-slate-100/60 transition-colors gap-3">
                      <span>{faq.question}</span>
                      <span className="shrink-0 w-5 h-5 rounded-full bg-slate-200 group-open:bg-[#26D0A8] flex items-center justify-center transition-colors text-slate-600 group-open:text-white text-xs font-black">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
