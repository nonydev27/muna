import { useState } from "react";
import MunaLogo from "./Muna";

// Change this once your  sign in / sign up route is known
const SIGNUP_PATH = "/signup";

const LINKS = ["About", "Subjects", "Pricing", "Features", "Contact"];

// One wobbly closed shape, drawn around (300, 300)
const BLOB =
  "M300 60C410 40 520 120 540 240C560 360 480 470 360 520C240 570 110 520 70 400C30 280 90 150 190 100C230 78 265 66 300 60Z";

function Contours({ id, rings = 16 }) {
  return (
    <svg className="contours" viewBox="0 0 600 600" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6d5dfc" />
          <stop offset="0.55" stopColor="#c660e8" />
          <stop offset="1" stopColor="#3fa9ff" />
        </linearGradient>
      </defs>
      {Array.from({ length: rings }, (_, i) => {
        const s = 1 - i * 0.058;
        return (
          <path
            key={i}
            d={BLOB}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            transform={`translate(300 300) scale(${s}) rotate(${i * 2}) translate(-300 -300)`}
          />
        );
      })}
    </svg>
  );
}

// function Logo() {
//   return (
//     <a href="/" className="logo" aria-label="ExamPrep home">
//       <svg viewBox="0 0 40 24" width="34" height="20" aria-hidden="true">
//         <path d="M2 2h12a10 10 0 0 1 0 20H2z" fill="none" stroke="currentColor" strokeWidth="3" />
//         <path d="M22 4l14 8-14 8z" fill="currentColor" />
//       </svg>
//       <span>ExamPrep</span>
//     </a>
//   );
// }

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landing">
      <header className="nav">
        <MunaLogo />
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main">
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </nav>
        <a href={SIGNUP_PATH} className="pill pill-solid">Sign in</a>
        <button
          type="button"
          className="burger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </header>

      <main className="hero">
        <Contours id="gradA" rings={17} />
        <Contours id="gradB" rings={13} />

        <div className="hero-text">
          <h1>Ace your exams.</h1>
          <label className="search">
            <span className="sr-only">Search subjects or past papers</span>
            <input type="search" placeholder="Search subjects or past papers" />
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M15 15l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </label>
          <div className="cta-row">
            <a href={SIGNUP_PATH} className="pill pill-blue">Get started</a>
            <a href="#features" className="pill pill-outline">See how it works</a>
          </div>
        </div>

        <aside className="hero-note">
          <h2>Timed mock exams.</h2>
          <p>
            Practise under real exam conditions, see your score the moment you
            finish, and track which topics need more work.
          </p>
        </aside>

        <span className="scroll-hint" aria-hidden="true" />
      </main>
    </div>
  );
}
