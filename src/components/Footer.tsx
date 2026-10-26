import type { SVGProps } from "react";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

/* lucide-react me WhatsApp icon nahi hota, isliye chhota custom SVG icon */
function WhatsAppIcon({ size = 18, ...props }: { size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.45z" />
    </svg>
  );
}

/* WhatsApp: country code (India = 91) + number. Chat me ye message pehle se likha aayega. */
const WHATSAPP_NUMBER = "919773768835";
const WHATSAPP_TEXT = "Hi! I found your portfolio and would like to connect.";
const INSTAGRAM_URL = "https://www.instagram.com/cod3xdesigner/";

export default function Footer() {
  const social = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    {
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
      label: "WhatsApp",
      Icon: WhatsAppIcon,
    },
    { href: INSTAGRAM_URL, label: "Instagram", Icon: Instagram },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <footer className="border-t border-white/10 bg-coal">
      <div className="container-x flex flex-col gap-10 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-3xl italic">
            Neeraj<span className="text-crimson-glow">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-bone/55">
            {profile.role} · {profile.stack}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone/65">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          {social.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 transition-colors hover:border-crimson-glow hover:text-crimson-glow"
            >
              <Icon size={18} />
            </a>
          ))}
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full bg-crimson text-white transition-colors hover:bg-crimson-glow"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>

      <p className="border-t border-white/5 py-5 text-center text-xs text-bone/40">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite and Tailwind CSS.
      </p>
    </footer>
  );
}