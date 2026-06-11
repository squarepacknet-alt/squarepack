'use client';
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";

export default function PreFooterGallery() {
  const t = useTranslations('Gallery');
  
  const galleryImages = [
    "/images/gallery1.png",
    "/images/gallery2.png",
    "/images/gallery3.png",
    "/images/gallery4.png",
    "/images/gallery5.png",
    "/images/gallery6.png",
  ];

  const designTokens = [
    { id: 1, height: "h-[220px] md:h-[240px] lg:h-[280px]" },
    { id: 2, height: "h-[440px] md:h-[480px] lg:h-[560px]" },
    { id: 3, height: "h-[440px] md:h-[480px] lg:h-[560px]" },
    { id: 4, height: "h-[220px] md:h-[240px] lg:h-[280px]" },
    { id: 5, height: "h-[440px] md:h-[480px] lg:h-[560px]" },
    { id: 6, height: "h-[220px] md:h-[240px] lg:h-[280px]" }
  ];

  const items = t.raw('items') as Array<{id?: string, title: string, desc: string}>;
  
  const portfolioItems = items.map((item, idx) => ({
    ...item,
    ...designTokens[idx % designTokens.length],
    image: galleryImages[idx % galleryImages.length],
    slug: item.id || item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  }));

  return (
    <section className="bg-[#f6fbfb] py-16 md:py-20 lg:py-24"> 
      <div className="container">
        {/* Mobile Carousel (Single Image) */}
        <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 gap-4 px-4 -mx-4">
          {portfolioItems.map((item, idx) => (
            <div key={idx} className="w-[calc(100%-32px)] flex-shrink-0 snap-center first:ml-4 last:mr-4">
              <GalleryCard item={item} isMobile />
            </div>
          ))}
        </div>

        {/* Desktop 3-Column Masonry Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 overflow-x-auto no-scrollbar">
          
          {/* Column 1: Short Top, Tall Bottom */}
          <div className="flex flex-col gap-6">
            <GalleryCard item={portfolioItems[0]} />
            <GalleryCard item={portfolioItems[1]} />
          </div>

          {/* Column 2: Tall Top, Short Bottom */}
          <div className="flex flex-col gap-6">
            <GalleryCard item={portfolioItems[2]} />
            <GalleryCard item={portfolioItems[3]} />
          </div>

          {/* Column 3: Tall Top, Short Bottom */}
          <div className="flex flex-col gap-6">
            <GalleryCard item={portfolioItems[4]} />
            <GalleryCard item={portfolioItems[5]} />
          </div>

        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, isMobile }: { item: any; isMobile?: boolean }) {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/products/${item.slug}` as any);
  };

  return (
    <div onClick={handleCardClick} className="block w-full">
      <div
        tabIndex={0}
        className={`relative w-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer bg-slate-100 ${isMobile ? "h-[440px]" : item.height} shadow-sm focus:outline-none`}
      >
        {/* Background Image */}
        <img 
          src={item.image} 
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] group-focus:scale-[1.03] origin-center"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 lg:p-8 text-left rtl:text-right">
          <h3 className="text-white font-heading font-bold text-[1.35rem] lg:text-2xl translate-y-6 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-500 ease-out">
            {item.title}
          </h3>
          <p className="text-white/80 font-sans mt-2 lg:mt-3 text-sm lg:text-[15px] translate-y-8 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-500 delay-[50ms] ease-out leading-relaxed max-w-[95%]">
            {item.desc}
          </p>

          {/* Hover Action Icon */}
          <div className="absolute top-6 right-6 rtl:right-auto rtl:left-6 w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 delay-100 group-hover:-translate-y-1 group-focus:-translate-y-1 group-hover:translate-x-1 group-focus:translate-x-1 rtl:group-hover:-translate-x-1 rtl:group-focus:-translate-x-1 shadow-lg">
            <ArrowUpRight className="text-white w-5 h-5 lg:w-6 lg:h-6 rtl:rotate-[-90deg]" />
          </div>
        </div>
      </div>
    </div>
  );
}
