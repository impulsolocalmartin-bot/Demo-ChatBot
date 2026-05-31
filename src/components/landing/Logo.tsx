import logoSrc from "@/assets/logo-click-co.png";

export function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const h = { sm: "h-6", md: "h-9 md:h-10", lg: "h-16 md:h-24" }[size];
  return (
    <img
      src={logoSrc}
      alt="Click & Co."
      className={`${h} w-auto select-none ${className}`}
      draggable={false}
      style={{ filter: "drop-shadow(0 4px 30px rgba(255,191,0,0.25))" }}
    />
  );
}
