
import { about, profile, stats } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/reveal";
import { MapPin, ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="section relative isolate overflow-hidden"
    >
      {/* Ambient background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 -z-10 h-64 w-64 rounded-full bg-crimson-glow/10 blur-[90px] sm:h-80 sm:w-80"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-32 -z-10 h-64 w-64 rounded-full bg-purple-500/[0.08] blur-[90px] sm:h-80 sm:w-80"
      />

      <div className="container-x relative z-10 grid min-w-0 gap-10 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-14">
        {/* About content */}
        <div className="min-w-0">
          <SectionHeading title="A developer who cares how it feels to use" />

          <Reveal className="mt-6 space-y-5 font-display text-base leading-8 text-bone/75 sm:mt-8 sm:text-lg sm:leading-[1.85]">
            {about.map((p) => (
              <p
                key={p}
                className="transition-colors duration-300 motion-reduce:transition-none sm:hover:text-bone/95"
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Profile and statistics card */}
        <Reveal delay={0.1} className="w-full min-w-0">
          <div className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-oxblood via-coal to-coal p-5 shadow-xl shadow-black/10 transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/20 motion-reduce:transition-none sm:rounded-3xl sm:p-7 lg:p-8">
            {/* Card ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 -z-10 h-52 w-52 rounded-full bg-crimson-glow/15 blur-[65px] transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="flex min-w-0 items-center justify-between gap-3">
              <p className="flex min-w-0 items-center gap-3 text-sm leading-6 text-bone/65">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 group-hover:border-crimson-glow/30 group-hover:bg-crimson-glow/10">
                  <MapPin
                    size={17}
                    className="text-crimson-glow"
                    aria-hidden="true"
                  />
                </span>

                <span className="break-words">{profile.location}</span>
              </p>

              <ArrowUpRight
                size={20}
                className="shrink-0 text-bone/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-crimson-glow motion-reduce:transition-none"
                aria-hidden="true"
              />
            </div>

            {/* Statistics */}
            <dl className="mt-6 divide-y divide-white/[0.09] sm:mt-8">
              {stats.map((s, index) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between gap-4 py-5 first:pt-2 last:pb-2 sm:py-6"
                >
                  <dt className="min-w-0 text-sm leading-6 text-bone/65 transition-colors duration-300 group-hover:text-bone/80 sm:text-base">
                    {s.label}
                  </dt>

                  <dd
                    className="shrink-0 bg-gradient-to-r from-white via-rose-100 to-purple-200 bg-clip-text font-display text-3xl leading-tight tracking-tight text-transparent sm:text-4xl"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Bottom gradient accent */}
            <div
              aria-hidden="true"
              className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson-glow/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
