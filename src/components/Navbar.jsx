/**
 * ============================================================================
 * Navbar Component (Wayground EdTech Style)
 * ============================================================================
 * Features:
 * - Brand identity with vibrant purple gradient icon and modern typography.
 * - Sticky glassmorphic backdrop for smooth scrolling.
 * - Dedicated "Enter Code" button with 3D tactile press styling, allowing students
 *   to quickly access an assessment from anywhere on the page.
 * - Responsive action buttons for Login and Signup.
 * ============================================================================
 */

import { Sparkles, Zap } from '../icons'

export default function Navbar({ onOpenModal }) {
  return (
    <header className="navbar">
      <div className="content-wrap nav-content">
        {/* Brand Group with Sparkles Logo & Platform Tagline */}
        <a href="/" className="brand-group" aria-label="Muna Learning Home">
          <div className="brand-icon-box">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="brand-title">MUNA</div>
            <div className="brand-tag">Interactive Learning & Assessment</div>
          </div>
        </a>

        {/* Primary Desktop Navigation Links */}
        <nav className="nav-links">
          <a href="#studio" className="nav-link">Interactive Studio</a>
          <a href="#workspaces" className="nav-link">For Educators & Students</a>
          <a href="#security" className="nav-link">Assessment Integrity</a>
          <a href="#join" className="nav-link">Join Code</a>
        </nav>

        {/* Top-Right Action Controls */}
        <div className="nav-actions">
          {/* Wayground-style quick PIN trigger button */}
          <button
            type="button"
            className="btn btn-code-badge"
            onClick={() => onOpenModal('join')}
            title="Enter classroom pin or invite code"
          >
            <Zap size={15} />
            <span>Enter Code</span>
          </button>
          
          <a className="btn btn-outline" href="/login">Log in</a>
          <a className="btn btn-primary" href="/signup">
            Sign up free
          </a>
        </div>
      </div>
    </header>
  )
}
