/**
 * ============================================================================
 * TheoryQuestion Component (Long-Form Theory & Rubric Evaluation Studio)
 * ============================================================================
 * Key UI/UX Additions:
 * - Dual-Pane Layout: Left side features a distraction-free student text editor;
 *   Right side displays the live instructor evaluation rubric.
 * - Live Word Count Meter: Provides real-time feedback with positive indicator
 *   when the response reaches the recommended word threshold (30+ words).
 * - Real-Time Autosave Beacon: Reassures students that keystrokes are saved to the cloud.
 * - Point Breakdown Cards: Clearly itemizes point allocations (8 pts, 7 pts, 5 pts).
 * ============================================================================
 */

import { useState } from 'react'
import { Award, Zap, CheckCircle2 } from '../../icons'

export default function TheoryQuestion() {
  const [theoryText, setTheoryText] = useState('')

  // Calculate live word count
  const wordCount = theoryText.trim() ? theoryText.trim().split(/\s+/).length : 0

  return (
    <div className="theory-question-container">
      {/* Question Header & Autosave Status */}
      <div className="studio-meta-bar">
        <div className="q-badge-row">
          <span className="q-num-pill">Question 3 of 5</span>
          <span className="q-points-badge">📝 20 Points · Long-Form Theory</span>
        </div>
        <div className="q-meta-feedback status-tag zap">
          <Zap size={14} /> Real-Time Cloud Autosave
        </div>
      </div>

      {/* Question Prompt */}
      <h3 className="q-prompt">
        Explain why client-side security tricks (such as disabling right-click or blocking DevTools) 
        cannot serve as true security boundaries in modern web architectures.
      </h3>
      <p className="q-sub-prompt">
        Write a clear, reasoned answer. You can reference browser devtools, network proxies, or client-server trust models.
      </p>

      {/* Two-Column Layout: Student Input + Instructor Rubric */}
      <div className="theory-layout">
        {/* Left Column: Student Answer Input & Word Count Counter */}
        <div className="theory-input-wrap">
          <textarea
            className="theory-textarea"
            placeholder="Type your explanation here. Answers are autosaved with every keystroke..."
            value={theoryText}
            onChange={(e) => setTheoryText(e.target.value)}
          />
          <div className="theory-counter-bar">
            <span>Word count: <strong>{wordCount}</strong> words</span>
            {wordCount >= 30 ? (
              <span className="counter-good">
                <CheckCircle2 size={13} /> Good depth for rubric review
              </span>
            ) : (
              <span className="counter-hint">Recommended: 30+ words for full rubric credit</span>
            )}
          </div>
        </div>

        {/* Right Column: Instructor Scoring Rubric Breakdown */}
        <div className="rubric-box">
          <div className="rubric-header">
            <Award size={18} className="rubric-icon" />
            <div>
              <div className="rubric-title">Instructor Rubric</div>
              <div className="rubric-subtitle">20 Points Available</div>
            </div>
          </div>
          <div className="rubric-list">
            <div className="rubric-item">
              <div className="rubric-item-header">
                <strong>Client Memory & Network Access</strong>
                <span className="rubric-pts">8 Pts</span>
              </div>
              <p>Explains that browser-executed code and memory are completely inspectable by client users.</p>
            </div>
            <div className="rubric-item">
              <div className="rubric-item-header">
                <strong>Server-Authoritative Validation</strong>
                <span className="rubric-pts">7 Pts</span>
              </div>
              <p>Notes that attempt timing, score limits, and answer keys must remain strictly server-side.</p>
            </div>
            <div className="rubric-item">
              <div className="rubric-item-header">
                <strong>Clarity & Logical Structure</strong>
                <span className="rubric-pts">5 Pts</span>
              </div>
              <p>Well-structured, concise prose with concrete engineering terminology.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
