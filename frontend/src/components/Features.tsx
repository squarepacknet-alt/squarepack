'use client';
import { Shield, Zap, Leaf, Home } from 'lucide-react'; // Removed the 15+ years of experience with in-house production
import { useTranslations } from 'next-intl';
import AppButton from './appButton/AppButton';

export default function Features() {
  const t = useTranslations('Features');

  const icons = [Home, Shield, Zap, Leaf];

  const items = t.raw('items') as Array<{ title: string; description: string }>;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20 relative">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900">
            {t('title')}
          </h2>
          {/* Underline beneath the title */}
          <div className="w-24 h-1 bg-[#34E8BB] mx-auto mt-4 absolute left-1/2 -translate-x-1/2 -bottom-4" />
        </div>

        {/* Grid Container / Mobile Carousel */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-16 text-center overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 md:pb-0">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="min-w-[80vw] sm:min-w-[280px] md:min-w-0 snap-center"
              >
                <div className="w-16 h-16 mx-auto bg-[#34E8BB] rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-[#000000]" />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <AppButton
            type="button"
            onClick={() =>
              window.open(
                'https://cdn.squarepack.net/SQUAREPACK-BROCHURE.pdf',
                '_blank',
              )
            }
          >
            {t('getQuote')}
          </AppButton>
        </div>
      </div>
    </section>
  );
}
