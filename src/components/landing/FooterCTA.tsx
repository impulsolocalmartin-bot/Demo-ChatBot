import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock, ShieldCheck } from "lucide-react";
import { MagneticButton } from "./MagneticButton";
import martinPhoto from "@/assets/martin.jpeg";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };
const CAL_URL = "https://calendly.com/impulso-local-martin/30min?month=2026-05";

export function FooterCTA() {
  return (
    <section id="agenda" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
          className="relative overflow-hidden rounded-[2rem] glass p-8 md:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 320px at 50% 0%, rgba(255,191,0,0.22), transparent 70%)",
            }}
          />

          <div className="relative mx-auto max-w-3xl text-center">
            {/* Martín avatar — trust signal, centered above the badge */}
            <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <img
                src={martinPhoto}
                alt="Martín, consultor Click & Co."
                className="h-20 w-20 rounded-full border-2 border-neon/70 object-cover shadow-[0_4px_30px_rgba(255,191,0,0.4)] ring-1 ring-white/10 md:h-24 md:w-24"
                loading="lazy"
              />
              <div className="text-center text-sm font-medium leading-tight text-foreground/85 sm:text-left">
                Tu consultor:<br />
                <span className="text-neon font-semibold text-base">Martín</span>
              </div>
            </div>

            <span className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-neon">
              <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
              Cupos limitados / mes
            </span>
            <h2 className="text-balance font-display text-4xl font-extrabold md:text-6xl">
              Retrato estratégico con <span className="text-neon">Martín</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">
              30 minutos. Auditoría real de tu negocio. Salimos con un mapa concreto
              de automatización — no una promesa.
            </p>

            <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-foreground/85">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-neon" /> 30 minutos
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-neon" /> Sin compromiso
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-neon" /> Plan por escrito
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <MagneticButton
                className="group inline-flex items-center gap-2 rounded-full bg-neon px-8 py-4 text-base font-semibold text-neon-foreground animate-neon-pulse"
                onClick={() => window.open(CAL_URL, "_blank", "noopener")}
              >
                <span className="inline-flex items-center gap-2">
                  Agendar reunión
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Compact Calendly embed */}
          <div className="relative mt-10">
            <div className="overflow-hidden rounded-2xl border border-glass-border bg-black/40">
              <iframe
                title="Reservar con Martín"
                src={CAL_URL + "&hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=FFBF00"}
                className="h-[460px] w-full md:h-[520px]"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        <footer className="mt-16 flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 Click &amp; Co. — Construido con intención.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacidad</a>
            <a href="#" className="hover:text-foreground">Contacto</a>
            <a href="#" className="hover:text-foreground">Manifiesto</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
