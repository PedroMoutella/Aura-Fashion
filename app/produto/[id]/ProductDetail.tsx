"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Heart, Check } from "lucide-react";
import { Product, formatPrice, calcularPrestacoes } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export function ProductDetail({ product }: { product: Product }) {
  const { addToCart, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const prestacoes = calcularPrestacoes(product.price);

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && product.sizes[0] !== "Único" && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart(product);
    setAdded(true);
    setTimeout(() => { setAdded(false); setCartOpen(true); }, 300);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-widest text-charcoal/50 uppercase hover:text-[#C9A84C] transition-colors"
        >
          <ArrowLeft size={14} />
          Voltar à coleção
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#F8F8F5]"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.tag && (
              <span className="absolute top-5 left-5 px-3 py-1.5 bg-[#C9A84C] text-white text-[10px] tracking-widest uppercase rounded-full font-medium">
                {product.tag}
              </span>
            )}
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-5 right-5 p-3 bg-white/80 backdrop-blur-sm rounded-full transition-all hover:scale-110"
            >
              <Heart
                size={18}
                className={liked ? "fill-[#C9A84C] text-[#C9A84C]" : "text-charcoal/40"}
              />
            </button>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs tracking-widest text-[#C9A84C] uppercase mb-2">{product.category}</span>
            <h1 className="text-2xl md:text-3xl font-light text-charcoal mb-4 leading-tight">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-semibold text-charcoal">{formatPrice(product.price)}</p>
              <p className="text-sm text-charcoal/40 mt-1">
                ou {prestacoes[5].prestacoes}x {formatPrice(prestacoes[5].valorPrestacao)} c/ juros
                &nbsp;·&nbsp; até {prestacoes[2].prestacoes}x {formatPrice(prestacoes[2].valorPrestacao)} s/ juros
              </p>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-xs tracking-widest text-charcoal/50 uppercase mb-3">
                Cor: <span className="text-charcoal font-medium">{product.colors[selectedColor].name}</span>
              </p>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(i)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === i
                        ? "border-[#C9A84C] scale-110 shadow-[0_0_0_2px_white,0_0_0_4px_#C9A84C]"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <p className={`text-xs tracking-widest uppercase mb-3 transition-colors ${sizeError ? "text-red-500" : "text-charcoal/50"}`}>
                {sizeError ? "Selecione um tamanho" : "Tamanho"}
                {selectedSize && <span className="text-charcoal font-medium ml-1">: {selectedSize}</span>}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-charcoal text-cream border-charcoal"
                        : "bg-white text-charcoal border-[#E8E8E0] hover:border-[#C9A84C] hover:text-[#C9A84C]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-charcoal/60 text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Add to cart */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-3 w-full py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                added
                  ? "bg-[#C9A84C] text-white"
                  : "bg-charcoal text-cream hover:bg-[#C9A84C]"
              }`}
            >
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              {added ? "Adicionado!" : "Adicionar ao Carrinho"}
            </motion.button>

            {/* Trust badges */}
            <div className="flex gap-6 mt-6 pt-6 border-t border-[#E8E8E0]">
              {[
                { icon: "📦", text: "Envio CTT" },
                { icon: "↩️", text: "14 dias devolução" },
                { icon: "🔒", text: "Pagamento seguro" },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-1.5 text-xs text-charcoal/40">
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
