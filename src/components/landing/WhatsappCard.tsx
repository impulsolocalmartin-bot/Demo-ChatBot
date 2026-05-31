import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageSquare, BadgeCheck, ShieldCheck } from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

type Msg = { from: "user" | "ai"; text: string; emoji?: string };

export function WhatsappCard({
  messages,
}: {
  messages: Msg[];
}) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const timers: number[] = [];
    let acc = 400;
    // For each message, type indicator (only on AI), then reveal
    messages.forEach((m, i) => {
      if (m.from === "ai") {
        const typingIndex = i * 2 + 1; // odd = typing
        const revealIndex = i * 2 + 2;
        timers.push(window.setTimeout(() => setStep(typingIndex), acc));
        acc += 1000;
        timers.push(window.setTimeout(() => setStep(revealIndex), acc));
        acc += 700;
      } else {
        const revealIndex = i * 2 + 2;
        timers.push(window.setTimeout(() => setStep(revealIndex), acc));
        acc += 700;
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [messages]);

  return (
    <div className="relative flex h-full flex-col">
      {/* Scanning beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -inset-x-2 overflow-hidden rounded-2xl"
      >
        <div
          className="absolute inset-y-0 w-1/3 animate-scan-x"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,191,0,0.18), transparent)",
            filter: "blur(20px)",
          }}
        />
      </div>

      <div className="relative mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-neon neon-glow">
            <MessageSquare className="h-5 w-5 text-neon-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-display text-base font-bold">Click &amp; Co. Concierge</p>
              <BadgeCheck className="h-4 w-4 text-neon" />
            </div>
            <p className="text-xs text-muted-foreground">
              WhatsApp Business · Verificado · responde en 0.8s
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest text-neon">
          <ShieldCheck className="h-3 w-3" />
          En vivo
        </span>
      </div>

      <div className="relative flex-1 space-y-2.5 overflow-hidden rounded-2xl bg-black/50 p-4">
        {messages.map((m, i) => {
          const typingShown = step === i * 2 + 1 && m.from === "ai";
          const revealShown = step >= i * 2 + 2;
          return (
            <div key={i}>
              {typingShown && <TypingBubble />}
              {revealShown && (
                <motion.div
                  initial={{ opacity: 0, x: m.from === "user" ? 20 : -20, y: 4 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={SPRING}
                  className={
                    m.from === "user"
                      ? "ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-white/10 px-4 py-2.5 text-sm"
                      : "max-w-[82%] rounded-2xl rounded-tl-sm bg-neon px-4 py-2.5 text-sm text-neon-foreground"
                  }
                >
                  {m.text} {m.emoji}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="dot-blink inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white/10 px-4 py-3"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-neon" />
      <span className="h-1.5 w-1.5 rounded-full bg-neon" />
      <span className="h-1.5 w-1.5 rounded-full bg-neon" />
    </motion.div>
  );
}
