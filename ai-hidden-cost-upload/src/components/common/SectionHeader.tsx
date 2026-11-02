import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}) => {
  return (
    <div
      className={cn(
        "mb-12 space-y-3",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      <div className="inline-flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_8px_#38bdf8]" />
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-light text-slate-50 tracking-tight leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base text-slate-400 font-sans leading-relaxed pt-1">
          {description}
        </p>
      )}
    </div>
  );
};
