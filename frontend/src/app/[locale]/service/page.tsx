import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import {
  Palette,
  Printer,
  ShieldCheck,
  Truck,
  ArrowRight,
  Sparkles,
  Search,
  PenTool,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceDetailed" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function ServicePage() {
  const t = useTranslations("ServiceDetailed");

  const coreIcons = [
    <PenTool className="w-8 h-8" strokeWidth={1.5} />,
    <Printer className="w-8 h-8" strokeWidth={1.5} />,
    <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />,
    <Truck className="w-8 h-8" strokeWidth={1.5} />,
  ];

  const coreServices = (t.raw("core.items") as any[]).map((item, idx) => ({
    ...item,
    icon: coreIcons[idx],
  }));

  const processSteps = t.raw("process.steps") as any[];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white overflow-hidden">
        {/* Modern Minimal Hero */}
        <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 bg-[#f8fafb]">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#3de0be]/5 rounded-bl-[200px] pointer-events-none" />
          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#28b098]" />
                <span className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest">
                  {t("hero.badge")}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[84px] font-heading font-black text-slate-900 leading-[0.95] tracking-tighter mb-8">
                {t("hero.title")}
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                {t("hero.desc")}
              </p>
            </div>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-4 tracking-tight">
                {t("core.title")}
              </h2>
              <div className="w-20 h-1.5 bg-[#3de0be] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreServices.map((service, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-[#3de0be] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#3de0be] group-hover:text-slate-900 transition-colors duration-500 text-slate-600">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Dark/Contrast */}
        <section
          className="py-24 md:py-32 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-8 mb-20 relative overflow-hidden"
          data-navbar-dark="true"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3de0be]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="container relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-heading font-black mb-4 tracking-tight">
                {t("process.title")}
              </h2>
              <p className="text-slate-400 font-medium">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-[1px] border-t border-dashed border-slate-700 -translate-x-1/2" />
                  )}
                  <div className="text-6xl font-black text-[#3de0be]/20 mb-4 tracking-tighter">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 text-center">
          <div className="container">
            <div className="max-w-3xl mx-auto bg-[#3de0be] p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-[#3de0be]/20">
              <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-8 leading-tight">
                Ready to transform your packaging?
              </h2>
              <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-3 mx-auto group">
                Contact Our Experts
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
