import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Code2,
  ExternalLink,
  Flame,
  FolderKanban,
  Layers3,
  LayoutTemplate,
  MessageSquareText,
  Monitor,
  Sparkles,
  User,
} from "lucide-react";

import {
  additionalReact,
  projects,
  type Category,
} from "@/data/portfolio";

import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/ui/reveal";

/* =========================================================
   TYPES
========================================================= */

type ProjectTab = "All" | Category;

/* =========================================================
   TABS
========================================================= */

const tabs: ProjectTab[] = [
  "All",
  "React",
  "WordPress",
  "Other",
];

const tabLabel: Record<ProjectTab, string> = {
  All: "All Projects",
  React: "React",
  WordPress: "WordPress",
  Other: "Practice",
};

/* =========================================================
   FEATURED PROJECT
========================================================= */

const creativeCrewProject = {
  name: "Creative Crew",

  title: "High-Converting Landing Page",

  description:
    "A conversion-focused landing page designed with a strong visual hierarchy, clear calls to action, responsive layouts, and a modern funnel-style user experience.",

  url: "http://wmvoxfulwqox8.web.anested.com/",

  /* public/images/creative-crew-project.png */
  image: "/images/creative-crew-project.png",

  tags: [
    "Landing Page",
    "Responsive",
    "Conversion UI",
    "Modern Design",
  ],
};

/* =========================================================
   MORE REACT PROJECT UI DETAILS
========================================================= */

const reactProjectDetails = [
  {
    title: "Profile Dashboard",
    label: "Interface Project",
    Icon: User,
  },
  {
    title: "Chat Room UI",
    label: "Interactive UI",
    Icon: MessageSquareText,
  },
  {
    title: "React Hooks Lab",
    label: "React Practice",
    Icon: Braces,
  },
  {
    title: "Responsive Web UI",
    label: "Frontend Build",
    Icon: LayoutTemplate,
  },
];

/* =========================================================
   PROJECTS COMPONENT
========================================================= */

