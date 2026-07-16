/* eslint-disable react/no-unescaped-entities */
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import SubmitTestimonialForm from "@/components/SubmitTestimonialForm";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import BrochureButton from "@/components/brochure/BrochureButton";
import WhatsAppButton from "@/components/whatsapp/WhatsappButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Testimonials.metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

interface Testimonial {
  id: string;
  author: string;
  content: string;
  rating: number;
}

interface StatItem {
  label: string;
}

async function getTestimonials(locale: string): Promise<Testimonial[]> {
  try {
    const rawApiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const apiUrl = rawApiUrl.replace(/\/$/, "");
    const res = await fetch(`${apiUrl}/api/testimonials?lang=${locale}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API error");
    return res.json();
  } catch {
    // Fallback if backend is down
    return [
      {
        id: "1",
        author: "Amanda Brooks",
        content:
          "SquarePack's transition to fully sustainable corrugate saved us 20% on freight costs while massively elevating our unboxing experience.",
        rating: 5,
      },
      {
        id: "2",
        author: "Marcus Trent",
        content:
          "Their anti-static defense boxes dropped our transit damage rates to virtually zero. Cannot recommend their engineering team enough.",
        rating: 5,
      },
      {
        id: "3",
        author: "Sarah Jenkins",
        content:
          "From prototype to final production, they made the entire process flawless. Our new coffee pouches are absolutely stunning and durable.",
        rating: 5,
      },
    ];
  }
}

const avatarColors = [
  "bg-gradient-to-br from-[#28b098] to-[#1a7a6e]",
  "bg-gradient-to-br from-slate-700 to-slate-900",
  "bg-gradient-to-br from-[#d28b2e] to-[#915a13]",
  "bg-gradient-to-br from-[#8ba1a8] to-[#495b61]",
  "bg-gradient-to-br from-[#d4bc9e] to-[#a38772]",
  "bg-gradient-to-br from-[#d1ecd8] to-[#6d9678]",
];

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const testimonials = await getTestimonials(locale);
  const t = await getTranslations("Testimonials");

  const statsData = t.raw("stats") as StatItem[];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fcfdfd] overflow-hidden">
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#3de0be]/15 blur-[100px] rounded-[100%] pointer-events-none" />
          <div className="container relative z-10 text-center">
            <div className="inline-block px-5 py-2 bg-[#3de0be]/10 border border-[#3de0be]/20 rounded-full mb-7">
              <span className="text-[#20a48b] font-bold text-xs tracking-widest uppercase">
                {t("hero.badge")}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-[64px] font-heading font-extrabold text-slate-900 mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {t.rich("hero.title", {
                br: () => <br className="hidden md:block" />,
                span: (chunks) => (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#28b098] to-[#45e8c6]">
                    {chunks}
                  </span>
                ),
              })}
            </h1>
            <p className="text-slate-500 text-[17px] max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Stats bar */}
        {/* <section className="container mb-20">
          <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
            <div className="grid grid-cols-3 divide-x divide-slate-200 rtl:divide-x-reverse border border-slate-200 rounded-2xl overflow-hidden shadow-sm min-w-[480px] sm:min-w-0">
              {[
                {
                  value: `${testimonials.length}+`,
                  label: statsData[0].label,
                },
                { value: "4.9/5", label: statsData[1].label },
                { value: "200+", label: statsData[2].label },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="py-7 text-center bg-white hover:bg-[#effcfa] transition-colors"
                >
                  <div className="text-3xl md:text-4xl font-heading font-black text-slate-900 tracking-tight mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Testimonials Grid */}
        <section className="container pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={test.id}
                className="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-9 flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                {/* Top: Stars + Quote icon */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#effcfa] flex items-center justify-center group-hover:bg-[#3de0be] transition-colors duration-500">
                    <Quote className="w-5 h-5 text-[#28b098] group-hover:text-slate-900 transition-colors duration-500" />
                  </div>
                </div>

                {/* Quote Content */}
                <p className="text-slate-700 text-[15.5px] leading-relaxed flex-grow mb-8 font-medium text-left rtl:text-right">
                  "{test.content}"
                </p>

                {/* Divider */}
                <div className="h-px bg-slate-100 mb-7" />

                {/* Author */}
                <div className="flex items-center gap-4 text-left rtl:text-right">
                  {/* Avatar placeholder */}
                  <div
                    className={`w-[48px] h-[48px] rounded-full shrink-0 ${avatarColors[idx % avatarColors.length]} flex items-center justify-center shadow-md`}
                  >
                    <span className="text-white font-black text-[16px]">
                      {test.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-[15px]">
                      {test.author}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container pb-28">
          <div
            className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl"
            data-navbar-dark="true"
          >
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#3de0be]/10 blur-[100px] rounded-full -translate-x-1/3 -translate-y-1/3 group-hover:scale-125 transition-transform duration-1000 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-5 tracking-tight">
                {t.rich("cta.title", {
                  br: () => <br className="hidden md:block" />,
                  span: (chunks) => (
                    <span className="text-[#3de0be]">{chunks}</span>
                  ),
                })}
              </h2>
              <p className="text-slate-400 text-[16px] max-w-xl mx-auto mb-10 leading-relaxed">
                {t("cta.subtitle")}
              </p>
              <Link href="/contact-us">
                <button className="bg-[#3de0be] hover:bg-[#35d1b1] text-slate-900 font-bold text-[15px] tracking-wide px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_10px_30px_rgba(61,224,190,0.3)] flex items-center gap-2 mx-auto">
                  {t("cta.button")}{" "}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Public Submit Section */}
        <section className="container pb-28">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-[0_8px_40px_rgb(0,0,0,0.05)]">
            <div className="text-center mb-10">
              <div className="inline-block px-5 py-2 bg-[#3de0be]/10 border border-[#3de0be]/20 rounded-full mb-5">
                <span className="text-[#20a48b] font-bold text-xs tracking-widest uppercase">
                  {t("submitSection.badge")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight">
                {t("submitSection.title")}
              </h2>
              <p className="text-slate-500 text-[15.5px] max-w-xl mx-auto leading-relaxed">
                {t("submitSection.subtitle")}
              </p>
            </div>
            <SubmitTestimonialForm />
          </div>
        </section>
      </main>
      <Footer />
      <BrochureButton />
      <WhatsAppButton />
    </>
  );
}
