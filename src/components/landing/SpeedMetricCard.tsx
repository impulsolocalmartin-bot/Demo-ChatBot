import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Gauge } from "lucide-react";

export function SpeedMetricCard({
  kpi,
  label,
  Icon = Gauge,
}: {
  kpi: string;
  label: string;
  Icon?: LucideIcon;
}) {
  const mv = useMotionValue(5.0);
  const [display, setDisplay] = useState("5.0");

  useEffect(() => {
    const controls = animate(mv, 0.8, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(1)),
    });
    return () => controls.stop();
  }, [mv]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <Icon className="h-6 w-6 text-neon" />
        <span className="rounded-full glass px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
          velocidad
        </span>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <motion.span className="font-display text-5xl font-extrabold text-neon md:text-6xl">
            {display}
          </motion.span>
          <span className="font-display text-2xl font-bold text-muted-foreground">s</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          De 5.0s humanos a <span className="text-foreground">{kpi}</span> · {label}
        </p>
      </div>
    </div>
  );
}
