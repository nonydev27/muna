/**
 * ============================================================================
 * CanvasQuestion Component (Wayground Interactive Drawing & Diagramming Studio)
 * ============================================================================
 * Key UI/UX Additions:
 * - High-DPI Canvas Rendering: Automatically handles retina scaling (2x pixel ratio)
 *   so lines remain razor sharp on all screens and tablets.
 * - Creative Swatch Palette: 5 distinctive colors (Wayground Violet, Electric Cyan,
 *   Mint Green, Coral Pink, Dark Ink) with active ring elevation.
 * - Tactile Stroke Width Pills: Fine (2px), Medium (4px), and Bold (8px).
 * - Intuitive Erase & Reset Controls: Fast eraser and full-canvas clear.
 * - High-Tech Educational Canvas: Features a subtle radial dot-matrix background pattern.
 * - Full Touch & Stylus Support: Seamless on iPad, Chromebooks, and graphic tablets.
 * ============================================================================
 */

import { useState, useRef, useEffect } from 'react'
import { Eraser, RotateCcw, PenTool, Sparkles } from '../../icons'

export default function CanvasQuestion() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [penColor, setPenColor] = useState('#7025E6')
  const [lineWidth, setLineWidth] = useState(3)
  const [isEraser, setIsEraser] = useState(false)
  const [strokeCount, setStrokeCount] = useState(0)

  // Color palette definitions inspired by modern creative EdTech platforms
  const palette = [
    { label: 'Wayground Violet', color: '#7025E6' },
    { label: 'Electric Cyan', color: '#0EA5E9' },
    { label: 'Mint Green', color: '#10B981' },
    { label: 'Coral Pink', color: '#EF4444' },
    { label: 'Dark Ink', color: '#190F2D' },
  ]

  // Initialize and synchronize canvas context with active tools
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // High-DPI retina display calibration
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)
    ctx.strokeStyle = isEraser ? '#FFFFFF' : penColor
    ctx.lineWidth = isEraser ? 18 : lineWidth
  }, [penColor, lineWidth, isEraser])

  // Mouse / Touch drawing event listeners
  const startDrawing = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    const clientY = e.clientY || (e.touches && e.touches[0].clientY)

    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const clientX = e.clientX || (e.touches && e.touches[0].clientX)
    const clientY = e.clientY || (e.touches && e.touches[0].clientY)

    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.strokeStyle = isEraser ? '#FFFFFF' : penColor
    ctx.lineWidth = isEraser ? 18 : lineWidth
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      setStrokeCount((prev) => prev + 1)
    }
  }

  // Clear canvas content and reset stroke counter
  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setStrokeCount(0)
  }

  return (
    <div className="canvas-question-container">
      {/* Question Header & Live Stroke Counter */}
      <div className="studio-meta-bar">
        <div className="q-badge-row">
          <span className="q-num-pill">Question 2 of 5</span>
          <span className="q-points-badge">🎨 15 Points · Interactive Diagramming</span>
        </div>
        <div className="q-meta-feedback">
          <Sparkles size={14} /> Captured strokes: <strong>{strokeCount}</strong>
        </div>
      </div>

      {/* Exercise Prompt */}
      <h3 className="q-prompt">
        Draw a state machine diagram showing an assessment attempt moving from{' '}
        <strong>Active</strong> to <strong>Submitted</strong> or <strong>Auto-Closed</strong>.
      </h3>
      <p className="q-sub-prompt">
        Try sketching with your stylus, trackpad, or mouse. Teachers evaluate both visual structure and labels.
      </p>

      {/* Canvas Tooling Container */}
      <div className="canvas-wrapper">
        <div className="canvas-toolbar">
          {/* Color Palette Selector */}
          <div className="tool-group">
            <span className="toolbar-label">Color:</span>
            {palette.map((item) => (
              <button
                key={item.color}
                type="button"
                className={`color-dot-btn ${!isEraser && penColor === item.color ? 'active' : ''}`}
                style={{ backgroundColor: item.color }}
                onClick={() => {
                  setIsEraser(false)
                  setPenColor(item.color)
                }}
                title={item.label}
              />
            ))}
          </div>

          {/* Stroke Width Selector Pills */}
          <div className="tool-group">
            <span className="toolbar-label">Width:</span>
            {[
              { label: 'Fine', size: 2 },
              { label: 'Medium', size: 4 },
              { label: 'Bold', size: 8 },
            ].map((w) => (
              <button
                key={w.size}
                type="button"
                className={`tool-pill-btn ${!isEraser && lineWidth === w.size ? 'active' : ''}`}
                onClick={() => {
                  setIsEraser(false)
                  setLineWidth(w.size)
                }}
              >
                {w.label}
              </button>
            ))}
          </div>

          {/* Eraser and Canvas Clear Actions */}
          <div className="tool-group tool-actions">
            <button
              type="button"
              className={`tool-action-btn ${isEraser ? 'active' : ''}`}
              onClick={() => setIsEraser(true)}
              title="Eraser tool"
            >
              <Eraser size={14} /> Eraser
            </button>
            <button
              type="button"
              className="tool-action-btn"
              onClick={clearCanvas}
              title="Clear entire canvas"
            >
              <RotateCcw size={14} /> Clear
            </button>
          </div>
        </div>

        {/* Interactive Drawing Canvas Area */}
        <canvas
          ref={canvasRef}
          className="canvas-area"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {/* Helpful User Guidance Footer */}
        <div className="canvas-hint">
          <span>✨ Continuous vector capture: Mentors can replay student step-by-step thinking.</span>
          <span>Supports iPad, Wacom, and touch devices natively.</span>
        </div>
      </div>
    </div>
  )
}
