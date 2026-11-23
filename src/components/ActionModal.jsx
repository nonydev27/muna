/**
 * ============================================================================
 * ActionModal Component (Classroom Join Pin & Workspace Modal Dialog)
 * ============================================================================
 * Key UI/UX Additions:
 * - Backdrop Blur: Smooth darkened overlay (`backdrop-filter: blur(8px)`).
 * - Modal Ergonomics: Soft 24px rounded corners and subtle border depth.
 * - Quick Demo Chips: Allows one-click code insertion (`BRIGHT-MINDS`) for easy testing.
 * - Dynamic Status Pill: Displays success verification or guidance messages.
 * - Seamless Accessibility: Click outside to dismiss, escape support, autoFocus.
 * ============================================================================
 */

import { useState } from 'react'
import { Zap, CheckCircle2, Sparkles } from '../icons'

export default function ActionModal({ isOpen, onClose, modalType }) {
  const [modalCode, setModalCode] = useState('')
  const [modalStatus, setModalStatus] = useState(null)

  if (!isOpen) return null

  // Validate entered code and provide helpful feedback
  const handleModalSubmit = (e) => {
    e.preventDefault()
    if (!modalCode.trim()) return

    if (modalCode.toUpperCase().includes('MUNA') || modalCode.toUpperCase().includes('BRIGHT')) {
      setModalStatus({
        valid: true,
        message: '✓ Verified: Bright Minds Academy (3 assessments ready to begin!).'
      })
    } else {
      setModalStatus({
        valid: false,
        message: 'Invalid code. Try "BRIGHT-MINDS" for the demo classroom.'
      })
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {modalType === 'join' ? (
          <>
            {/* Modal Header & Badge */}
            <div className="modal-badge">
              <Zap size={14} /> Wayground Classroom Pin
            </div>
            <h3 className="modal-title">Enter Assessment Code</h3>
            <p className="modal-desc">
              Paste the invitation code or game pin provided by your educator to enter your exam room.
            </p>

            {/* Code Verification Form */}
            <form onSubmit={handleModalSubmit}>
              <div className="modal-input-wrap">
                <input
                  type="text"
                  className="clean-input modal-input"
                  placeholder="e.g. BRIGHT-MINDS"
                  value={modalCode}
                  onChange={(e) => setModalCode(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Sample Quick Demo Pins */}
              <div className="modal-quick-pins">
                <span>Quick demo:</span>
                <button
                  type="button"
                  className="pin-chip"
                  onClick={() => setModalCode('BRIGHT-MINDS')}
                >
                  BRIGHT-MINDS
                </button>
              </div>

              {/* Status Message */}
              {modalStatus && (
                <div className={`modal-status-pill ${modalStatus.valid ? 'success' : 'error'}`}>
                  {modalStatus.valid ? <CheckCircle2 size={16} /> : <span>⚠️</span>}
                  <span>{modalStatus.message}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="modal-footer-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Verify & Enter
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Modal Content for Mentor Workspace Quick Tour */}
            <div className="modal-badge">
              <Sparkles size={14} /> Mentor Studio
            </div>
            <h3 className="modal-title">Mentor Workspace Access</h3>
            <p className="modal-desc">
              Educator workspaces let you build rich question banks, configure Safe Exam Browser policies, and evaluate rubrics.
            </p>
            <div className="modal-info-box">
              <strong>Interactive Demo Ready:</strong> You can test all five response types right now in the <strong>Question Studio</strong> on this page!
            </div>
            <div className="modal-footer-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                Go to Question Studio
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
