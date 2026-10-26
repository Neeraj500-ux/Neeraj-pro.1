import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { additionalReact, projects, type Category } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/ui/reveal";

const tabs: Array<"All" | Category> = ["All", "React", "WordPress", "Other"];
const tabLabel = { All: "All projects", React: "React", WordPress: "WordPress", Other: "Practice" } as const;

export default function Projects() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("React");
  const [showAll, setShowAll] = useState(false);
  const list = useMemo(() => projects.filter((p) => tab === "All" || p.category === tab), [tab]);
  const visible = showAll ? list : list.slice(0, 6);
  const count = (t: (typeof tabs)[number]) => (t === "All" ? projects.length : projects.filter((p) => p.category === t).length);

  return (
    <section id="projects" className="section">
      <div className="container-x">
        <SectionHeading title="Selected work" intro="Live websites and applications built with React and WordPress. Every card links to the deployed site." />

        <div role="tablist" aria-label="Project categories" className="mb-10 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => { setTab(t); setShowAll(false); }}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${tab === t ? "border-crimson bg-crimson text-white" : "border-white/10 text-bone/70 hover:border-white/30"}`}>
              {tabLabel[t]} <span className="ml-1 opacity-60">{count(t)}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div key={p.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length > 6 && (
          <div className="mt-10 text-center">
            <button onClick={() => setShowAll((v) => !v)} className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:border-crimson-glow">
              {showAll ? "Show fewer" : `Show all ${list.length} projects`}
            </button>
          </div>
        )}

        {(tab === "React" || tab === "All") && (
          <Reveal className="mt-16 rounded-3xl border border-white/10 bg-coal p-8">
            <h3 className="font-display text-2xl">More React projects</h3>
            <p className="mt-2 text-sm text-bone/60">Practice builds covering responsive layouts, React fundamentals, reusable interfaces, and interactive components.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {additionalReact.map((p) => (
                <li key={p.url}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold transition-colors hover:border-crimson-glow hover:text-crimson-glow">
                    {p.name} <ArrowUpRight size={15} />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
