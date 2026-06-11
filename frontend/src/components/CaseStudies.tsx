import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CaseStudies() {
  const t = useTranslations('CaseStudies');
  
  const placeholders = [
    { bg: "bg-[#d3e3dd]", text: "text-[#104e3e]" },
    { bg: "bg-[#e5e7eb]", text: "text-slate-800" },
    { bg: "bg-[#f5e9da]", text: "text-[#8c5a2c]" }
  ];

  const items = t.raw('items') as Array<{metric: string, metricDesc: string, title: string, client: string}>;

  return (
    <section className="bg-[#fcfdfd] py-12 md:py-16 lg:py-20 flex flex-col justify-center min-h-[min(100vh,800px)]">
      <div className="container">
        {/* Header - Scaled down */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-12 gap-6">
          <div className="max-w-2xl text-left rtl:text-right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 mb-3 tracking-tight leading-snug">
              {t.rich('title', {
                br: () => <br/>
              })}
            </h2>
            <p className="text-slate-500 text-[15px] md:text-base leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
          <button className="flex items-center gap-2 group text-slate-900 font-bold text-sm hover:text-[#28b098] transition-colors whitespace-nowrap bg-white border-2 border-slate-200 px-5 py-2.5 rounded-full hover:border-[#28b098]">
            {t('viewAll')}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:rotate-[-90deg] rtl:group-hover:-translate-x-0.5" />
          </button>
        </div>

        {/* Grid Container / Mobile Carousel */}
        <div className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 md:pb-0">
          {items.map((study, index) => {
            const style = placeholders[index % placeholders.length];
            return (
              <div key={index} className="group cursor-pointer flex flex-col min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center">
                {/* Cards - Scaled to shorter landscape-ish boxes */}
                <div className={`w-full h-[220px] lg:h-[260px] rounded-[24px] ${style.bg} mb-5 relative overflow-hidden flex flex-col justify-between p-5 lg:p-8 transition-transform duration-500 group-hover:-translate-y-1.5 shadow-sm`}>
                  
                  {/* Client Label */}
                  <div className="bg-white/50 backdrop-blur-md self-start px-3.5 py-1.5 rounded-xl shadow-sm">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${style.text}`}>
                      {study.client}
                    </span>
                  </div>

                  {/* Metrics */}
                  <div className="text-left rtl:text-right">
                    <h3 className={`text-5xl lg:text-6xl font-heading font-black tracking-tight ${style.text}`}>
                      {study.metric}
                    </h3>
                    <p className={`${style.text} font-semibold text-[13px] uppercase tracking-wide opacity-90 mt-1`}>
                      {study.metricDesc}
                    </p>
                  </div>
                  
                  {/* Subtle overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Text content below */}
                <div className="px-1 text-left rtl:text-right">
                  <h4 className="text-[19px] lg:text-[21px] font-heading font-bold text-slate-900 group-hover:text-[#28b098] transition-colors mb-2">
                    {study.title}
                  </h4>
                  <div className="h-[3px] w-0 bg-[#28b098] group-hover:w-10 transition-all duration-300 ease-out rounded-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
