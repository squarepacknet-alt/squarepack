"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

interface Product {
  id: string;
  name: string;
  desc: string;
  name_en?: string | null;
  desc_en?: string | null;
  image_url: string | null;
  tag: string | null;
  category: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const t = useTranslations("Products");
  const locale = useLocale();

  return (
    <>
      {/* Desktop Card (Accordion Showcase style) */}
      <div className={`hidden md:block product-showcase-card ${className}`}>
        {/* Background Image */}
        <div className="product-showcase-card__image">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="product-showcase-card__placeholder" />
          )}
          {/* Gradient overlay */}
          <div className="product-showcase-card__gradient" />
        </div>

        {/* Default state: Product name at bottom */}
        <div className="product-showcase-card__default">
          <h3 className="product-showcase-card__title">
            {product.name}
            {locale === "ar" && product.name_en && product.name_en !== product.name && (
              <span className="block text-sm font-medium opacity-80 mt-1">{product.name_en}</span>
            )}
          </h3>
        </div>

        {/* Hovered state: Info panel */}
        <div className="product-showcase-card__hover">
          <div className="product-showcase-card__info-panel">
            {/* Decorative circles */}
            <div className="product-showcase-card__deco product-showcase-card__deco--1" />
            <div className="product-showcase-card__deco product-showcase-card__deco--2" />
            <div className="product-showcase-card__deco product-showcase-card__deco--3" />

            <div className="product-showcase-card__info-content">
              <h3 className="product-showcase-card__info-title">
                {product.name}
                {locale === "ar" && product.name_en && product.name_en !== product.name && (
                  <span className="block text-sm font-medium opacity-80 mt-1">{product.name_en}</span>
                )}
              </h3>
              <p className="product-showcase-card__info-desc">
                {product.desc}
                {locale === "ar" && product.desc_en && product.desc_en !== product.desc && (
                  <span className="block text-[13px] opacity-70 mt-2 border-t border-white/20 pt-2">{product.desc_en}</span>
                )}
              </p>
              <Link
                href={`/products/${product.id}`}
                className="product-showcase-card__cta"
              >
                <span>{t("learnMore")}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card */}
      <Link href={`/products/${product.id}`} className={`block md:hidden ${className}`}>
        <div className="product-mobile-card w-full">
          <div className="product-mobile-card__image">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="100vw"
              />
            ) : (
              <div className="product-mobile-card__placeholder" />
            )}
            <div className="product-mobile-card__gradient" />
          </div>
          <div className="product-mobile-card__content">
            <h3 className="product-mobile-card__title">
              {product.name}
              {locale === "ar" && product.name_en && product.name_en !== product.name && (
                <span className="block text-xs font-medium opacity-80 mt-0.5">{product.name_en}</span>
              )}
            </h3>
            <p className="product-mobile-card__desc">
              {product.desc}
              {locale === "ar" && product.desc_en && product.desc_en !== product.desc && (
                <span className="block text-[11px] opacity-75 mt-1">{product.desc_en}</span>
              )}
            </p>
            <div className="product-mobile-card__link">
              <span>{t("learnMore")}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
