'use client';

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight, Check, FileText, Settings, Layout, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProductDetails {
  quick_specs?: { label: string; value: string }[];
  features?: { title: string }[];
  specifications?: { label: string; value: string }[];
  applications?: { title: string }[];
}

interface Product {
  id: string;
  name: string;
  desc: string;
  name_en?: string | null;
  desc_en?: string | null;
  image_url: string | null;
  tag: string | null;
  category: string;
  details?: ProductDetails | null;
}

function formatCategoryLabel(category: string, locale: string) {
  if (locale === 'ar') return category;
  return category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ProductDetailClient({ product, locale }: { product: Product; locale: string }) {
  const [activeTab, setActiveTab] = useState<'features' | 'specifications' | 'applications'>('features');

  // Safely parse details if it's a string, otherwise use it directly
  let detailsObj = product.details;
  if (typeof product.details === 'string') {
    try {
      detailsObj = JSON.parse(product.details);
    } catch {
      detailsObj = null;
    }
  }

  const { quick_specs, features, specifications, applications } = (detailsObj || {}) as ProductDetails;

  return (
    <main className="min-h-screen bg-[#f8fafb] pt-32 pb-24 overflow-hidden">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] font-semibold mb-8 text-slate-500">
          <Link href="/" className="hover:text-[#26D0A8] transition-colors flex items-center gap-1.5">
            <Layout className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 rtl:rotate-180" />
          <Link href="/products" className="hover:text-[#26D0A8] transition-colors">
            {formatCategoryLabel(product.category, locale)}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 rtl:rotate-180" />
          <span className="text-slate-900">{product.name}</span>
        </nav>

        {/* Video Section - Coming Soon */}
        <div className="max-w-5xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900 aspect-video shadow-2xl group border border-slate-200/50"
          >
            <video 
              src="/videos/pallet_bands_video.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent pointer-events-none" />
            
            {/* Coming Soon Glassmorphism Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-md px-10 py-8 rounded-3xl border border-white/20 flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] transform transition-transform duration-500 group-hover:-translate-y-2"
              >
                <div className="inline-flex items-center gap-2 bg-[#3de0be]/20 px-4 py-1.5 rounded-full mb-4 border border-[#3de0be]/30">
                  <div className="w-2 h-2 rounded-full bg-[#3de0be] animate-pulse" />
                  <span className="text-[#3de0be] font-bold tracking-[0.2em] uppercase text-xs">Product Preview</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-heading font-black text-white tracking-tight drop-shadow-lg">
                  Coming Soon
                </h2>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Top Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          
          {/* Left: Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#3de0be]/10 blur-[100px] rounded-full" />
            <div className="relative bg-white rounded-[2rem] md:rounded-[3rem] p-6 shadow-2xl shadow-slate-200/50 overflow-hidden group">
              <div className="aspect-[4/3] relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-50">
                {product.image_url ? (
                  <Image 
                    src={product.image_url} 
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <Layout className="w-12 h-12 text-slate-300" />
                  </div>
                )}
                
                {product.tag && (
                  <div className="absolute top-6 right-6 rtl:right-auto rtl:left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-[12px] shadow-lg text-slate-800">
                    {product.tag}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full w-fit mb-6">
              <div className="w-2 h-2 rounded-full bg-[#26D0A8]" />
              <span className="text-[12px] font-bold text-slate-600 uppercase tracking-wider">Premium Product</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-heading font-black text-slate-900 mb-6 leading-tight">
              {product.name}
              {locale === "ar" && product.name_en && product.name_en !== product.name && (
                <span className="block text-xl lg:text-2xl font-medium text-slate-500 mt-2">{product.name_en}</span>
              )}
            </h1>
            
            <p className="text-slate-600 text-[16px] leading-relaxed mb-8">
              {product.desc}
              {locale === "ar" && product.desc_en && product.desc_en !== product.desc && (
                <span className="block text-sm text-slate-400 mt-2 border-t border-slate-100 pt-2">{product.desc_en}</span>
              )}
            </p>

            {/* Quick Specifications */}
            {quick_specs && quick_specs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-10 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#26D0A8]" />
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-[15px]">
                  <FileText className="w-4 h-4 text-[#26D0A8]" /> Quick Specifications
                </h3>
                <div className="space-y-3">
                  {quick_specs.map((spec, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-[14px] py-2 border-b border-slate-100 last:border-0 last:pb-0">
                      <span className="text-slate-500">{spec.label}</span>
                      <span className="font-semibold text-slate-800 sm:text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact-us" className="flex-1">
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> Request Quote
                </button>
              </Link>
              <a href="tel:+971504578900" className="flex-1">
                <button className="w-full bg-white hover:bg-slate-50 text-slate-900 font-bold py-4 rounded-xl border-2 border-slate-200 transition-all flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Call Now
                </button>
              </a>
            </div>

            {/* Contact Help */}
            <div className="bg-[#f0f9f7] rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-[13px] font-bold text-slate-800 mb-1">Need assistance? Our team is ready to help!</p>
                <div className="flex items-center gap-3 text-[13px] text-slate-600 font-medium">
                  <span>+971 50 457 8900</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span>sales@squarepack.net</span>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Bottom Tabs Section */}
        <div className="max-w-5xl mx-auto">
          {/* Tab Headers */}
          <div className="flex flex-col sm:flex-row bg-slate-100 p-1.5 rounded-2xl mb-10 overflow-x-auto no-scrollbar">
            {(['features', 'specifications', 'applications'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all capitalize whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {tab === 'features' && <Check className="w-4 h-4" />}
                {tab === 'specifications' && <Settings className="w-4 h-4" />}
                {tab === 'applications' && <Layout className="w-4 h-4" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-heading font-black text-slate-900 mb-8">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-6 gap-y-8">
                    {features && features.length > 0 ? (
                      features.map((f, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#3de0be] shrink-0 flex items-center justify-center mt-0.5">
                            <Check className="w-4 h-4 text-slate-900" strokeWidth={3} />
                          </div>
                          <span className="text-slate-600 font-medium leading-relaxed">{f.title}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">No features listed.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'specifications' && (
                <motion.div
                  key="specifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-heading font-black text-slate-900 mb-8">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                    {specifications && specifications.length > 0 ? (
                      specifications.map((s, i) => (
                        <div key={i} className="flex flex-col border-b border-slate-100 pb-4">
                          <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-1">{s.label}</span>
                          <span className="font-semibold text-slate-800">{s.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">No specifications listed.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'applications' && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-heading font-black text-slate-900 mb-8">Ideal Applications</h3>
                  <div className="grid md:grid-cols-2 gap-6 gap-y-8">
                    {applications && applications.length > 0 ? (
                      applications.map((a, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-[#3de0be]" />
                          </div>
                          <span className="text-slate-600 font-medium leading-relaxed">{a.title}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">No applications listed.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Ready to Order CTA */}
      <section className="mt-32">
        <div className="bg-slate-900 py-20 relative overflow-hidden" data-navbar-dark="true">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3de0be] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container relative z-10 text-center max-w-2xl">
            <h2 className="text-4xl font-heading font-black text-white mb-6">Ready to Order?</h2>
            <p className="text-slate-300 text-[17px] mb-10 leading-relaxed">
              Get in touch with our team for custom quotes, bulk orders, or technical assistance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact-us">
                <button className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-900 font-bold px-10 py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                  <Mail className="w-4 h-4" /> Contact Us
                </button>
              </Link>
              <Link href="/products">
                <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all">
                  <Layout className="w-4 h-4" /> View All Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
