import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function AboutHero() {
  const t = useTranslations('About.hero');

  return (
    <section className="bg-gradient-to-b from-[#e8fdf7]/50 to-white pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
      <div className="container">

        {/* Full-width image banner with title overlay */}
        <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[16/6]">
          <Image
            src="/images/about_us.jpeg"
            alt="About SquarePack"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-6 left-7">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-heading font-extrabold text-white tracking-tight">
              {t('title')}
            </h1>
          </div>
        </div>

        {/* Description + Mission + Vision — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-start">

          {/* Description */}
          <div className="md:col-span-1 space-y-4 text-slate-600 text-[15px] leading-relaxed rtl:text-right pt-1">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>

          {/* Mission Card */}
          <div className="bg-white border border-[#d5ebe8]/60 rounded-xl p-5 lg:p-6 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-[#e8fdf7] flex items-center justify-center mb-3">
              {/* swap for your icon component */}
              <span className="text-[#28b098] text-lg">⊙</span>
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 mb-1.5">
              {t('mission.title')}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t('mission.desc')}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white border border-[#d5ebe8]/60 rounded-xl p-5 lg:p-6 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-lg bg-[#e8fdf7] flex items-center justify-center mb-3">
              <span className="text-[#28b098] text-lg">◎</span>
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 mb-1.5">
              {t('vision.title')}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t('vision.desc')}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}