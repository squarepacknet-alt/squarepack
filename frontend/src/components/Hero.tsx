'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AppButton from './appButton/AppButton';

const slides = [
  {
    id: 'c1',
    image: '/images/cosmetic_hero.png',
    label: 'Cosmetic & Beauty',
  },
  {
    id: 'c2',
    image: '/images/industrial_hero.png',
    label: 'Industrial Shipping',
  },
  { id: 'c3', image: '/images/barrels_hero.png', label: 'Pallet Bands' },
  { id: 'c4', image: '/images/security_hero.png', label: 'Electronics' },
  { id: 'c5', image: '/images/ribon_hero.png', label: 'Retail Packaging' },
  { id: 'c6', image: '/images/perfume__hero.png', label: 'Luxury Brands' },
];

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function Hero() {
  const t = useTranslations('Hero');
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = slides.length;

  const goNext = useCallback(
    () => setActive((p) => mod(p + 1, total)),
    [total],
  );
  const goPrev = useCallback(
    () => setActive((p) => mod(p - 1, total)),
    [total],
  );

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(goNext, 4000);
    return () => clearInterval(id);
  }, [isPaused, goNext]);

  const stats = [
    { value: t('stats.projects.value'), label: t('stats.projects.label') },
    { value: t('stats.clients.value'), label: t('stats.clients.label') },
    { value: t('stats.experience.value'), label: t('stats.experience.label') },
  ];

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-navbar-dark="true"
    >
      {/* ── Full-screen background slides ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[active].id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, ease: [0.32, 0, 0.15, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[active].image}
            alt={slides[active].label}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Gradient overlays for text readability ── */}

      {/* Left-side gradient: dark → transparent (covers the text panel) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.60) 30%, rgba(0,0,0,0.25) 60%, transparent 100%)',
        }}
      />

      {/* Bottom gradient: for slide label & controls */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.20) 25%, transparent 55%)',
        }}
      />

      {/* Top gradient: for navbar contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.40) 0%, transparent 20%)',
        }}
      />

      {/* ── Subtle grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)',
          backgroundSize: '70px 70px',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 h-full flex flex-col">
        {/* ── Left text panel ── */}
        <div className="flex-1 flex items-center">
          <div className="px-8 sm:px-12 lg:px-20 w-full lg:w-[52%] xl:w-[46%] pt-20">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-7"
            >
              <div className="w-10 h-[2px] bg-[#26D0A8]" />
              <span className="text-[#26D0A8] text-[11px] font-extrabold tracking-[0.22em] uppercase">
                Premium Packaging & Labeling
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="font-heading font-black text-white leading-[1.02] tracking-tight text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] mb-6"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}
            >
              Packaging That
              <br />
              <span className="text-[#26D0A8]">Speaks</span> For
              <br />
              Your Brand.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.22 }}
              className="text-white/75 text-[15.5px] leading-[1.75] max-w-[420px] mb-9"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              {t('description')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34 }}
              className="flex items-center gap-4 mb-12"
            >
              <AppButton href="/contact-us">
                {t('getStarted')}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </AppButton>
              {/* Outlined button needs a white variant on dark bg */}
              <AppButton isOutlined={true} href="/products">
                {t('viewWork')}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </AppButton>
            </motion.div>

            {/* Stats */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.46 }}
              className="flex flex-wrap sm:flex-nowrap items-center gap-y-6 gap-x-0 border-t border-white/20 pt-7"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center">
                  <div className={i === 0 ? 'pr-4 sm:pr-8' : 'px-4 sm:px-8'}>
                    <div
                      className="text-2xl sm:text-[1.65rem] font-black text-white leading-none tracking-tight"
                      style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-white/55 font-semibold uppercase tracking-widest mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="hidden sm:block h-9 w-px bg-white/20 shrink-0" />
                  )}
                </div>
              ))}
            </motion.div> */}
          </div>
        </div>

        {/* ── Bottom bar: slide label + controls ── */}
        <div className="flex items-end justify-between px-8 sm:px-12 lg:px-20 pb-8">
          {/* Active slide label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[active].id + '-label'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#26D0A8] animate-pulse" />
              <span className="text-white font-bold text-sm tracking-wide">
                {slides[active].label}
              </span>
              <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                — Premium Packaging
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Prev button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goPrev}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-[#26D0A8]/60 hover:bg-[#26D0A8]/15 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActive(i)}
                  animate={{
                    width: i === active ? 24 : 6,
                    opacity: i === active ? 1 : 0.3,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  aria-label={`Go to slide ${i + 1}`}
                  className="h-[5px] rounded-full bg-[#26D0A8]"
                />
              ))}
            </div>

            {/* Next button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goNext}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-[#26D0A8]/60 hover:bg-[#26D0A8]/15 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {/* Counter */}
            <p className="text-white/40 text-[11px] font-semibold tracking-[0.22em] uppercase ml-1">
              <span className="text-white font-bold">
                {String(active + 1).padStart(2, '0')}
              </span>
              {' / '}
              {String(total).padStart(2, '0')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
