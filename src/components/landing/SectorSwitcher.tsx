import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState } from "react";
import { Shirt, HeartPulse, Wrench } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { WhatsappCard } from "./WhatsappCard";
import { SpeedWaveCard } from "./SpeedWaveCard";
import { RoiMeterCard } from "./RoiMeterCard";
import { EfficiencyScannerCard } from "./EfficiencyScannerCard";
import { WeeklyEfficiencyCard } from "./WeeklyEfficiencyCard";


const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

const SECTORS = [
  { id: "talleres", label: "Talleres", icon: Wrench },
  { id: "moda", label: "Moda / Retail", icon: Shirt },
  { id: "salud", label: "Salud", icon: HeartPulse },
] as const;

type SectorId = (typeof SECTORS)[number]["id"];
type Msg = { from: "user" | "ai"; text: string; emoji?: string };

const COPY: Record<
  SectorId,
  {
    chat: Msg[];
    efficiency: string[];
    roi: number;
    speed: number;
    quote: { label: string; unit: string; min: number; max: number; rate: number; base: number };
    review: { quote: string; author: string };
  }
> = {
  talleres: {
    chat: [
      { from: "user", text: "Hola, hace un ruido raro el motor de mi coche." },
      { from: "ai", text: "¡Hola! Podría ser la correa. Una revisión completa son 65€. ¿Te agendo cita para mañana a las 10:00?", emoji: "🔧" },
      { from: "user", text: "Sí, perfecto." },
      { from: "ai", text: "Cita confirmada. ¡Te esperamos!", emoji: "✅" },
    ],
    efficiency: [
      "Cotizaciones instantáneas 24/7",
      "Reserva de turnos sin llamadas",
      "Seguimiento de orden de trabajo",
      "Reactivación de clientes inactivos",
    ],
    roi: 78,
    speed: 0.9,
    quote: { label: "Horas de mano de obra", unit: "h", min: 1, max: 8, rate: 45, base: 65 },
    review: { quote: "Reservé en 30 segundos por WhatsApp. Cero llamadas, cero esperas.", author: "Carlos R., cliente Taller Madrid" },
  },
  moda: {
    chat: [
      { from: "user", text: "Hola, ¿tenéis stock de la blusa Idea en talla M?" },
      { from: "ai", text: "¡Hola! Sí, nos quedan 3 unidades. ¿Te reservo una y te paso el link de pago?", emoji: "✨" },
      { from: "user", text: "Sí, resérvamela." },
      { from: "ai", text: "Hecho. Link enviado. ¡Venta recuperada!", emoji: "✅" },
    ],
    efficiency: [
      "Recuperar carritos abandonados",
      "Stock en tiempo real",
      "Upsell automático en checkout",
      "Recordatorios de reposición",
    ],
    roi: 85,
    speed: 0.8,
    quote: { label: "Prendas en el pedido", unit: "u", min: 1, max: 12, rate: 32, base: 0 },
    review: { quote: "Recuperé 4 ventas el primer fin de semana. La IA cierra mientras duermo.", author: "Lucía M., boutique online" },
  },
  salud: {
    chat: [
      { from: "user", text: "Hola, quiero agendar una limpieza facial." },
      { from: "ai", text: "¡Hola! Tengo martes 11:00 o jueves 16:30. ¿Cuál te funciona mejor?", emoji: "🌿" },
      { from: "user", text: "Jueves 16:30." },
      { from: "ai", text: "Confirmado. Te envío recordatorio 24h antes.", emoji: "✅" },
    ],
    efficiency: [
      "Confirmación de citas vía WhatsApp",
      "Reagendamiento sin fricción",
      "Cobro de seña automático",
      "Encuesta post-tratamiento",
    ],
    roi: 82,
    speed: 0.9,
    quote: { label: "Sesiones del tratamiento", unit: "x", min: 1, max: 10, rate: 55, base: 40 },
    review: { quote: "Mi agenda se llena sola. Las ausencias bajaron un 70%.", author: "Dra. Elena P., clínica estética" },
  },
};

export function SectorSwitcher() {
  const [active, setActive] = useState<SectorId>("talleres");
  const data = COPY[active];

  return (
    <section id="lab" className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={SPRING}
        className="mb-12 flex flex-col items-center text-center"
      >
        <h2 className="max-w-3xl text-balance font-display text-4xl font-extrabold md:text-6xl">
          Arquitectura en <span className="text-neon">tres sectores</span>.
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Una muestra de lo que la inteligencia bien aplicada puede hacer.
        </p>
      </motion.div>

      {/* Sector switcher */}
      <div className="mb-10 flex justify-center px-2">
        <LayoutGroup>
          <div className="relative grid w-full max-w-md grid-cols-3 items-stretch gap-1.5 rounded-2xl glass-strong p-2 md:inline-flex md:w-auto md:gap-2">
            {SECTORS.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className="relative z-10 flex flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-medium transition-colors md:flex-row md:gap-2.5 md:px-5 md:py-3 md:text-sm"
                >
                  {isActive && (
                    <motion.span
                      layoutId="sector-pill"
                      transition={SPRING}
                      className="absolute inset-0 -z-10 rounded-xl bg-neon neon-glow"
                    />
                  )}
                  <span
                    className={
                      "flex h-7 w-7 items-center justify-center rounded-lg transition-all md:h-8 md:w-8 " +
                      (isActive
                        ? "bg-black/20 text-neon-foreground shadow-inner"
                        : "bg-white/5 text-foreground")
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span
                    className={
                      "text-center leading-tight " +
                      (isActive ? "text-neon-foreground" : "text-foreground")
                    }
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Bento Grid */}
      <LayoutGroup>
        <motion.div
          layout
          transition={SPRING}
          className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5"
        >
          <SpotlightCard layout className="md:col-span-4 md:row-span-2 min-h-[460px]">
            <WhatsappCard messages={data.chat} key={active + "-wa"} />
          </SpotlightCard>

          <SpotlightCard layout className="md:col-span-2 min-h-[220px]">
            <RoiMeterCard value={data.roi} key={active + "-roi"} />
          </SpotlightCard>

          <SpotlightCard layout className="md:col-span-2 min-h-[220px]">
            <SpeedWaveCard targetSec={data.speed} key={active + "-sp"} />
          </SpotlightCard>

          <AnimatePresence mode="popLayout">
            <SpotlightCard
              layout
              key={active + "-eff"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={SPRING}
              className="md:col-span-3 min-h-[230px]"
            >
              <WeeklyEfficiencyCard />
            </SpotlightCard>

            <SpotlightCard
              layout
              key={active + "-scan"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ ...SPRING, delay: 0.05 }}
              className="md:col-span-3 min-h-[230px]"
            >
              <EfficiencyScannerCard items={data.efficiency} />
            </SpotlightCard>
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
