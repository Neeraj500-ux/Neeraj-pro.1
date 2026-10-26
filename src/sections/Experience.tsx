import { education, experience } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/reveal";
import { Briefcase, GraduationCap } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-x grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading title="Experience" />
          <ol className="relative space-y-10 border-l border-white/10 pl-8">
            {experience.map((e) => (
              <li key={e.title} className="relative">
                <span className="absolute -left-[2.65rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-crimson text-white"><Briefcase size={16} /></span>
                <Reveal>
                  <h3 className="font-display text-2xl">{e.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-crimson-glow">{e.company}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-bone/70">
                    {e.points.map((p) => <li key={p} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bone/40" />{p}</li>)}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHeading title="Education" />
          <ul className="space-y-4">
            {education.map((e) => (
              <Reveal key={e.title}>
                <li className="flex items-start gap-4 rounded-2xl border border-white/10 bg-coal p-5">
                  <GraduationCap size={20} className="mt-0.5 shrink-0 text-crimson-glow" />
                  <div>
                    <h3 className="font-semibold">{e.title}</h3>
                    {e.place && <p className="mt-1 text-sm text-bone/60">{e.place}</p>}
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
