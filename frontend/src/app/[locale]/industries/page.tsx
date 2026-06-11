import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  ShoppingBag,
  Pill,
  Monitor,
  Sparkle,
  Home,
  Factory,
  Truck,
  Store,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import AppButton from "@/components/appButton/AppButton";
import BrochureButton from "@/components/brochure/BrochureButton";
import WhatsAppButton from "@/components/whatsapp/WhatsappButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Industries.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function IndustriesPage() {
  const t = useTranslations("Industries");

  const icons = [
    <ShoppingBag className="w-8 h-8" strokeWidth={1.5} />,
    <Pill className="w-8 h-8" strokeWidth={1.5} />,
    <Monitor className="w-8 h-8" strokeWidth={1.5} />,
    <Sparkle className="w-8 h-8" strokeWidth={1.5} />,
    <Home className="w-8 h-8" strokeWidth={1.5} />,
    <Factory className="w-8 h-8" strokeWidth={1.5} />,
    <Truck className="w-8 h-8" strokeWidth={1.5} />,
    <Store className="w-8 h-8" strokeWidth={1.5} />,
  ];

  const sectors = (t.raw("sectors") as any[]).map((sector, idx) => ({
    ...sector,
    icon: icons[idx % icons.length],
  }));

  const stats = t.raw("stats") as any[];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#fcfdfd] overflow-hidden">
        {/* Asymmetrical Sleek Hero Section */}
        <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden border-b border-slate-100">
          {/* Background shape: RTL aware */}
          <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-[50vw] h-[100%] bg-slate-900 rounded-bl-[10rem] rtl:rounded-bl-none rtl:rounded-br-[10rem] hidden lg:block pointer-events-none shadow-2xl" />
          <div className="absolute top-1/4 right-[25vw] rtl:right-auto rtl:left-[25vw] w-[400px] h-[400px] bg-[#3fe6c2]/20 blur-[100px] rounded-[100%] pointer-events-none hidden lg:block" />

          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Text Side Content */}
              <div className="lg:pr-8 rtl:lg:pr-0 rtl:lg:pl-8 text-center lg:text-left rtl:lg:text-right animate-in fade-in slide-in-from-left-8 rtl:slide-in-from-right-8 duration-1000">
                <div className="inline-block px-4 py-2 bg-[#3de0be]/10 border border-[#3de0be]/20 rounded-full mb-6">
                  <span className="text-[#20a48b] font-bold text-xs tracking-widest uppercase flex items-center">
                    <Building2 className="w-3.5 h-3.5 mr-2 rtl:mr-0 rtl:ml-2" />
                    {t("hero.badge")}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-heading font-black text-slate-900 mb-6 tracking-tight leading-[1.05]">
                  {t.rich("hero.title", {
                    br: () => <br />,
                    span: (chunks) => (
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#28b098] to-[#45e8c6]">
                        {chunks}
                      </span>
                    ),
                  })}
                </h1>

                <p className="text-slate-500 font-medium text-[17px] leading-relaxed mb-10 max-w-lg">
                  {t("hero.subtitle")}
                </p>
                <AppButton isOutlined={true} href="/contact-us">
                  {t("hero.button")}{" "}
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
                </AppButton>
              </div>

              {/* Info Stats Panel */}
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 rtl:slide-in-from-left-8 duration-1000 delay-300 fill-mode-both">
                {/* Modern Glass Stat Card */}
                <div className="bg-slate-800/40 lg:bg-white/10 backdrop-blur-2xl border border-slate-700/50 lg:border-white/20 p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-32 h-32 bg-[#3de0be]/30 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2 transform group-hover:scale-150 transition-all duration-700" />
                  <div className="text-6xl font-black text-white mb-2 tracking-tighter text-left rtl:text-right">
                    {stats[0].value}
                  </div>
                  <div className="text-[#3de0be] font-bold uppercase tracking-widest text-sm mb-1 text-left rtl:text-right">
                    {stats[0].label}
                  </div>
                  <div className="text-slate-400 text-sm text-left rtl:text-right">
                    {stats[0].desc}
                  </div>
                </div>

                <div className="bg-[#3de0be] border border-[#2bbd9f]/30 p-10 rounded-[2rem] shadow-xl relative overflow-hidden group ml-0 lg:ml-12 rtl:lg:ml-0 rtl:lg:mr-12 transform hover:-translate-y-2 transition-transform duration-500">
                  <div className="text-6xl font-black text-slate-900 mb-2 tracking-tighter text-left rtl:text-right">
                    {stats[1].value}
                  </div>
                  <div className="text-slate-900 font-bold uppercase tracking-widest text-sm mb-1 text-left rtl:text-right">
                    {stats[1].label}
                  </div>
                  <div className="text-slate-800 text-sm font-medium text-left rtl:text-right">
                    {stats[1].desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 relative">
          <div className="container">
            <div className="text-center md:text-left rtl:md:text-right mb-16 flex flex-col md:flex-row rtl:md:flex-row-reverse justify-between items-end gap-6 border-b border-slate-200/60 pb-8">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-[56px] font-heading font-extrabold text-slate-900 tracking-tight mb-4">
                  {t("sectorsGrid.title")}
                </h2>
                <p className="text-slate-500 text-[16px] max-w-xl">
                  {t("sectorsGrid.subtitle")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
              {sectors.map((sector, index) => (
                <div
                  key={index}
                  className="relative group bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 hover:bg-[#3de0be] transition-colors duration-500 overflow-hidden flex flex-col sm:flex-row rtl:sm:flex-row-reverse items-start gap-8 hover:shadow-[0_20px_60px_rgba(61,224,190,0.25)] animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both cursor-crosshair"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Floating background icon watermark */}
                  <div className="absolute -right-4 -bottom-4 rtl:-right-auto rtl:-left-4 text-slate-900 opacity-[0.02] group-hover:opacity-10 transform scale-[5] md:scale-[6] transition-all duration-700 pointer-events-none rotate-12 group-hover:rotate-0">
                    {sector.icon}
                  </div>

                  {/* Icon Box */}
                  <div className="w-[70px] h-[70px] shrink-0 rounded-2xl bg-[#effcfa] flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-500 relative z-10 shadow-sm border border-slate-100 group-hover:border-slate-800">
                    <div className="text-[#28b098] group-hover:text-[#3de0be] transition-colors duration-500">
                      {sector.icon}
                    </div>
                  </div>

                  {/* Text Block */}
                  <div className="relative z-10 pt-2 text-left rtl:text-right">
                    <h3 className="text-2xl font-heading font-black text-slate-900 mb-3 tracking-tight group-hover:text-slate-900">
                      {sector.title}
                    </h3>
                    <p className="text-slate-500 text-[15px] leading-relaxed group-hover:text-slate-800 font-medium pb-2">
                      {sector.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-32 bg-white">
          <div className="container">
            <div
              className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden group"
              data-navbar-dark="true"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3de0be]/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-150" />
              <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-8 relative z-10 leading-tight">
                Custom Solutions for <br />
                <span className="text-[#3de0be]">Every Industry</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto relative z-10">
                No matter your sector, we have the material expertise and design
                capability to elevate your packaging.
              </p>
              <AppButton href="/contact-us">
                Start Your Project{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </AppButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BrochureButton />
      <WhatsAppButton />
    </>
  );
}
