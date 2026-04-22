"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, X, Menu } from "lucide-react";
import Link from "next/link";
import { products, formatPrice } from "@/lib/products";
import Image from "next/image";

interface NavbarProps {
  onAuthClick: () => void;
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ onAuthClick, cartCount, onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    setSearchResults(
      products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 5)
    );
  }, [searchQuery]);

  const navLinks = ["Coleção", "Conjuntos", "T-Shirts", "Calçado", "Sobre"];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-[#E8D5A3]/40 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="text-2xl md:text-3xl font-light tracking-[0.3em] gold-shimmer leading-none">
              AURA
            </span>
            <span className="text-[9px] tracking-[0.4em] text-charcoal/40 uppercase font-light">
              Fashion
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={link === "Coleção" ? "/#colecao" : `/#${link.toLowerCase()}`}
                className="text-sm tracking-widest text-charcoal/60 hover:text-[#C9A84C] transition-colors duration-300 uppercase font-light"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-charcoal/60 hover:text-[#C9A84C] transition-colors"
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>

            {/* Login */}
            <button
              onClick={onAuthClick}
              className="p-2 text-charcoal/60 hover:text-[#C9A84C] transition-colors"
              aria-label="Conta"
            >
              <User size={18} />
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="p-2 text-charcoal/60 hover:text-[#C9A84C] transition-colors relative"
              aria-label="Carrinho"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#C9A84C] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-charcoal/60"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-cream/98 backdrop-blur-md border-t border-[#E8D5A3]/30 overflow-hidden"
          >
            <div className="max-w-3xl mx-auto px-4 py-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar peças, categorias..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#E8D5A3]/60 rounded-full text-sm focus:outline-none focus:border-[#C9A84C] transition-colors placeholder:text-charcoal/30"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 hover:text-charcoal/60">
                    <X size={14} />
                  </button>
                )}
              </div>
              {searchResults.length > 0 && (
                <div className="mt-3 space-y-1">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={`/produto/${p.id}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#C9A84C]/10 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={p.image} alt={p.name} width={40} height={40} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <p className="text-sm text-charcoal group-hover:text-[#C9A84C] transition-colors">{p.name}</p>
                        <p className="text-xs text-charcoal/40">{p.category}</p>
                      </div>
                      <span className="ml-auto text-sm text-[#C9A84C] font-medium">
                        {formatPrice(p.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <p className="text-center text-sm text-charcoal/40 py-4">Nenhum resultado para &ldquo;{searchQuery}&rdquo;</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream/98 backdrop-blur-md border-t border-[#E8D5A3]/30"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={`/#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm tracking-widest text-charcoal/60 hover:text-[#C9A84C] transition-colors uppercase font-light py-2 border-b border-[#E8E8E0]"
                >
                  {link}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
