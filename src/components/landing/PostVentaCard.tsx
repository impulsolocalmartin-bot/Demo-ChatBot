import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, MessageCircleHeart } from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

export function PostVentaCard({ quote, author }: { quote: string; author: string }) {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setStars(0);
    const timers: number[] = [];
    for (let i = 1; i <= 5; i++) {
      timers.push(window.setTimeout(() => setStars(i), 300 + i * 180));
    }
    return () => timers.forEach(clearTimeout);
  }, [quote]);

  // mini bar graph values
  const bars = [40, 62, 48, 78, 90, 72, 95];

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircleHeart className="h-5 w-5 text-neon" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Post-Venta IA</span>
        </div>
        <div className="flex items-end gap-0.5 h-6">
          {bars.map((b, i) => (
            <motion.span
              key={i}
              initial={{ height: 4 }}
              animate={{ height: `${b}%` }}
              transition={{ ...SPRING, delay: i * 0.05 }}
              className="w-1 rounded-sm bg-neon/70"
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={
                i < stars
                  ? { scale: 1, rotate: 0, opacity: 1 }
                  : { scale: 0.6, rotate: -20, opacity: 0.2 }
              }
              transition={SPRING}
            >
              <Star
                className="h-5 w-5"
                fill={i < stars ? "#FFBF00" : "transparent"}
                stroke={i < stars ? "#FFBF00" : "#666"}
              />
            </motion.div>
          ))}
          <motion.span
            key={stars}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-2 font-display text-sm font-bold text-neon"
          >
            {stars}.0
          </motion.span>
        </div>
        <p className="mt-3 text-sm text-foreground/85">"{quote}"</p>
        <p className="mt-1 text-xs text-muted-foreground">— {author}</p>
      </div>
    </div>
  );
}
