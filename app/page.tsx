"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { AuthModal } from "@/components/AuthModal";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlowingShadow } from "@/components/ui/glowing-shadow";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { ButtonColorful } from "@/components/ui/button-colorful";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { products, categories } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { ChevronDown } from "lucide-react";

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { items, addToCart, removeFromCart, cartCount, cartOpen, setCartOpen } = useCart();

  const filteredProducts = activeCategory === "Todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar
        onAuthClick={() => setAuthOpen(true)}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
      />

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center gap-6">
              <AnimatedHero />
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <ButtonColorful
                  label="Ver Coleção"
                  onClick={() => document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" })}
                />
                <LiquidButton
                  size="lg"
                  onClick={() => setAuthOpen(true)}
                  className="text-charcoal font-medium tracking-wide px-8"
                >
                  Criar Conta
                </LiquidButton>
              </div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4 text-charcoal/30 cursor-pointer"
                onClick={() => document.getElementById("colecao")?.scrollIntoView({ behavior: "smooth" })}
              >
                <ChevronDown size={22} />
              </motion.div>
            </div>
          }
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/Gemini_Generated_Image_w71kzxw71kzxw71k.png"
              alt="AURA Nova Coleção"
              fill
              className="object-cover object-top rounded-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs tracking-widest text-white/70 uppercase">Nova Coleção 2026</span>
              <p className="text-white/90 text-lg font-light mt-1">Elegância que define.</p>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* Gooey Text Banner */}
      <section className="py-12 bg-charcoal overflow-hidden">
        <GooeyText
          texts={["AURA", "Elegância", "Estilo", "Luxo", "Moda"]}
          morphTime={1.2}
          cooldownTime={0.3}
          className="h-24 md:h-32"
        />
      </section>

      {/* Marquee Strip */}
      <div className="bg-[#C9A84C] overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="text-xs tracking-[0.35em] uppercase text-white/90 mx-10 font-medium">
              Nova Coleção &nbsp;✦&nbsp; Envio Grátis acima de 99€ &nbsp;✦&nbsp; Prestações até 6x &nbsp;✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Featured Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              image: "/images/Gemini_Generated_Image_f3c1jdf3c1jdf3c1.png",
              label: "Conjuntos",
              title: "Estilo & Atitude",
              sub: "Nova linha urbana bicolor",
            },
            {
              image: "/images/Gemini_Generated_Image_819gxm819gxm819g.png",
              label: "Conjuntos Atléticos",
              title: "Performance Neon",
              sub: "Coleção Sport 2026",
            },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <motion.div
                className="relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer group"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              >
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <span className="text-[10px] tracking-widest text-[#E8D5A3] uppercase mb-2 block">{item.label}</span>
                  <h3 className="text-white text-2xl md:text-3xl font-light mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm">{item.sub}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section id="colecao" className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <ScrollReveal className="text-center mb-12">
          <span className="text-xs tracking-widest text-[#C9A84C] uppercase">Coleção Completa</span>
          <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-2">
            Escolha sua{" "}
            <span className="gold-shimmer font-semibold">peça perfeita</span>
          </h2>
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-charcoal text-cream"
                    : "bg-white border border-[#E8E8E0] text-charcoal/50 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} delay={i * 0.05} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-charcoal text-cream py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs tracking-widest text-[#C9A84C] uppercase">Sobre AURA</span>
            <h2 className="text-3xl md:text-5xl font-light mt-4 mb-6 leading-tight">
              Moda que{" "}
              <span className="gold-shimmer font-semibold">transcende</span>
              <br />tendências
            </h2>
            <p className="text-cream/50 text-lg font-light leading-relaxed max-w-2xl mx-auto">
              AURA nasceu da crença de que cada peça de roupa conta uma história. Criamos coleções que unem
              sofisticação atemporal com a personalidade única de cada pessoa.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-3 gap-8 mt-14 pt-10 border-t border-cream/10">
              {[
                { num: "500+", label: "Peças Exclusivas" },
                { num: "12k+", label: "Clientes em Portugal" },
                { num: "6x", label: "Prestações" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-light gold-shimmer">{stat.num}</p>
                  <p className="text-xs tracking-widest text-cream/30 uppercase mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35}>
            <div className="mt-16 flex justify-center">
              <GlowingShadow>
                <p className="text-2xl md:text-3xl font-light tracking-widest text-white/80 text-center">
                  <span className="gold-shimmer font-semibold">AURA</span>
                  <br />
                  <span className="text-sm tracking-[0.4em] uppercase font-light opacity-60">Lisboa · Porto · Faro</span>
                </p>
              </GlowingShadow>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onRemove={removeFromCart}
      />
    </div>
  );
}
