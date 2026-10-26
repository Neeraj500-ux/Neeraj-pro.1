import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Code2,
  FileText,
  GraduationCap,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Sparkles,
  User,
  type LucideIcon,
} from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { LinkButton } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Icon per section (matched by the link's #id). Unknown ids fall back to Sparkles. */
const ICONS: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  skills: Code2,
  stack: Code2,
  services: Layers,
  projects: Layers,
  work: Briefcase,
  experience: Briefcase,
  education: GraduationCap,
  resume: FileText,
  contact: Mail,
};
const iconFor = (href: string): LucideIcon => ICONS[href.slice(1).toLowerCase()] ?? Sparkles;

/* One-off light sweep that glides across a button on hover (pure CSS, no keyframes needed) */
function Sweep() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-crimson/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[420%] motion-reduce:hidden"
    />
  );
}

export default function Navbar() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  /* ---------- active section (same logic as before) ---------- */
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* ---------- scroll state + progress bar (rAF-throttled, no re-render per frame) ---------- */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      if (progressRef.current) {
        const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progressRef.current.style.transform = `scaleX(${p})`;
      }
      // last section is often too short to reach the observer's centre line
      if (max > 0 && y >= max - 4 && navLinks.length) {
        setActive(navLinks[navLinks.length - 1].href);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ---------- mobile menu: scroll lock, Esc, focus trap, initial focus ---------- */
  useEffect(() => {
    // Preserve any overflow style owned by the page or another overlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previousOverflow;

    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        closeMenu(true);
        return;
      }
      if (e.key === "Tab") {
        const inPanel = Array.from(
          panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []
        );
        const list = [toggleRef.current, ...inPanel].filter(Boolean) as HTMLElement[];
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        const current = document.activeElement;
        if (e.shiftKey && current === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && current === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    let t: ReturnType<typeof setTimeout> | undefined;
    if (open) {
      t = setTimeout(
        () => panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }),
        160
      );
    }
    return () => {
      if (t) clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeMenu]);

  /* ---------- close the menu if the screen grows to desktop ---------- */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* ---------- soft red light inside the mobile panel that follows finger / cursor ---------- */
  const onPanelMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    const glow = glowRef.current;
    if (!panel || !glow || reduce) return;
    const r = panel.getBoundingClientRect();
    glow.style.setProperty("--px", `${e.clientX - r.left}px`);
    glow.style.setProperty("--py", `${e.clientY - r.top}px`);
  };

  /* ---------- animation variants (reduced-motion aware) ---------- */
  const panelV: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.94, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: reduce ? 0 : 0.4,
        ease: EASE,
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: reduce ? 0 : 0.08,
      },
    },
    exit: {
      ...(reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.97, filter: "blur(4px)" }),
      transition: { duration: reduce ? 0 : 0.22, ease: EASE },
    },
  };
  const rowV: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 22 },
    show: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.45, ease: EASE } },
  };

  const dotT = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 420, damping: 28 };
  const pillT = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 400, damping: 34 };

  const socials = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* bar background: fades in after scrolling or when the menu is open */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 border-b border-white/10 bg-ink/70 shadow-[0_10px_40px_-20px_rgba(225,29,46,.55)] backdrop-blur-xl transition-opacity duration-300 ${
          scrolled || open ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-crimson via-[#ff6a4d] to-crimson-glow will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`container-x flex items-center justify-between transition-[padding] duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        {/* ---------- logo ---------- */}
        <a
          href="#home"
          className="group relative rounded-md font-display text-2xl italic tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="Neeraj Kumar – home"
        >
          <span className="transition-colors duration-300 group-hover:text-white">Neeraj</span>
          <span className="relative ml-px inline-block align-baseline">
            <span className="inline-block text-crimson-glow transition duration-300 group-hover:scale-125 group-hover:[text-shadow:0_0_16px_rgba(255,106,77,.95)]">
              .
            </span>
            <span
              aria-hidden
              className="absolute bottom-[0.32em] left-[0.1em] h-1.5 w-1.5 animate-ping rounded-full bg-crimson/60 motion-reduce:hidden"
            />
          </span>
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-crimson via-[#ff6a4d] to-transparent transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
          />
        </a>

        {/* ---------- desktop nav ---------- */}
        <nav
          aria-label="Primary"
          className={`glass relative hidden items-center gap-1 rounded-full p-1.5 transition-shadow duration-300 md:flex ${
            scrolled
              ? "shadow-[0_12px_44px_-14px_rgba(225,29,46,.6),0_0_0_1px_rgba(225,29,46,.18)]"
              : ""
          }`}
        >
          {navLinks.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative rounded-full px-3 py-2 text-[0.8125rem] font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:px-4 lg:text-sm ${
                  isActive ? "text-white" : "text-bone/70 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={pillT}
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-crimson/35 to-crimson/10 shadow-[0_0_22px_-4px_rgba(225,29,46,.75)] ring-1 ring-inset ring-crimson-glow/40"
                  >
                    <span className="absolute inset-x-5 -bottom-px h-px bg-gradient-to-r from-transparent via-[#ff6a4d] to-transparent" />
                  </motion.span>
                )}
                {/* animated underline (inactive links) */}
                {!isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 bg-gradient-to-r from-crimson via-[#ff6a4d] to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            );
          })}
          <LinkButton
            href="#contact"
            variant="light"
            className="group relative ml-1 overflow-hidden !py-2 transition duration-300 hover:-translate-y-px hover:shadow-[0_10px_28px_-8px_rgba(225,29,46,.8)] motion-reduce:transition-none"
          >
            <Sweep />
            <span className="relative z-10 inline-flex items-center gap-1.5">
              Hire me
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </LinkButton>
        </nav>

        {/* ---------- mobile toggle: three dots that morph into an X ---------- */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`glass relative grid h-11 w-11 place-items-center rounded-full transition duration-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 active:scale-90 md:hidden ${
            open
              ? "bg-crimson/20 shadow-[0_0_0_1px_rgba(255,106,77,.6),0_0_26px_-2px_rgba(225,29,46,.75)]"
              : ""
          }`}
        >
          <span aria-hidden className="grid h-5 w-5 place-items-center">
            <motion.span
              className="col-start-1 row-start-1 rounded-full bg-white"
              initial={false}
              animate={open ? { x: 0, width: 18, height: 2, rotate: 45 } : { x: -7, width: 4, height: 4, rotate: 0 }}
              transition={dotT}
            />
            <motion.span
              className="col-start-1 row-start-1 rounded-full bg-[#ff6a4d]"
              initial={false}
              animate={open ? { x: 0, width: 0, height: 2, opacity: 0 } : { x: 0, width: 4, height: 4, opacity: 1 }}
              transition={dotT}
            />
            <motion.span
              className="col-start-1 row-start-1 rounded-full bg-white"
              initial={false}
              animate={open ? { x: 0, width: 18, height: 2, rotate: -45 } : { x: 7, width: 4, height: 4, rotate: 0 }}
              transition={dotT}
            />
          </span>
        </button>
      </motion.div>

      {/* ---------- mobile menu ---------- */}
      <AnimatePresence>
        {open && (
          <>
            {/* click outside to close */}
            <motion.div
              key="backdrop"
              aria-hidden
              onClick={() => closeMenu()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3 }}
              className="fixed inset-0 -z-10 bg-ink/75 backdrop-blur-md md:hidden"
            >
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-crimson/25 blur-[100px]" />
              <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#ff6a4d]/10 blur-[110px]" />
            </motion.div>

            <motion.div
              key="panel"
              ref={panelRef}
              id="mobile-menu"
              variants={panelV}
              initial="hidden"
              animate="show"
              exit="exit"
              onPointerMove={onPanelMove}
              style={{ transformOrigin: "top right" }}
              className="absolute inset-x-3 top-full mt-2 overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-crimson-glow/60 via-white/10 to-white/[0.04] p-px shadow-[0_24px_70px_-24px_rgba(225,29,46,.65)] [@media(max-height:520px)]:mt-1 sm:inset-x-auto sm:right-6 sm:w-[24rem] md:hidden"
            >
              <div className="relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-ink/95 backdrop-blur-2xl">
                {/* pointer-following red light */}
                <div
                  ref={glowRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(260px circle at var(--px, 85%) var(--py, 0%), rgba(255,106,77,.16), transparent 70%)",
                  }}
                />
                <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-crimson/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6a4d] to-transparent" />

                {/* one light sweep across the top edge when the menu opens */}
                {!reduce && (
                  <motion.span
                    aria-hidden
                    initial={{ x: "-120%" }}
                    animate={{ x: "420%" }}
                    transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                  />
                )}

                <div className="relative max-h-[calc(100dvh-6.25rem)] overflow-y-auto overscroll-contain p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] [scrollbar-width:thin] [scrollbar-color:rgba(255,106,77,.45)_transparent] motion-reduce:scroll-auto">
                  <nav aria-label="Mobile">
                    <ul className="flex flex-col gap-1">
                      {navLinks.map((l) => {
                        const isActive = active === l.href;
                        const Icon = iconFor(l.href);
                        return (
                          <motion.li key={l.href} variants={rowV}>
                            <a
                              href={l.href}
                              onClick={() => closeMenu()}
                              aria-current={isActive ? "page" : undefined}
                              className={`group relative flex min-h-14 items-center gap-3.5 overflow-hidden rounded-2xl px-3 py-2.5 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-[0.98] active:bg-crimson/15 motion-reduce:transition-none ${
                                isActive
                                  ? "bg-gradient-to-r from-crimson/25 via-crimson/10 to-transparent text-white"
                                  : "text-bone/80 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {isActive && (
                                <span
                                  aria-hidden
                                  className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[#ff6a4d] to-crimson shadow-[0_0_14px_rgba(255,106,77,.9)]"
                                />
                              )}
                              <span
                                aria-hidden
                                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition duration-300 ${
                                  isActive
                                    ? "bg-gradient-to-br from-[#ff6a4d] to-crimson text-white shadow-[0_8px_20px_-6px_rgba(225,29,46,.9)]"
                                    : "bg-white/5 text-bone/70 ring-1 ring-inset ring-white/10 group-hover:bg-crimson/20 group-hover:text-[#ff8a70] group-hover:ring-crimson-glow/40"
                                }`}
                              >
                                <Icon size={18} />
                              </span>
                              <span className="font-display text-[clamp(1.05rem,4.5vw,1.35rem)] leading-tight tracking-[0.01em]">{l.label}</span>
                              {isActive ? (
                                <span
                                  aria-hidden
                                  className="relative ml-auto mr-1 grid h-2.5 w-2.5 place-items-center"
                                >
                                  <span className="absolute h-full w-full animate-ping rounded-full bg-[#ff6a4d]/70 motion-reduce:hidden" />
                                  <span className="relative h-2 w-2 rounded-full bg-[#ff6a4d] shadow-[0_0_12px_rgba(255,106,77,.95)]" />
                                </span>
                              ) : (
                                <ArrowUpRight
                                  size={18}
                                  aria-hidden
                                  className="ml-auto mr-1 -translate-x-1.5 text-[#ff6a4d] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-active:translate-x-0 group-active:opacity-100"
                                />
                              )}
                            </a>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>

                  <motion.div variants={rowV} className="mt-2.5 grid gap-3 border-t border-white/10 px-1.5 pb-1.5 pt-3.5 sm:pt-4">
                    <div onClick={() => closeMenu()}>
                      <LinkButton
                        href="#contact"
                        className="group relative w-full justify-center overflow-hidden"
                      >
                        <Sweep />
                        <span className="relative z-10 inline-flex items-center gap-1.5">
                          Hire me <ArrowUpRight size={16} />
                        </span>
                      </LinkButton>
                    </div>

                    <div className="flex flex-col items-stretch gap-3 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
                      <a
                        href={`mailto:${profile.email}`}
                        className="flex min-w-0 max-w-full items-center gap-2 rounded-lg py-1 text-sm text-bone/60 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                      >
                        <Mail size={15} aria-hidden className="shrink-0 text-[#ff6a4d]" />
                        <span className="truncate">{profile.email}</span>
                      </a>
                      <div className="flex shrink-0 items-center gap-2 self-end min-[380px]:self-auto">
                        {socials
                          .filter((s) => s.label !== "Email")
                          .map(({ href, label, Icon }) => (
                            <a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={label}
                              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-bone/70 transition duration-200 hover:border-crimson-glow hover:bg-crimson/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 active:scale-90"
                            >
                              <Icon size={17} />
                            </a>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}