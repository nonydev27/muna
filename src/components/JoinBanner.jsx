/**
 * ============================================================================
 * JoinBanner Component (Wayground Bottom Call-to-Action)
 * ============================================================================
 * Key UI/UX Additions:
 * - High-Impact Gradient Card: Wayground violet-to-aubergine gradient with subtle glow.
 * - Interactive Assessment Code Input: Large, high-visibility PIN field with direct verification.
 * - Quick Test Pin Chips: Students and evaluators can click `BRIGHT-MINDS` or `MUNA-EXP-2026`
 *   to automatically populate the code and test the validation state immediately.
 * - Instant Feedback Card: Confirms organization name and number of active assessments.
 * ============================================================================
 */

import { useState } from 'react'
import { ArrowRight, Zap, CheckCircle2 } from '../icons'

export default function JoinBanner() {
  const [joinCode, setJoinCode] = useState('')
  const [joinStatus, setJoinStatus] = useState(null)

  // Verify classroom code format and simulate lookup
  const handleJoinSubmit = (e) => {
    e.preventDefault()
    if (!joinCode.trim()) return

    if (joinCode.toUpperCase().includes('MUNA') || joinCode.toUpperCase().includes('BRIGHT')) {
      setJoinStatus({
        valid: true,
        orgName: 'Bright Minds Academy',
        slug: 'bright-minds',
        assessments: 3,
      })
    } else {
      setJoinStatus({
        valid: false,
        message: 'Invalid or expired invitation code. Try "BRIGHT-MINDS" for the demo classroom.',
      })
    }
  }

  return (
    <section id="join" className="cta-banner">
      <div className="content-wrap">
        <div className="cta-box">
          {/* Quick Access Badge */}
          <div className="cta-badge">
            <Zap size={14} /> Student Quick Access
          </div>

          <h2 className="cta-heading">Ready to join your classroom?</h2>
          <p className="cta-subheading">
            Enter the invitation token or assessment code provided by your mentor to jump directly into your assigned tests.
          </p>

          {/* Code Input Form */}
          <form onSubmit={handleJoinSubmit} className="code-input-form">
            <div className="code-input-wrapper">
              <input
                type="text"
                className="code-input"
                placeholder="Enter classroom code (e.g. BRIGHT-MINDS)"
                value={joinCode}
                onChange={(e) => {
                  setJoinCode(e.target.value)
                  if (joinStatus) setJoinStatus(null)
                }}
              />
            </div>
            <button type="submit" className="btn btn-join-cta">
              Verify Code <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Code Suggestion Chips */}
          <div className="cta-sample-chips">
            <span className="sample-label">Quick Test Pins:</span>
            <button
              type="button"
              className="chip-btn"
              onClick={() => setJoinCode('BRIGHT-MINDS')}
            >
              BRIGHT-MINDS
            </button>
            <button
              type="button"
              className="chip-btn"
              onClick={() => setJoinCode('MUNA-EXP-2026')}
            >
              MUNA-EXP-2026
            </button>
          </div>

          {/* Dynamic Validation Status Pill */}
          {joinStatus && (
            <div className="cta-status-container">
              {joinStatus.valid ? (
                <div className="cta-status-pill success">
                  <CheckCircle2 size={18} />
                  <span>
                    <strong>{joinStatus.orgName}</strong> verified! {joinStatus.assessments} active assessments waiting for you.
                  </span>
                </div>
              ) : (
                <div className="cta-status-pill error">
                  <span>{joinStatus.message}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
