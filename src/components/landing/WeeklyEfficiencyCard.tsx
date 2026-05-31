import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };
const WEEKS = [
  { label: "S1", hours: 4 },
  { label: "S2", hours: 8 },
  { label: "S3", hours: 12 },
  { label: "S4", hours: 15 },
];
const MAX = 16;

export function WeeklyEfficiencyCard() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-neon" />
          <span className="font-display text-sm font-semibold text-foreground">
            Eficiencia Semanal
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Horas recuperadas
        </span>
      </div>

      <div className="grid flex-1 grid-cols-4 items-end gap-2 pt-2 sm:gap-3" style={{ minHeight: 130 }}>
        {WEEKS.map((w, i) => {
          const pct = (w.hours / MAX) * 100;
          return (
            <div key={w.label} className="flex h-full flex-col items-center justify-end">
              <div className="relative flex h-full w-full max-w-[44px] items-end">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${pct}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...SPRING, delay: 0.1 + i * 0.1 }}
                  className="relative w-full overflow-hidden rounded-lg"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,191,0,0.95), rgba(255,191,0,0.45) 70%, rgba(255,191,0,0.18))",
                    boxShadow:
                      "0 0 22px rgba(255,191,0,0.30), inset 0 1px 0 rgba(255,255,255,0.25)",
                  }}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="absolute left-1/2 top-1.5 -translate-x-1/2 font-display text-[10px] font-extrabold text-neon-foreground"
                  >
                    {w.hours}h
                  </motion.span>
                </motion.div>
              </div>
              <span className="mt-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {w.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-glass-border pt-3 text-[11px] text-muted-foreground">
        <span>De 0 → <span className="font-semibold text-neon">15h</span> en 4 semanas</span>
        <span className="text-[10px] uppercase tracking-widest">Simulación</span>
      </div>
    </div>
  );
}
