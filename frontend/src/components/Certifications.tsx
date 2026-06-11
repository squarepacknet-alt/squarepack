/* eslint-disable react/jsx-key */
import { ShieldCheck, Leaf, Award, Recycle, Factory } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Certifications() {
  const t = useTranslations("Certifications");

  const icons = [
    <ShieldCheck className="w-8 h-8" />,
    <Recycle className="w-8 h-8" />,
    <Leaf className="w-8 h-8" />,
    <Award className="w-8 h-8" />,
    <Factory className="w-8 h-8" />,
  ];

  const items = t.raw("items") as Array<{ label: string; desc: string }>;

  return (
    <section className="bg-slate-950 py-12 md:py-16" data-navbar-dark="true">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-[25%] text-center md:text-left rtl:md:text-right">
            <h3 className="text-white font-heading font-bold text-xl md:text-2xl leading-snug">
              {t("titlePrefix")}{" "}
              <span className="text-[#28b098]">{t("titleSuffix")}</span>
            </h3>
            <p className="text-slate-400 text-sm mt-2">{t("subtitle")}</p>
          </div>

          <div className="md:w-[75%] w-full overflow-x-auto snap-x snap-mandatory flex md:grid md:grid-cols-5 gap-6 md:gap-4 no-scrollbar pb-4 md:pb-0">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-3 group min-w-[140px] md:min-w-0 snap-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-[#28b098]/20 flex items-center justify-center text-slate-300 group-hover:text-[#28b098] transition-all duration-300 transform group-hover:-translate-y-1">
                  {icons[index % icons.length]}
                </div>
                <div className="text-center">
                  <h4 className="text-white font-semibold text-sm tracking-wide">
                    {item.label}
                  </h4>
                  <p className="text-slate-500 text-[11px] font-medium mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
