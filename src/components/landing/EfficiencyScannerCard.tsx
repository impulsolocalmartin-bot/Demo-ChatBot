import { Check } from "lucide-react";

export function EfficiencyScannerCard({ items }: { items: string[] }) {
  return (
    <div className="relative flex h-full flex-col">
      <ul className="relative space-y-2.5 overflow-hidden rounded-xl pt-1">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-center gap-2 text-sm text-foreground/90"
          >
            <Check className="h-4 w-4 text-neon" />
            {it}
          </li>
        ))}
        {/* Beam */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-4 top-0 h-12 animate-beam"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(255,191,0,0.25), transparent)",
            filter: "blur(8px)",
          }}
        />
      </ul>
    </div>
  );
}
