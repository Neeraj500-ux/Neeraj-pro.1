import { useCallback, useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  PointerEvent,
  ReactNode,
  SVGProps,
  TouchEvent,
} from "react";

/* ----------------------------- TYPES ----------------------------- */

type PortfolioImage = {
  src: string;
  alt: string;
};

type BrowserBarProps = {
  label: string;
  lit?: boolean;
  children?: ReactNode;
};

type GalleryCardProps = {
  item: PortfolioImage;
  interactive: boolean;
  reverse: boolean;
  onOpen: () => void;
};

type CarouselRowProps = {
  images: readonly PortfolioImage[];
  offset?: number;
  reverse?: boolean;
  revealed: boolean;
  paused: boolean;
  onOpen: (index: number) => void;
};

type ControlsProps = {
  playing: boolean;
  onToggle: () => void;
  speed: number;
  onSpeed: (value: number) => void;
  revealed: boolean;
};

type LightboxProps = {
  images: readonly PortfolioImage[];
  index: number | null;
  onClose: () => void;
  onStep: (direction: number) => void;
  onSelect: (index: number) => void;
};

/* ----------------------------- DATA ----------------------------- */

const NAMES = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
];

const makeImages = (
  from: number,
  to: number,
  names: readonly string[]
): PortfolioImage[] =>
  names.slice(from - 1, to).map((name, i) => ({
    src: `/images/Neeraj17%20(${from + i}).jpeg`,
    alt: `Portfolio Project ${name}`,
  }));

const topImages = makeImages(1, 6, NAMES);
const bottomImages = makeImages(7, 12, NAMES);
const allImages = [...topImages, ...bottomImages];

const SPEEDS = [
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "2x", value: 2 },
];

const EMBERS = Array.from({ length: 8 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 3 + (i % 2),
  delay: `-${(i * 2.6) % 14}s`,
  duration: `${12 + (i % 4) * 3}s`,
}));

/* ---------------------------- SHARED ---------------------------- */

const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(" ");

const FONT_DISPLAY =
  "[font-family:'Bricolage_Grotesque','Avenir_Next',system-ui,-apple-system,'Segoe_UI',sans-serif]";

const FONT_ACCENT =
  "[font-family:'Instrument_Serif','Iowan_Old_Style',Georgia,serif]";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#ff6b79]";

const ICON_BUTTON = cx(
  "grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full",
  "sm:h-[42px] sm:w-[42px] md:h-11 md:w-11",
  "border border-white/20 text-white",
  "bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))]",
  "transition-[transform,background-color,color,border-color] duration-300",
  "ease-[cubic-bezier(0.22,1,0.36,1)]",
  "hover:border-[rgba(255,77,94,0.8)] hover:bg-[rgba(225,29,46,0.22)] hover:text-[#ff8b96]",
  "active:scale-[0.92]",
  FOCUS_RING
);

const LIGHTS_IDLE = [
  "bg-white/[0.28] group-hover/card:bg-[#ff4d5e] group-focus-within/card:bg-[#ff4d5e]",
  "bg-white/[0.28] delay-[60ms] group-hover/card:bg-[#ff8b96] group-focus-within/card:bg-[#ff8b96]",
  "bg-white/[0.28] delay-[120ms] group-hover/card:bg-[#b3141f] group-focus-within/card:bg-[#b3141f]",
];

const LIGHTS_LIT = ["bg-[#ff4d5e]", "bg-[#ff8b96]", "bg-[#b3141f]"];

const reveal = (revealed: boolean): string =>
  cx(
    "[transition:opacity_800ms_cubic-bezier(0.22,1,0.36,1),transform_800ms_cubic-bezier(0.22,1,0.36,1)]",
    revealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
    "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none"
  );

/* ----------------------------- ICONS ---------------------------- */

const iconProps: SVGProps<SVGSVGElement> = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

const ExpandIcon = () => (
  <svg {...iconProps}>
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);

