import { useMemo, useRef, useState } from 'react'
import './App.css'

// Demo records keep the dashboard populated until it is connected to a data service.
const initialQuestions = [
  { id: 'Q-104', prompt: 'Which process converts sunlight into chemical energy?', options: ['Respiration', 'Photosynthesis', 'Fermentation', 'Transpiration'], correctAnswer: 'Photosynthesis', status: 'Published' },
  { id: 'Q-103', prompt: 'What is the value of x in 3x + 5 = 20?', options: ['3', '5', '7', '15'], correctAnswer: '5', status: 'Published' },
  { id: 'Q-102', prompt: 'Which layer of the atmosphere contains the ozone layer?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], correctAnswer: 'Stratosphere', status: 'Published' },
  { id: 'Q-101', prompt: 'What is the smallest prime number?', options: ['0', '1', '2', '3'], correctAnswer: '2', status: 'Published' },
]

const initialAnswers = [
  { id: 'A-2381', student: 'Amara Okafor', initials: 'AO', question: 'Photosynthesis and energy', answer: 'Photosynthesis', score: '9 / 10', submitted: 'Today, 10:42 AM', status: 'Needs review' },
  { id: 'A-2380', student: 'Daniel Mensah', initials: 'DM', question: 'Algebra fundamentals', answer: 'x = 5; I subtracted 5 from both sides, then divided by 3.', score: '8 / 10', submitted: 'Today, 10:35 AM', status: 'Needs review' },
  { id: 'A-2379', student: 'Sofia Chen', initials: 'SC', question: 'Photosynthesis and energy', answer: 'Photosynthesis', score: '10 / 10', submitted: 'Today, 10:20 AM', status: 'Reviewed' },
  { id: 'A-2378', student: 'Kwame Boateng', initials: 'KB', question: 'Earth science review', answer: 'The stratosphere contains most of the ozone layer.', score: '7 / 10', submitted: 'Today, 9:58 AM', status: 'Needs review' },
  { id: 'A-2377', student: 'Priya Patel', initials: 'PP', question: 'Algebra fundamentals', answer: '5', score: '10 / 10', submitted: 'Today, 9:41 AM', status: 'Reviewed' },
]

const initialFlags = [
  { id: 'F-021', student: 'Jordan Lee', initials: 'JL', assessment: 'Algebra fundamentals', signal: 'Unusually similar answer to another submission', detail: 'Submitted 18 seconds apart', level: 'Review' },
  { id: 'F-020', student: 'Fatima Yusuf', initials: 'FY', assessment: 'Earth science review', signal: 'Multiple answers submitted in an unusually short time', detail: '4 answers in 22 seconds', level: 'Review' },
  { id: 'F-019', student: 'Ethan Williams', initials: 'EW', assessment: 'Photosynthesis and energy', signal: 'Repeated page focus changes during assessment', detail: '12 focus changes recorded', level: 'Review' },
]

const navigation = [
  { label: 'Overview', icon: 'grid' },
  { label: 'Question bank', icon: 'book' },
  { label: 'Answer review', icon: 'check' },
  { label: 'Integrity flags', icon: 'shield' },
]

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" /><path d="M4 5.5v13A2.5 2.5 0 0 1 6.5 16H20M8 7h8M8 10h8" /></>,
    check: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11" /><path d="m9 12 2 2 4-4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5M12 3v12" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    alert: <><path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4m0 4h.01" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8m-8 4h8" /></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function initialsFor(name) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
}

