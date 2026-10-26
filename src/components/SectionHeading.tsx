import Reveal from "@/components/ui/reveal";

export default function SectionHeading({ title, intro }: { title: string; intro?: string }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">{title}</h2>
      <div className="mt-5 h-px w-16 bg-gradient-to-r from-crimson to-transparent" />
      {intro && <p className="mt-5 text-base leading-relaxed text-bone/65">{intro}</p>}
    </Reveal>
  );
}
