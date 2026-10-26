import { about, profile, stats } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/reveal";
import { MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading title="A developer who cares how it feels to use" />
          <Reveal className="space-y-5 font-display text-lg leading-[1.75] text-bone/75">
            {about.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
        </div>
        <Reveal delay={0.1} className="self-end">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-oxblood to-coal p-8">
            <p className="flex items-center gap-2 text-sm text-bone/60"><MapPin size={16} className="text-crimson-glow" /> {profile.location}</p>
            <dl className="mt-8 divide-y divide-white/10">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline justify-between py-4">
                  <dt className="text-sm text-bone/65">{s.label}</dt>
                  <dd className="font-display text-4xl text-white">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
