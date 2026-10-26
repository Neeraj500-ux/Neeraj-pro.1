import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Maximize2, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { LinkButton } from "@/components/ui/button";
import Starfield from "@/components/Starfield";

/* Hero photo lives in /public/images. encodeURIComponent turns the space into %20,
   and BASE_URL keeps it working even if the site is deployed in a sub-folder. */
const HERO_IMAGE = `${import.meta.env.BASE_URL}images/${encodeURIComponent("Neeraj kumar.1.webp")}`;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------------------------- */
/*  WaterRipple: lightweight canvas wave simulation that follows the pointer  */
/*  - low-res height-field (<= ~60k cells), upscaled smoothly by the browser  */
/*  - the animation loop only runs while ripples are alive, then sleeps       */
/*  - works with mouse and touch (pointer events)                             */
/* -------------------------------------------------------------------------- */
function WaterRipple({ target }: { target: { current: HTMLElement | null } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = target.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DAMPING = 0.987;
    let w = 0;
    let h = 0;
    let scale = 5;
    let prev = new Float32Array(0);
    let cur = new Float32Array(0);
    let img: ImageData | null = null;
    let raf = 0;
    let running = false;
    let quiet = 0;
    let lastX = -1;
    let lastY = -1;

    const setup = () => {
      const r = section.getBoundingClientRect();
      scale = Math.max(5, Math.ceil(Math.sqrt((r.width * r.height) / 60000)));
      w = Math.max(4, Math.ceil(r.width / scale));
      h = Math.max(4, Math.ceil(r.height / scale));
      canvas.width = w;
      canvas.height = h;
      prev = new Float32Array(w * h);
      cur = new Float32Array(w * h);
      img = ctx.createImageData(w, h);
    };

    const drop = (x: number, y: number, amp: number) => {
      const gx = Math.round(x / scale);
      const gy = Math.round(y / scale);
      for (let oy = -2; oy <= 2; oy++) {
        for (let ox = -2; ox <= 2; ox++) {
          const d2 = ox * ox + oy * oy;
          if (d2 > 5) continue;
          const px = gx + ox;
          const py = gy + oy;
          if (px < 1 || py < 1 || px > w - 2 || py > h - 2) continue;
          cur[py * w + px] -= amp * (1 - d2 / 6);
        }
      }
    };

    const frame = () => {
      if (!img) return;
      let maxAbs = 0;

      // wave equation step
      for (let y = 1; y < h - 1; y++) {
        let i = y * w + 1;
        for (let x = 1; x < w - 1; x++, i++) {
          const n = ((cur[i - 1] + cur[i + 1] + cur[i - w] + cur[i + w]) / 2 - prev[i]) * DAMPING;
          prev[i] = n;
          const a = n < 0 ? -n : n;
          if (a > maxAbs) maxAbs = a;
        }
      }
      const tmp = prev;
      prev = cur;
      cur = tmp;

      // shade: red rim-light on wave slopes, warm highlight on the lit side
      const data = img.data;
      for (let y = 1; y < h - 1; y++) {
        let i = y * w + 1;
        for (let x = 1; x < w - 1; x++, i++) {
          const dx = cur[i + 1] - cur[i - 1];
          const dy = cur[i + w] - cur[i - w];
          const v = Math.abs(dx) + Math.abs(dy);
          const o = i * 4;
          if (v < 0.4) {
            data[o + 3] = 0;
            continue;
          }
          const s = dx + dy;
          const t = s < 0 ? Math.min(1, -s * 0.02) : 0;
          data[o] = 225 + 30 * t;
          data[o + 1] = 29 + 130 * t;
          data[o + 2] = 46 + 90 * t;
          data[o + 3] = Math.min(1, v * 0.018) * 210;
        }
      }
      ctx.putImageData(img, 0, 0);

      // go back to sleep once everything has calmed down
      if (maxAbs < 0.6) quiet++;
      else quiet = 0;
      if (quiet > 20) {
        running = false;
        quiet = 0;
        prev.fill(0);
        cur.fill(0);
        ctx.clearRect(0, 0, w, h);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      quiet = 0;
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (lastX < 0) {
        lastX = x;
        lastY = y;
        return;
      }
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < 3) return;
      const amp = Math.min(70, 16 + dist * 1.1);
      const steps = Math.min(8, Math.ceil(dist / scale));
      for (let s = 1; s <= steps; s++) {
        drop(lastX + (dx * s) / steps, lastY + (dy * s) / steps, amp / (steps > 1 ? 1.6 : 1));
      }
      lastX = x;
      lastY = y;
      start();
    };

    const onDown = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      lastX = e.clientX - r.left;
      lastY = e.clientY - r.top;
      drop(lastX, lastY, 110);
      start();
    };

    const reset = () => {
      lastX = -1;
      lastY = -1;
    };

    setup();
    const ro = new ResizeObserver(() => {
      setup();
      reset();
    });
    ro.observe(section);

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerdown", onDown, { passive: true });
    section.addEventListener("pointerleave", reset, { passive: true });
    section.addEventListener("pointercancel", reset, { passive: true });
    section.addEventListener("pointerup", reset, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointerleave", reset);
      section.removeEventListener("pointercancel", reset);
      section.removeEventListener("pointerup", reset);
    };
  }, [target]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90 mix-blend-screen"
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  Lightbox: portal-based, Esc / backdrop / X to close, focus managed        */
/* -------------------------------------------------------------------------- */
function Lightbox({
  open,
  src,
  alt,
  onClose,
  onError,
}: {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
  onError: () => void;
}) {
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // keep keyboard focus inside the dialog (only one focusable element)
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={onClose}
        >
          {/* red ambient glow behind the image */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/30 blur-[120px]"
          />

          <button
            ref={closeRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close enlarged image"
            className="glass absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full text-white transition hover:rotate-90 hover:scale-105 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 motion-reduce:transition-none sm:right-6 sm:top-6"
            style={{ marginTop: "env(safe-area-inset-top)" }}
          >
            <X size={20} />
          </button>

          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? false : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: reduce ? 0 : 0.38, ease: EASE }}
            className="relative overflow-hidden rounded-2xl border border-white/15 bg-oxblood shadow-[0_40px_120px_-20px_rgba(225,29,46,.55)]"
          >
            <img
              src={src}
              alt={alt}
              onError={onError}
              draggable={false}
              className="block max-h-[85svh] max-w-[92vw] object-contain sm:max-w-[80vw]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */
export default function Hero() {
  const reduce = useReducedMotion();
  const [src, setSrc] = useState(HERO_IMAGE);
  const [open, setOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /* gentle scroll parallax: the portrait drifts down a little as you scroll away */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay: 0.15 * i, ease: EASE },
  });

  const handleImgError = useCallback(() => {
    if (src !== profile.photoFallback) setSrc(profile.photoFallback);
  }, [src]);

  const closeLightbox = useCallback(() => {
    setOpen(false);
    // return focus to the image trigger for keyboard users
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  /* soft red spotlight + normalised pointer (-1..1) used for chip parallax (mouse only, cheap CSS vars) */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduce) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.style.setProperty("--nx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--ny", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      el.style.setProperty("--spot", "1");
    };
    const leave = () => {
      el.style.setProperty("--spot", "0");
      el.style.setProperty("--nx", "0");
      el.style.setProperty("--ny", "0");
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [reduce]);

  /* subtle 3D tilt + glare on the hero image (mouse only, max ~4deg) */
  const onTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1000px) rotateX(${((0.5 - py) * 8).toFixed(2)}deg) rotateY(${((px - 0.5) * 8).toFixed(2)}deg)`;
    el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
  };
  const onTiltLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const alt = `Portrait of ${profile.name}`;

  /* headline is revealed word by word (falls back to plain text if it isn't a string) */
  const headline = profile.headline as unknown;
  const words = typeof headline === "string" ? headline.split(" ") : null;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pb-16 pt-24 sm:pt-28"
      style={{ position: "relative", ["--spot" as string]: 0, ["--nx" as string]: 0, ["--ny" as string]: 0 }}
    >
      {/* ---------- background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* glowing red arc, echoing the reference screenshots */}
        <div
          className="absolute -left-[30%] top-[38%] h-[160vmax] w-[160vmax] rounded-full"
          style={{
            boxShadow:
              "inset 0 2px 2px #ffd0b8, inset 0 6px 14px #ff6a4d, inset 0 30px 70px rgba(225,29,46,.55), 0 -30px 160px rgba(225,29,46,.25)",
            background: "radial-gradient(ellipse at 50% 0%, rgba(120,8,18,.55), #070506 35%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(225,29,46,.18),transparent_45%)]" />
        <Starfield className="opacity-80 [mask-image:linear-gradient(to_bottom,#000_55%,transparent_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:26px_26px]" />

        {/* slow breathing aurora behind the portrait */}
        {!reduce && (
          <motion.div
            className="absolute right-[-10%] top-[8%] h-[34rem] w-[34rem] rounded-full bg-crimson/20 blur-[120px] max-lg:right-1/2 max-lg:translate-x-1/2"
            animate={{ scale: [1, 1.15, 1], opacity: [0.55, 0.9, 0.55] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* cursor spotlight */}
        {!reduce && (
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: "var(--spot, 0)",
              background:
                "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(225,29,46,.16), transparent 60%)",
            }}
          />
        )}

        {/* water ripple (disabled for reduced-motion users) */}
        {!reduce && <WaterRipple target={sectionRef} />}

        {/* bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* ---------- content ---------- */}
      <div className="container-x relative z-10 grid items-center gap-12 sm:gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-center lg:text-left">
          <motion.div
            {...item(0)}
            className="glass group relative mx-auto inline-flex max-w-full items-center gap-3 overflow-hidden rounded-full py-1.5 pl-1.5 pr-4 text-xs font-semibold sm:text-sm lg:mx-0"
          >
            {/* light sweep across the badge */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[520%] motion-reduce:hidden"
            />
            <span className="relative flex items-center gap-1.5 rounded-full bg-white px-3 py-0.5 text-xs text-ink">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-crimson" />
              </span>
              Open
            </span>
            <span className="relative truncate">Frontend roles, internships &amp; projects</span>
          </motion.div>

          <h1 className="mt-6 break-words font-display text-[2.35rem] font-medium leading-[1.06] tracking-tight [text-wrap:balance] sm:mt-7 sm:text-6xl xl:text-7xl">
            {words ? (
              words.map((w, i) => (
                <Fragment key={`${w}-${i}`}>
                  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? false : { y: "110%", opacity: 0, filter: "blur(8px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.95, delay: 0.25 + i * 0.07, ease: EASE }}
                    >
                      {w}
                    </motion.span>
                  </span>
                  {i < words.length - 1 ? " " : null}
                </Fragment>
              ))
            ) : (
              <>{profile.headline}</>
            )}
          </h1>

          <motion.p
            {...item(2)}
            className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-bone/70 sm:mt-6 sm:text-lg lg:mx-0"
          >
            {profile.subtitle}
          </motion.p>

          <motion.div
            {...item(3)}
            className="mt-8 flex flex-col items-stretch justify-center gap-3 transition-transform duration-300 sm:mt-9 sm:flex-row lg:justify-start [&>a]:transition-[transform,box-shadow] [&>a]:duration-300 [&>a:first-child]:shadow-[0_14px_40px_-14px_rgba(225,29,46,.85)] [&>a:first-child:hover]:shadow-[0_18px_50px_-12px_rgba(225,29,46,1)] [&>a:hover]:-translate-y-0.5 [&>a:active]:translate-y-0 [&>a:active]:scale-[0.98]"
          >
            <LinkButton href="#projects">
              View my projects <ArrowUpRight size={16} />
            </LinkButton>
            <LinkButton href="#contact" variant="ghost">
              Contact me
            </LinkButton>
          </motion.div>

          <motion.div
            {...item(4)}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-bone/60 sm:mt-9 lg:justify-start"
          >
            <span className="text-sm">
              {profile.name} · {profile.location}
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition duration-200 hover:-translate-y-0.5 hover:text-crimson-glow hover:drop-shadow-[0_0_8px_rgba(225,29,46,.8)]"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition duration-200 hover:-translate-y-0.5 hover:text-crimson-glow hover:drop-shadow-[0_0_8px_rgba(225,29,46,.8)]"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>

        {/* ---------- hero image ---------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          style={reduce ? undefined : { y: imgY }}
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm"
        >
          {/* glow, faint orbit ring and floor light */}
          <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-crimson/30 blur-3xl animate-pulseGlow" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-crimson/30 motion-reduce:animate-none sm:w-[125%]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-7 left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-crimson/40 blur-2xl"
          />

          {/* tilt wrapper */}
          <div
            ref={tiltRef}
            onPointerMove={onTiltMove}
            onPointerLeave={onTiltLeave}
            className="group relative will-change-transform [transform:perspective(1000px)] [transition:transform_250ms_ease-out]"
            style={{ ["--gx" as string]: "50%", ["--gy" as string]: "30%" }}
          >
            {/* slow rotating red light ring */}
            <div aria-hidden className="absolute -inset-[2px] overflow-hidden rounded-t-[999px] rounded-b-[2rem]">
              <div className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-[spin_9s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(225,29,46,.9)_70deg,transparent_140deg,transparent_360deg)] motion-reduce:animate-none" />
            </div>

            <button
              ref={triggerRef}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(true);
              }}
              aria-haspopup="dialog"
              aria-label={`Enlarge ${alt}`}
              className="relative block w-full cursor-zoom-in overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-white/15 bg-oxblood p-0 text-left shadow-[0_30px_80px_-20px_rgba(225,29,46,.6)] transition-shadow duration-500 hover:shadow-[0_40px_100px_-20px_rgba(225,29,46,.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {/* hover zoom lives on this wrapper so it never fights the entrance animation */}
                <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none">
                  <motion.img
                    src={src}
                    alt={alt}
                    width={640}
                    height={800}
                    decoding="async"
                    draggable={false}
                    onError={handleImgError}
                    initial={reduce ? false : { scale: 1.25, filter: "brightness(0.35) saturate(0.6)" }}
                    animate={{ scale: 1, filter: "brightness(1) saturate(1.05)" }}
                    transition={{ duration: 1.6, delay: 0.35, ease: EASE }}
                    className="h-full w-full select-none object-cover object-[50%_18%]"
                  />
                </div>

                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                {/* red rim light from the bottom + soft top highlight */}
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_115%,rgba(225,29,46,.45),transparent_60%)] mix-blend-screen" />
                <div aria-hidden className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/[0.07] to-transparent" />

                {/* red tint + cursor-following glare */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at var(--gx) var(--gy), rgba(255,120,100,.55), transparent 55%)",
                  }}
                />

                {/* periodic light sweep across the portrait */}
                {!reduce && (
                  <motion.span
                    aria-hidden
                    initial={{ x: "-140%" }}
                    animate={{ x: "480%" }}
                    transition={{ duration: 1.4, delay: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 6 }}
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}

                <div aria-hidden className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />

                {/* hint pill */}
                <span className="glass pointer-events-none absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 translate-y-2 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <Maximize2 size={13} /> Click to enlarge
                </span>
              </div>
            </button>
          </div>

          {/* floating chips: outer = mouse parallax, inner = float animation */}
          <div
            className="absolute -left-2 bottom-10 transition-transform duration-300 ease-out sm:-left-10"
            style={{ transform: "translate3d(calc(var(--nx, 0) * -14px), calc(var(--ny, 0) * -10px), 0)" }}
          >
            <div className="glass animate-float rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-[0_12px_30px_-12px_rgba(225,29,46,.7)] sm:px-4 sm:py-3 sm:text-sm">
              React.js
            </div>
          </div>
          <div
            className="absolute -right-2 top-24 transition-transform duration-300 ease-out sm:-right-8"
            style={{ transform: "translate3d(calc(var(--nx, 0) * 16px), calc(var(--ny, 0) * 12px), 0)" }}
          >
            <div className="glass animate-float rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-[0_12px_30px_-12px_rgba(225,29,46,.7)] [animation-delay:1.5s] sm:px-4 sm:py-3 sm:text-sm">
              WordPress
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold tracking-widest text-bone/50 transition hover:text-white sm:flex"
      >
        SCROLL <ArrowDown size={16} className="animate-bounce motion-reduce:animate-none" />
      </a>

      <Lightbox open={open} src={src} alt={alt} onClose={closeLightbox} onError={handleImgError} />
    </section>
  );
}