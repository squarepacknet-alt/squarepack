'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useTranslations } from 'next-intl';
import AppButton from './appButton/AppButton';

// Dynamic width will be calculated in the component based on screen size

export default function Industries() {
  const t = useTranslations('Industries');
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);

  const [singleSetWidth, setSingleSetWidth] = useState(2672);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        // 4 Big (280), 4 Small (240), 8 Gaps (24) = 1120 + 960 + 192 = 2272
        setSingleSetWidth(2272);
      } else {
        setSingleSetWidth(2672);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const industryImages = [
    '/images/devices_industry_image.jpg', //'/images/gallery2.png',
    '/images/medical_industry_image.jpg', //'/images/gallery1.png',
    '/images/gallery4.png',
    '/images/oil_gas_industry_image.jpg', //'/images/gallery5.png',
    '/images/automotive_industry_image.jpg',
    '/images/aerospace_industry_image.jpg',//'/images/gallery3.png', 
    '/images/defense_industry_image.png', //gallery5.png
    '/images/renewables_industry_image.jpeg', //'/images/gallery4.png',
  ];

  const industriesData = [
    {
      id: 1,
      title: t('items.devices.title'),
      desc: t('items.devices.desc'),
      image: industryImages[0],
    },
    { id: 2, title: t('items.medical.title'), image: industryImages[1] },
    { id: 3, title: t('items.robotics.title'), image: industryImages[2] },
    { id: 4, title: t('items.oilGas.title'), image: industryImages[3] },
    { id: 5, title: t('items.automotive.title'), image: industryImages[4] },
    { id: 6, title: t('items.aerospace.title'), image: industryImages[5] },
    { id: 7, title: t('items.defense.title'), image: industryImages[6] },
    { id: 8, title: t('items.renewables.title'), image: industryImages[7] },
  ];

  // Combine exactly 3 times for seamless wrapping bounds (left and right buffer)
  const duplicatedIndustries = [
    ...industriesData,
    ...industriesData,
    ...industriesData,
  ];

  // Auto-play drift logic - Simplified and slightly faster
  useAnimationFrame((time, delta) => {
    if (isHovered || isDragging) return;

    // 40px per second drift
    const moveBy = (40 * delta) / 1000;
    let newX = x.get() - moveBy;

    // Wrap instantly
    if (newX <= -singleSetWidth) {
      newX += singleSetWidth;
    }

    x.set(newX);
  });

  // Drag wrapping
  useEffect(() => {
    return x.on('change', (latestX) => {
      if (latestX <= -singleSetWidth) {
        x.set(latestX + singleSetWidth);
      } else if (latestX > 0) {
        x.set(latestX - singleSetWidth);
      }
    });
  }, [x, singleSetWidth]);

  if (!mounted) return null;

  return (
    <section className="bg-[#f0fbfb] py-20 md:py-32 overflow-hidden relative">
      <div className="container mb-14 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-[2.75rem] font-bold mb-6 tracking-tight flex flex-wrap justify-center gap-2">
          <span className="text-[#00C9A7]">{t('titlePrefix')}</span>{' '}
          <span className="text-[#192434]">{t('titleSuffix')}</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto px-4">
          {t('description')}
        </p>
      </div>

      {/* Carousel Container - Full width bleed */}
      <div
        className="relative w-full h-[520px] mb-8 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max">
          <motion.div
            style={{ x }}
            drag="x"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="flex items-center gap-6 w-max py-4"
          >
            {duplicatedIndustries.map((item, index) => {
              const isBig = item.id % 2 !== 0;
              return (
                <motion.div
                  key={`${item.id}-${index}`}
                  className={`flex flex-col justify-end p-6 sm:p-8 text-left rtl:text-right shrink-0 shadow-lg relative overflow-hidden group rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-t from-black/80 via-black/20 to-transparent origin-center ${
                    isBig
                      ? 'w-[280px] sm:w-[330px] h-[400px] sm:h-[480px] shadow-2xl z-10'
                      : 'w-[240px] sm:w-[290px] h-[320px] sm:h-[370px]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover -z-10 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors -z-10"></div>

                  <h3
                    className={`font-bold text-white font-heading relative z-10 leading-tight ${isBig ? 'text-[1.3rem] mb-2' : 'text-xl'}`}
                  >
                    {item.title}
                  </h3>

                  {item.desc && (
                    <p className="text-white/85 text-[13px] leading-[1.6] relative z-10 group-hover:text-white transition-colors">
                      {item.desc}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Mobile-only Draggable Info - Just a hint since dots are for paginated views */}
      <div className="md:hidden flex justify-center mt-2 mb-8">
        <div className="bg-slate-200/50 px-4 py-1.5 rounded-full flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00C9A7] animate-pulse" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Live Motion • Draggable
          </span>
        </div>
      </div>

      <div className="container text-center">
        <AppButton onClick={() => (window.location.href = '/industries')}>
          {t('exploreMore')}
          <ArrowRight className="w-[16px] h-[20px] stroke-width-[2.5] rtl:rotate-180" />
        </AppButton>
      </div>
    </section>
  );
}
