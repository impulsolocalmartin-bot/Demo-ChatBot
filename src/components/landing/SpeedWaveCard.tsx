import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Activity } from "lucide-react";

export function SpeedWaveCard({ targetSec = 0.8 }: { targetSec?: number }) {
  const mv = useMotionValue(5.0);
  const [display, setDisplay] = useState("5.0");

  useEffect(() => {
    const c = animate(mv, targetSec, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(1)),
    });
    return () => c.stop();
  }, [mv, targetSec]);

  // Build a sleek wave path
  const path = useMemo(() => {
    const w = 240;
    const h = 60;
    const pts = 40;
    let d = `M 0 ${h / 2}`;
    for (let i = 1; i <= pts; i++) {
      const x = (i / pts) * w;
      const decay = 1 - i / pts;
      const y = h / 2 + Math.sin(i * 0.55) * 18 * decay + Math.sin(i * 1.3) * 6 * decay;
      d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  }, []);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <Activity className="h-6 w-6 text-neon" />
        <span className="rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          Latencia
        </span>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <motion.span className="font-display text-5xl font-extrabold text-neon md:text-6xl"
            style={{ textShadow: "0 0 30px rgba(255,191,0,0.45)" }}>
            {display}
          </motion.span>
          <span className="font-display text-2xl font-bold text-muted-foreground">s</span>
        </div>
        <svg viewBox="0 0 240 60" className="mt-2 h-14 w-full">
          <defs>
            <linearGradient id="wave-g" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(255,191,0,0.05)" />
              <stop offset="100%" stopColor="#FFBF00" />
            </linearGradient>
          </defs>
          <motion.path
            d={path}
            stroke="url(#wave-g)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(255,191,0,0.6))" }}
          />
        </svg>
        <p className="mt-1 text-xs text-muted-foreground">Récord de respuesta promedio</p>
      </div>
    </div>
  );
}
