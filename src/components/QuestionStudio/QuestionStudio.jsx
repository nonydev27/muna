/**
 * ============================================================================
 * QuestionStudio Component (Wayground Interactive Learning Playground)
 * ============================================================================
 * Features:
 * - Interactive tabbed switcher representing 5 distinct EdTech response types:
 *   1. Multiple Choice (McqQuestion) — Wayground 4-color grid
 *   2. Freehand Drawing (CanvasQuestion) — Touch/stylus vector diagramming
 *   3. Long-Form Theory (TheoryQuestion) — Split rubric & autosave word counter
 *   4. Short Answer (ShortAnswerQuestion) — Regex & synonym pattern matcher
 *   5. True / False (TrueFalseQuestion) — Tactile binary response cards
 * - Top Gamified Status Bar: Live simulation beacon, autosave sync, and total XP rewards.
 * ============================================================================
 */

import { useState } from 'react'
import { PenTool, FileText, CheckCircle2, HelpCircle, Sparkles, Zap, Trophy } from '../../icons'
import CanvasQuestion from './CanvasQuestion'
import TheoryQuestion from './TheoryQuestion'
import McqQuestion from './McqQuestion'
import ShortAnswerQuestion from './ShortAnswerQuestion'
import TrueFalseQuestion from './TrueFalseQuestion'

export default function QuestionStudio() {
  // Track active question studio preview tab
  const [activeTab, setActiveTab] = useState('mcq')

  // Tab definitions with point values, icons, and signature accent colors
  const tabs = [
    { id: 'mcq', label: 'Multi-Select & MCQ', icon: CheckCircle2, points: '10 Pts', color: 'coral' },
    { id: 'canvas', label: 'Freehand Drawing', icon: PenTool, points: '15 Pts', color: 'cyan' },
    { id: 'theory', label: 'Theory & Rubric', icon: FileText, points: '20 Pts', color: 'purple' },
    { id: 'short', label: 'Short Answer', icon: HelpCircle, points: '5 Pts', color: 'amber' },
    { id: 'tf', label: 'True / False', icon: CheckCircle2, points: '5 Pts', color: 'mint' },
  ]

  return (
    <section id="studio" className="showcase-section">
      <div className="content-wrap">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} /> Wayground-Style Studio
          </div>
          <h2 className="section-title">The First-Class Question Studio</h2>
          <p className="section-desc">
            Test MUNA's expressive response types below. Each format is designed for maximum learner engagement, 
            instant feedback, and seamless teacher grading.
          </p>
        </div>

        {/* Studio Interactive Card */}
        <div className="studio-card">
          {/* Top Gamified Status Bar: Live Taking Indicator & XP Chip */}
          <div className="studio-top-bar">
            <div className="studio-mode-pill">
              <span className="live-dot"></span>
              <span>Live Student View Simulation</span>
            </div>
            <div className="studio-status-tags">
              <span className="status-tag zap">
                <Zap size={14} /> Autosave Synced
              </span>
              <span className="status-tag trophy">
                <Trophy size={14} /> Total: 55 XP
              </span>
            </div>
          </div>

          {/* Navigation Tabs with Tactile Points Badge */}
          <div className="studio-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`studio-tab tab-${tab.color} ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                  <span className="tab-points-chip">{tab.points}</span>
                </button>
              )
            })}
          </div>

          {/* Active Question Response Panel */}
          <div className="studio-panel">
            {activeTab === 'canvas' && <CanvasQuestion />}
            {activeTab === 'theory' && <TheoryQuestion />}
            {activeTab === 'mcq' && <McqQuestion />}
            {activeTab === 'short' && <ShortAnswerQuestion />}
            {activeTab === 'tf' && <TrueFalseQuestion />}
          </div>
        </div>
      </div>
    </section>
  )
}
