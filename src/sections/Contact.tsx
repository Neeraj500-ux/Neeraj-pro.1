import { useState, type FormEvent } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  MessageSquareText,
  User,
  AtSign,
} from "lucide-react";

import { profile } from "@/data/portfolio";
import Reveal from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import Starfield from "@/components/Starfield";

/* =========================================================
   CONTACT.TSX
   Premium Contact UI
   + Original Starfield / Atmospheric Background
   ========================================================= */

const inputClass =
  "w-full rounded-2xl border border-white/[0.12] bg-black/35 px-4 py-4 text-[15px] text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/30 hover:border-white/20 hover:bg-black/45 focus:border-red-500/70 focus:bg-black/55 focus:ring-4 focus:ring-red-500/[0.10] sm:px-5";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${name}`
    );

    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\nEmail: ${email}`
    );

    setIsSending(true);
    setStatus("Opening your email application...");

    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      setIsSending(false);

      setStatus(
        "If your email app didn't open, you can contact me directly by email."
      );
    }, 1200);
  }

  const contacts = [
    {
      Icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      Icon: Phone,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phoneHref}`,
    },
    {
      Icon: MapPin,
      label: "Location",
      value: profile.location,
    },
  ];

  const socials = [
    {
      Icon: Github,
      label: "GitHub",
      href: profile.github,
    },
    {
      Icon: Linkedin,
      label: "LinkedIn",
      href: profile.linkedin,
    },
  ];

  return (
    <section
      id="contact"
      className="relative isolate min-h-screen overflow-hidden bg-[#050607] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* =====================================================
          ORIGINAL STARFIELD BACKGROUND
      ===================================================== */}

      <Starfield className="pointer-events-none opacity-35" />

      {/* =====================================================
          ORIGINAL ATMOSPHERIC BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Left Red Glow */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-red-600/15 blur-[120px]" />

        {/* Right Red Glow */}
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-red-900/20 blur-[140px]" />

        {/* Bottom Rose Glow */}
        <div className="absolute bottom-0 left-1/3 h-64 w-96 rounded-full bg-rose-700/10 blur-[120px]" />

        {/* Top Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(127,29,29,0.15),transparent_60%)]" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="container-x relative mx-auto max-w-7xl">
        {/* ===================================================
            HEADER
        =================================================== */}

        <Reveal>
          <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16 lg:mb-20">
            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/[0.06] px-4 py-2 shadow-[0_0_35px_rgba(239,68,68,0.06)] backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-50" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>

              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-300 sm:text-xs">
                Let&apos;s Work Together
              </span>
            </div>

            {/* Heading */}

            <h2 className="text-[clamp(40px,7vw,76px)] font-black leading-[0.98] tracking-[-0.055em] text-white">
              Have An Idea?
              <br />

              <span className="bg-gradient-to-r from-red-300 via-red-500 to-red-700 bg-clip-text text-transparent">
                Let&apos;s Build It.
              </span>
            </h2>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
              Have a project, opportunity, or something interesting in mind?
              Send me a message and let&apos;s create something great together.
            </p>
          </div>
        </Reveal>

        {/* =====================================================
            CONTACT GRID
        ===================================================== */}

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-7">
          {/* =================================================
              LEFT CONTACT PANEL
          ================================================= */}

          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.025] p-6 shadow-[0_30px_80px_rgba(0,0,0,.30)] backdrop-blur-[18px] sm:p-8 lg:p-10 xl:p-11">
              {/* Card Glow */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-28 -top-28 h-72 w-72 rounded-full bg-red-600/[0.09] blur-[90px]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-red-950/[0.08] blur-[100px]"
              />

              <div className="relative flex h-full flex-col">
                {/* Contact Heading */}

                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/[0.09] text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.06)]">
                    <Sparkles size={20} />
                  </div>

                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-red-400">
                    Contact Me
                  </p>

                  <h3 className="text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl">
                    Let&apos;s Create
                    <br />
                    Something{" "}
                    <span className="text-red-500">
                      Great.
                    </span>
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 text-white/50">
                    I&apos;m open to frontend opportunities, React projects,
                    internships, freelance work, and collaborations.
                  </p>
                </div>

                {/* =================================================
                    CONTACT DETAILS
                ================================================= */}

                <div className="mt-8 space-y-2">
                  {contacts.map(
                    ({ Icon, label, value, href }) => {
                      const content = (
                        <>
                          {/* Icon */}

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.025] text-white/60 transition-all duration-300 group-hover:border-red-500/35 group-hover:bg-red-500/[0.10] group-hover:text-red-400">
                            <Icon size={17} />
                          </div>

                          {/* Text */}

                          <div className="min-w-0 flex-1">
                            <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
                              {label}
                            </span>

                            <span className="mt-1 block break-all text-sm font-medium text-white/75 transition-colors duration-300 group-hover:text-white">
                              {value}
                            </span>
                          </div>

                          {/* Arrow */}

                          {href && (
                            <ArrowUpRight
                              size={15}
                              className="shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-400"
                            />
                          )}
                        </>
                      );

                      return href ? (
                        <a
                          key={label}
                          href={href}
                          target={
                            href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="group flex items-center gap-3 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:border-white/[0.06] hover:bg-white/[0.035]"
                        >
                          {content}
                        </a>
                      ) : (
                        <div
                          key={label}
                          className="group flex items-center gap-3 rounded-2xl border border-transparent p-3"
                        >
                          {content}
                        </div>
                      );
                    }
                  )}
                </div>

                {/* =================================================
                    AVAILABILITY
                ================================================= */}

                <div className="mt-7 rounded-2xl border border-green-400/[0.14] bg-green-400/[0.035] p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-400/[0.08] text-green-400">
                      <CheckCircle2 size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white/85">
                        Available For Opportunities
                      </p>

                      <p className="mt-1 text-xs leading-5 text-white/35">
                        React • Frontend • Web Development
                      </p>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    SOCIAL LINKS
                ================================================= */}

                <div className="mt-auto pt-8">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
                    Find Me Online
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {socials.map(
                      ({ Icon, label, href }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="group flex h-11 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.025] px-4 text-xs font-medium text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/35 hover:bg-red-500/[0.08] hover:text-white"
                        >
                          <Icon
                            size={16}
                            className="transition-colors duration-300 group-hover:text-red-400"
                          />

                          {label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* =================================================
              RIGHT FORM PANEL
          ================================================= */}

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-[28px] border border-white/[0.11] bg-gradient-to-br from-white/[0.055] via-white/[0.025] to-red-950/[0.06] p-6 shadow-[0_30px_80px_rgba(0,0,0,.32)] backdrop-blur-[20px] sm:p-8 md:p-10 lg:p-12 xl:p-14">
              {/* Form Card Glow */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-600/[0.09] blur-[100px]"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-red-950/[0.06] blur-[100px]"
              />

              <div className="relative">
                {/* =================================================
                    FORM HEADER
                ================================================= */}

                <div className="mb-8 flex items-start gap-4 sm:mb-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/25 bg-red-500/[0.09] text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.07)] sm:h-14 sm:w-14">
                    <MessageSquareText size={22} />
                  </div>

                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-400">
                      Start A Conversation
                    </p>

                    <h3 className="text-2xl font-bold tracking-[-0.04em] text-white sm:text-3xl">
                      Send Me A Message
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                      Fill out the details below and your email application will
                      open with the message ready to send.
                    </p>
                  </div>
                </div>

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  onSubmit={onSubmit}
                  className="space-y-5 sm:space-y-6"
                >
                  {/* NAME + EMAIL */}

                  <div className="grid gap-5 md:grid-cols-2">
                    {/* NAME */}

                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-white/70"
                      >
                        <User
                          size={14}
                          className="text-red-400"
                        />

                        Your Name

                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        maxLength={100}
                        className={inputClass}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* EMAIL */}

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-white/70"
                      >
                        <AtSign
                          size={14}
                          className="text-red-400"
                        />

                        Email Address

                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        maxLength={254}
                        className={inputClass}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* =================================================
                      MESSAGE
                  ================================================= */}

                  <div>
                    <div className="mb-2.5 flex items-center justify-between gap-4">
                      <label
                        htmlFor="message"
                        className="flex items-center gap-2 text-xs font-semibold text-white/70"
                      >
                        <MessageSquareText
                          size={14}
                          className="text-red-400"
                        />

                        Tell Me About Your Project

                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <span className="hidden text-[10px] uppercase tracking-[0.12em] text-white/25 sm:block">
                        Your Message
                      </span>
                    </div>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={7}
                      maxLength={5000}
                      className={`${inputClass} min-h-[190px] resize-y leading-7 sm:min-h-[220px]`}
                      placeholder="Tell me about your project, opportunity, idea, timeline, or anything you'd like to discuss..."
                    />
                  </div>

                  {/* =================================================
                      SEND BUTTON
                  ================================================= */}

                  <div className="pt-1">
                    <Button
                      type="submit"
                      disabled={isSending}
                      className="group relative flex min-h-[58px] w-full items-center justify-center overflow-hidden rounded-2xl border border-red-400/25 bg-gradient-to-r from-red-800 via-red-600 to-red-500 px-6 py-4 text-sm font-bold text-white shadow-[0_15px_45px_rgba(185,28,28,.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(220,38,38,.35)] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {/* Shine */}

                      <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />

                      {/* Content */}

                      <span className="relative flex items-center gap-3">
                        <span>
                          {isSending
                            ? "Opening Email..."
                            : "Send My Message"}
                        </span>

                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/15">
                          <Send size={15} />
                        </span>
                      </span>
                    </Button>

                    {/* Status */}

                    <div className="mt-4 flex min-h-6 items-center justify-center">
                      {status ? (
                        <p
                          role="status"
                          aria-live="polite"
                          className="text-center text-xs leading-5 text-white/45"
                        >
                          {status}
                        </p>
                      ) : (
                        <div className="flex items-center gap-2 text-[11px] text-white/35">
                          <CheckCircle2
                            size={13}
                            className="text-green-400"
                          />

                          No data is stored on this website.
                        </div>
                      )}
                    </div>
                  </div>
                </form>

                {/* =================================================
                    DIRECT EMAIL
                ================================================= */}

                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.09]" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/25">
                    Or Contact Directly
                  </span>

                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.09]" />
                </div>

                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center justify-center gap-2 text-center text-xs font-medium text-white/45 transition-colors duration-300 hover:text-red-400 sm:text-sm"
                >
                  <Mail
                    size={15}
                    className="shrink-0"
                  />

                  <span className="break-all">
                    {profile.email}
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =====================================================
            BOTTOM
        ===================================================== */}

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-[11px] text-white/30">
              © {new Date().getFullYear()} {profile.name}. Built with care.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-white/30">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,.8)]" />

              Available For New Opportunities
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}