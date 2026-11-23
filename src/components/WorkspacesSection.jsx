/**
 * ============================================================================
 * WorkspacesSection Component (Dual-Persona Architecture)
 * ============================================================================
 * Key UI/UX Additions:
 * - Clear persona separation tailored to both user groups in modern EdTech:
 *   1. "The Mentor Studio" (Teacher Superpowers: question banks, rubrics, cohort analysis)
 *   2. "The Student Assessment Room" (Zero Test Anxiety: autosave, stylus drawing, transparent rules)
 * - Friendly rounded card containers (24px radius) with soft hover lift and colorful badge chips.
 * - Clear, high-contrast action CTAs for both educators and students.
 * ============================================================================
 */

import { Award, Users, CheckCircle2, Sparkles, Zap } from '../icons'

export default function WorkspacesSection() {
  return (
    <section id="workspaces" className="roles-section">
      <div className="content-wrap">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Dual-Experience Architecture
          </div>
          <h2 className="section-title">Built for Inspiring Mentors. Loved by Focused Learners.</h2>
          <p className="section-desc">
            Organisations are dedicated spaces where educators design meaningful assessments 
            and students demonstrate authentic mastery without test anxiety.
          </p>
        </div>

        {/* Roles 2-Column Grid */}
        <div className="roles-grid">
          {/* Persona Card 1: For Mentors & Educators */}
          <div className="role-card role-mentor">
            <div className="role-header">
              <div className="role-badge mentor-badge">
                <Award size={14} /> For Educators & Mentors
              </div>
              <span className="role-tag">Teacher Superpowers</span>
            </div>
            
            <h3 className="role-title">The Mentor Studio</h3>
            <p className="role-desc">
              Everything required to orchestrate, evaluate, and track cohort growth without grading fatigue.
            </p>

            <div className="role-features">
              <div className="role-feature-item">
                <div className="feature-icon-wrap mentor">
                  <CheckCircle2 size={16} />
                </div>
                <span><strong>Expressive Question Bank:</strong> Tag topics, difficulty tiers, and interactive drawings</span>
              </div>
              <div className="role-feature-item">
                <div className="feature-icon-wrap mentor">
                  <CheckCircle2 size={16} />
                </div>
                <span><strong>Rubric Grading Queue:</strong> Score long-form submissions with point criteria and quick notes</span>
              </div>
              <div className="role-feature-item">
                <div className="feature-icon-wrap mentor">
                  <CheckCircle2 size={16} />
                </div>
                <span><strong>Cohort Analytics & CSV Exports:</strong> Track item difficulty and student progress at a glance</span>
              </div>
              <div className="role-feature-item">
                <div className="feature-icon-wrap mentor">
                  <CheckCircle2 size={16} />
                </div>
                <span><strong>Flexible Attempt Grants:</strong> Server-controlled retries and honest focus audit logs</span>
              </div>
            </div>

            <div className="role-action-wrap">
              <a className="btn btn-primary" href="/signup">
                Launch Mentor Studio
              </a>
              <span className="role-footnote">Free for schools & mentors &bull; No credit card needed</span>
            </div>
          </div>

          {/* Persona Card 2: For Students & Learners */}
          <div className="role-card role-student">
            <div className="role-header">
              <div className="role-badge student-badge">
                <Users size={14} /> For Students & Learners
              </div>
              <span className="role-tag">Zero Test Anxiety</span>
            </div>

            <h3 className="role-title">The Student Assessment Room</h3>
            <p className="role-desc">
              A serene, beautifully responsive environment designed to respect effort and showcase knowledge.
            </p>

            <div className="role-features">
              <div className="role-feature-item">
                <div className="feature-icon-wrap student">
                  <Zap size={16} />
                </div>
                <span><strong>Real-Time Autosave:</strong> Uninterrupted progress even if your WiFi flickers for a minute</span>
              </div>
              <div className="role-feature-item">
                <div className="feature-icon-wrap student">
                  <Zap size={16} />
                </div>
                <span><strong>Touch & Stylus Drawing:</strong> Sketch diagrams, graphs, and math formulas with ease</span>
              </div>
              <div className="role-feature-item">
                <div className="feature-icon-wrap student">
                  <Zap size={16} />
                </div>
                <span><strong>Clear Upfront Guidelines:</strong> Device readiness check and transparent time limits</span>
              </div>
              <div className="role-feature-item">
                <div className="feature-icon-wrap student">
                  <Zap size={16} />
                </div>
                <span><strong>Instant Submission Receipts:</strong> Digital timestamp and receipt proof for peace of mind</span>
              </div>
            </div>

            <div className="role-action-wrap">
              <a className="btn btn-secondary-solid" href="/signup?role=mentee">
                Join as Student
              </a>
              <span className="role-footnote">Works on any Chromebook, iPad, Mac, or PC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
