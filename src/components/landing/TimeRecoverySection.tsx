import { motion } from "framer-motion";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

// Simulated weekly hours saved as the AI ramps up coverage of repetitive
// queries, bookings, follow-ups. Range: 10–15h/week steady state.
const WEEKS = [
  { label: "Sem 1", hours: 4 },
  { label: "Sem 2", hours: 8 },
  { label: "Sem 3", hours: 12 },
  { label: "Sem 4", hours: 15 },
];
const MAX = 16;

export function TimeRecoverySection() {
  return (
    <section id="eficiencia" className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={SPRING}
        className="mb-12 flex flex-col items-center text-center"
      >
        <span className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Recuperación de Tiempo
        </span>
        <h2 className="max-w-3xl text-balance font-display text-4xl font-extrabold md:text-6xl">
          Horas <span className="text-neon">ahorradas semanalmente</span>.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Una simulación de eficiencia operativa — no un coste — a medida que la IA
          absorbe consultas repetitivas, reservas y seguimientos.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={SPRING}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl glass-strong p-6 md:p-10"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 200px at 50% 0%, rgba(255,191,0,0.10), transparent 70%)",
          }}
        />

        <div className="relative">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Horas ahorradas / semana
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold md:text-4xl">
                Hasta <span className="text-neon">15h</span> recuperadas
              </p>
            </div>
            <div className="hidden text-right text-[11px] uppercase tracking-widest text-muted-foreground md:block">
              Simulación · 4 semanas
            </div>
          </div>

          {/* Bar chart */}
          <div className="grid grid-cols-4 items-end gap-3 md:gap-6" style={{ height: 240 }}>
            {WEEKS.map((w, i) => {
              const pct = (w.hours / MAX) * 100;
              return (
                <div key={w.label} className="flex h-full flex-col items-center justify-end">
                  <div className="relative flex h-full w-full max-w-[70px] items-end">
                    <motion.div
                      initial={{ height: 0, opacity: 0.5 }}
                      whileInView={{ height: `${pct}%`, opacity: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ ...SPRING, delay: 0.1 + i * 0.12 }}
                      className="relative w-full overflow-hidden rounded-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,191,0,0.95), rgba(255,191,0,0.55) 60%, rgba(255,191,0,0.25))",
                        boxShadow:
                          "0 0 30px rgba(255,191,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
                      }}
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...SPRING, delay: 0.4 + i * 0.12 }}
                        className="absolute left-1/2 top-2 -translate-x-1/2 font-display text-xs font-extrabold text-neon-foreground md:text-sm"
                      >
                        {w.hours}h
                      </motion.span>
                    </motion.div>
                  </div>
                  <div className="mt-3 text-[11px] font-medium uppercase tracking-widest text-muted-foreground md:text-xs">
                    {w.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-glass-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
            <p>
              <span className="text-foreground/85">+60h al mes</span> liberadas para
              estrategia, ventas y descanso real.
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em]">
              Simulación de eficiencia · no representa coste
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