export default function Projects() {
  const [tab, setTab] = useState<ProjectTab>("React");

  const [showAll, setShowAll] = useState(false);

  /* =======================================================
     FILTERED PROJECTS
  ======================================================= */

  const list = useMemo(() => {
    if (tab === "All") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === tab
    );
  }, [tab]);

  const visibleProjects = showAll
    ? list
    : list.slice(0, 6);

  /* =======================================================
     PROJECT COUNT
  ======================================================= */

  const getProjectCount = (
    currentTab: ProjectTab
  ): number => {
    if (currentTab === "All") {
      return projects.length + 1;
    }

    const normalCount = projects.filter(
      (project) => project.category === currentTab
    ).length;

    if (currentTab === "React") {
      return normalCount + 1;
    }

    return normalCount;
  };

  const showFeaturedProject =
    tab === "React" || tab === "All";

  const showMoreReact =
    tab === "React" || tab === "All";

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-[#050607] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Main Background */}

        <div className="absolute inset-0 bg-[#050607]" />

        {/* Top Glow */}

        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-[60%] rounded-full bg-red-700/[0.12] blur-[160px]" />

        {/* Left Glow */}

        <div className="absolute -left-60 top-[30%] h-[520px] w-[520px] rounded-full bg-red-950/[0.14] blur-[170px]" />

        {/* Right Glow */}

        <div className="absolute -right-60 top-[50%] h-[520px] w-[520px] rounded-full bg-red-900/[0.10] blur-[170px]" />

        {/* Bottom Glow */}

        <div className="absolute bottom-[-200px] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-red-950/[0.10] blur-[180px]" />

        {/* Radial Background */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(220,38,38,0.06),transparent_38%)]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "65px 65px",
          }}
        />

        {/* Bottom Fade */}

        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* ===================================================
          MAIN CONTAINER
      =================================================== */}

      <div className="container-x relative mx-auto max-w-7xl">
        {/* =================================================
            SECTION HEADING
        ================================================= */}

        <Reveal>
          <div className="mb-10 sm:mb-12">
            {/* Badge */}

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-4 py-2 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-300 sm:text-[11px]">
                Selected Portfolio
              </span>
            </div>

            <div className="max-w-4xl">
              <SectionHeading
                title="Selected work"
                intro="A collection of live websites, React applications, landing pages, and WordPress projects focused on responsive design, clean interfaces, and real-world user experiences."
              />
            </div>
          </div>
        </Reveal>

        {/* =================================================
            FILTER TABS
        ================================================= */}

        <Reveal delay={0.05}>
          <div className="mb-10 flex flex-col gap-5 border-b border-white/[0.08] pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div
              role="tablist"
              aria-label="Project categories"
              className="flex max-w-full gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {tabs.map((currentTab) => {
                const isActive = tab === currentTab;

                return (
                  <button
                    key={currentTab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setTab(currentTab);
                      setShowAll(false);
                    }}
                    className={`group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:px-5 sm:text-sm ${
                      isActive
                        ? "border-red-500/50 bg-red-500/[0.13] text-white shadow-[0_8px_30px_rgba(220,38,38,.12)]"
                        : "border-white/[0.10] bg-white/[0.02] text-white/50 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-project-tab"
                        className="absolute inset-0 bg-gradient-to-r from-red-700/[0.15] to-red-500/[0.05]"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative">
                      {tabLabel[currentTab]}
                    </span>

                    <span
                      className={`relative flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] ${
                        isActive
                          ? "bg-red-500/20 text-red-200"
                          : "bg-white/[0.06] text-white/35"
                      }`}
                    >
                      {getProjectCount(currentTab)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current View */}

            <div className="hidden items-center gap-3 lg:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-red-400">
                <FolderKanban size={17} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                  Current View
                </p>

                <p className="mt-0.5 text-sm font-semibold text-white/70">
                  {getProjectCount(tab)}{" "}
                  {getProjectCount(tab) === 1
                    ? "Project"
                    : "Projects"}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =================================================
            FEATURED CREATIVE CREW PROJECT
        ================================================= */}

        <AnimatePresence mode="wait">
          {showFeaturedProject && (
            <motion.div
              key="creative-crew-featured"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.35,
              }}
              className="mb-10"
            >
              <Reveal>
                <div className="group relative overflow-hidden rounded-[30px] border border-red-500/[0.16] bg-gradient-to-br from-white/[0.055] via-white/[0.02] to-red-950/[0.10] p-px shadow-[0_30px_90px_rgba(0,0,0,.35)]">
                  {/* Glow */}

                  <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-red-600/[0.11] blur-[120px]" />

                  <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-red-950/[0.12] blur-[130px]" />

                  {/* Card */}

                  <div className="relative overflow-hidden rounded-[29px] bg-black/[0.25] p-6 backdrop-blur-2xl sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center xl:gap-12">
                      {/* ===================================
                          LEFT CONTENT
                      =================================== */}

                      <div>
                        {/* Badges */}

                        <div className="mb-6 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/[0.09] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-red-300">
                            <Flame size={12} />
                            New Project
                          </span>

                          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
                            <Sparkles size={12} />
                            Featured
                          </span>
                        </div>

                        {/* Project Name */}

                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">
                          {creativeCrewProject.name}
                        </p>

                        {/* Title */}

                        <h3 className="max-w-3xl text-3xl font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl lg:text-[46px]">
                          High-Converting
                          <br />

                          <span className="bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-transparent">
                            Landing Page.
                          </span>
                        </h3>

                        {/* Description */}

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-[15px]">
                          {creativeCrewProject.description}
                        </p>

                        {/* Tags */}

                        <div className="mt-6 flex flex-wrap gap-2">
                          {creativeCrewProject.tags.map(
                            (tag) => (
                              <span
                                key={tag}
                                className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.10em] text-white/40"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>

                        {/* Buttons */}

                        <div className="mt-8 flex flex-wrap gap-3">
                          <a
                            href={creativeCrewProject.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/button inline-flex min-h-12 items-center justify-center gap-3 rounded-xl border border-red-400/25 bg-gradient-to-r from-red-800 via-red-600 to-red-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_35px_rgba(185,28,28,.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(220,38,38,.30)]"
                          >
                            View Live Project

                            <ArrowUpRight
                              size={16}
                              className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                            />
                          </a>

                          <div className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 text-xs font-medium text-white/40">
                            <Monitor
                              size={15}
                              className="text-red-400"
                            />

                            Live Website
                          </div>
                        </div>
                      </div>

                      {/* ===================================
                          RIGHT PROJECT IMAGE
                      =================================== */}

                      <div className="relative min-w-0">
                        {/* Background Glow */}

                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.15] blur-[100px]" />

                        {/* Browser */}

                        <a
                          href={creativeCrewProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Creative Crew live project"
                          className="group/browser relative block overflow-hidden rounded-[22px] border border-red-500/25 bg-[#080808] shadow-[0_30px_80px_rgba(0,0,0,.55)] transition-all duration-500 hover:-translate-y-2 hover:border-red-500/45 hover:shadow-[0_35px_90px_rgba(127,29,29,.22)]"
                        >
                          {/* Browser Header */}

                          <div className="flex h-11 items-center gap-3 border-b border-white/[0.08] bg-[#111112] px-4">
                            {/* Browser Dots */}

                            <div className="flex shrink-0 gap-1.5">
                              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />

                              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />

                              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                            </div>

                            {/* URL Bar */}

                            <div className="flex h-6 min-w-0 flex-1 items-center rounded-md border border-white/[0.06] bg-black/50 px-3">
                              <span className="truncate text-[9px] text-white/25">
                                wmvoxfulwqox8.web.anested.com
                              </span>
                            </div>
                          </div>

                          {/* ===============================
                              ACTUAL PROJECT IMAGE
                          =============================== */}

                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f5f0ff]">
                            <img
                              src={
                                creativeCrewProject.image
                              }
                              alt="Creative Crew High-Converting Landing Page"
                              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/browser:scale-[1.025]"
                              loading="eager"
                              decoding="async"
                              onError={(event) => {
                                console.error(
                                  "Project image failed to load:",
                                  event.currentTarget.src
                                );
                              }}
                            />

                            {/* Bottom Shade */}

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/browser:opacity-100" />

                            {/* Hover */}

                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover/browser:bg-black/10">
                              <div className="flex translate-y-3 items-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-2.5 text-xs font-semibold text-white opacity-0 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover/browser:translate-y-0 group-hover/browser:opacity-100">
                                View Live

                                <ArrowUpRight size={14} />
                              </div>
                            </div>
                          </div>

                          {/* Browser Bottom */}

                          <div className="flex items-center justify-between border-t border-white/[0.07] bg-[#0c0c0d] px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_7px_rgba(74,222,128,.8)]" />

                              <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30">
                                Creative Crew
                              </span>
                            </div>

                            <ExternalLink
                              size={13}
                              className="text-red-400 transition-transform duration-300 group-hover/browser:-translate-y-0.5 group-hover/browser:translate-x-0.5"
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            NORMAL PROJECT CARDS
        ================================================= */}

        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map(
              (project, index) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{
                    opacity: 0,
                    y: 15,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.035,
                  }}
                  className="group"
                >
                  <div className="h-full transition-transform duration-300 hover:-translate-y-1">
                    <ProjectCard
                      project={project}
                    />
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* =================================================
            SHOW ALL BUTTON
        ================================================= */}

        {list.length > 6 && (
          <Reveal>
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setShowAll(
                    (current) => !current
                  )
                }
                className="group flex min-h-12 items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.025] px-6 py-3 text-sm font-semibold text-white/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/35 hover:bg-red-500/[0.06] hover:text-white"
              >
                {showAll
                  ? "Show Fewer Projects"
                  : `Show All ${list.length} Projects`}

                <ArrowRight
                  size={15}
                  className={`transition-transform duration-300 ${
                    showAll
                      ? "-rotate-90"
                      : "group-hover:translate-x-1"
                  }`}
                />
              </button>
            </div>
          </Reveal>
        )}

        {/* =================================================
            MORE REACT PROJECTS
        ================================================= */}

        {showMoreReact && (
          <Reveal className="mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-gradient-to-br from-white/[0.04] via-white/[0.018] to-red-950/[0.07] p-6 shadow-[0_25px_70px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-8 lg:p-10">
              {/* Glow */}

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/[0.08] blur-[100px]" />

              <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-red-950/[0.08] blur-[110px]" />

              {/* Header */}

              <div className="relative mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  {/* Icon */}

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.08] text-red-400">
                    <Code2 size={19} />
                  </div>

                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.20em] text-red-400">
                    Development Playground
                  </p>

                  <h3 className="text-2xl font-bold tracking-[-0.035em] text-white sm:text-3xl">
                    More React Projects
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
                    Practice builds covering
                    responsive layouts, React
                    fundamentals, reusable
                    interfaces, interactive
                    components, and frontend
                    experimentation.
                  </p>
                </div>

                {/* Builds */}

                <div className="flex items-center gap-2 text-xs text-white/30">
                  <Layers3
                    size={15}
                    className="text-red-400"
                  />

                  {Math.min(
                    additionalReact.length,
                    reactProjectDetails.length
                  )}{" "}
                  Builds
                </div>
              </div>

              {/* ===========================================
                  REACT PROJECT CARDS
              =========================================== */}

              <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {additionalReact
                  .slice(
                    0,
                    reactProjectDetails.length
                  )
                  .map((project, index) => {
                    const detail =
                      reactProjectDetails[index];

                    if (!detail) {
                      return null;
                    }

                    const Icon = detail.Icon;

                    return (
                      <a
                        key={project.url}
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item relative min-h-[180px] overflow-hidden rounded-2xl border border-white/[0.08] bg-black/[0.20] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/40 hover:bg-red-500/[0.055] hover:shadow-[0_18px_45px_rgba(220,38,38,.08)]"
                      >
                        {/* Glow */}

                        <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/[0.12] opacity-0 blur-[40px] transition-opacity duration-300 group-hover/item:opacity-100" />

                        {/* Top */}

                        <div className="relative flex items-start justify-between gap-4">
                          {/* Project Icon */}

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.08] text-red-400 transition-all duration-300 group-hover/item:border-red-500/40 group-hover/item:bg-red-500/[0.13] group-hover/item:text-red-300">
                            <Icon size={18} />
                          </div>

                          {/* Arrow */}

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/30 transition-all duration-300 group-hover/item:border-red-500/35 group-hover/item:bg-red-500/[0.10] group-hover/item:text-red-400">
                            <ArrowUpRight
                              size={15}
                              className="transition-transform duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
                            />
                          </div>
                        </div>

                        {/* Text */}

                        <div className="relative mt-6">
                          <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.17em] text-red-400/60">
                            Project{" "}
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <h4 className="text-[15px] font-bold tracking-[-0.02em] text-white/80 transition-colors duration-300 group-hover/item:text-white">
                            {detail.title}
                          </h4>

                          <div className="mt-2 flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-red-500" />

                            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/30">
                              {detail.label}
                            </span>
                          </div>
                        </div>

                        {/* Bottom Line */}

                        <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-red-600 via-red-400 to-transparent transition-all duration-500 group-hover/item:w-full" />
                      </a>
                    );
                  })}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}