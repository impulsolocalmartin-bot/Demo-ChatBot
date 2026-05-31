import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Target } from "lucide-react";

export function RoiMeterCard({ value = 85 }: { value?: number }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const C = 2 * Math.PI * 52;
  const offset = useTransform(mv, (v) => C - (v / 100) * C);

  useEffect(() => {
    const c = animate(mv, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => c.stop();
  }, [mv, value]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <Target className="h-6 w-6 text-neon" />
        <span className="rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          ROI Meter
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              stroke="#FFBF00"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={C}
              style={{ strokeDashoffset: offset, filter: "drop-shadow(0 0 6px rgba(255,191,0,0.6))" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-3xl font-extrabold text-neon">{display}%</span>
          </div>
        </div>
        <div>
          <p className="font-display text-base font-bold leading-tight">Eficacia de Recuperación</p>
          <p className="mt-1 text-xs text-muted-foreground">Ventas rescatadas vs perdidas</p>
        </div>
      </div>
    </div>
  );
}
