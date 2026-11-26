import { useMemo, useState } from 'react'
import './Assessments.css'

const sampleMentees = [
  { id: 'M-001', name: 'Amara Okafor', email: 'amara@example.com' },
  { id: 'M-002', name: 'Daniel Mensah', email: 'daniel@example.com' },
  { id: 'M-003', name: 'Sofia Chen', email: 'sofia@example.com' },
  { id: 'M-004', name: 'Kwame Boateng', email: 'kwame@example.com' },
  { id: 'M-005', name: 'Priya Patel', email: 'priya@example.com' },
]

const statusClass = {
  Draft: 'assessment-status-draft',
  Published: 'assessment-status-published',
  Paused: 'assessment-status-paused',
}

function initialsFor(name) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
}

function newAssessmentForm() {
  return { title: '', description: '', questionIds: [], menteeIds: [], maxAttempts: '3' }
}

export default function Assessments({ questions, assessments, onAssessmentsChange, search }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(newAssessmentForm)
  const [formError, setFormError] = useState('')

  const filteredAssessments = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return assessments
    return assessments.filter((assessment) => {
      const assignedNames = assessment.menteeIds
        .map((menteeId) => sampleMentees.find((mentee) => mentee.id === menteeId)?.name || '')
        .join(' ')
      return `${assessment.title} ${assessment.description} ${assignedNames}`.toLowerCase().includes(query)
    })
  }, [assessments, search])

  const publishedCount = assessments.filter((assessment) => assessment.status === 'Published').length
  const draftCount = assessments.filter((assessment) => assessment.status === 'Draft').length

  function toggleSelection(field, id) {
    setForm((current) => ({
      ...current,
      [field]: current[field].includes(id)
        ? current[field].filter((selectedId) => selectedId !== id)
        : [...current[field], id],
    }))
    setFormError('')
  }

  function createAssessment(event) {
    event.preventDefault()
    if (!form.title.trim()) {
      setFormError('Add an assessment title.')
      return
    }
    if (form.questionIds.length === 0) {
      setFormError('Choose at least one question from the question bank.')
      return
    }
    if (form.menteeIds.length === 0) {
      setFormError('Assign the assessment to at least one mentee.')
      return
    }

    onAssessmentsChange((current) => [{
      id: `AS-${Date.now().toString(36).toUpperCase()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      questionIds: [...form.questionIds],
      menteeIds: [...form.menteeIds],
      maxAttempts: Number(form.maxAttempts),
      status: 'Draft',
      createdAt: new Date().toISOString(),
    }, ...current])
    setForm(newAssessmentForm())
    setFormError('')
    setModalOpen(false)
  }

  function togglePublishedState(assessment) {
    const status = assessment.status === 'Published' ? 'Paused' : 'Published'
    onAssessmentsChange((current) => current.map((item) => item.id === assessment.id ? { ...item, status } : item))
  }

  function closeModal() {
    setModalOpen(false)
    setForm(newAssessmentForm())
    setFormError('')
  }

  return (
    <div className="assessments-view">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">ASSESSMENT DELIVERY</p>
          <h1>Assessments</h1>
          <p className="subheading">Build from your question bank, assign mentees, and control availability.</p>
        </div>
        <button className="button button-primary" onClick={() => setModalOpen(true)}>+ Create assessment</button>
      </div>

      <div className="assessment-stats">
        <section className="panel assessment-stat"><span>All assessments</span><strong>{assessments.length}</strong></section>
        <section className="panel assessment-stat"><span>Published</span><strong>{publishedCount}</strong></section>
        <section className="panel assessment-stat"><span>Drafts</span><strong>{draftCount}</strong></section>
      </div>

      <div className="assessment-attempt-note" role="note">
        <strong>Attempt limit:</strong> New assessments allow up to <strong>3 attempts per mentee</strong> by default. Choose 1–3 attempts when creating an assessment.
      </div>

      <section className="panel assessment-list-panel">
        <div className="panel-heading">
          <div><h2>Your assessments</h2><p>Publishing makes an assessment available to its assigned mentees. Pause it to stop new attempts.</p></div>
        </div>
        {filteredAssessments.length > 0 ? <div className="assessment-list">
          {filteredAssessments.map((assessment) => {
            const assignedMentees = assessment.menteeIds
              .map((menteeId) => sampleMentees.find((mentee) => mentee.id === menteeId))
              .filter(Boolean)
            const questionPrompts = assessment.questionIds
              .map((questionId) => questions.find((question) => question.id === questionId)?.prompt)
              .filter(Boolean)

            return (
              <article className="assessment-row" key={assessment.id}>
                <div className="assessment-main">
                  <div className="assessment-title-line"><h3>{assessment.title}</h3><span className={`assessment-status ${statusClass[assessment.status]}`}>{assessment.status}</span></div>
                  {assessment.description && <p className="assessment-description">{assessment.description}</p>}
                  <span className="assessment-question-count">{assessment.questionIds.length} questions</span>
                  <div className="assessment-question-preview">{assessment.questionIds.slice(0, 2).map((questionId) => {
                    const question = questions.find((item) => item.id === questionId)
                    return question && <span key={question.id}>{question.prompt}</span>
                  })}{questionPrompts.length > 2 && <span>+{questionPrompts.length - 2} more</span>}</div>
                </div>
                <div className="assessment-assignees">
                  <span className="assessment-column-label">ASSIGNED TO</span>
                  <div className="assessment-mentee-avatars" aria-label={`${assignedMentees.length} assigned mentees`}>
                    {assignedMentees.slice(0, 4).map((mentee) => <span className="assessment-mentee-avatar" key={mentee.id} title={mentee.name}>{initialsFor(mentee.name)}</span>)}
                    {assignedMentees.length > 4 && <span className="assessment-mentee-more">+{assignedMentees.length - 4}</span>}
                  </div>
                  <span className="assessment-assignee-names">{assignedMentees.length === 1 ? assignedMentees[0].name : `${assignedMentees.length} mentees`}</span>
                </div>
                <div className="assessment-attempts">
                  <span className="assessment-column-label">ATTEMPTS / MENTEE</span>
                  <strong>{assessment.maxAttempts}</strong><span>maximum</span>
                </div>
                <div className="assessment-actions">
                  {assessment.status === 'Draft'
                    ? <button className="button button-primary assessment-action-button" onClick={() => togglePublishedState(assessment)}>Publish</button>
                    : <button className="button button-secondary assessment-action-button" onClick={() => togglePublishedState(assessment)}>{assessment.status === 'Published' ? 'Pause' : 'Resume'}</button>}
                </div>
              </article>
            )
          })}
        </div> : <div className="assessment-empty">
          <span className="assessment-empty-mark">A</span>
          <strong>{assessments.length ? 'No assessments match your search.' : 'No assessments yet'}</strong>
          <p>{assessments.length ? 'Try another title or mentee name.' : 'Create an assessment using questions from your question bank.'}</p>
          {!assessments.length && <button className="button button-primary" onClick={() => setModalOpen(true)}>Create your first assessment</button>}
        </div>}
      </section>

      <p className="assessment-data-note">Mentee names are sample workspace data. Assessment changes are kept in this dashboard session.</p>

      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal() }}>
        <section className="modal-card assessment-modal" role="dialog" aria-modal="true" aria-labelledby="create-assessment-title">
          <div className="modal-heading">
            <div><p className="eyebrow">ASSESSMENT BUILDER</p><h2 id="create-assessment-title">Create assessment</h2></div>
            <button className="icon-button" onClick={closeModal} aria-label="Close">×</button>
          </div>
          <form onSubmit={createAssessment}>
            <label className="form-label">Assessment title<input autoFocus maxLength="120" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="e.g. Algebra foundations" /></label>
            <label className="form-label">Instructions <span className="assessment-optional">(optional)</span><textarea rows="2" maxLength="1000" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Tell mentees what to expect..." /></label>
            <label className="form-label">Maximum attempts per mentee<select value={form.maxAttempts} onChange={(event) => setForm({ ...form, maxAttempts: event.target.value })}><option value="3">3 attempts — default</option><option value="2">2 attempts</option><option value="1">1 attempt</option></select></label>
            <fieldset className="assessment-choice-group">
              <legend>Choose questions <span>{form.questionIds.length} selected</span></legend>
              {questions.length ? questions.map((question) => <label className={`assessment-choice ${form.questionIds.includes(question.id) ? 'assessment-choice-selected' : ''}`} key={question.id}><input type="checkbox" checked={form.questionIds.includes(question.id)} onChange={() => toggleSelection('questionIds', question.id)} /><span><strong>{question.prompt}</strong><small>{question.options.length} options</small></span></label>) : <p className="assessment-choice-empty">Add questions to the question bank before creating an assessment.</p>}
            </fieldset>
            <fieldset className="assessment-choice-group">
              <legend>Assign to mentees <span>{form.menteeIds.length} selected</span></legend>
              {sampleMentees.map((mentee) => <label className={`assessment-choice ${form.menteeIds.includes(mentee.id) ? 'assessment-choice-selected' : ''}`} key={mentee.id}><input type="checkbox" checked={form.menteeIds.includes(mentee.id)} onChange={() => toggleSelection('menteeIds', mentee.id)} /><span><strong>{mentee.name}</strong><small>{mentee.email}</small></span></label>)}
            </fieldset>
            <p className="assessment-draft-note">This creates a draft. Review the selected questions and mentees, then publish it to make it available.</p>
            {formError && <p className="inline-message error-message" role="alert">{formError}</p>}
            <div className="modal-actions"><button type="button" className="button button-secondary" onClick={closeModal}>Cancel</button><button type="submit" className="button button-primary">Create draft</button></div>
          </form>
        </section>
      </div>}
    </div>
  )
}
