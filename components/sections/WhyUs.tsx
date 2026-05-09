import { ShieldCheck, BarChart3, Workflow } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Full-Stack Ownership",
    body: "We don't just advise — we build, run, and optimise. One partner owns the entire journey from lead acquisition to conversion, so nothing falls through the cracks.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Decisions",
    body: "Every campaign, qualification step, and automation is instrumented. You see real numbers, not vanity metrics — and we act on what the data actually says.",
  },
  {
    icon: Workflow,
    title: "Seamless Integration",
    body: "Our systems plug into your existing stack — CRMs, ERPs, communication tools, billing platforms — with minimal disruption and maximum impact from day one.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-navy-900">
      <div className="container max-w-6xl px-4">
        <div className="text-center mb-16">
          <p className="text-gold-400 font-medium text-sm tracking-widest uppercase mb-3">
            Why Websaarthi
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Built for Outcomes, Not Hours
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We measure success by your growth, not our deliverable count.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="flex flex-col items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-500/5 border border-gold-500/20 flex items-center justify-center text-gold-400">
                <p.icon size={28} />
              </div>
              <h3 className="text-white font-semibold text-xl">{p.title}</h3>
              <p className="text-slate-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
