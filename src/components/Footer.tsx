import type { CSSProperties, SVGProps } from "react";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";

function WhatsAppIcon({
  size = 22,
  ...props
}: { size?: number } & SVGProps<SVGSVGElement>) {
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

const WHATSAPP_NUMBER = "919773768835";
const WHATSAPP_TEXT =
  "Hi! I found your portfolio and would like to connect.";
const INSTAGRAM_URL = "https://www.instagram.com/cod3xdesigner/";

export default function Footer() {
  const social = [
    {
      href: profile.github,
      label: "GitHub",
      Icon: Github,
      color: "#ffffff",
      glow: "rgba(255,255,255,.18)",
      background: "linear-gradient(145deg,#414149,#18181e)",
      rotation: "-12deg",
    },
    {
      href: profile.linkedin,
      label: "LinkedIn",
      Icon: Linkedin,
      color: "#62baff",
      glow: "rgba(10,102,194,.4)",
      background: "linear-gradient(145deg,#1689e6,#074b91)",
      rotation: "10deg",
    },
    {
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        WHATSAPP_TEXT
      )}`,
      label: "WhatsApp",
      Icon: WhatsAppIcon,
      color: "#4ade80",
      glow: "rgba(37,211,102,.35)",
      background: "linear-gradient(145deg,#35e77c,#119749)",
      rotation: "-10deg",
    },
    {
      href: INSTAGRAM_URL,
      label: "Instagram",
      Icon: Instagram,
      color: "#ff88c2",
      glow: "rgba(225,48,108,.4)",
      background:
        "radial-gradient(circle at 25% 105%,#ffdc80 0%,#fcaf45 22%,#f77737 36%,#e1306c 58%,#c13584 73%,#833ab4 100%)",
      rotation: "12deg",
    },
    {
      href: `mailto:${profile.email}`,
      label: "Email",
      Icon: Mail,
      color: "#ff858e",
      glow: "rgba(244,63,94,.3)",
      background: "linear-gradient(145deg,#fb7185,#be123c)",
      rotation: "-9deg",
    },
  ];

  return (
    <footer className="nf-footer border-t border-white/10 bg-coal">
      <style>{`
        .nf-footer {
          position: relative;
          isolation: isolate;
          color: #f4f0e9;
          background-image:
            radial-gradient(
              ellipse at 5% 0%,
              rgba(225, 29, 72, .065),
              transparent 50%
            );
        }

        .nf-footer *,
        .nf-footer *::before,
        .nf-footer *::after {
          box-sizing: border-box;
        }

        .nf-layout {
          display: grid;
          grid-template-columns: minmax(0, .9fr) minmax(0, 1.3fr);
          align-items: center;
          gap: 32px 48px;
          padding-top: 48px;
          padding-bottom: 38px;
        }

        .nf-brand {
          min-width: 0;
        }

        .nf-logo {
          display: inline-block;
          text-decoration: none;
          color: inherit;
        }

        .nf-description {
          max-width: 340px;
          margin: 10px 0 0;
          font-size: 13px;
          line-height: 1.8;
          color: rgba(244, 240, 233, .5);
          overflow-wrap: anywhere;
        }

        .nf-socials {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-end;
          gap: 8px 18px;
          min-width: 0;
        }

        .nf-social {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 94px;
          padding: 54px 5px 12px;
          color: rgba(244, 240, 233, .7);
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
          outline-offset: 5px;
        }

        .nf-social:focus-visible,
        .nf-top:focus-visible,
        .nf-nav a:focus-visible,
        .nf-logo:focus-visible {
          outline: 2px solid #fb7185;
          border-radius: 8px;
        }

        .nf-social-label {
          position: relative;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .01em;
          white-space: nowrap;
          transition: color .25s ease;
        }

        .nf-social-label::after {
          content: "";
          position: absolute;
          right: 0;
          bottom: -7px;
          left: 0;
          height: 2px;
          border-radius: 20px;
          background: var(--social-color);
          transform: scaleX(0);
          transition: transform .3s ease;
        }

        .nf-social-icon {
          position: absolute;
          top: 4px;
          left: 50%;
          display: grid;
          width: 39px;
          height: 39px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, .2);
          border-radius: 12px;
          color: #fff;
          background: var(--social-bg);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, .25),
            0 9px 22px var(--social-glow);
          opacity: 0;
          transform:
            translate(-50%, 17px)
            rotate(0deg)
            scale(.55);
          transition:
            transform .45s cubic-bezier(.2, .8, .2, 1.35),
            opacity .25s ease,
            box-shadow .3s ease;
          pointer-events: none;
        }

        .nf-social-icon svg {
          width: 22px;
          height: 22px;
        }

        .nf-social:hover .nf-social-icon,
        .nf-social:focus-visible .nf-social-icon {
          opacity: 1;
          transform:
            translate(-50%, 0)
            rotate(var(--social-rotation))
            scale(1);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, .3),
            0 12px 28px var(--social-glow);
        }

        .nf-social:hover .nf-social-label,
        .nf-social:focus-visible .nf-social-label {
          color: var(--social-color);
        }

        .nf-social:hover .nf-social-label::after,
        .nf-social:focus-visible .nf-social-label::after {
          transform: scaleX(1);
        }

        .nf-top {
          display: grid;
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          margin-left: 4px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, .15);
          border-radius: 50%;
          color: #fff;
          background: linear-gradient(145deg, #ef3455, #b81135);
          box-shadow: 0 6px 20px rgba(225, 29, 72, .15);
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .nf-top:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 26px rgba(225, 29, 72, .3);
        }

        .nf-nav {
          grid-column: 1 / -1;
          display: flex;
          flex-wrap: wrap;
          gap: 12px 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, .07);
        }

        .nf-nav a {
          padding: 6px 0;
          color: rgba(244, 240, 233, .52);
          font-size: 13px;
          text-decoration: none;
          transition: color .2s ease;
        }

        .nf-nav a:hover {
          color: #fff;
        }

        .nf-copyright {
          margin: 0;
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, .06);
          color: rgba(244, 240, 233, .36);
          font-size: 11px;
          line-height: 1.8;
          text-align: center;
          overflow-wrap: anywhere;
        }

        @media (max-width: 1024px) {
          .nf-layout {
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .nf-socials {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .nf-layout {
            padding-top: 34px;
            padding-bottom: 26px;
            gap: 24px;
          }

          .nf-socials {
            gap: 8px 12px;
          }

          .nf-social {
            min-height: 86px;
            padding: 49px 3px 11px;
          }

          .nf-social-label {
            font-size: 11px;
          }

          .nf-social-icon {
            width: 35px;
            height: 35px;
            border-radius: 11px;
            opacity: 1;
            transform: translate(-50%, 0) rotate(0deg) scale(1);
          }

          .nf-social-icon svg {
            width: 20px;
            height: 20px;
          }

          .nf-top {
            width: 36px;
            height: 36px;
            margin-left: 0;
          }

          .nf-nav {
            gap: 8px 22px;
            padding-top: 18px;
          }

          .nf-nav a {
            font-size: 12px;
          }

          .nf-copyright {
            padding: 18px 20px;
            font-size: 10px;
          }
        }

        @media (hover: none) {
          .nf-social-icon {
            opacity: 1;
            transform: translate(-50%, 0) rotate(0deg) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nf-footer *,
          .nf-footer *::before,
          .nf-footer *::after {
            transition: none !important;
            animation: none !important;
          }

          .nf-social-icon {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }

          .nf-social:hover .nf-social-icon,
          .nf-social:focus-visible .nf-social-icon {
            transform: translate(-50%, 0) scale(1);
          }

          .nf-top:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="container-x nf-layout">
        <div className="nf-brand">
          <a href="#home" className="nf-logo" aria-label="Neeraj home">
            <span className="font-display text-3xl italic">
              Neeraj<span className="text-crimson-glow">.</span>
            </span>
          </a>

          <p className="nf-description">
            {profile.role} · {profile.stack}
          </p>
        </div>

        <nav className="nf-socials" aria-label="Social media">
          {social.map(
            ({
              href,
              label,
              Icon,
              color,
              glow,
              background,
              rotation,
            }) => {
              const isExternal = /^https?:\/\//i.test(href);

              const style = {
                "--social-color": color,
                "--social-glow": glow,
                "--social-bg": background,
                "--social-rotation": rotation,
              } as CSSProperties;

              return (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={
                    isExternal ? `${label} (opens in a new tab)` : label
                  }
                  className="nf-social"
                  style={style}
                >
                  <span className="nf-social-icon" aria-hidden="true">
                    <Icon size={22} />
                  </span>

                  <span className="nf-social-label">{label}</span>
                </a>
              );
            }
          )}

          <a href="#home" aria-label="Back to top" className="nf-top">
            <ArrowUp size={18} aria-hidden="true" />
          </a>
        </nav>

        <nav aria-label="Footer navigation" className="nf-nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="nf-copyright">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite
        and Tailwind CSS.
      </p>
    </footer>
  );
}