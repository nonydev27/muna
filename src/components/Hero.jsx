/**
 * ============================================================================
 * Hero Section (Wayground EdTech Style)
 * ============================================================================
 * Key UI/UX Additions:
 * - Playful announcement pill with sparkle icon and "Wayground Mode" badge.
 * - Inspiring, learner-centered headline with purple/pink gradient highlight.
 * - Inline "Quick Join Code" Card: Instant assessment join launcher modeled after
 *   Quizizz / Wayground / Kahoot, allowing students to type pins with immediate feedback.
 * - Subject and format discovery tags (Drawing, MCQs, Rubrics, Auto-grading).
 * - Gamified social proof & trust stats strip with custom iconography.
 * ============================================================================
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Zap, Trophy, CheckCircle2, Lock } from '../icons'

export default function Hero() {
  // Local state for the hero's interactive quick code launcher
  const [quickCode, setQuickCode] = useState('')
  const [quickStatus, setQuickStatus] = useState(null)

  /**
   * Handles quick assessment code verification right from the hero section.
   * Simulates classroom lookup for demo purposes.
   */
  const handleQuickJoin = (e) => {
    e.preventDefault()
    if (!quickCode.trim()) return

    if (quickCode.toUpperCase().includes('MUNA') || quickCode.toUpperCase().includes('BRIGHT')) {
      setQuickStatus({
        valid: true,
        message: '🎉 Assessment found! Redirecting to Bright Minds Academy...'
      })
    } else {
      setQuickStatus({
        valid: false,
        message: '⚠️ Code not found. Try "BRIGHT-MINDS" for the demo room.'
      })
    }
  }

  return (
    <section className="hero-section">
      <div className="content-wrap">
        {/* Top Badge: Sparkle indicator & EdTech mode */}
        <div className="hero-pill">
          <Sparkles size={14} className="hero-pill-sparkle" />
          <span>Next-Gen EdTech Assessment Platform</span>
          <span className="hero-pill-tag">Wayground Mode</span>
        </div>

        {/* Hero Headline with Modern Gradient Typography */}
        <h1 className="hero-title">
          Assessments learners love.{' '}
          <span className="hero-highlight">Insights educators trust.</span>
        </h1>

        {/* Value Proposition Description */}
        <p className="hero-sub">
          Move beyond flat multiple-choice quizzes. MUNA turns every evaluation into an engaging, 
          expressive experience—combining freehand drawing canvases, structured rubrics, and gamified 
          questions with resilient real-time autosave.
        </p>

        {/* Wayground-Style Quick Join Card: Prominent Hero Game PIN Input */}
        <div className="hero-join-card">
          <div className="hero-join-label">
            <Zap size={16} /> Have an assessment code or game pin from your mentor?
          </div>
          <form onSubmit={handleQuickJoin} className="hero-join-form">
            <input
              type="text"
              className="hero-join-input"
              placeholder="Enter code (e.g. BRIGHT-MINDS)"
              value={quickCode}
              onChange={(e) => {
                setQuickCode(e.target.value)
                if (quickStatus) setQuickStatus(null)
              }}
            />
            <button type="submit" className="btn btn-join-submit">
              Join Assessment <ArrowRight size={16} />
            </button>
          </form>
          {quickStatus && (
            <div className={`hero-join-status ${quickStatus.valid ? 'success' : 'error'}`}>
              {quickStatus.message}
            </div>
          )}
        </div>

        {/* Primary Call-to-Actions for Educators & Studio Explorers */}
        <div className="hero-cta-group">
          <a className="btn btn-primary btn-lg" href="/signup">
            Start Free as Educator <ArrowRight size={18} />
          </a>
          <a href="#studio" className="btn btn-secondary-solid btn-lg">
            Try Interactive Studio Demo
          </a>
        </div>

        {/* Discovery Subject / Format Chips */}
        <div className="hero-tags-row">
          <span className="hero-tag-chip">🎨 Freehand Drawing Canvas</span>
          <span className="hero-tag-chip">⚡ Multi-Select & Partial Credit</span>
          <span className="hero-tag-chip">📝 Long-Form Rubrics</span>
          <span className="hero-tag-chip">🎯 Instant Auto-Grading</span>
        </div>

        {/* Gamified Trust & Stats Strip */}
        <div className="trust-bar">
          <div className="trust-item">
            <Trophy size={18} className="trust-icon trophy" />
            <div>
              <strong>100% Student-Friendly</strong>
              <span>Calm, distraction-free taking</span>
            </div>
          </div>
          <div className="trust-item">
            <Zap size={18} className="trust-icon zap" />
            <div>
              <strong>Instant Autosave</strong>
              <span>Zero lost answers during drops</span>
            </div>
          </div>
          <div className="trust-item">
            <CheckCircle2 size={18} className="trust-icon check" />
            <div>
              <strong>Transparent Integrity</strong>
              <span>Document visibility auditing</span>
            </div>
          </div>
          <div className="trust-item">
            <Lock size={18} className="trust-icon lock" />
            <div>
              <strong>High-Stakes Kiosk Ready</strong>
              <span>Safe Exam Browser (SEB) ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
