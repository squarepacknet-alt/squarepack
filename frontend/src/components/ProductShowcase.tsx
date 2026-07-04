"use client";

import ProductCard from "@/components/ProductCard";

interface Product {
  id: string;
  name: string;
  desc: string;
  image_url: string | null;
  tag: string | null;
  category: string;
}

interface ProductShowcaseProps {
  products: Product[];
  /** Number of products to show per row (default: 3) */
  columns?: number;
}

function ProductShowcaseRow({ products }: { products: Product[] }) {
  return (
    <div className="product-showcase-row">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductShowcase({
  products,
  columns = 3,
}: ProductShowcaseProps) {
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += columns) {
    rows.push(products.slice(i, i + columns));
  }

  return (
    <div className="w-full">
      {/* Desktop: Horizontal accordion rows */}
      <div className="hidden md:flex flex-col gap-5">
        {rows.map((row, rowIndex) => (
          <ProductShowcaseRow key={rowIndex} products={row} />
        ))}
      </div>

      {/* Mobile: Vertical card stack */}
      <div className="md:hidden flex flex-col gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
