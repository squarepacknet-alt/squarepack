'use client';

import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface ProductCardProps {
  name: string;
  desc: string;
  tag?: string | null;
  image?: string;
  placeholder?: string;
  category?: string;
  index?: number;
  variant?: 'featured' | 'list';
  id?: string;
}

function formatCategoryLabel(category?: string) {
  if (!category) return '';
  return category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ProductCard({
  name,
  desc,
  tag,
  image,
  placeholder,
  category,
  index = 0,
  variant = 'featured',
  id,
}: ProductCardProps) {
  const isFeatured = variant === 'featured';
  const href = id ? `/products/${id}` : '/products';

  if (isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative h-[420px] lg:h-[480px] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
      >
        <Link href={href} className="absolute inset-0 z-20" aria-label={`View details for ${name}`} />
        
        {/* Background Image */}
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div
            className={`absolute inset-0 ${placeholder || 'bg-slate-200'}`}
          />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500" />
        <div className="absolute inset-0 bg-[#28b098]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end text-left rtl:text-right">
          {/* Tag */}
          {tag && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 self-start bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 border border-white/20"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-[12px] font-bold text-white uppercase tracking-widest">
                {tag}
              </span>
            </motion.div>
          )}

          {/* Name */}
          <h3 className="text-2xl lg:text-3xl font-heading font-extrabold text-white mb-2 tracking-tight transition-transform duration-500">
            {name}
          </h3>

          {/* Description & CTA - Revealed on hover with height transition */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out overflow-hidden">
            <div className="min-h-0">
              <p className="text-white/70 text-[15px] lg:text-[16px] leading-relaxed mb-6 mt-2 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {desc}
              </p>

              <div className="flex items-center gap-4 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg group-hover:bg-[#3de0be] group-hover:border-[#3de0be] transition-all duration-300">
                  <ArrowRight className="w-6 h-6 text-white group-hover:text-slate-900 rtl:rotate-180" />
                </div>
                <span className="text-white text-sm font-bold tracking-widest uppercase">
                  View Details
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // List Variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col rounded-[24px] overflow-hidden bg-white border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative cursor-pointer"
    >
      <Link href={href} className="absolute inset-0 z-20" aria-label={`View details for ${name}`} />
      
      {/* Visual Area */}
      <div
        className={`w-full h-[240px] md:h-[280px] relative ${placeholder || 'bg-slate-100'} overflow-hidden`}
      >
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {tag && (
          <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 border border-white/10">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              {tag}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Area */}
      <div className="bg-[#1A1A1A] p-8 flex flex-col flex-grow relative overflow-hidden text-left rtl:text-right">
        {category && (
          <span className="text-[#3de0be] text-[12px] font-bold uppercase tracking-[0.2em] mb-3 block opacity-80">
            {formatCategoryLabel(category)}
          </span>
        )}
        <h3 className="text-[22px] md:text-[24px] font-heading font-bold text-white mb-3 transition-colors group-hover:text-[#3de0be]">
          {name}
        </h3>
        <p className="text-white/60 text-[15px] leading-relaxed mb-6 line-clamp-2 group-hover:text-white/80 transition-colors">
          {desc}
        </p>

        {/* Arrow Link */}
        <div className="mt-auto flex justify-end">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-[#3de0be] group-hover:border-[#3de0be] transition-all duration-300">
            <ArrowRight className="w-5 h-5 text-white group-hover:text-slate-900 rtl:rotate-180" />
          </div>
        </div>

        {/* Subtle background glow on hover */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#3de0be]/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </motion.div>
  );
}
