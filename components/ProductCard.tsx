"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart } from "lucide-react";
import { Product, formatPrice, calcularParcelas } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  delay?: number;
}

export function ProductCard({ product, onAddToCart, delay = 0 }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const parcelas = calcularParcelas(product.price);
  const parcelaMax = parcelas[5];

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      id={`produto-${product.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E8E8E0] hover:border-[#E8D5A3] hover:shadow-[0_8px_40px_rgba(201,168,76,0.12)] transition-all duration-500"
    >
      <Link href={`/produto/${product.id}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F8F8F5]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          </motion.div>

          {/* Tag */}
          {product.tag && (
            <span className="absolute top-3 left-3 px-2 py-1 bg-[#C9A84C] text-white text-[10px] tracking-widest uppercase rounded-full font-medium">
              {product.tag}
            </span>
          )}

          {/* Like */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked(!liked); }}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          >
            <Heart
              size={14}
              className={liked ? "fill-[#C9A84C] text-[#C9A84C]" : "text-charcoal/40"}
            />
          </button>

          {/* Color swatches preview */}
          <div className="absolute bottom-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color.name}
                className="w-4 h-4 rounded-full border border-white/60 shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[10px] tracking-widest text-[#C9A84C] uppercase mb-1">{product.category}</p>
          <h3 className="text-sm font-medium text-charcoal mb-2 line-clamp-1">{product.name}</h3>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-base font-semibold text-charcoal">{formatPrice(product.price)}</p>
              <p className="text-[11px] text-charcoal/40">
                6 prest. {formatPrice(parcelaMax.valorPrestacao)} c/ juros
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleAdd}
              className={`p-2.5 rounded-full transition-all duration-300 ${
                added
                  ? "bg-[#C9A84C] text-white"
                  : "bg-[#F8F8F5] text-charcoal hover:bg-[#C9A84C] hover:text-white"
              }`}
            >
              <ShoppingBag size={15} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
