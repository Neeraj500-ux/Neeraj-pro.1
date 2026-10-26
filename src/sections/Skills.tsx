import { skillGroups, strengths } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/reveal";

export default function Skills() {
  return (
    <section id="skills" className="section bg-coal">
      <div className="container-x">
        <SectionHeading title="Skills and tools" intro="What I build with day to day, grouped by the kind of work." />
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-white/10 bg-ink/60 p-7 transition-colors hover:border-crimson/50">
                <h3 className="font-display text-2xl">{g.title}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-bone/85">{s}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-3xl border border-crimson/30 bg-gradient-to-r from-crimson-deep/40 via-oxblood to-ink p-7">
          <h3 className="font-display text-2xl">Professional strengths</h3>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-bone/80">
            {strengths.map((s) => <li key={s} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-crimson-glow" />{s}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
