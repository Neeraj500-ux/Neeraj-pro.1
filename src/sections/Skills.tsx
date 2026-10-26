
import { skillGroups, strengths } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/reveal";
import {
  Code2,
  Palette,
  Smartphone,
  Layers,
  Braces,
  Workflow,
  Monitor,
  Database,
  Sparkles,
} from "lucide-react";

const nodes = [
  { icon: Palette, label: "Design" },
  { icon: Code2, label: "Frontend" },
  { icon: Sparkles, label: "Creative" },
  { icon: Braces, label: "Code" },
  { icon: Layers, label: "React" },
  { icon: Smartphone, label: "Responsive" },
  { icon: Workflow, label: "Workflow" },
];

const nodePositions = [
  { x: 155, y: 115 },
  { x: 330, y: 105 },
  { x: 565, y: 115 },
  { x: 155, y: 235 },
  { x: 650, y: 235 },
  { x: 330, y: 350 },
  { x: 565, y: 350 },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="section relative isolate overflow-hidden bg-coal"
    >
      {/* Background lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 -z-10 h-80 w-80 rounded-full bg-crimson/10 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 -z-10 h-80 w-80 rounded-full bg-purple-600/[0.07] blur-[100px]"
      />

      <div className="container-x relative z-10">
        <SectionHeading
          title="Skills and tools"
          intro="What I build with day to day, grouped by the kind of work."
        />

        {/* Connected skills network */}
        <Reveal className="mt-10 sm:mt-14">
          <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/[0.12] bg-[#111112] shadow-2xl shadow-black/30 sm:rounded-3xl">
            {/* Dotted background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            <div
              aria-hidden="true"
              className="skills-ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/10 blur-[75px] sm:h-64 sm:w-64"
            />

            <div className="relative mx-auto aspect-[1.45/1] w-full sm:aspect-[1.9/1]">
              {/* Animated connection lines */}
              <svg
                aria-hidden="true"
                viewBox="0 0 800 450"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
                fill="none"
              >
                {nodePositions.map((point, index) => {
                  const centerX = 400;
                  const centerY = 225;
                  const midX = (point.x + centerX) / 2;
                  const path = `M ${centerX} ${centerY} H ${midX} V ${point.y} H ${point.x}`;

                  return (
                    <g key={index}>
                      <path
                        d={path}
                        stroke="rgba(255,255,255,0.10)"
                        strokeWidth="1.5"
                      />

                      <path
                        d={path}
                        stroke="rgba(255,255,255,0.65)"
                        strokeWidth="1.2"
                        strokeDasharray="3 15"
                        className="skills-flow-line"
                        style={{
                          animationDelay: `${index * -0.65}s`,
                        }}
                      />

                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill="#f0445f"
                        className="skills-node-dot"
                        style={{
                          animationDelay: `${index * 0.25}s`,
                        }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Animated icons */}
              {nodes.map((node, index) => {
                const Icon = node.icon;
                const point = nodePositions[index];

                return (
                  <div
                    key={node.label}
                    className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 sm:gap-2"
                    style={{
                      left: `${(point.x / 800) * 100}%`,
                      top: `${(point.y / 450) * 100}%`,
                    }}
                  >
                    <div
                      className="skills-node-card relative grid h-9 w-9 place-items-center rounded-xl border border-white/[0.12] bg-[#09090a] text-bone/80 shadow-lg shadow-black/30 transition-colors duration-300 group-hover:border-crimson/70 group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl"
                      style={{
                        animationDelay: `${index * 0.2}s`,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="skills-icon-glow pointer-events-none absolute inset-0 rounded-xl bg-crimson/10 blur-md sm:rounded-2xl"
                      />

                      <Icon
                        size={18}
                        strokeWidth={1.7}
                        className="relative z-10 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6"
                      />
                    </div>

                    <span className="max-w-[70px] truncate text-[9px] font-medium tracking-wide text-bone/50 transition-colors duration-300 group-hover:text-white sm:max-w-none sm:text-xs">
                      {node.label}
                    </span>
                  </div>
                );
              })}

              {/* Center logo */}
              <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <div className="skills-center-node relative rounded-2xl border border-white/[0.15] bg-[#09090a] p-1.5 shadow-2xl sm:rounded-3xl sm:p-2">
                  <div className="absolute inset-0 rounded-2xl bg-crimson/20 blur-xl sm:rounded-3xl" />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-[#171719] sm:h-16 sm:w-16 sm:rounded-2xl">
                    <span className="font-display text-lg font-bold tracking-tight text-white sm:text-2xl">
                      NK
                    </span>

                    <span className="skills-status-dot absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#171719] bg-crimson-glow" />
                  </div>
                </div>
              </div>
            </div>

            {/* Network footer */}
            <div className="relative flex items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-glow shadow-[0_0_8px_rgba(220,60,90,0.7)]" />

                <span className="truncate text-[10px] tracking-wide text-bone/55 sm:text-xs">
                  Connected skills & tools
                </span>
              </div>

              <span className="shrink-0 text-[9px] uppercase tracking-[0.16em] text-bone/40 sm:text-[10px]">
                Creative · Code · Build
              </span>
            </div>
          </div>
        </Reveal>

        {/* Skill cards */}
        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:gap-6">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-ink/70 p-5 transition-colors duration-300 hover:border-crimson/40 hover:bg-ink sm:rounded-3xl sm:p-7 motion-reduce:transition-none">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-crimson/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-crimson-glow transition-colors duration-300 group-hover:border-crimson/40 group-hover:bg-crimson/10">
                    {index % 2 === 0 ? (
                      <Monitor size={19} />
                    ) : (
                      <Database size={19} />
                    )}
                  </span>

                  <h3 className="font-display text-xl text-bone sm:text-2xl">
                    {group.title}
                  </h3>
                </div>

                {/* Premium inset capsules */}
                <ul className="relative mt-5 flex flex-wrap gap-2">
                  {group.items.map((skill, skillIndex) => {
                    const delay = (index * 0.7 + skillIndex * 0.42) % 5;

                    return (
                      <li
                        key={skill}
                        className="skill-capsule group/capsule relative isolate overflow-hidden rounded-full border border-white/[0.07] bg-[#171719] px-4 py-2.5 text-xs font-medium text-bone/85 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_2px_5px_rgba(0,0,0,0.3)] transition-colors duration-300 hover:border-crimson/60 hover:text-white sm:px-5 sm:py-3 sm:text-sm motion-reduce:animate-none motion-reduce:transition-none"
                        style={{
                          animationDelay: `${delay}s`,
                        }}
                      >
                        {/* Moving white reflection */}
                        <span
                          aria-hidden="true"
                          className="skill-capsule-shine pointer-events-none absolute inset-y-0 -left-1/2 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          style={{
                            animationDelay: `${delay}s`,
                          }}
                        />

                        {/* Soft inner red reflection */}
                        <span
                          aria-hidden="true"
                          className="skill-capsule-rim pointer-events-none absolute inset-0 -z-10 rounded-full"
                          style={{
                            animationDelay: `${delay}s`,
                          }}
                        />

                        <span className="relative z-10">{skill}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Professional strengths */}
        <Reveal delay={0.1} className="mt-6 sm:mt-8">
          <div className="group relative overflow-hidden rounded-2xl border border-crimson/25 bg-gradient-to-br from-crimson-deep/30 via-oxblood to-ink p-5 sm:rounded-3xl sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-crimson/10 blur-[70px]"
            />

            <h3 className="relative font-display text-xl text-white sm:text-2xl">
              Professional strengths
            </h3>

            <ul className="relative mt-5 flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8">
              {strengths.map((strength, index) => (
                <li
                  key={strength}
                  className="strength-item flex items-center gap-2.5 text-sm leading-6 text-bone/80"
                  style={{
                    animationDelay: `${index * 0.35}s`,
                  }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-glow shadow-[0_0_8px_rgba(220,60,90,0.4)]" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Custom animations */}
      <style>{`
        .skill-capsule {
          animation: capsule-border 4s ease-in-out infinite;
        }

        .skill-capsule-shine {
          animation: capsule-shine 5s ease-in-out infinite;
        }

        .skill-capsule-rim {
          animation: capsule-rim 4s ease-in-out infinite;
        }

        .skills-flow-line {
          animation: skills-flow 4.8s linear infinite;
        }

        .skills-node-dot {
          animation: node-pulse 2.6s ease-in-out infinite;
        }

        .skills-node-card {
          animation: node-float 5s ease-in-out infinite;
        }

        .skills-icon-glow {
          animation: icon-glow 3.2s ease-in-out infinite;
        }

        .skills-center-node {
          animation: center-glow 3.5s ease-in-out infinite;
        }

        .skills-status-dot {
          animation: status-pulse 2s ease-in-out infinite;
        }

        .skills-ambient-glow {
          animation: ambient-pulse 6s ease-in-out infinite;
        }

        .strength-item {
          animation: strength-glow 4s ease-in-out infinite;
        }

        @keyframes capsule-border {
          0%, 100% {
            border-color: rgba(255, 255, 255, 0.07);
            box-shadow:
              inset 0 2px 8px rgba(0, 0, 0, 0.8),
              0 2px 5px rgba(0, 0, 0, 0.3);
          }

          50% {
            border-color: rgba(220, 60, 85, 0.42);
            box-shadow:
              inset 0 2px 9px rgba(0, 0, 0, 0.85),
              0 0 12px rgba(220, 60, 85, 0.09);
          }
        }

        @keyframes capsule-shine {
          0%, 12% {
            transform: translateX(0) skewX(-12deg);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          48%, 100% {
            transform: translateX(470%) skewX(-12deg);
            opacity: 0;
          }
        }

        @keyframes capsule-rim {
          0%, 100% {
            box-shadow: inset 0 0 0 rgba(220, 60, 85, 0);
          }

          50% {
            box-shadow: inset 0 0 9px rgba(220, 60, 85, 0.07);
          }
        }

        @keyframes skills-flow {
          to {
            stroke-dashoffset: -72;
          }
        }

        @keyframes node-pulse {
          0%, 100% {
            opacity: 0.55;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes node-float {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes icon-glow {
          0%, 100% {
            opacity: 0.08;
          }

          50% {
            opacity: 0.5;
          }
        }

        @keyframes center-glow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(244, 68, 95, 0.04);
          }

          50% {
            box-shadow: 0 0 25px rgba(244, 68, 95, 0.16);
          }
        }

        @keyframes status-pulse {
          0%, 100% {
            box-shadow: 0 0 4px rgba(244, 68, 95, 0.4);
          }

          50% {
            box-shadow: 0 0 12px rgba(244, 68, 95, 0.9);
          }
        }

        @keyframes ambient-pulse {
          0%, 100% {
            opacity: 0.55;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes strength-glow {
          0%, 100% {
            color: rgba(248, 245, 245, 0.8);
          }

          50% {
            color: rgba(255, 255, 255, 0.98);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-capsule,
          .skill-capsule-shine,
          .skill-capsule-rim,
          .skills-flow-line,
          .skills-node-dot,
          .skills-node-card,
          .skills-icon-glow,
          .skills-center-node,
          .skills-status-dot,
          .skills-ambient-glow,
          .strength-item {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
