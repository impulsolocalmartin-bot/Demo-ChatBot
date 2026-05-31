import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Inbox, PhoneOff, Clock4, AlertTriangle, Bot, Zap, CalendarCheck, Sparkles } from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

const LEFT = [
  { icon: Inbox, label: "Mensajes sin responder" },
  { icon: PhoneOff, label: "Llamadas perdidas" },
  { icon: Clock4, label: "Demora de horas" },
  { icon: AlertTriangle, label: "Citas olvidadas" },
];

const RIGHT = [
  { icon: Bot, label: "Respuesta automática 24/7" },
  { icon: Zap, label: "0.8s de reacción" },
  { icon: CalendarCheck, label: "Agenda auto-confirmada" },
  { icon: Sparkles, label: "Cliente fidelizado" },
];

export function MoneyLeak() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section className="relative border-y border-border bg-[radial-gradient(ellipse_at_center,rgba(255,191,0,0.05),transparent_60%)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            The Money Leak
          </span>
          <h2 className="max-w-3xl text-balance text-4xl font-extrabold md:text-6xl">
            Dónde se <span className="text-neon">fuga la plata</span>, y cómo la cerramos.
          </h2>
        </motion.div>

        <div ref={ref} className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          {/* LEFT: Caos Manual */}
          <div className="space-y-3">
            <Header label="Caos Manual" tone="muted" />
            {LEFT.map((it, i) => (
              <Row
                key={it.label}
                index={i}
                icon={it.icon}
                label={it.label}
                tone="muted"
                side="left"
              />
            ))}
          </div>

          {/* SVG connectors */}
          <div className="relative h-[340px] w-full md:w-[200px]">
            <svg
              viewBox="0 0 200 340"
              fill="none"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              {[40, 120, 200, 280].map((y, i) => (
                <motion.path
                  key={y}
                  d={`M 0 ${y} C 60 ${y}, 140 ${y + (i - 1.5) * 10}, 200 ${y + (i - 1.5) * 6}`}
                  stroke="url(#grad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.4, delay: 0.4 + i * 0.18, ease: "easeInOut" }}
                />
              ))}
              <defs>
                <linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                  <stop offset="100%" stopColor="#FFBF00" />
                </linearGradient>
              </defs>
            </svg>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ ...SPRING, delay: 1.2 }}
              className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neon-foreground neon-glow md:block"
            >
              Engine
            </motion.div>
          </div>

          {/* RIGHT: Click & Co. Engine */}
          <div className="space-y-3">
            <Header label="Click & Co. Engine" tone="neon" />
            {RIGHT.map((it, i) => (
              <Row
                key={it.label}
                index={i}
                icon={it.icon}
                label={it.label}
                tone="neon"
                side="right"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Header({ label, tone }: { label: string; tone: "muted" | "neon" }) {
  return (
    <div
      className={`mb-2 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${
        tone === "neon" ? "text-neon" : "text-muted-foreground"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "neon" ? "bg-neon" : "bg-muted-foreground"}`} />
      {label}
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  tone,
  side,
  index,
}: {
  icon: typeof Inbox;
  label: string;
  tone: "muted" | "neon";
  side: "left" | "right";
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...SPRING, delay: index * 0.1 }}
      className={`flex items-center gap-3 rounded-2xl glass px-4 py-3 ${
        side === "right" ? "flex-row" : "flex-row"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          tone === "neon" ? "bg-neon text-neon-foreground" : "bg-white/5 text-muted-foreground"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className={tone === "neon" ? "text-foreground" : "text-muted-foreground line-through decoration-white/20"}>
        {label}
      </span>
    </motion.div>
  );
}