const CloseIcon = () => (
  <svg {...iconProps}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const PrevIcon = () => (
  <svg {...iconProps}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const NextIcon = () => (
  <svg {...iconProps}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const PlayIcon = () => (
  <svg {...iconProps} fill="currentColor" stroke="none">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

const PauseIcon = () => (
  <svg {...iconProps} fill="currentColor" stroke="none">
    <rect x="6" y="5" width="4.5" height="14" rx="1.2" />
    <rect x="13.5" y="5" width="4.5" height="14" rx="1.2" />
  </svg>
);

/* --------------------------- BROWSER BAR ------------------------- */

function BrowserBar({
  label,
  lit = false,
  children,
}: BrowserBarProps) {
  const lights = lit ? LIGHTS_LIT : LIGHTS_IDLE;

  return (
    <span className="flex h-[29px] items-center gap-2 pl-1.5 pr-1 sm:h-[31px] sm:gap-[9px] md:h-[34px] md:gap-3">
      <span className="flex shrink-0 gap-1 sm:gap-1.5">
        {lights.map((tone, index) => (
          <span
            key={index}
            className={cx(
              "h-[7px] w-[7px] rounded-full transition-[background-color] duration-[350ms]",
              "sm:h-2 sm:w-2 md:h-[9px] md:w-[9px]",
              tone
            )}
          />
        ))}
      </span>

      <span className="min-w-0 flex-1 truncate rounded-full bg-black/45 px-2.5 py-[5px] text-[10px] font-medium leading-[1.3] tracking-[0.01em] text-white/[0.84] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:px-[11px] sm:text-[11px] md:px-3.5 md:py-1.5 md:text-xs">
        {label}
      </span>

      {children}
    </span>
  );
}

/* --------------------------- GALLERY CARD ------------------------ */

function GalleryCard({
  item,
  interactive,
  reverse,
  onOpen,
}: GalleryCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const frame = useRef<number>(0);

  const handleMove = useCallback((event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const el = cardRef.current;
    if (!el) return;

    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
      el.style.setProperty("--ry", `${((x - 0.5) * 7).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - y) * 5).toFixed(2)}deg`);
    });
  }, []);

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(frame.current);

    const el = cardRef.current;
    if (!el) return;

    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(frame.current);
  }, []);

  return (
    <figure
      ref={cardRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cx(
        "group/card relative m-0 w-[var(--card)] shrink-0 rounded-[18px] hover:z-[1]",
        "sm:rounded-[20px] md:rounded-[22px] xl:rounded-[24px]",
        "[--rx:0deg] [--ry:0deg] [--mx:50%] [--my:50%]",
        "hover:[transform:perspective(1100px)_rotateX(var(--rx))_rotateY(var(--ry))]",
        "[transition:transform_450ms_cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:transform-none motion-reduce:transition-none motion-reduce:snap-center",
        reverse
          ? "odd:mt-2 sm:odd:mt-3 lg:odd:mt-4"
          : "even:mt-2 sm:even:mt-3 lg:even:mt-4"
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        tabIndex={interactive ? 0 : -1}
        aria-label={`Explore ${item.alt}`}
        className={cx(
          "relative block w-full cursor-zoom-in overflow-hidden rounded-[inherit] border-0",
          "p-2 pb-2.5 sm:p-2.5 sm:pb-3 md:p-[11px] md:pb-3",
          "text-left text-inherit [-webkit-tap-highlight-color:transparent]",
          "[background:linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_48%,rgba(225,29,46,0.1)),#0e0608]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_22px_40px_-26px_rgba(0,0,0,0.95)]",
          "group-hover/card:shadow-[inset_0_1px_0_rgba(255,255,255,0.26),0_30px_50px_-24px_rgba(0,0,0,1),0_0_44px_-14px_rgba(225,29,46,0.7)]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-[2]",
          "before:rounded-[inherit] before:p-px before:content-['']",
          "before:[background:linear-gradient(150deg,rgba(255,255,255,0.5),rgba(255,255,255,0.05)_42%,rgba(225,29,46,0.7))]",
          "before:[-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]",
          "before:[-webkit-mask-composite:xor]",
          "before:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
          "after:pointer-events-none after:absolute after:inset-0 after:z-[3]",
          "after:rounded-[inherit] after:opacity-0 after:transition-opacity",
          "after:duration-300 after:content-['']",
          "after:[background:radial-gradient(300px_circle_at_var(--mx)_var(--my),rgba(255,90,105,0.22),transparent_62%)]",
          "group-hover/card:after:opacity-100",
          FOCUS_RING
        )}
      >
        <BrowserBar label={item.alt}>
          <span className="grid h-[24px] w-[24px] shrink-0 place-items-center rounded-full text-white/60 transition-[color,transform,background-color] duration-[250ms] group-hover/card:scale-[1.1] group-hover/card:bg-[rgba(225,29,46,0.3)] group-hover/card:text-[#ff8b96] group-focus-within/card:text-[#ff8b96] sm:h-[26px] sm:w-[26px] [&>svg]:h-3.5 [&>svg]:w-3.5">
            <ExpandIcon />
          </span>
        </BrowserBar>

        {/* Full image at its natural aspect ratio. */}
        <span className="relative mt-1 block w-full overflow-hidden rounded-[10px] bg-black/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)] md:rounded-[13px]">
          <img
            src={item.src}
            alt={interactive ? item.alt : ""}
            loading="eager"
            decoding="async"
            draggable={false}
            className="block h-auto w-full max-w-full select-none object-fill"
          />
        </span>
      </button>
    </figure>
  );
}

/* --------------------------- CAROUSEL ROW ------------------------ */

function CarouselRow({
  images,
  offset = 0,
  reverse = false,
  revealed,
  paused,
  onOpen,
}: CarouselRowProps) {
  const direction = reverse
    ? "Moves left to right."
    : "Moves right to left.";

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={`Portfolio project gallery. ${direction} Focus to pause.`}
      className={cx(
        "group/row relative w-full min-w-0 overflow-hidden [contain:layout_paint]",
        "py-3 sm:py-4 md:py-[18px] lg:py-5",
        "[--gap:14px] [--card:70vw] min-[400px]:[--card:66vw]",
        "sm:[--gap:18px] sm:[--card:46vw]",
        "md:[--gap:20px] md:[--card:34vw]",
        "lg:[--gap:24px] lg:[--card:26vw]",
        "xl:[--gap:26px] xl:[--card:clamp(280px,21vw,340px)]",
        "2xl:[--card:340px]",
        reverse
          ? "[transition:opacity_900ms_ease_680ms,transform_1200ms_cubic-bezier(0.22,1,0.36,1)_680ms]"
          : "[transition:opacity_900ms_ease_500ms,transform_1200ms_cubic-bezier(0.22,1,0.36,1)_500ms]",
        revealed
          ? "translate-x-0 opacity-100"
          : reverse
            ? "-translate-x-[7vw] opacity-0"
            : "translate-x-[7vw] opacity-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#ff6b79]",
        "motion-reduce:translate-x-0 motion-reduce:overflow-x-auto motion-reduce:opacity-100",
        "motion-reduce:transition-none motion-reduce:snap-x motion-reduce:snap-mandatory"
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[7%] bg-gradient-to-r from-black/85 to-transparent motion-reduce:hidden"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[7%] bg-gradient-to-l from-black/85 to-transparent motion-reduce:hidden"
      />

      <div
        className={cx(
          "cc-track flex w-max will-change-transform",
          reverse
            ? "animate-[cc-scroll_25s_linear_-18s_infinite_reverse] md:animate-[cc-scroll_30s_linear_-18s_infinite_reverse]"
            : "animate-[cc-scroll_22s_linear_infinite] md:animate-[cc-scroll_27s_linear_infinite]",
          paused && "[animation-play-state:paused]",
          "group-hover/row:[animation-play-state:paused]",
          "group-focus-within/row:[animation-play-state:paused]",
          "group-active/row:[animation-play-state:paused]",
          "motion-reduce:transform-none motion-reduce:animate-none motion-reduce:will-change-auto"
        )}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={cx(
              "flex shrink-0 items-start gap-[var(--gap)] pr-[var(--gap)]",
              "motion-reduce:pl-[var(--gap)]",
              copy === 1 && "motion-reduce:hidden"
            )}
          >
            {images.map((item, index) => (
              <GalleryCard
                key={`${copy}-${index}-${item.src}`}
                item={item}
                interactive={copy === 0}
                reverse={reverse}
                onOpen={() => onOpen(offset + index)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- CONTROLS -------------------------- */

function Controls({
  playing,
  onToggle,
  speed,
  onSpeed,
  revealed,
}: ControlsProps) {
  return (
    <div
      style={{ transitionDelay: "300ms" }}
      className={cx(
        "mx-auto mb-3 flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-3 px-5 sm:px-7 md:px-9 lg:px-12",
        reveal(revealed)
      )}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={!playing}
          aria-label={
            playing ? "Pause gallery movement" : "Play gallery movement"
          }
          className={cx(ICON_BUTTON, "[&>svg]:h-4 [&>svg]:w-4")}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </button>

        <div
          role="group"
          aria-label="Gallery speed"
          className="flex items-center gap-1 rounded-full border border-white/15 bg-black/50 p-1"
        >
          {SPEEDS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => onSpeed(s.value)}
              aria-pressed={speed === s.value}
              className={cx(
                "min-w-[44px] cursor-pointer rounded-full border-0 px-3 py-1.5 text-xs font-semibold",
                "transition-[background-color,color] duration-300",
                speed === s.value
                  ? "bg-[#e11d2e] text-white"
                  : "bg-transparent text-white/65 hover:text-white",
                FOCUS_RING
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <p className="m-0 flex min-w-0 items-center gap-2 text-xs leading-relaxed text-white/60 sm:text-[13px]">
        <span
          aria-hidden="true"
          className={cx(
            "h-2 w-2 shrink-0 rounded-full bg-[#e11d2e]",
            playing &&
              "animate-[cc-pulse_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
          )}
        />

        <span>
          {allImages.length} Projects. Hover To Pause, Click To Explore.
        </span>
      </p>
    </div>
  );
}

/* ----------------------------- LIGHTBOX -------------------------- */

function Lightbox({
  images,
  index,
  onClose,
  onStep,
  onSelect,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const isOpen = index !== null;
  const item = index !== null ? images[index] : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0)";
    }

    touch.current = null;
  }, [index]);

  useEffect(() => {
    if (index === null || images.length === 0) return;

    [1, -1].forEach((step) => {
      const next =
        images[(index + step + images.length) % images.length];

      if (!next) return;

      const preload = new Image();
      preload.decoding = "async";
      preload.src = next.src;
    });
  }, [index, images]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    const bar = progressRef.current;
    if (!el || !bar) return;

    const max = el.scrollHeight - el.clientHeight;
    const ratio = max > 0 ? el.scrollTop / max : 1;

    bar.style.transform = `scaleX(${Math.min(
      1,
      Math.max(0, ratio)
    ).toFixed(3)})`;
  }, []);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDialogElement>
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onStep(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onStep(-1);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const t = event.touches[0];
    if (!t) return;

    touch.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touch.current;
    touch.current = null;

    const t = event.changedTouches[0];
    if (!start || !t) return;

    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      onStep(dx < 0 ? 1 : -1);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Portfolio project preview"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className={cx(
        "fixed inset-0 m-0 h-full max-h-none w-full max-w-none",
        "place-items-center border-0 bg-transparent",
        "p-3 text-white sm:p-5 md:p-[clamp(12px,3vw,40px)]",
        "open:grid open:animate-[cc-fade_250ms_ease_both]",
        "backdrop:animate-[cc-fade_300ms_ease_both]",
        "backdrop:[background:radial-gradient(ellipse_at_50%_20%,rgba(225,29,46,0.3),transparent_70%),rgba(4,2,3,0.95)]",
        "motion-reduce:open:animate-none motion-reduce:backdrop:animate-none"
      )}
    >
      {item && index !== null && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touch.current = null;
          }}
          className="grid max-h-[94dvh] w-[min(1080px,100%)] animate-[cc-pop_450ms_cubic-bezier(0.22,1,0.36,1)_both] gap-2.5 rounded-[20px] border border-white/15 bg-[linear-gradient(150deg,#1d0c10,#0c0507)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_44px_90px_-30px_rgba(0,0,0,0.9),0_0_90px_-34px_rgba(225,29,46,0.7)] motion-reduce:animate-none sm:p-4 md:gap-3.5 md:rounded-[28px] md:p-[clamp(12px,1.8vw,20px)]"
        >
          <div className="flex items-center justify-between gap-4 px-1">
            <span className="text-xs font-medium tracking-[0.02em] text-white/70 sm:text-sm">
              {index + 1} of {images.length}
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className={cx(ICON_BUTTON, "hover:rotate-90")}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="overflow-hidden rounded-[16px] bg-black/60 px-2 pb-2.5 pt-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)] md:rounded-[18px]">
            <BrowserBar label={item.alt} lit />

            <div className="mx-1 mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/10">
              <div
                ref={progressRef}
                className="h-full origin-left rounded-full bg-[#e11d2e] will-change-transform"
                style={{ transform: "scaleX(0)" }}
              />
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              tabIndex={0}
              role="region"
              aria-label={`${item.alt}. Scroll to explore the full project.`}
              className={cx(
                "relative mt-1.5 overflow-y-auto overflow-x-hidden rounded-xl bg-black/60",
                "max-h-[62dvh] sm:max-h-[66dvh] md:[max-height:calc(100dvh_-_300px)]",
                "overscroll-contain [-webkit-overflow-scrolling:touch]",
                "[scrollbar-width:thin] [scrollbar-color:#e11d2e_rgba(255,255,255,0.06)]",
                "[&::-webkit-scrollbar]:w-1.5",
                "[&::-webkit-scrollbar-track]:bg-white/5",
                "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#e11d2e]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#ff6b79]"
              )}
            >
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                decoding="async"
                className="block h-auto w-full max-w-full animate-[cc-swap_350ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 px-1 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-x-6">
            <p className="m-0 min-w-0 font-bold leading-[1.15] tracking-[-0.025em] [font-size:clamp(16px,2.2vw,28px)]">
              {item.alt}
            </p>

            <div
              role="group"
              aria-label="Choose a project"
              className="col-span-full row-start-2 flex items-center justify-self-center md:col-span-1 md:row-start-auto md:justify-self-auto"
            >
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  aria-label={`Show ${image.alt}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => onSelect(i)}
                  className={cx(
                    "relative h-7 w-5 cursor-pointer border-0 bg-transparent p-0",
                    FOCUS_RING,
                    "before:absolute before:left-1/2 before:top-1/2 before:h-[7px]",
                    "before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:content-['']",
                    "before:transition-[width,background-color] before:duration-[400ms]",
                    i === index
                      ? "before:w-5 before:bg-[#e11d2e]"
                      : "before:w-[7px] before:bg-white/35 hover:before:bg-white/75"
                  )}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous project"
                className={cx(ICON_BUTTON, "hover:-translate-x-[3px]")}
              >
                <PrevIcon />
              </button>

              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next project"
                className={cx(ICON_BUTTON, "hover:translate-x-[3px]")}
              >
                <NextIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

/* ------------------------------ MAIN ----------------------------- */

export default function ImageCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLSpanElement | null>(null);
  const glowFrame = useRef<number>(0);

  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        setInView(entry.isIntersecting);

        if (entry.isIntersecting) {
          setRevealed(true);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "80px 0px",
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section
      .querySelectorAll<HTMLElement>(".cc-track")
      .forEach((track) => {
        if (typeof track.getAnimations !== "function") return;

        track.getAnimations().forEach((animation) => {
          if (
            "animationName" in animation &&
            animation.animationName === "cc-scroll"
          ) {
            animation.playbackRate = speed;
          }
        });
      });
  }, [speed, revealed]);

  const handleSectionMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse") return;

      const section = sectionRef.current;
      const glow = glowRef.current;

      if (!section || !glow) return;

      const { clientX, clientY } = event;
      cancelAnimationFrame(glowFrame.current);

      glowFrame.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();

        glow.style.transform = `translate3d(${(
          clientX - rect.left
        ).toFixed(0)}px, ${(clientY - rect.top).toFixed(0)}px, 0)`;
      });
    },
    []
  );

  useEffect(() => {
    return () => cancelAnimationFrame(glowFrame.current);
  }, []);

  const closePreview = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const stepPreview = useCallback((direction: number) => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + direction + allImages.length) % allImages.length
    );
  }, []);

  const stagger = (i: number): CSSProperties => ({
    transitionDelay: `${i * 110}ms`,
  });

  const bgPause = inView ? "" : "[animation-play-state:paused]";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cc-carousel-heading"
      onPointerMove={handleSectionMove}
      className={cx(
        "group/sec relative isolate w-full min-w-0 overflow-hidden text-white",
        FONT_DISPLAY,
        "pb-12 pt-14 sm:pb-14 sm:pt-16 md:pb-16 md:pt-20 lg:pb-20 lg:pt-24 xl:pb-24 xl:pt-28",
        "[background:radial-gradient(ellipse_60%_50%_at_0%_0%,rgba(225,29,46,0.24),transparent_65%),radial-gradient(ellipse_55%_45%_at_100%_100%,rgba(255,45,65,0.2),transparent_70%),linear-gradient(165deg,#050506_0%,#12070a_45%,#2a0a10_100%)]"
      )}
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <span
          className={cx(
            "absolute -bottom-[180px] right-[2%] h-[560px] w-[560px] rounded-full will-change-transform",
            "[background:radial-gradient(circle,rgba(255,45,65,0.34),transparent_66%)]",
            "animate-[cc-float_26s_ease-in-out_infinite_alternate] motion-reduce:animate-none",
            bgPause
          )}
        />

        <span
          className={cx(
            "absolute -left-[160px] top-[22%] h-[520px] w-[520px] rounded-full will-change-transform",
            "[background:radial-gradient(circle,rgba(180,15,30,0.34),transparent_66%)]",
            "animate-[cc-float-2_32s_ease-in-out_infinite_alternate] motion-reduce:animate-none",
            bgPause
          )}
        />

        <span className="absolute inset-0 [-webkit-mask-image:linear-gradient(to_bottom,#000,transparent_85%)] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />

        <span
          ref={glowRef}
          className="absolute -left-[260px] -top-[260px] h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform group-hover/sec:opacity-100 [background:radial-gradient(circle,rgba(225,29,46,0.26),transparent_65%)] motion-reduce:hidden"
        />

        {EMBERS.map((ember, i) => (
          <span
            key={i}
            style={{
              left: ember.left,
              width: ember.size,
              height: ember.size,
              animationDelay: ember.delay,
              animationDuration: ember.duration,
            }}
            className={cx(
              "absolute bottom-0 rounded-full bg-[#ff6b79] opacity-0 will-change-transform",
              "animate-[cc-ember_14s_linear_infinite] motion-reduce:hidden",
              bgPause
            )}
          />
        ))}

        <span className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* PORTFOLIO HEADER */}
      <header className="mx-auto mb-8 grid w-full max-w-[1280px] grid-cols-1 items-end gap-6 px-5 sm:mb-10 sm:px-7 md:mb-12 md:px-9 lg:mb-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-x-14 lg:px-12 xl:gap-x-20">
        <div className="min-w-0 [container-type:inline-size]">
          <span
            style={stagger(0)}
            className={cx(
              "mb-4 inline-flex items-center gap-3 text-[13px] font-medium leading-[1.4] tracking-[0.02em] text-[#ffd0d5]",
              "before:h-0.5 before:w-9 before:rounded-sm before:content-['']",
              "before:[background:linear-gradient(90deg,#e11d2e,rgba(225,29,46,0))]",
              "sm:text-sm md:mb-5 md:text-[15px]",
              reveal(revealed)
            )}
          >
            My Selected Work
          </span>

          <h2
            id="cc-carousel-heading"
            style={stagger(1)}
            className={cx(
              "m-0 font-bold leading-[0.98] tracking-[-0.04em] text-white",
              "[font-size:clamp(26px,min(10.4cqw,76px),76px)]",
              "[font-variation-settings:'opsz'_96]",
              reveal(revealed)
            )}
          >
            <span className="block max-w-full whitespace-nowrap">
              Websites Designed To
            </span>{" "}

            <span
              className={cx(
                "mt-[0.08em] block max-w-full whitespace-nowrap pb-[0.1em]",
                "font-normal italic leading-[1.04] tracking-[-0.01em]",
                FONT_ACCENT,
                "[font-size:min(9.4cqw,0.9em)]",
                "bg-clip-text text-transparent",
                "bg-[linear-gradient(100deg,#c4121f_0%,#ff4d5e_32%,#ffd9dd_50%,#ff4d5e_68%,#c4121f_100%)]",
                "[background-position:100%_0] [background-size:220%_100%]",
                revealed &&
                  "animate-[cc-shimmer_2.8s_cubic-bezier(0.22,1,0.36,1)_0.6s_both]",
                "motion-reduce:animate-none"
              )}
            >
              Turn Ideas Into Impact.
            </span>
          </h2>
        </div>

        <div
          className={cx(
            "relative min-w-0 pb-1 pt-5",
            "before:absolute before:left-0 before:top-0 before:h-px before:w-[55%] before:max-w-[220px] before:content-['']",
            "before:[background:linear-gradient(to_right,#e11d2e,rgba(225,29,46,0))]",
            "lg:pl-8 lg:pt-0",
            "lg:before:bottom-1 lg:before:top-1 lg:before:h-auto lg:before:w-px",
            "lg:before:[background:linear-gradient(to_bottom,#e11d2e,rgba(225,29,46,0.05))]"
          )}
        >
          <p
            style={stagger(2)}
            className={cx(
              "m-0 max-w-[44ch] font-normal leading-[1.7] text-white/80",
              "text-sm sm:text-[15px] md:text-base lg:text-[17px] xl:text-[18px]",
              "[text-wrap:pretty]",
              reveal(revealed)
            )}
          >
            Explore My Work Across Landing Pages, Business Websites, And
            React Applications—Built With Clean Design, Smooth
            Interactions, And A Focus On Results.
          </p>
        </div>
      </header>

      {/* CONTROLS */}
      <Controls
        playing={playing}
        onToggle={() => setPlaying((current) => !current)}
        speed={speed}
        onSpeed={setSpeed}
        revealed={revealed}
      />

      {/* PROJECT GALLERY */}
      <div className="grid w-full min-w-0 gap-1 sm:gap-2 lg:gap-1">
        <CarouselRow
          images={topImages}
          offset={0}
          revealed={revealed}
          paused={!inView || !playing}
          onOpen={setActiveIndex}
        />

        <CarouselRow
          images={bottomImages}
          offset={topImages.length}
          reverse
          revealed={revealed}
          paused={!inView || !playing}
          onOpen={setActiveIndex}
        />
      </div>

      {/* PROJECT PREVIEW */}
      <Lightbox
        images={allImages}
        index={activeIndex}
        onClose={closePreview}
        onStep={stepPreview}
        onSelect={setActiveIndex}
      />

      {/* FONTS + ANIMATIONS */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&family=Instrument+Serif:ital@1&display=swap");

        @keyframes cc-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes cc-float {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(-60px, -40px, 0) scale(1.12);
          }
        }

        @keyframes cc-float-2 {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(90px, 50px, 0) scale(1.15);
          }
        }

        @keyframes cc-ember {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          100% {
            transform: translate3d(36px, -80vh, 0) scale(0.3);
            opacity: 0;
          }
        }

        @keyframes cc-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.7);
          }
        }

        @keyframes cc-shimmer {
          from {
            background-position: 100% 0;
          }
          to {
            background-position: 0% 0;
          }
        }

        @keyframes cc-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes cc-pop {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        @keyframes cc-swap {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}