function App() {
  const [activeView, setActiveView] = useState('Overview')
  const [questions, setQuestions] = useState(initialQuestions)
  const [answers, setAnswers] = useState(initialAnswers)
  const [flags, setFlags] = useState(initialFlags)
  const [search, setSearch] = useState('')
  const [answerFilter, setAnswerFilter] = useState('All submissions')
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [questionModalOpen, setQuestionModalOpen] = useState(false)
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [newQuestion, setNewQuestion] = useState({ prompt: '', options: ['', '', '', ''], correctAnswer: '' })
  const fileInput = useRef(null)

  const pendingAnswers = answers.filter((answer) => answer.status === 'Needs review').length
  const unresolvedFlags = flags.filter((flag) => flag.level === 'Review').length
  const filteredAnswers = useMemo(() => answers.filter((answer) => {
    const matchesFilter = answerFilter === 'All submissions' || answer.status === answerFilter
    const matchesSearch = `${answer.student} ${answer.question} ${answer.answer}`.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  }), [answers, answerFilter, search])
  const filteredQuestions = useMemo(() => questions.filter((question) => `${question.prompt} ${question.id}`.toLowerCase().includes(search.toLowerCase())), [questions, search])
  const filteredFlags = useMemo(() => flags.filter((flag) => `${flag.student} ${flag.assessment} ${flag.signal}`.toLowerCase().includes(search.toLowerCase())), [flags, search])

  function parseQuestionFile(text) {
    const parsed = JSON.parse(text)
    // Support both a plain array and an exported object with a questions array.
    const items = Array.isArray(parsed) ? parsed : parsed.questions
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('The JSON file must contain a non-empty array of questions.')
    }

    return items.map((item, index) => {
      const prompt = item.question || item.prompt
      if (typeof prompt !== 'string' || !prompt.trim()) {
        throw new Error(`Question ${index + 1} needs a question or prompt field.`)
      }
      if (!Array.isArray(item.options) || item.options.length < 2 || item.options.some((option) => typeof option !== 'string' || !option.trim())) {
        throw new Error(`Question ${index + 1} needs at least two non-empty options.`)
      }
      if (typeof item.correctAnswer !== 'string' || !item.correctAnswer.trim()) {
        throw new Error(`Question ${index + 1} needs a correctAnswer field.`)
      }
      return {
        id: `Q-${Date.now()}-${index + 1}`,
        prompt: prompt.trim(),
        options: item.options,
        correctAnswer: item.correctAnswer.trim(),
        status: 'Published',
      }
    })
  }

  async function handleQuestionUpload(event) {
    const file = event.target.files && event.target.files[0]
    if (!file) return
    setUploadError('')
    setUploadMessage('')
    try {
      const importedQuestions = parseQuestionFile(await file.text())
      setQuestions((current) => [...importedQuestions, ...current])
      setUploadMessage(`${importedQuestions.length} question${importedQuestions.length === 1 ? '' : 's'} uploaded successfully.`)
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'The question file could not be read.')
    } finally {
      event.target.value = ''
    }
  }

  function downloadTemplate() {
    const template = [{ question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correctAnswer: '4' }]
    const url = URL.createObjectURL(new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'muna-questions-template.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  function addQuestion(event) {
    event.preventDefault()
    const question = {
      id: `Q-${Date.now()}`,
      prompt: newQuestion.prompt.trim(),
      options: newQuestion.options.map((option) => option.trim()),
      correctAnswer: newQuestion.correctAnswer.trim(),
      status: 'Published',
    }
    setQuestions((current) => [question, ...current])
    setNewQuestion({ prompt: '', options: ['', '', '', ''], correctAnswer: '' })
    setQuestionModalOpen(false)
    setUploadMessage('Question added to the question bank.')
  }

  function markAnswerReviewed(answerId) {
    setAnswers((current) => current.map((answer) => answer.id === answerId ? { ...answer, status: 'Reviewed' } : answer))
    setSelectedAnswer(null)
  }

  function markFlagReviewed(flagId) {
    // Reviewing a signal records the admin's review; it does not establish misconduct.
    setFlags((current) => current.map((flag) => flag.id === flagId ? { ...flag, level: 'Reviewed' } : flag))
  }

  function renderOverview() {
    return (
      <>
        <div className="welcome-row">
          <div><p className="eyebrow">MONDAY, NOVEMBER 23, 2026</p><h1>Good morning, Alex <span>✦</span></h1><p className="subheading">Here&apos;s what&apos;s happening with your assessments today.</p></div>
          <button className="button button-primary" onClick={() => { setActiveView('Question bank'); setQuestionModalOpen(true) }}><Icon name="plus" size={17} /> Create question</button>
        </div>
        <div className="stat-grid">
          <StatCard label="Total students" value="1,248" change="+12.8%" icon="users" tone="blue" caption="vs. last month" />
          <StatCard label="Questions in bank" value={questions.length.toLocaleString()} change="Across 8 topics" icon="book" tone="purple" />
          <StatCard label="Awaiting review" value={pendingAnswers.toString().padStart(2, '0')} change="Needs your attention" icon="clock" tone="amber" />
          <StatCard label="Integrity flags" value={unresolvedFlags.toString().padStart(2, '0')} change="Require careful review" icon="shield" tone="rose" />
        </div>
        <div className="overview-grid">
          <section className="panel activity-panel">
            <div className="panel-heading"><div><h2>Assessment activity</h2><p>Submissions over the past week</p></div><button className="select-button">This week <span>⌄</span></button></div>
            <div className="chart" role="img" aria-label="Bar chart showing assessment activity across the week">
              <div className="chart-grid"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div>
              <div className="chart-bars">{[['Mon', 54], ['Tue', 73], ['Wed', 62], ['Thu', 89], ['Fri', 68], ['Sat', 42], ['Sun', 57]].map(([day, height]) => <div className="chart-column" key={day}><div className="bar-track"><span className="bar" style={{ height: `${height}%` }} /></div><span className="chart-day">{day}</span></div>)}</div>
            </div>
          </section>
          <section className="panel attention-panel">
            <div className="panel-heading"><div><h2>Needs your attention</h2><p>Items waiting for a review</p></div><span className="attention-count">{pendingAnswers + unresolvedFlags}</span></div>
            <button className="attention-item" onClick={() => setActiveView('Answer review')}><span className="attention-icon amber"><Icon name="file" /></span><span><strong>{pendingAnswers} answers to review</strong><small>Student submissions are waiting</small></span><span className="chevron">›</span></button>
            <button className="attention-item" onClick={() => setActiveView('Integrity flags')}><span className="attention-icon rose"><Icon name="shield" /></span><span><strong>{unresolvedFlags} integrity signals</strong><small>Review the context before deciding</small></span><span className="chevron">›</span></button>
            <div className="review-note"><Icon name="alert" size={16} /><span>Integrity signals are prompts for review, not proof of misconduct.</span></div>
          </section>
        </div>
        <section className="panel recent-panel">
          <div className="panel-heading"><div><h2>Recent submissions</h2><p>Latest student activity</p></div><button className="text-button" onClick={() => setActiveView('Answer review')}>View all <span>→</span></button></div>
          <AnswerTable answers={answers.slice(0, 4)} onSelect={setSelectedAnswer} />
        </section>
      </>
    )
  }

  function renderQuestions() {
    return (
      <>
        <div className="welcome-row">
          <div><p className="eyebrow">CONTENT</p><h1>Question bank</h1><p className="subheading">Create, organize, and upload assessment questions.</p></div>
          <div className="button-row"><button className="button button-secondary" onClick={downloadTemplate}><Icon name="file" size={17} /> Download template</button><button className="button button-primary" onClick={() => setQuestionModalOpen(true)}><Icon name="plus" size={17} /> Add question</button></div>
        </div>
        <section className="panel question-panel">
          <div className="upload-box"><span className="upload-icon"><Icon name="upload" size={21} /></span><div className="upload-copy"><strong>Upload questions</strong><p>Import a JSON file to add questions to your bank.</p></div><input ref={fileInput} className="visually-hidden" type="file" accept=".json,application/json" onChange={handleQuestionUpload} /><button className="button button-secondary" onClick={() => fileInput.current && fileInput.current.click()}><Icon name="upload" size={16} /> Choose JSON file</button></div>
          {uploadMessage && <p className="inline-message success-message" role="status">{uploadMessage}</p>}
          {uploadError && <p className="inline-message error-message" role="alert">{uploadError}</p>}
          <div className="panel-heading question-list-heading"><div><h2>All questions <span className="muted-count">{questions.length}</span></h2><p>Questions available for your assessments</p></div></div>
          <div className="table-wrap"><table><thead><tr><th>QUESTION</th><th>OPTIONS</th><th>CORRECT ANSWER</th><th>STATUS</th></tr></thead><tbody>
            {filteredQuestions.map((question) => <tr key={question.id}><td><div className="question-title"><span className="question-id">{question.id}</span><strong>{question.prompt}</strong></div></td><td>{question.options.length} options</td><td>{question.correctAnswer}</td><td><span className="status-pill status-published">{question.status}</span></td></tr>)}
            {filteredQuestions.length === 0 && <tr><td className="empty-row" colSpan="4">No questions match your search.</td></tr>}
          </tbody></table></div>
        </section>
      </>
    )
  }

  function renderAnswerReview() {
    return (
      <>
        <div className="welcome-row">
          <div><p className="eyebrow">ASSESSMENTS</p><h1>Answer review</h1><p className="subheading">Review student submissions and update their review status.</p></div>
          <span className="header-count">{pendingAnswers} waiting for review</span>
        </div>
        <section className="panel table-panel">
          <div className="panel-heading"><div><h2>Student submissions</h2><p>Open a submission to review the student&apos;s answer.</p></div><select className="select-button filter-select" value={answerFilter} onChange={(event) => setAnswerFilter(event.target.value)} aria-label="Filter submissions"><option>All submissions</option><option>Needs review</option><option>Reviewed</option></select></div>
          <AnswerTable answers={filteredAnswers} onSelect={setSelectedAnswer} />
        </section>
      </>
    )
  }

  function renderIntegrityFlags() {
    return (
      <>
        <div className="welcome-row">
          <div><p className="eyebrow">ACADEMIC INTEGRITY</p><h1>Integrity flags</h1><p className="subheading">Review unusual patterns in assessment activity with context.</p></div>
          <span className="header-count flag-count"><Icon name="shield" size={16} /> {unresolvedFlags} need review</span>
        </div>
        <div className="integrity-notice"><span className="notice-icon"><Icon name="alert" size={19} /></span><p><strong>A flag is not a finding.</strong> These signals can have legitimate explanations. Review the evidence and speak with the student before drawing conclusions.</p></div>
        <section className="panel table-panel">
          <div className="panel-heading"><div><h2>Activity signals</h2><p>Potential concerns that may benefit from a closer look.</p></div></div>
          <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>ASSESSMENT</th><th>ACTIVITY SIGNAL</th><th>STATUS</th><th></th></tr></thead><tbody>
            {filteredFlags.map((flag) => <tr key={flag.id}><td><StudentCell name={flag.student} initials={flag.initials} id={flag.id} /></td><td>{flag.assessment}</td><td><div className="signal-copy"><strong>{flag.signal}</strong><small>{flag.detail}</small></div></td><td><span className={`status-pill ${flag.level === 'Review' ? 'status-review' : 'status-reviewed'}`}>{flag.level === 'Review' ? 'Needs review' : 'Reviewed'}</span></td><td>{flag.level === 'Review' && <button className="small-button" onClick={() => markFlagReviewed(flag.id)}>Mark reviewed</button>}</td></tr>)}
            {filteredFlags.length === 0 && <tr><td className="empty-row" colSpan="5">No integrity signals match your search.</td></tr>}
          </tbody></table></div>
        </section>
      </>
    )
  }

  const pageContent = {
    Overview: renderOverview,
    'Question bank': renderQuestions,
    'Answer review': renderAnswerReview,
    'Integrity flags': renderIntegrityFlags,
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview" onClick={(event) => { event.preventDefault(); setActiveView('Overview') }}><span className="brand-mark">m</span><span>muna<span className="brand-dot">.</span></span></a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <button key={item.label} className={`nav-item ${activeView === item.label ? 'nav-active' : ''}`} onClick={() => { setActiveView(item.label); setSearch('') }}><Icon name={item.icon} size={18} /><span>{item.label}</span>{item.label === 'Answer review' && pendingAnswers > 0 && <span className="nav-badge">{pendingAnswers}</span>}{item.label === 'Integrity flags' && unresolvedFlags > 0 && <span className="nav-badge nav-badge-warm">{unresolvedFlags}</span>}</button>)}
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><span className="help-spark">✦</span><strong>Need a hand?</strong><p>Visit the help center for tips and guides.</p><button onClick={() => setUploadMessage('Help center is not connected in this preview.')}>Open help center <span>→</span></button></div><div className="profile"><span className="profile-avatar">AS</span><span className="profile-text"><strong>Alex Morgan</strong><small>Administrator</small></span><span className="profile-menu">···</span></div></div>
      </aside>
      <main className="main-area">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{activeView}</strong></div><div className="topbar-actions"><label className="search-box"><Icon name="search" size={17} /><input type="search" placeholder="Search anything..." value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search current view" /><kbd>⌘ K</kbd></label><button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell" size={19} /><span /></button><span className="top-avatar">AM</span></div></header>
        <div className="content-area">{pageContent[activeView]()}</div>
        <footer className="footer"><span>© 2026 Muna learning</span><span>Admin workspace <i /> All systems operational</span></footer>
      </main>
      {questionModalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuestionModalOpen(false) }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="question-modal-title"><div className="modal-heading"><div><p className="eyebrow">QUESTION BANK</p><h2 id="question-modal-title">Add a question</h2></div><button className="icon-button" onClick={() => setQuestionModalOpen(false)} aria-label="Close"><Icon name="close" /></button></div><form onSubmit={addQuestion}><label className="form-label">Question<textarea required rows="3" value={newQuestion.prompt} onChange={(event) => setNewQuestion({ ...newQuestion, prompt: event.target.value })} placeholder="Write your question..." /></label><div className="option-grid">{newQuestion.options.map((option, index) => <label className="form-label" key={index}>Option {String.fromCharCode(65 + index)}<input required value={option} onChange={(event) => setNewQuestion({ ...newQuestion, options: newQuestion.options.map((value, optionIndex) => optionIndex === index ? event.target.value : value) })} placeholder={`Enter option ${String.fromCharCode(65 + index)}`} /></label>)}</div><label className="form-label">Correct answer<select required value={newQuestion.correctAnswer} onChange={(event) => setNewQuestion({ ...newQuestion, correctAnswer: event.target.value })}><option value="" disabled>Select the correct option</option>{newQuestion.options.map((option, index) => <option key={index} value={option || ''} disabled={!option.trim()}>{String.fromCharCode(65 + index)} — {option || 'Enter an option first'}</option>)}</select></label><div className="modal-actions"><button type="button" className="button button-secondary" onClick={() => setQuestionModalOpen(false)}>Cancel</button><button type="submit" className="button button-primary">Add to question bank</button></div></form></section></div>}
      {selectedAnswer && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedAnswer(null) }}><section className="modal-card answer-modal" role="dialog" aria-modal="true" aria-labelledby="answer-modal-title"><div className="modal-heading"><div><p className="eyebrow">SUBMISSION {selectedAnswer.id}</p><h2 id="answer-modal-title">Review answer</h2></div><button className="icon-button" onClick={() => setSelectedAnswer(null)} aria-label="Close"><Icon name="close" /></button></div><StudentCell name={selectedAnswer.student} initials={selectedAnswer.initials} id={selectedAnswer.submitted} /><div className="answer-detail"><span>ASSESSMENT</span><strong>{selectedAnswer.question}</strong></div><div className="answer-detail"><span>STUDENT&apos;S ANSWER</span><p>{selectedAnswer.answer}</p></div><div className="answer-detail answer-score"><span>SCORE</span><strong>{selectedAnswer.score}</strong></div><div className="modal-actions"><button className="button button-secondary" onClick={() => setSelectedAnswer(null)}>Close</button>{selectedAnswer.status === 'Needs review' && <button className="button button-primary" onClick={() => markAnswerReviewed(selectedAnswer.id)}><Icon name="check" size={16} /> Mark as reviewed</button>}</div></section></div>}
    </div>
  )
}

