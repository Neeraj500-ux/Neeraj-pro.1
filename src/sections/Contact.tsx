import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import Starfield from "@/components/Starfield";

const field = "w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-bone placeholder:text-bone/35 focus:border-crimson-glow focus:outline-none";

export default function Contact() {
  const [status, setStatus] = useState("");

  // No backend is configured, so this opens the visitor's email app with the message pre-filled.
  // To send directly from the site, connect a service such as Formspree or EmailJS (see README).
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${d.get("name")}`);
    const body = encodeURIComponent(`${d.get("message")}\n\nFrom: ${d.get("name")} (${d.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with the message ready to send.");
  }

  const rows = [
    { Icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { Icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
    { Icon: MapPin, label: "Location", value: profile.location },
    { Icon: Github, label: "GitHub", value: "Neeraj500-ux", href: profile.github },
    { Icon: Linkedin, label: "LinkedIn", value: "neeraj-kumar-091386311", href: profile.linkedin },
  ];

  return (
    <section id="contact" className="section relative overflow-hidden bg-coal">
      <Starfield className="opacity-50" />
      <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-crimson/20 blur-[120px]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading title="Let's build something useful" intro="I'm interested in frontend development opportunities, internships, and web development projects where I can contribute, learn, and keep growing." />
          <ul className="space-y-5">
            {rows.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-crimson-glow"><Icon size={18} /></span>
                <div className="min-w-0">
                  <p className="text-xs text-bone/50">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="break-all text-sm font-semibold hover:text-crimson-glow">{value}</a>
                  ) : <p className="text-sm font-semibold">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-white/10 bg-ink/70 p-7 backdrop-blur">
            <div><label htmlFor="name" className="mb-2 block text-sm font-semibold">Name</label><input id="name" name="name" required autoComplete="name" className={field} placeholder="Your name" /></div>
            <div><label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label><input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" /></div>
            <div><label htmlFor="message" className="mb-2 block text-sm font-semibold">Message</label><textarea id="message" name="message" required rows={5} className={field} placeholder="Tell me about your project" /></div>
            <Button type="submit" className="w-full">Send via email <Send size={16} /></Button>
            <p role="status" className="min-h-5 text-xs text-bone/60">{status || "This opens your email app. No data is stored on this site."}</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
