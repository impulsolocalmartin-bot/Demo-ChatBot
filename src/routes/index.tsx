import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { SectorSwitcher } from "@/components/landing/SectorSwitcher";
import { ProfitShield } from "@/components/landing/ProfitShield";
import { FooterCTA } from "@/components/landing/FooterCTA";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen mesh-bg text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <SectorSwitcher />
      <ProfitShield />
      <FooterCTA />
    </main>
  );
}
