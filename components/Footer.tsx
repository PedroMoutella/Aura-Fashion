"use client";
import Link from "next/link";
import { Camera, Share2, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/60">
      {/* Marquee */}
      <div className="border-b border-cream/10 overflow-hidden py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-xs tracking-[0.4em] uppercase mx-12 text-[#E8D5A3]/60">
              AURA Fashion &nbsp;✦&nbsp; Nova Coleção &nbsp;✦&nbsp; Elegância Define &nbsp;✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="text-2xl font-light tracking-[0.3em] gold-shimmer">AURA</span>
            <p className="mt-4 text-sm text-cream/40 leading-relaxed max-w-xs font-light">
              Peças exclusivas que refletem sua essência. Moda que transcende tendências — define quem você é.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="p-2 rounded-full border border-cream/10 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
                <Camera size={16} />
              </a>
              <a href="#" className="p-2 rounded-full border border-cream/10 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
                <Share2 size={16} />
              </a>
              <a href="mailto:contato@aurafashion.com.br" className="p-2 rounded-full border border-cream/10 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-4">Coleção</h4>
            <ul className="space-y-3 text-sm font-light">
              {["Vestidos", "Conjuntos", "Blusas", "Calças", "Blazers"].map((item) => (
                <li key={item}>
                  <Link href={`/#${item.toLowerCase()}`} className="hover:text-[#C9A84C] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#C9A84C] mb-4">Legal</h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href="/privacy" className="hover:text-[#C9A84C] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C9A84C] transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <a href="mailto:contato@aurafashion.com.br" className="hover:text-[#C9A84C] transition-colors">
                  contato@aurafashion.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/20">
          <p>© 2026 AURA Fashion. Todos os direitos reservados.</p>
          <p>CNPJ: 00.000.000/0001-00 &nbsp;·&nbsp; São Paulo, SP</p>
        </div>
      </div>
    </footer>
  );
}
