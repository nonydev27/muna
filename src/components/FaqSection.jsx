const FAQS = [
  {
    q: 'What is Muna?',
    a: 'Muna is a mentor-led assessment platform. Mentors build assessments with interactive question types, invite mentees, and review their work. Mentees complete assessments under rules their mentor sets.',
  },
  {
    q: 'Who can use Muna?',
    a: 'There are two roles. Mentors create an organisation workspace, build assessments, and grade submissions. Mentees join with an invitation and complete the assessments assigned to them.',
  },
  {
    q: 'How do I join as a mentee?',
    a: 'Ask your mentor for an invitation code or organisation link. Enter it using the "Enter Code" button, and your assigned assessments will appear.',
  },
  {
    q: 'What kinds of questions can an assessment include?',
    a: 'Multiple choice, multi-select, true/false, short answer, long-form theory, and freehand drawing. Drawing is a full question type, not just a file upload.',
  },
  {
    q: 'How many attempts do I get?',
    a: 'Three by default. The server counts attempts, so refreshing the page cannot reset them. A mentor can grant an extra attempt, and every grant is recorded.',
  },
  {
    q: 'What happens if I switch tabs during an exam?',
    a: 'In standard web mode, Muna records when the exam window loses focus and sends that event to the server. Your mentor reviews these events, and nothing is judged silently. Depending on your mentor’s settings, losing focus may also submit the exam automatically.',
  },
  {
    q: 'Is Muna "cheat-proof"?',
    a: 'No, and we won’t claim it is. No website alone can guarantee that. Muna uses layered controls, server-side rules, and human review. For high-stakes exams, mentors can require Safe Exam Browser.',
  },
  {
    q: 'What is Safe Exam Browser (SEB)?',
    a: 'SEB is a free, locked-down browser that restricts other apps on your device during an exam. Mentors can require it for high-stakes assessments. You may be asked to run a quick device check first.',
  },
  {
    q: 'What if my internet drops mid-exam?',
    a: 'Your answers are autosaved to the server. The timer also runs on the server, so a connection drop does not stop or reset it. Reconnect as soon as you can and carry on.',
  },
  {
    q: 'Who can see my answers?',
    a: 'Mentors in your organisation can see your submissions, scores, and any integrity events for review. Please read our Privacy Policy for the full picture.',
  },
  {
    q: 'How is my account protected?',
    a: 'Passwords are stored as secure hashes, never as plain text. Sign-in is rate-limited, and sessions use protected cookies. Answer keys are never sent to your browser.',
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="content-wrap">
        <div className="section-header">
          <div className="section-badge">FAQ</div>
          <h2 id="faq-title" className="section-title">Frequently asked questions</h2>
          <p className="section-desc">
            Quick answers for mentors and mentees. Can’t find yours? Reach out and we’ll help.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="faq-item">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}