"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorEffect() {
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  const ringX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const ringY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const isHovered = useRef(false);

  useEffect(() => {
    const rawX = { current: 0 };
    const rawY = { current: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-cursor-hover]")) {
        isHovered.current = true;
        document.querySelector(".cursor-ring")?.classList.add("hovered");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-cursor-hover]")) {
        isHovered.current = false;
        document.querySelector(".cursor-ring")?.classList.remove("hovered");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ left: dotX, top: dotY }}
      />
      <motion.div
        className="cursor-ring"
        style={{ left: ringX, top: ringY }}
      />
    </>
  );
}
