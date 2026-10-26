import { services } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/reveal";
import { Code2, Layers, LayoutTemplate, Smartphone } from "lucide-react";

const icons = [Code2, Layers, Smartphone, LayoutTemplate];

export default function Services() {
  return (
    <section id="services" className="section bg-coal">
      <div className="container-x">
        <SectionHeading title="What I can build for you" />
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="group h-full rounded-3xl border border-white/10 bg-ink/60 p-8 transition-all hover:border-crimson/60">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-crimson/15 text-crimson-glow transition-colors group-hover:bg-crimson group-hover:text-white"><Icon size={22} /></span>
                  <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/65">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
