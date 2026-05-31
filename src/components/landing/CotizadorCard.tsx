import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

export function CotizadorCard({
  label,
  unit,
  min,
  max,
  rate,
  base,
}: {
  label: string;
  unit: string;
  min: number;
  max: number;
  rate: number;
  base: number;
}) {
  const [value, setValue] = useState(min + Math.round((max - min) * 0.4));

  // Animate slider once when sector changes
  useEffect(() => {
    const start = min;
    const target = min + Math.round((max - min) * 0.4);
    let raf = 0;
    let t0: number | null = null;
    const dur = 800;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const k = Math.min(1, (ts - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setValue(Math.round(start + (target - start) * eased));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [min, max]);

  const price = Math.round(base + value * rate);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-neon" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Cotizador IA</span>
        </div>
        <motion.div
          key={price}
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={SPRING}
          className="rounded-full bg-neon/10 border border-neon/30 px-3 py-1"
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-1.5">Presupuesto</span>
          <span className="font-display text-base font-bold text-neon">{price}€</span>
        </motion.div>
      </div>

      <div className="mt-auto">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm text-foreground/80">{label}</span>
          <span className="font-display text-2xl font-bold">
            {value}
            <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
          </span>
        </div>
        <div className="relative">
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-neon"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={SPRING}
              style={{ boxShadow: "0 0 16px rgba(255,191,0,0.6)" }}
            />
          </div>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            className="absolute inset-0 h-2 w-full cursor-pointer opacity-0"
          />
          <motion.div
            className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full bg-neon neon-glow"
            initial={false}
            animate={{ left: `${pct}%` }}
            transition={SPRING}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  );
}
