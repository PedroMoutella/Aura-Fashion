"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function ButtonColorful({ className, label = "Ver Coleção", ...props }: ButtonColorfulProps) {
  return (
    <Button
      className={cn(
        "relative h-11 px-6 overflow-hidden rounded-full",
        "bg-charcoal text-cream",
        "transition-all duration-300",
        "group",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0",
          "bg-gradient-to-r from-[#C9A84C] via-[#E8D5A3] to-[#8B6914]",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-500"
        )}
      />
      <div className="relative flex items-center justify-center gap-2">
        <span className="font-medium tracking-wide">{label}</span>
        <ArrowUpRight className="w-4 h-4" />
      </div>
    </Button>
  );
}
