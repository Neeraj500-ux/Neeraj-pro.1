import { useRef, useState } from "react";

const designs = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/Neeraj17%20(${i + 1}).jpeg`,
  title: `Landing Page Design ${i + 1}`,
}));

export default function LandingShowcase() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const current = designs[active];

  const select = (index: number) => {
    setActive(index);
    stageRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  const step = (direction: number) =>
    select((active + direction + designs.length) % designs.length);

  return (
    <section
      id="landing-pages"
      aria-labelledby="landing-heading"
      className="landing-showcase"
    >
      <div className="ls-glow ls-glow-one" aria-hidden="true" />
      <div className="ls-glow ls-glow-two" aria-hidden="true" />

      <div className="ls-container">
        <header className="ls-header">
          <div>
            <div className="ls-eyebrow">
              <span />
              Designed To Convert
            </div>

            <h2 id="landing-heading">
              Landing Pages That
              <br className="ls-desktop-break" /> Turn Interest Into{" "}
              <span>Enquiries.</span>
            </h2>
          </div>

          <div className="ls-intro">
            <p>
              Stop wasting ad spend on low conversion pages. Invest in a
              high-converting automated funnel.
            </p>

            <div className="ls-collection">
              <span className="ls-collection-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                </svg>
              </span>
              <span>12 Designs. Explore Every Detail.</span>
            </div>
          </div>
        </header>

        <div className="ls-workspace">
          <div className="ls-main">
            <div className="ls-preview">
              <div className="ls-browser">
                <div className="ls-browser-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="ls-address">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect x="5" y="10" width="14" height="11" rx="3" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  <span>{current.title}</span>
                </div>

                <span className="ls-preview-tag">Preview</span>
              </div>

              <div
                ref={stageRef}
                tabIndex={0}
                aria-label={`${current.title}. Scroll inside this frame to see the full page.`}
                className="ls-page ls-scroll"
              >
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.title}
                  decoding="async"
                  className="ls-page-image"
                />
              </div>
            </div>

            <div className="ls-preview-footer">
              <div className="ls-current">
                <span className="ls-current-number">
                  {String(active + 1).padStart(2, "0")}
                </span>

                <div>
                  <p aria-live="polite" aria-atomic="true">
                    {current.title}
                  </p>
                  <span>Scroll inside to explore the full page</span>
                </div>
              </div>

              <div className="ls-controls">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous design"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m14 7-5 5 5 5M9 12h11" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next design"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m10 7 5 5-5 5M15 12H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <aside className="ls-library" aria-label="Design collection">
            <div className="ls-library-header">
              <div>
                <span className="ls-small-label">The Collection</span>
                <h3>Pick Your Inspiration</h3>
              </div>
              <span className="ls-count">12</span>
            </div>

            <div
              className="ls-thumbnails ls-scroll"
              role="group"
              aria-label="Choose a design"
            >
              {designs.map((design, index) => {
                const selected = index === active;

                return (
                  <button
                    key={design.src}
                    type="button"
                    onClick={() => select(index)}
                    aria-label={`Show ${design.title}`}
                    aria-current={selected ? "true" : undefined}
                    className={`ls-thumbnail ${
                      selected ? "is-active" : ""
                    }`}
                  >
                    <div className="ls-thumbnail-image">
                      <img
                        src={design.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />

                      <span className="ls-thumbnail-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {selected && (
                        <span className="ls-selected" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="m6 12 4 4 8-8" />
                          </svg>
                        </span>
                      )}
                    </div>

                    <span className="ls-thumbnail-caption">
                      Design {String(index + 1).padStart(2, "0")}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="ls-library-footer">
              <span aria-hidden="true" />
              Select a design to explore
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .landing-showcase {
          --ls-red: #e11d2e;
          --ls-muted: #929298;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(64px, 8vw, 112px) 0;
          background: #070708;
          color: #fff;
          font-family: inherit;
        }

        .landing-showcase,
        .landing-showcase * {
          box-sizing: border-box;
        }

        .landing-showcase button {
          font: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .landing-showcase svg {
          stroke: currentColor;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .landing-showcase button:focus-visible,
        .landing-showcase [tabindex]:focus-visible {
          outline: 2px solid #ff5362;
          outline-offset: -3px;
        }

        .ls-glow {
          position: absolute;
          z-index: -1;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(90px);
        }

        .ls-glow-one {
          width: 520px;
          height: 520px;
          top: -320px;
          left: -160px;
          background: rgba(225, 29, 46, .2);
        }

        .ls-glow-two {
          width: 420px;
          height: 420px;
          right: -300px;
          bottom: -200px;
          background: rgba(225, 29, 46, .13);
        }

        .ls-container {
          width: min(1360px, 100%);
          margin-inline: auto;
          padding-inline: clamp(20px, 4vw, 64px);
        }

        .ls-header {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(240px, .8fr);
          gap: 48px;
          align-items: end;
          margin-bottom: 40px;
        }

        .ls-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          color: #d2d2d6;
          font-size: 11px;
          font-weight: 650;
          letter-spacing: .16em;
          text-transform: uppercase;
        }

        .ls-eyebrow > span {
          width: 22px;
          height: 3px;
          border-radius: 4px;
          background: var(--ls-red);
          box-shadow: 0 0 18px rgba(225, 29, 46, .4);
        }

        .ls-header h2 {
          margin: 0;
          font-size: clamp(36px, 4.5vw, 62px);
          font-weight: 750;
          line-height: 1.09;
          letter-spacing: -.055em;
          text-wrap: balance;
        }

        .ls-header h2 > span {
          color: #ff4353;
          background: linear-gradient(100deg, #ff6b76, #e11d2e);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .ls-intro {
          padding-bottom: 4px;
        }

        .ls-intro > p {
          max-width: 36ch;
          margin: 0;
          color: #a6a6ae;
          font-size: 15px;
          line-height: 1.8;
        }

        .ls-collection {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
          color: #d3d3d8;
          font-size: 11px;
          font-weight: 550;
        }

        .ls-collection-icon {
          display: grid;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid rgba(225, 29, 46, .25);
          border-radius: 10px;
          background: rgba(225, 29, 46, .09);
          color: #ff6572;
        }

        .ls-collection-icon svg {
          width: 16px;
          height: 16px;
        }

        .ls-workspace {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 292px;
          gap: 20px;
          align-items: start;
        }

        .ls-main,
        .ls-library {
          min-width: 0;
        }

        .ls-preview {
          overflow: hidden;
          padding: 7px;
          border: 1px solid rgba(255, 255, 255, .13);
          border-radius: 21px;
          background: linear-gradient(
            140deg,
            rgba(255, 255, 255, .09),
            rgba(255, 255, 255, .025) 45%,
            rgba(225, 29, 46, .055)
          );
          box-shadow:
            0 28px 70px rgba(0, 0, 0, .3),
            0 1px 0 rgba(255, 255, 255, .04) inset;
        }

        .ls-browser {
          display: flex;
          align-items: center;
          gap: 18px;
          min-height: 49px;
          padding: 5px 12px 11px;
        }

        .ls-browser-dots {
          display: flex;
          gap: 5px;
          flex-shrink: 0;
        }

        .ls-browser-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #424247;
        }

        .ls-browser-dots span:first-child {
          background: var(--ls-red);
        }

        .ls-address {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-width: 0;
          max-width: 340px;
          flex: 1;
          margin-inline: auto;
          padding: 8px 12px;
          border: 1px solid rgba(255, 255, 255, .04);
          border-radius: 8px;
          background: rgba(0, 0, 0, .25);
          color: #aaaab2;
          font-size: 10px;
        }

        .ls-address span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .ls-address svg {
          width: 11px;
          height: 11px;
          flex-shrink: 0;
          color: #74747d;
        }

        .ls-preview-tag {
          color: #83838d;
          font-size: 9px;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .ls-page {
          height: clamp(420px, 66vh, 780px);
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior-y: contain;
          border: 1px solid rgba(255, 255, 255, .07);
          border-radius: 12px;
          background: #161618;
        }

        .ls-page-image {
          display: block;
          width: 100%;
          height: auto;
        }

        .ls-preview-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 3px 0;
        }

        .ls-current {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .ls-current-number {
          display: grid;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid rgba(225, 29, 46, .23);
          border-radius: 13px;
          background: rgba(225, 29, 46, .08);
          color: #ff6471;
          font-size: 14px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .ls-current p {
          margin: 0 0 5px;
          color: #ededf0;
          font-size: 13px;
          font-weight: 600;
        }

        .ls-current div > span {
          display: block;
          color: #81818b;
          font-size: 10px;
          line-height: 1.5;
        }

        .ls-controls {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .ls-controls button {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, .13);
          border-radius: 13px;
          background: rgba(255, 255, 255, .035);
          color: #fff;
          transition: background .2s ease, border-color .2s ease;
        }

        .ls-controls button:last-child {
          border-color: rgba(225, 29, 46, .65);
          background: var(--ls-red);
          box-shadow: 0 6px 22px rgba(225, 29, 46, .15);
        }

        .ls-controls svg {
          width: 20px;
          height: 20px;
        }

        .ls-library {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .09);
          border-radius: 20px;
          background: linear-gradient(
            150deg,
            rgba(255, 255, 255, .055),
            rgba(255, 255, 255, .018)
          );
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .ls-library-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 22px 18px 18px;
        }

        .ls-small-label {
          display: block;
          margin-bottom: 8px;
          color: #85858e;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .ls-library-header h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -.025em;
        }

        .ls-count {
          display: grid;
          width: 29px;
          height: 29px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, .09);
          border-radius: 9px;
          color: #b5b5be;
          font-size: 10px;
        }

        .ls-thumbnails {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          max-height: clamp(374px, calc(66vh - 46px), 734px);
          overflow-y: auto;
          padding: 3px 14px 14px;
        }

        .ls-thumbnail {
          min-width: 0;
          padding: 5px;
          border: 1px solid rgba(255, 255, 255, .07);
          border-radius: 12px;
          background: rgba(0, 0, 0, .2);
          text-align: left;
          color: #92929b;
          transition:
            border-color .22s ease,
            background .22s ease,
            color .22s ease;
        }

        .ls-thumbnail.is-active {
          border-color: var(--ls-red);
          background: rgba(225, 29, 46, .1);
          color: #fff;
          box-shadow: 0 0 20px rgba(225, 29, 46, .08);
        }

        .ls-thumbnail-image {
          position: relative;
          overflow: hidden;
          height: 124px;
          border-radius: 7px;
          background: #1a1a1d;
        }

        .ls-thumbnail-image::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, .14),
            transparent 45%,
            rgba(0, 0, 0, .3)
          );
        }

        .ls-thumbnail-image > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          opacity: .75;
          transition: opacity .22s ease;
        }

        .ls-thumbnail.is-active img {
          opacity: 1;
        }

        .ls-thumbnail-number {
          position: absolute;
          z-index: 1;
          top: 7px;
          left: 7px;
          padding: 4px 6px;
          border: 1px solid rgba(255, 255, 255, .13);
          border-radius: 5px;
          background: rgba(0, 0, 0, .7);
          color: #fff;
          font-size: 9px;
          font-variant-numeric: tabular-nums;
        }

        .ls-selected {
          position: absolute;
          z-index: 1;
          right: 7px;
          bottom: 7px;
          display: grid;
          width: 23px;
          height: 23px;
          place-items: center;
          border-radius: 50%;
          background: var(--ls-red);
          color: white;
        }

        .ls-selected svg {
          width: 14px;
          height: 14px;
          stroke-width: 2.2;
        }

        .ls-thumbnail-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
          padding: 10px 3px 5px;
          font-size: 10px;
          font-weight: 550;
        }

        .ls-thumbnail-caption > span {
          font-size: 13px;
          color: #777780;
        }

        .ls-thumbnail.is-active .ls-thumbnail-caption > span {
          color: #ff6572;
        }

        .ls-library-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 15px 12px;
          border-top: 1px solid rgba(255, 255, 255, .06);
          color: #85858f;
          font-size: 10px;
        }

        .ls-library-footer > span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--ls-red);
        }

        .ls-scroll {
          scrollbar-width: thin;
          scrollbar-color: #743039 #111113;
        }

        .ls-scroll::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        .ls-scroll::-webkit-scrollbar-track {
          background: #111113;
        }

        .ls-scroll::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #743039;
        }

        @media (hover: hover) {
          .ls-controls button:hover {
            border-color: var(--ls-red);
            background: #c81929;
          }

          .ls-thumbnail:hover {
            border-color: rgba(225, 29, 46, .65);
            background: rgba(225, 29, 46, .07);
            color: #fff;
          }

          .ls-thumbnail:hover img {
            opacity: 1;
          }
        }

        @media (max-width: 1050px) {
          .ls-header {
            grid-template-columns: minmax(0, 1fr);
            gap: 22px;
          }

          .ls-intro > p {
            max-width: 60ch;
          }

          .ls-collection {
            margin-top: 14px;
          }

          .ls-workspace {
            grid-template-columns: minmax(0, 1fr) 240px;
            gap: 16px;
          }

          .ls-library-header {
            padding-inline: 14px;
          }

          .ls-library-header h3 {
            font-size: 12px;
          }

          .ls-thumbnails {
            gap: 9px;
            padding-inline: 10px;
          }

          .ls-thumbnail-image {
            height: 110px;
          }
        }

        @media (max-width: 760px) {
          .ls-header {
            gap: 18px;
            margin-bottom: 28px;
          }

          .ls-header h2 {
            max-width: 620px;
            font-size: clamp(35px, 6.7vw, 49px);
          }

          .ls-intro > p {
            font-size: 14px;
            line-height: 1.75;
          }

          .ls-workspace {
            grid-template-columns: minmax(0, 1fr);
            gap: 26px;
          }

          .ls-preview {
            padding: 5px;
            border-radius: 17px;
          }

          .ls-browser {
            gap: 12px;
            min-height: 44px;
            padding: 5px 9px 9px;
          }

          .ls-page {
            height: clamp(350px, 61vh, 620px);
            height: clamp(350px, 61svh, 620px);
            border-radius: 10px;
          }

          .ls-library {
            border-radius: 17px;
          }

          .ls-library-header {
            padding: 18px 16px 15px;
          }

          .ls-library-header h3 {
            font-size: 14px;
          }

          .ls-thumbnails {
            display: flex;
            gap: 11px;
            max-height: none;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 3px 16px 16px;
            scroll-snap-type: x proximity;
            scroll-padding-inline: 16px;
          }

          .ls-thumbnail {
            width: 116px;
            flex: 0 0 116px;
            scroll-snap-align: start;
          }

          .ls-thumbnail-image {
            height: 132px;
          }

          .ls-library-footer {
            padding-block: 12px;
          }
        }

        @media (max-width: 420px) {
          .ls-desktop-break {
            display: none;
          }

          .ls-eyebrow {
            margin-bottom: 17px;
            font-size: 10px;
          }

          .ls-header h2 {
            font-size: clamp(32px, 9vw, 37px);
            line-height: 1.12;
          }

          .ls-preview-tag {
            display: none;
          }

          .ls-address {
            font-size: 9px;
          }

          .ls-preview-footer {
            align-items: flex-start;
            gap: 10px;
            padding-top: 15px;
          }

          .ls-current {
            gap: 8px;
          }

          .ls-current-number {
            width: 35px;
            height: 39px;
            border-radius: 10px;
            font-size: 12px;
          }

          .ls-current p {
            font-size: 11px;
            line-height: 1.4;
          }

          .ls-current div > span {
            max-width: 145px;
            font-size: 10px;
          }

          .ls-controls {
            gap: 6px;
          }

          .ls-controls button {
            width: 44px;
            height: 44px;
            border-radius: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .landing-showcase *,
          .landing-showcase *::before,
          .landing-showcase *::after {
            transition: none !important;
            animation: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}