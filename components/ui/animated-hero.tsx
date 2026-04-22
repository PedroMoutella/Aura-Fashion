"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedHeroProps {
  titles?: string[];
  subtitle?: string;
}

export function AnimatedHero({
  titles = ["Elegância", "Sofisticação", "Estilo", "Luxo", "AURA"],
  subtitle = "Descubra peças exclusivas que definem quem você é.",
}: AnimatedHeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);
  const titlesArr = useMemo(() => titles, [titles]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev === titlesArr.length - 1 ? 0 : prev + 1));
    }, 2200);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titlesArr]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 py-16 lg:py-28 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col items-center">
            <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tight text-center font-light text-charcoal">
              <span className="block mb-2 text-charcoal/70 text-3xl md:text-4xl font-light tracking-widest uppercase">
                Nova Coleção
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 h-20 md:h-28">
                {titlesArr.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold gold-shimmer"
                    initial={{ opacity: 0, y: -100 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-wide text-charcoal/60 max-w-xl text-center font-light">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
