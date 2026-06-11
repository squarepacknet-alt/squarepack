import { Award, Target, Users, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutStats() {
  const t = useTranslations('About');
  
  const icons = [
    <Award key="award" className="w-6 h-6 text-[#28b098]" strokeWidth={2} />,
    <Target key="target" className="w-6 h-6 text-[#28b098]" strokeWidth={2} />,
    <Users key="users" className="w-6 h-6 text-[#28b098]" strokeWidth={2} />,
    <TrendingUp key="trending" className="w-6 h-6 text-[#28b098]" strokeWidth={2} />
  ];

  const stats = t.raw('stats') as Array<{value: string, label: string}>;

  return (
    <section className="bg-white py-12 md:py-20 relative z-10">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-start rtl:items-end hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#f0fbfb] flex items-center justify-center mb-6">
                {icons[i % icons.length]}
              </div>
              <h3 className="text-4xl font-heading font-black text-slate-900 tracking-tight mb-2">
                {stat.value}
              </h3>
              <p className="text-slate-500 font-medium text-[13.5px] text-left rtl:text-right">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
