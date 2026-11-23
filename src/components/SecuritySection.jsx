/**
 * ============================================================================
 * SecuritySection Component (Honest, Layered Assessment Integrity)
 * ============================================================================
 * Key UI/UX Additions:
 * - Reframes harsh "anti-cheat proctoring" surveillance language into inspiring
 *   "Trust & Assessment Integrity" standards.
 * - 3 Dedicated Architectural Pillar Cards:
 *   1. Standard Web Mode (Zero software install, polite exit detection, W3C visibility events)
 *   2. Safe Exam Browser (High-Stakes Kiosk Mode for institutional exams, screen recording protection)
 *   3. Server-Side Attempt Engine (Cloud timer authority, 3 attempts rule, idempotent autosaves)
 * - Colorful icon boxes, feature badges, and clear green checklist items.
 * ============================================================================
 */

import { Eye, Lock, Layers, CheckCircle2, ShieldCheck } from '../icons'

export default function SecuritySection() {
  return (
    <section id="security" className="security-section">
      <div className="content-wrap">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <ShieldCheck size={14} /> Trust & Assessment Integrity
          </div>
          <h2 className="section-title">Honest, Layered Assessment Security</h2>
          <p className="section-desc">
            We never market invasive spyware illusions. MUNA balances transparent learner respect 
            with server-authoritative integrity and open standards.
          </p>
        </div>

        {/* 3-Pillar Security Architecture Grid */}
        <div className="security-grid">
          {/* Pillar 1: Standard Web Mode (Zero Install) */}
          <div className="sec-card sec-web">
            <div className="sec-card-top">
              <div className="sec-icon-box sec-icon-web">
                <Eye size={24} />
              </div>
              <span className="sec-badge-pill">Zero Install</span>
            </div>
            <h3>Standard Web Mode</h3>
            <p>
              Runs seamlessly in Chrome, Firefox, Safari, and Edge. Respects student privacy 
              while auditing window focus lifecycle events.
            </p>
            <ul className="sec-list">
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Full-screen session with polite exit detection</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>W3C Page Visibility lifecycle logged transparently</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Configurable focus-loss threshold rules</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Answer keys never exposed to client-side code</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Safe Exam Browser (High Stakes Kiosk) */}
          <div className="sec-card sec-seb">
            <div className="sec-card-top">
              <div className="sec-icon-box sec-icon-seb">
                <Lock size={24} />
              </div>
              <span className="sec-badge-pill">High-Stakes Kiosk</span>
            </div>
            <h3>Safe Exam Browser (SEB)</h3>
            <p>
              For proctored institutional exams. Native integration with Safe Exam Browser 
              to provide genuine OS-level lockdown and screen guard.
            </p>
            <ul className="sec-list">
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Restricts second monitors and virtual environments</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Blocks screen recorders, Discord, and external chats</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Cryptographically signed configuration keys</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Automatic pre-exam hardware compatibility audit</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Server-Authoritative Cloud Engine */}
          <div className="sec-card sec-engine">
            <div className="sec-card-top">
              <div className="sec-icon-box sec-icon-engine">
                <Layers size={24} />
              </div>
              <span className="sec-badge-pill">Cloud Authority</span>
            </div>
            <h3>Server-Side Attempt Engine</h3>
            <p>
              True integrity lives in immutable database records and backend clock authority—never 
              in vulnerable browser Javascript variables.
            </p>
            <ul className="sec-list">
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Default limit of 3 attempts per mentee / assessment</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Server-authoritative countdown timer</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Idempotent autosaves protect against packet loss</span>
              </li>
              <li className="sec-list-item">
                <CheckCircle2 size={16} />
                <span>Audited mentor overrides for emergency re-grants</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
