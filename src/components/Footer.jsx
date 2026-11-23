/**
 * ============================================================================
 * Footer Component (Wayground EdTech Footer)
 * ============================================================================
 * Features:
 * - Brand summary emphasizing modern student-centered assessment.
 * - Categorized navigation links (Platform & Resources).
 * - Live dynamic copyright year and technology stack notes.
 * ============================================================================
 */

import { Sparkles } from '../icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content-wrap">
        <div className="footer-top">
          {/* Brand & Purpose Column */}
          <div className="footer-brand">
            <div className="brand-group">
              <div className="brand-icon-box">
                <Sparkles size={20} />
              </div>
              <div className="brand-title">MUNA</div>
            </div>
            <p>
              An expressive, student-centered assessment platform designed for modern mentors, 
              interactive question design, and honest delivery integrity.
            </p>
          </div>

          {/* Quick Platform Links */}
          <div className="footer-links">
            <div className="footer-col">
              <h4>Platform</h4>
              <ul>
                <li><a href="#studio">Question Studio</a></li>
                <li><a href="#workspaces">For Mentors & Students</a></li>
                <li><a href="#security">Assessment Integrity</a></li>
                <li><a href="#join">Classroom Pin</a></li>
              </ul>
            </div>

            {/* Educational & Architectural Resources */}
            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li><a href="/login">Educator Sign In</a></li>
                <li><a href="/signup">Create Free Account</a></li>
                <li><a href="https://github.com/nonydev27/muna" target="_blank" rel="noreferrer">GitHub Repository</a></li>
                <li><a href="https://www.safeexambrowser.org" target="_blank" rel="noreferrer">Safe Exam Browser Docs</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} Muna &bull; Crafted with Wayground-inspired EdTech UX</div>
          <div>React 19 &bull; Vite 8 &bull; Expressive Educational Architecture</div>
        </div>
      </div>
    </footer>
  )
}
