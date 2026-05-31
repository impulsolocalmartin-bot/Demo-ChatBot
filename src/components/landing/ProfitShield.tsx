import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Store, ShieldCheck } from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  state: "lost" | "saved";
  caught: boolean;
  age: number;
};

export function ProfitShield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { margin: "-100px" });

  // queued saves (each green particle reaching the store adds 1)
  const queueRef = useRef(0);
  const [saves, setSaves] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);

  // Smooth tick-up: drain queue +1 at a time
  useEffect(() => {
    const t = window.setInterval(() => {
      if (queueRef.current > 0) {
        queueRef.current -= 1;
        setSaves((s) => s + 1);
        setPulseKey((k) => k + 1);
      }
    }, 220);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let particles: P[] = [];

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const isMobile = () => canvas.clientWidth < 640;

    const spawn = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const sourceX = isMobile() ? 44 : 60;
      const sourceY = h / 2;
      const targetX = w / 2;
      const targetY = h / 2;
      const dx = targetX - sourceX;
      const dy = targetY - sourceY;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = isMobile() ? 1.2 : 1.6;
      // tighter spread on mobile
      const spread = isMobile() ? 0.18 : 0.45;
      const ang = Math.atan2(dy, dx) + (Math.random() - 0.5) * spread;
      particles.push({
        x: sourceX + 18,
        y: sourceY + (Math.random() - 0.5) * (isMobile() ? 14 : 28),
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        r: 2.2 + Math.random() * 1.4,
        state: "lost",
        caught: false,
        age: 0,
      });
      void dist;
    };

    let spawnTimer = 0;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const shieldX = w / 2;
      const shieldY = h / 2;
      const shieldR = Math.min(isMobile() ? 52 : 80, w * 0.13);

      const storeX = isMobile() ? w - 44 : w - 60;
      const storeY = h / 2;

      spawnTimer++;
      const spawnRate = isMobile() ? 11 : 7;
      if (spawnTimer > spawnRate && inView) {
        spawn();
        spawnTimer = 0;
      }

      for (const p of particles) {
        p.age++;
        if (p.state === "lost") {
          p.x += p.vx;
          p.y += p.vy;
          const dx = p.x - shieldX;
          const dy = p.y - shieldY;
          const d = Math.hypot(dx, dy);
          if (d < shieldR && !p.caught) {
            p.caught = true;
            p.state = "saved";
            const tx = storeX - p.x;
            const ty = storeY - p.y;
            const m = Math.hypot(tx, ty) || 1;
            const sp = isMobile() ? 2.2 : 2.6;
            p.vx = (tx / m) * sp;
            p.vy = (ty / m) * sp;
          }
        } else {
          const tx = storeX - p.x;
          const ty = storeY - p.y;
          const m = Math.hypot(tx, ty) || 1;
          p.vx += (tx / m) * 0.08;
          p.vy += (ty / m) * 0.08;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.x += p.vx;
          p.y += p.vy;
        }

        const isLost = p.state === "lost";
        const color = isLost ? "rgba(255, 70, 70," : "rgba(120, 255, 130,";
        const glow = isLost ? "rgba(255,70,70,0.45)" : "rgba(120,255,130,0.5)";

        ctx.shadowBlur = 16;
        ctx.shadowColor = glow;
        ctx.fillStyle = `${color}0.95)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      particles = particles.filter((p) => {
        const tx = storeX - p.x;
        const ty = storeY - p.y;
        if (p.state === "saved" && Math.hypot(tx, ty) < 18) {
          // queue +1 lead — drained smoothly by the tick-up interval
          queueRef.current += 1;
          return false;
        }
        return p.x > -20 && p.x < w + 20 && p.y > -20 && p.y < h + 20 && p.age < 600;
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [inView]);

  return (
    <section id="shield" className="relative border-y border-border py-20 md:py-28">
      <div className="absolute inset-0 mesh-bg opacity-80" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,191,0,0.06), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          ref={inViewRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SPRING}
          className="mb-12 flex flex-col items-center text-center"
        >
          <span className="mb-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Flujo en tiempo real
          </span>
          <h2 className="max-w-3xl text-balance font-display text-4xl font-extrabold md:text-6xl">
            Impulsamos lo que <span className="text-neon">ya funciona</span>.
          </h2>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Tu tráfico de Google entra, lo protegemos, y se convierte en ventas reales —
            sin que muevas un dedo.
          </p>
        </motion.div>

        <div
          ref={wrapRef}
          className="relative mx-auto h-[300px] w-full max-w-4xl overflow-hidden rounded-3xl glass-strong sm:h-[360px] md:h-[420px]"
        >
          <canvas ref={ref} className="absolute inset-0 h-full w-full" />

          {/* LEFT — Google G */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={SPRING}
            className="absolute left-2 top-1/2 -translate-y-1/2 md:left-4"
          >
            <div className="relative">
              <div
                className="absolute inset-0 -m-6 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,90,90,0.25), transparent 65%)" }}
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xl sm:h-16 sm:w-16 md:h-20 md:w-20">
                <GoogleG className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10" />
              </div>
              <div className="mt-2 text-center text-[9px] font-bold uppercase tracking-widest text-[rgb(255,120,120)] md:text-[10px]">
                Búsquedas
              </div>
            </div>
          </motion.div>

          {/* CENTER — Shield */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={SPRING}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <div
                className="absolute inset-0 -m-10 animate-pulse rounded-full"
                style={{ background: "radial-gradient(circle, rgba(255,191,0,0.28), transparent 60%)" }}
              />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-3xl bg-neon neon-glow sm:h-20 sm:w-20 md:h-24 md:w-24">
                <ShieldCheck className="h-7 w-7 text-neon-foreground sm:h-9 sm:w-9 md:h-10 md:w-10" strokeWidth={2.5} />
              </div>
              <div className="mt-2 text-center text-[10px] font-bold uppercase tracking-widest text-neon">
                Click &amp; Co.
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Store */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...SPRING, delay: 0.2 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 md:right-4"
          >
            <div className="relative">
              <div
                className="absolute inset-0 -m-6 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(120,255,130,0.22), transparent 65%)" }}
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(120,255,130,0.12)] border border-[rgba(120,255,130,0.4)] sm:h-16 sm:w-16 md:h-20 md:w-20">
                <Store className="h-6 w-6 text-[rgb(120,255,130)] sm:h-7 sm:w-7 md:h-9 md:w-9" />
              </div>
              <div className="mt-2 text-center text-[9px] font-bold uppercase tracking-widest text-[rgb(120,255,130)] md:text-[10px]">
                Tu Negocio
              </div>
            </div>
          </motion.div>

          {/* Live unit counter — +1 per green particle entering the store, smooth tick-up */}
          <motion.div
            key={pulseKey}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-2xl glass px-4 py-2 md:gap-3 md:px-5 md:py-2.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(120,255,130)] animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground md:text-[10px]">
              Ventas Recuperadas
            </span>
            <span className="font-display text-base font-extrabold text-[rgb(120,255,130)] tabular-nums md:text-lg">
              {saves.toLocaleString("es-ES")}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}
