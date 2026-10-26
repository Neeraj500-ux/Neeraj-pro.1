
import { services } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/reveal";
import {
  Code2,
  Layers,
  LayoutTemplate,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";

const icons = [Code2, Layers, Smartphone, LayoutTemplate];

export default function Services() {
  return (
    <section
      id="services"
      className="section relative isolate overflow-hidden bg-coal"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-crimson/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 -z-10 h-72 w-72 rounded-full bg-purple-600/[0.07] blur-[100px]"
      />

      <div className="container-x relative z-10">
        <SectionHeading title="What I can build for you" />

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:gap-7">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];

            return (
              <Reveal key={s.title} delay={i * 0.06}>
                <article
                  className="group relative h-full rounded-3xl p-px transition-transform duration-500 ease-out motion-reduce:transition-none sm:hover:-translate-y-1.5 sm:hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-2deg)]"
                >
                  {/* Animated border */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-crimson/50 via-white/[0.06] to-purple-500/30 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {/* Card */}
                  <div className="relative isolate flex h-full min-h-[245px] flex-col overflow-hidden rounded-[23px] border border-white/[0.07] bg-ink/95 p-6 shadow-xl shadow-black/10 sm:min-h-[265px] sm:p-8">
                    {/* Animated grid background */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] transition-opacity duration-500 group-hover:opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(220,60,90,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(220,60,90,0.22) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        maskImage:
                          "linear-gradient(to bottom right, black, transparent 85%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom right, black, transparent 85%)",
                      }}
                    />

                    {/* Hover glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-crimson/10 opacity-40 blur-[65px] transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
                    />

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-crimson/20 bg-crimson/10 text-crimson-glow transition-all duration-300 group-hover:border-crimson/50 group-hover:bg-crimson group-hover:text-white group-hover:shadow-lg group-hover:shadow-crimson/20 sm:h-14 sm:w-14">
                        <Icon
                          size={24}
                          strokeWidth={1.8}
                          className="transition-transform duration-300 group-hover:scale-110"
                          aria-hidden="true"
                        />
                      </div>

                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-bone/40 transition-all duration-300 group-hover:border-crimson/30 group-hover:text-crimson-glow">
                        <ArrowUpRight
                          size={18}
                          aria-hidden="true"
                        />
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-7 flex-1 sm:mt-8">
                      <h3 className="font-display text-xl font-semibold leading-snug text-bone transition-colors duration-300 group-hover:text-white sm:text-2xl">
                        {s.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-bone/60 transition-colors duration-300 group-hover:text-bone/80 sm:text-base sm:leading-7">
                        {s.text}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div
                      aria-hidden="true"
                      className="mt-6 h-px w-12 origin-left bg-gradient-to-r from-crimson-glow to-purple-400 transition-all duration-500 group-hover:w-24"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
