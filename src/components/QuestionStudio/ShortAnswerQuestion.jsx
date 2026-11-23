/**
 * ============================================================================
 * ShortAnswerQuestion Component (Pattern & Synonym Matching Studio)
 * ============================================================================
 * Key UI/UX Additions:
 * - Live Pattern Evaluator: Detects acronyms (SEB) or full names (Safe Exam Browser)
 *   in real time as the student types.
 * - Celebratory Feedback Pill: Shows instant success pill with +5 Points on match.
 * - Dynamic Hinting: Provides helpful guidance when the student starts typing.
 * ============================================================================
 */

import { useState } from 'react'
import { CheckCircle2, Sparkles } from '../../icons'

export default function ShortAnswerQuestion() {
  const [shortAnswer, setShortAnswer] = useState('')

  // Determine whether the typed answer matches the key or alias
  const isMatched =
    shortAnswer.toLowerCase().includes('safe exam') || shortAnswer.toLowerCase().trim() === 'seb'

  return (
    <div className="short-question-container">
      {/* Question Header & Points Badge */}
      <div className="studio-meta-bar">
        <div className="q-badge-row">
          <span className="q-num-pill">Question 4 of 5</span>
          <span className="q-points-badge">✍️ 5 Points · Short Answer Pattern Match</span>
        </div>
        <div className="q-meta-feedback">
          <Sparkles size={14} /> AI & Regex Pattern Evaluator
        </div>
      </div>

      {/* Question Prompt */}
      <h3 className="q-prompt">
        What dedicated open-source kiosk software is supported by MUNA for operating-system-level exam lockdown?
      </h3>
      <p className="q-sub-prompt">
        Type your answer below (e.g. acronym or full name). The system matches synonyms automatically.
      </p>

      {/* Styled Short Answer Input */}
      <div className="short-input-wrap">
        <input
          type="text"
          className="short-input"
          placeholder="Type your answer (e.g. SEB or Safe Exam Browser)..."
          value={shortAnswer}
          onChange={(e) => setShortAnswer(e.target.value)}
        />
      </div>

      {/* Interactive Result Feedback Pill */}
      {shortAnswer.trim() && (
        <div className={`short-result-pill ${isMatched ? 'success' : 'pending'}`}>
          {isMatched ? (
            <>
              <CheckCircle2 size={16} />
              <span>
                <strong>Perfect match!</strong> Recognized: Safe Exam Browser (SEB) &bull; +5 Points
              </span>
            </>
          ) : (
            <span>
              Evaluating pattern for &ldquo;{shortAnswer}&rdquo;... Try typing <strong>SEB</strong> or{' '}
              <strong>Safe Exam Browser</strong>.
            </span>
          )}
        </div>
      )}
    </div>
  )
}
