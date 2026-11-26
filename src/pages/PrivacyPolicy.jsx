import { ShieldCheck } from '../icons'

const LAST_UPDATED = '26 November 2026'
const CONTACT_EMAIL = 'privacy@your-domain.com' // TODO: replace with your real address

const SECTIONS = [
  {
    title: '1. About this policy',
    paragraphs: [
      'Muna is a mentor-led assessment platform. This policy explains what personal information Muna collects, why we collect it, who can see it, and the choices you have.',
      'It applies to mentors, mentees, and visitors to our application.',
    ],
  },
  {
    title: '2. Information we collect',
    paragraphs: ['We collect only what we need to run assessments:'],
    list: [
      'Account details: your name and email address. Passwords are stored only as secure hashes, never as plain text.',
      'Mentee records: the name and email address a mentor enters when inviting a mentee.',
      'Assessment data: your answers (including any drawings), scores, and mentor feedback.',
      'Integrity events: when secure mode is on, we record events such as the exam window losing focus, with a timestamp, so your mentor can review them.',
      'Session information: a session cookie that keeps you signed in.',
    ],
  },
  {
    title: '3. How we use your information',
    list: [
      'To create and secure your account.',
      'To deliver assessments, count attempts, run timers, and save your answers.',
      'To let mentors grade work and give feedback.',
      'To help mentors review possible integrity concerns fairly. Integrity events are signals for human review, not automatic verdicts.',
      'To keep Muna secure and working properly.',
    ],
  },
  {
    title: '4. Who can see your information',
    paragraphs: [
      'Mentors in your organisation can see your submissions, scores, and integrity events. Administrators can see account and workspace data needed to run the service.',
      'We do not sell your personal information, and we do not use it for advertising.',
    ],
  },
  {
    title: '5. Cookies',
    paragraphs: [
      'Muna uses one essential session cookie (muna.sid) to keep you signed in. It is HttpOnly and uses strict same-site settings to protect your account. We do not use advertising or tracking cookies.',
    ],
  },
  {
    title: '6. Third-party services',
    paragraphs: [
      'Our pages load fonts from Google Fonts. When you visit, your browser may send technical information, such as your IP address, to Google. Their own privacy policy governs that data.',
    ],
  },
  {
    title: '7. How long we keep your information',
    paragraphs: [
      // TODO: choose your real retention rules, then edit this text.
      'We keep account and assessment data for as long as your organisation uses Muna, and for [RETENTION PERIOD] afterwards, unless the law requires otherwise. You can ask us to delete your data at any time (see section 9).',
    ],
  },
  {
    title: '8. How we protect your information',
    list: [
      'Passwords are hashed before storage.',
      'Sign-in attempts are rate-limited.',
      'Sessions use protected cookies, and requests are checked against forgery.',
      'Admin actions are authorised on the server, and answer keys are never sent to your browser.',
    ],
    paragraphs: [
      'No system is perfectly secure, but we work to protect your information and to be honest about the limits of what we can guarantee.',
    ],
  },
  {
    title: '9. Your rights',
    paragraphs: [
      'You can ask to see the personal information we hold about you, correct it, or have it deleted. You may also object to how it is used.',
      'If you are in Ghana, you also have rights under the Data Protection Act, 2012 (Act 843), and you can complain to the Data Protection Commission.',
      `To make a request, email ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: '10. Children and young learners',
    paragraphs: [
      'Mentees may be under 18. Organisations that invite young learners are responsible for getting any consent required from parents or guardians before adding them to Muna.',
    ],
  },
  {
    title: '11. Changes to this policy',
    paragraphs: [
      'If we change this policy, we will update the date at the top of this page. For significant changes, we will also tell you in the app or by email.',
    ],
  },
  {
    title: '12. Contact us',
    paragraphs: [`Questions about this policy? Email ${CONTACT_EMAIL}.`],
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <a className="legal-brand" href="/" aria-label="Muna home">
          <span className="brand-icon-box"><ShieldCheck size={20} /></span>
          <span className="brand-title">MUNA</span>
        </a>
        <a className="btn btn-outline" href="/">Back to home</a>
      </header>

      <main className="legal-content">
        <p className="section-badge">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: {LAST_UPDATED}</p>

        {SECTIONS.map(({ title, paragraphs = [], list = [] }) => (
          <section key={title} className="legal-section">
            <h2>{title}</h2>
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {list.length > 0 && (
              <ul>
                {list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </main>
    </div>
  )
}