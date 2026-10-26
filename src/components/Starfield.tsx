import { useMemo } from "react";

// Same idea as the supplied CSS (3 layers of 1px / 2px / 3px stars drifting upward at
// 50s / 100s / 150s), but the star positions are generated in code instead of a
// 2,000-line box-shadow list, and the stars use the red theme colors.
const COLORS = ["#ff4a3d", "#e11d2e", "#ff8a7a", "#ffd9d3", "#ffffff"];

function makeShadow(count: number, seed: number) {
  let s = seed;
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  return Array.from({ length: count }, () => {
    const x = Math.floor(rnd() * 2000);
    const y = Math.floor(rnd() * 2000);
    return `${x}px ${y}px ${COLORS[Math.floor(rnd() * COLORS.length)]}`;
  }).join(",");
}

export default function Starfield({ className = "" }: { className?: string }) {
  const layers = useMemo(
    () => [
      { size: 1, duration: 50, shadow: makeShadow(450, 11) },
      { size: 2, duration: 100, shadow: makeShadow(160, 22) },
      { size: 3, duration: 150, shadow: makeShadow(70, 33) },
    ],
    []
  );
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {layers.map((l) => (
        <div
          key={l.size}
          className="stars-layer"
          style={{ width: l.size, height: l.size, animationDuration: `${l.duration}s`, ["--shadow" as string]: l.shadow, boxShadow: l.shadow }}
        />
      ))}
    </div>
  );
}
