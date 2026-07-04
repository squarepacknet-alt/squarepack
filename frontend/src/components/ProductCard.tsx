"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  desc: string;
  image_url: string | null;
  tag: string | null;
  category: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
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
          <h3 className="product-showcase-card__title">{product.name}</h3>
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
              </h3>
              <p className="product-showcase-card__info-desc">
                {product.desc}
              </p>
              <Link
                href={`/products/${product.id}`}
                className="product-showcase-card__cta"
              >
                <span>LEARN MORE</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card */}
      <Link href={`/products/${product.id}`} className="block md:hidden">
        <div className="product-mobile-card">
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
            <h3 className="product-mobile-card__title">{product.name}</h3>
            <p className="product-mobile-card__desc">{product.desc}</p>
            <div className="product-mobile-card__link">
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
