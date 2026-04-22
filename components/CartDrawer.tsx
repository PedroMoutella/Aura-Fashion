"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, MapPin } from "lucide-react";
import Image from "next/image";
import { Product, formatPrice, calcularFrete } from "@/lib/products";

interface CartItem {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemove }: CartDrawerProps) {
  const [codigoPostal, setCodigoPostal] = useState("");
  const [freteOpcoes, setFreteOpcoes] = useState<ReturnType<typeof calcularFrete> | null>(null);
  const [freteSelected, setFreteSelected] = useState<number | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);

  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.qty, 0);
  const freteCusto = freteSelected !== null && freteOpcoes ? freteOpcoes[freteSelected].valor : 0;
  const total = subtotal + freteCusto;

  const handleCalcFrete = () => {
    if (codigoPostal.replace(/\D/g, "").length < 7) return;
    setCalcLoading(true);
    setTimeout(() => {
      setFreteOpcoes(calcularFrete(codigoPostal));
      setCalcLoading(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-cream shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E8E0]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#C9A84C]" />
                <h2 className="font-medium text-charcoal tracking-wide">Sacola</h2>
                <span className="text-xs text-charcoal/40">({items.reduce((a, i) => a + i.qty, 0)} itens)</span>
              </div>
              <button onClick={onClose} className="p-1.5 text-charcoal/40 hover:text-charcoal rounded-full hover:bg-[#F0F0EC] transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-charcoal/30">
                  <ShoppingBag size={40} strokeWidth={1} />
                  <p className="text-sm">Sua sacola está vazia</p>
                </div>
              ) : (
                items.map(({ product, qty }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3 bg-white rounded-2xl p-3 border border-[#E8E8E0]"
                  >
                    <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#F8F8F5]">
                      <Image src={product.image} alt={product.name} width={64} height={80} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#C9A84C] mb-0.5">{product.category}</p>
                      <p className="text-sm text-charcoal font-medium line-clamp-1">{product.name}</p>
                      <p className="text-sm font-semibold text-charcoal mt-1">{formatPrice(product.price)}</p>
                      <p className="text-xs text-charcoal/40">Qtd: {qty}</p>
                    </div>
                    <button onClick={() => onRemove(product.id)} className="p-1.5 text-charcoal/20 hover:text-red-400 transition-colors self-start">
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Frete + Total */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#E8E8E0] space-y-4">
                {/* CEP */}
                <div>
                  <p className="text-xs text-charcoal/50 mb-2 flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#C9A84C]" />
                    Calcular envio
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="0000-000"
                      value={codigoPostal}
                      maxLength={8}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 7);
                        setCodigoPostal(v.length > 4 ? `${v.slice(0, 4)}-${v.slice(4)}` : v);
                      }}
                      className="flex-1 px-3 py-2 bg-[#F8F8F5] border border-[#E8E8E0] rounded-full text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                    />
                    <button
                      onClick={handleCalcFrete}
                      disabled={calcLoading}
                      className="px-4 py-2 bg-charcoal text-cream text-xs rounded-full hover:bg-[#C9A84C] transition-colors"
                    >
                      {calcLoading ? "..." : "OK"}
                    </button>
                  </div>

                  {freteOpcoes && (
                    <div className="mt-2 space-y-1.5">
                      {freteOpcoes.map((op, i) => (
                        <button
                          key={i}
                          onClick={() => setFreteSelected(i)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                            freteSelected === i
                              ? "bg-[#C9A84C]/10 border border-[#C9A84C] text-charcoal"
                              : "bg-[#F8F8F5] border border-transparent text-charcoal/60 hover:border-[#E8D5A3]"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">{op.icon} {op.nome}</span>
                          <span className="flex items-center gap-3">
                            <span className="text-charcoal/40">{op.prazo} dias úteis</span>
                            <span className="font-medium text-charcoal">{formatPrice(op.valor)}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-charcoal/50">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {freteSelected !== null && freteOpcoes && (
                    <div className="flex justify-between text-charcoal/50">
                      <span>Envio ({freteOpcoes[freteSelected].nome})</span>
                      <span>{formatPrice(freteCusto)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-charcoal pt-2 border-t border-[#E8E8E0] text-base">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <p className="text-[11px] text-charcoal/30 text-right">ou 6 prestações de {formatPrice(total / 6)} c/ juros</p>
                </div>

                <button className="w-full py-3.5 bg-charcoal text-cream rounded-full text-sm font-medium tracking-wide hover:bg-[#C9A84C] transition-colors duration-300">
                  Finalizar compra
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
