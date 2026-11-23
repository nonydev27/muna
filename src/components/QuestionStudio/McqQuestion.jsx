/**
 * ============================================================================
 * McqQuestion Component (Wayground 4-Color Quiz Grid)
 * ============================================================================
 * Key UI/UX Additions:
 * - Replaces dull radio checkboxes with Wayground's iconic 4-color interactive cards:
 *   Option 1 (▲ Coral Red), Option 2 (◆ Ocean Sky), Option 3 (● Amber Yellow), Option 4 (■ Mint Green).
 * - Tactile 3D bottom border shadow that depresses smoothly when clicked.
 * - Dynamic partial credit scoring bar: Calculates real-time correct vs. incorrect selections.
 * - Educational hint pill: Explains why web-based visibility APIs differ from webcam proctoring.
 * - Full accessibility: Includes keyboard selection (Space / Enter) and ARIA button roles.
 * ============================================================================
 */

import { useState } from 'react'
import { CheckCircle2, Zap } from '../../icons'

export default function McqQuestion() {
  // Pre-select two correct options to demonstrate active interactive state
  const [selectedMcq, setSelectedMcq] = useState(['tab', 'min'])

  // 4 Wayground-styled options with geometry symbols (▲, ◆, ●, ■) and colors
  const options = [
    { id: 'tab', symbol: '▲', color: 'coral', text: 'Switching to another browser tab', isCorrect: true },
    { id: 'min', symbol: '◆', color: 'sky', text: 'Minimizing the browser window', isCorrect: true },
    { id: 'mobile', symbol: '●', color: 'amber', text: 'Switching apps on a mobile device', isCorrect: true },
    { id: 'eye', symbol: '■', color: 'mint', text: 'Looking away from the physical webcam', isCorrect: false },
  ]

  // Toggle selection state for multi-select response
  const toggleMcq = (id) => {
    setSelectedMcq((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Calculate live partial credit statistics
  const correctSelected = selectedMcq.filter((id) =>
    options.find((o) => o.id === id)?.isCorrect
  ).length
  const incorrectSelected = selectedMcq.filter((id) =>
    !options.find((o) => o.id === id)?.isCorrect
  ).length

  return (
    <div className="mcq-container">
      {/* Question Header & Points Breakdown */}
      <div className="studio-meta-bar">
        <div className="q-badge-row">
          <span className="q-num-pill">Question 1 of 5</span>
          <span className="q-points-badge">⚡ 10 Points · Multiple Select</span>
          <span className="q-type-pill">Partial Credit Allowed</span>
        </div>
        <div className="q-meta-feedback">
          <Zap size={14} /> Auto-scored instantly
        </div>
      </div>

      {/* Question Prompt */}
      <h3 className="q-prompt">
        Which of the following events are reliably captured by the standard W3C Page Visibility API?
      </h3>
      <p className="q-sub-prompt">
        Select all options that apply. Notice how each option provides instant tactile feedback.
      </p>

      {/* Iconic Wayground 4-Color Answer Card Grid */}
      <div className="wayground-grid">
        {options.map((opt) => {
          const isSelected = selectedMcq.includes(opt.id)
          return (
            <div
              key={opt.id}
              className={`wayground-card card-${opt.color} ${isSelected ? 'selected' : ''}`}
              onClick={() => toggleMcq(opt.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  toggleMcq(opt.id)
                }
              }}
            >
              <div className="card-badge">
                <span className="card-symbol">{opt.symbol}</span>
                {isSelected && (
                  <span className="card-check">
                    <CheckCircle2 size={16} />
                  </span>
                )}
              </div>
              <div className="card-text">{opt.text}</div>
            </div>
          )
        })}
      </div>

      {/* Dynamic Feedback Banner with Partial Credit Counter */}
      <div className="mcq-score-bar">
        <div className="score-summary">
          <strong>{selectedMcq.length}</strong> of 4 options selected &bull;{' '}
          <span className="score-positive">{correctSelected} correct detected</span>
          {incorrectSelected > 0 && (
            <span className="score-negative"> &bull; {incorrectSelected} outside MVP scope</span>
          )}
        </div>
        {selectedMcq.includes('eye') && (
          <div className="hint-pill">
            💡 <em>Did you know?</em> Web-only APIs track window/document focus, not webcam eye gazes.
          </div>
        )}
      </div>
    </div>
  )
}
