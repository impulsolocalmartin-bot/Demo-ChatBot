import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { NeuralBackground } from "./NeuralBackground";
import { MagneticButton } from "./MagneticButton";
import { Logo } from "./Logo";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };
const CAL_URL = "https://calendly.com/impulso-local-martin/30min?month=2026-05";

const headline = "Posicionamiento, tranquilidad y conversión.".split(" ");

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 opacity-60">
        <NeuralBackground />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1400px 700px at 50% -10%, rgba(255,191,0,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="mb-5"
        >
          <Logo size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.15 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-neon" />
          Consultoría estratégica con IA
        </motion.div>

        <h1 className="max-w-5xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ ...SPRING, delay: 0.3 + i * 0.07 }}
              className="mr-[0.25em] inline-block"
            >
              {word.startsWith("conversión") ? (
                <span className="text-neon" style={{ textShadow: "0 0 40px rgba(255,191,0,0.45)" }}>
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.95 }}
          className="mt-7 flex flex-col items-center gap-4"
        >
          <MagneticButton
            className="group inline-flex items-center gap-2 rounded-full bg-neon px-8 py-4 text-sm font-semibold text-neon-foreground neon-glow"
            onClick={() => window.open(CAL_URL, "_blank", "noopener")}
          >
            <span className="inline-flex items-center gap-2">
              Agendar reunión
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
