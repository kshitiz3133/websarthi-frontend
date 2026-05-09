import ServiceCard from "@/components/ui/ServiceCard";
import FadeIn from "@/components/ui/FadeIn";
import {
  Megaphone,
  UserCheck,
  HeartHandshake,
  Cpu,
  Settings2,
} from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "SEO, paid ads, content strategy, and social media campaigns tailored to generate high-intent leads at scale.",
  },
  {
    icon: UserCheck,
    title: "Lead Qualification",
    description:
      "Multi-stage qualification pipelines that score, filter, and prioritise leads so your sales team only speaks to buyers.",
  },
  {
    icon: HeartHandshake,
    title: "Lead Catering",
    description:
      "Nurture sequences, personalised outreach, and CRM workflows that keep leads warm from first touch to close.",
  },
  {
    icon: Cpu,
    title: "Tech Provision",
    description:
      "Full-stack development, cloud infrastructure, API integrations, and platform builds — all under one roof.",
  },
  {
    icon: Settings2,
    title: "Operations Automation",
    description:
      "End-to-end workflow automation, RPA, and process optimisation that eliminate manual bottlenecks and cut costs.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-secondary/50">
      <div className="container max-w-6xl px-4 mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-gold-500 dark:text-indigo-400 font-medium text-sm tracking-widest uppercase mb-3">
              What We Do
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Everything Your Business Needs
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Five core capabilities. One integrated partner. Zero complexity.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <ServiceCard {...s} />
            </FadeIn>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:max-w-2xl lg:mx-auto">
          {services.slice(3).map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <ServiceCard {...s} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
