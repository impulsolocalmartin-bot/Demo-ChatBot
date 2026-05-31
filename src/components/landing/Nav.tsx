import { motion, LayoutGroup } from "framer-motion";
import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo-icon.png";

const SECTIONS = [
  { id: "lab", label: "Arquitectura" },
  { id: "shield", label: "Beneficio" },
  { id: "agenda", label: "Agenda" },
] as const;

const CAL_URL = "https://calendly.com/impulso-local-martin/30min?month=2026-05";

export function Nav() {
  const [active, setActive] = useState<string>("lab");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-fit"
    >
      <nav className="flex items-center gap-2 rounded-full glass-strong px-3 py-2 text-sm">
        <a href="#" className="flex items-center px-2" aria-label="Click & Co.">
          <img
            src={logoSrc}
            alt="Click & Co."
            width={48}
            height={25}
            className="h-6 w-auto md:h-7 object-contain"
            style={{ aspectRatio: "633 / 331" }}
            draggable={false}
          />
        </a>
        <LayoutGroup>
          <div className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="relative inline-flex items-center px-4 py-1.5 text-sm transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-glow"
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "rgba(255,191,0,0.10)",
                        boxShadow: "inset 0 0 20px rgba(255,191,0,0.25), 0 0 20px rgba(255,191,0,0.20)",
                        border: "1px solid rgba(255,191,0,0.35)",
                      }}
                    />
                  )}
                  <span className={isActive ? "relative z-10 text-neon" : "relative z-10 text-muted-foreground hover:text-foreground"}>
                    {s.label}
                  </span>
                </a>
              );
            })}
          </div>
        </LayoutGroup>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 rounded-full bg-neon px-4 py-1.5 text-xs font-semibold text-neon-foreground neon-glow whitespace-nowrap"
        >
          Agendar reunión
        </a>
      </nav>
    </motion.header>
  );
}