function StatCard({ label, value, change, icon, tone, caption }) {
  return <section className="panel stat-card"><div className={`stat-icon ${tone}`}><Icon name={icon} size={19} /></div><p className="stat-label">{label}</p><div className="stat-value">{value}</div><div className="stat-foot"><span className={tone === 'blue' ? 'positive-change' : 'stat-description'}>{change}</span>{caption && <span className="stat-description">{caption}</span>}</div><span className="stat-trend"><Icon name="arrow" size={15} /></span></section>
}

function StudentCell({ name, initials, id }) {
  return <div className="student-cell"><span className="student-avatar">{initials || initialsFor(name)}</span><span><strong>{name}</strong><small>{id}</small></span></div>
}

function AnswerTable({ answers, onSelect }) {
  return <div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>ASSESSMENT</th><th>SUBMITTED</th><th>SCORE</th><th>STATUS</th><th></th></tr></thead><tbody>
    {answers.map((answer) => <tr key={answer.id}><td><StudentCell name={answer.student} initials={answer.initials} id={answer.id} /></td><td>{answer.question}</td><td>{answer.submitted}</td><td className="score-cell">{answer.score}</td><td><span className={`status-pill ${answer.status === 'Reviewed' ? 'status-reviewed' : 'status-review'}`}>{answer.status}</span></td><td><button className="row-action" aria-label={`Review ${answer.student}'s answer`} onClick={() => onSelect(answer)}>Review <span>→</span></button></td></tr>)}
    {answers.length === 0 && <tr><td className="empty-row" colSpan="6">No submissions match your filters.</td></tr>}
  </tbody></table></div>
}

export default App
