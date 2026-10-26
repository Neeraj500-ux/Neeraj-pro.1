import { ArrowUpRight, Code2, Layers, Monitor } from "lucide-react";
import type { Project } from "@/data/portfolio";

const icons = { React: Code2, WordPress: Layers, Other: Monitor };

/**
 * No screenshots were supplied, so each card gets a designed browser-frame visual
 * instead of a fake or unrelated image. Drop screenshots in /public/images/projects
 * and set `image` in the data file later if you want real previews.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const Icon = icons[project.category];
  const host = project.live ? new URL(project.live).host : "source project";
  const initial = project.name.trim().charAt(0);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-coal transition-all duration-500 hover:-translate-y-1 hover:border-crimson/60 hover:shadow-[0_20px_60px_-20px_rgba(225,29,46,.45)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-oxblood via-ink to-ink">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-crimson/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-white/10 bg-ink/80">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-crimson" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-2 truncate rounded-full bg-white/5 px-3 py-0.5 text-[10px] text-bone/50">{host}</span>
          </div>
          <div className="grid place-items-center pt-6">
            <span className="font-display text-7xl italic text-white/90 transition-transform duration-500 group-hover:scale-110">{initial}</span>
            <div className="mt-4 h-1.5 w-2/3 rounded-full bg-white/10" />
            <div className="mt-2 h-1.5 w-1/2 rounded-full bg-white/5" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-crimson-glow">
          <Icon size={14} /> {project.category === "Other" ? "Practice project" : project.category}
        </div>
        <h3 className="font-display text-2xl leading-snug">{project.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-bone/65">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-bone/80">{t}</li>
          ))}
        </ul>
        {(project.live || project.extra) && (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white hover:text-crimson-glow">
                Live website <ArrowUpRight size={15} />
              </a>
            )}
            {project.extra && (
              <a href={project.extra.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-bone/70 hover:text-crimson-glow">
                {project.extra.label} <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
