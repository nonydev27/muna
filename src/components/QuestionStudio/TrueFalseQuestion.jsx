/**
 * ============================================================================
 * TrueFalseQuestion Component (Wayground Tactile Binary Decision Cards)
 * ============================================================================
 * Key UI/UX Additions:
 * - Two Large Visual Cards: Replaces standard radios with distinct colorful cards:
 *   - True: Sky Blue (▲)
 *   - False: Coral Red (◆)
 * - 3D Press Interaction: Both cards feature tactile bottom elevation and responsive active states.
 * - Explanatory Feedback Banner: Gives instantaneous educational context explaining
 *   why SEB is an OS-level software rather than a browser extension.
 * ============================================================================
 */

import { useState } from 'react'
import { CheckCircle2, Trophy } from '../../icons'

export default function TrueFalseQuestion() {
  const [tfSelection, setTfSelection] = useState(null)

  return (
    <div className="tf-question-container">
      {/* Question Header & Mastery Badge */}
      <div className="studio-meta-bar">
        <div className="q-badge-row">
          <span className="q-num-pill">Question 5 of 5</span>
          <span className="q-points-badge">⚖️ 5 Points · True or False</span>
        </div>
        <div className="q-meta-feedback">
          <Trophy size={14} /> Instant Mastery Feedback
        </div>
      </div>

      {/* Question Prompt */}
      <h3 className="q-prompt">
        &ldquo;Safe Exam Browser (SEB) operates merely as a lightweight browser extension and requires zero local OS software installation.&rdquo;
      </h3>
      <p className="q-sub-prompt">
        Choose whether this statement is True or False.
      </p>

      {/* Two tactile Wayground-style binary cards */}
      <div className="tf-cards-row">
        {/* True Option Card */}
        <div
          className={`tf-card card-true ${tfSelection === 'true' ? 'selected' : ''}`}
          onClick={() => setTfSelection('true')}
          role="button"
          tabIndex={0}
        >
          <div className="tf-card-symbol">▲</div>
          <div className="tf-card-label">True</div>
          <div className="tf-card-desc">It is just a browser extension</div>
        </div>

        {/* False Option Card */}
        <div
          className={`tf-card card-false ${tfSelection === 'false' ? 'selected' : ''}`}
          onClick={() => setTfSelection('false')}
          role="button"
          tabIndex={0}
        >
          <div className="tf-card-symbol">◆</div>
          <div className="tf-card-label">False</div>
          <div className="tf-card-desc">It is a dedicated OS kiosk desktop app</div>
        </div>
      </div>

      {/* Educational Mastery Feedback Banner */}
      {tfSelection && (
        <div className={`tf-feedback-banner ${tfSelection === 'false' ? 'correct' : 'incorrect'}`}>
          {tfSelection === 'false' ? (
            <div className="feedback-content">
              <CheckCircle2 size={18} />
              <div>
                <strong>Spot on! (+5 Points)</strong> Safe Exam Browser is an OS-level application that 
                locks down secondary monitors, hotkeys, and unauthorized background processes.
              </div>
            </div>
          ) : (
            <div className="feedback-content">
              <span>⚠️</span>
              <div>
                <strong>Almost!</strong> Browser extensions cannot enforce OS-level lockdown (like disabling 
                Alt+Tab or screen recorders). That is why SEB exists as dedicated software.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
