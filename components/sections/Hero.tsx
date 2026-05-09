import { ArrowRight, Zap } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function Hero() {
  const portalUrl = process.env.NEXT_PUBLIC_CMS_PORTAL_URL ?? "#";

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 container max-w-5xl mx-auto text-center px-4 pt-24">
        {/* Badge */}
        <FadeIn delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-500 dark:text-gold-400 text-sm font-medium mb-8">
            <Zap size={14} />
            End-to-end Tech Consultancy
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.1}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            Scale Smarter with{" "}
            <span className="gold-text">Websarthi</span>
          </h1>
        </FadeIn>

        {/* Sub-headline */}
        <FadeIn delay={0.2}>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            From first lead to final delivery — we automate, qualify, and
            accelerate every step of your business operations.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(230,168,23,0.4)] active:scale-100"
            >
              Access Lead CMS Portal
              <ArrowRight size={20} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border hover:border-gold-500/30 text-muted-foreground hover:text-foreground font-medium text-lg transition-all duration-200"
            >
              Explore Services
            </a>
          </div>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn delay={0.4}>
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "500+", label: "Leads Managed" },
              { value: "98%", label: "Client Retention" },
              { value: "10x", label: "ROI Average" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold gold-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
