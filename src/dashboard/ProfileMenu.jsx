import { useEffect, useId, useRef, useState } from 'react'
import './ProfileMenu.css'

export default function ProfileMenu({ user, compact = false, onLogout }) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const root = useRef(null)
  const trigger = useRef(null)
  const profileDialog = useRef(null)
  const initials = user.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    if (!open) return

    function dismissOutside(event) {
      if (!root.current?.contains(event.target)) setOpen(false)
    }

    function dismissOnEscape(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        trigger.current?.focus()
      }
    }

    document.addEventListener('pointerdown', dismissOutside)
    document.addEventListener('focusin', dismissOutside)
    document.addEventListener('keydown', dismissOnEscape)
    return () => {
      document.removeEventListener('pointerdown', dismissOutside)
      document.removeEventListener('focusin', dismissOutside)
      document.removeEventListener('keydown', dismissOnEscape)
    }
  }, [open])

  function showProfile() {
    setOpen(false)
    profileDialog.current.showModal()
  }

  return (
    <div ref={root} className={`account-menu ${compact ? 'account-menu-top' : 'account-menu-sidebar'}`}>
      <button
        ref={trigger}
        type="button"
        className={compact ? 'top-avatar account-trigger' : 'profile account-trigger'}
        aria-label={`User menu for ${user.name}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        {compact ? initials : (
          <>
            <span className="profile-avatar">{initials}</span>
            <span className="profile-text"><strong>{user.name}</strong><small>{user.role}</small></span>
            <span className="profile-menu" aria-hidden="true">&middot;&middot;&middot;</span>
          </>
        )}
      </button>
      {open && (
        <section id={menuId} className="account-dropdown" aria-label="User account">
          <div className="account-summary">
            <strong>{user.name}</strong>
            <small>{user.role}</small>
          </div>
          <div className="account-actions">
            <button type="button" onClick={showProfile}>
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2" /></svg>
              My profile
            </button>
            <button type="button" className="account-logout" onClick={onLogout}>
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
              Log out
            </button>
          </div>
        </section>
      )}
      <dialog
        ref={profileDialog}
        className="account-dialog"
        aria-labelledby={`${menuId}-title`}
        onClose={() => trigger.current?.focus()}
        onClick={(event) => { if (event.target === event.currentTarget) profileDialog.current.close() }}
      >
        <div className="account-dialog-content">
          <span className="profile-avatar" aria-hidden="true">{initials}</span>
          <h2 id={`${menuId}-title`}>My profile</h2>
          <dl><dt>Name</dt><dd>{user.name}</dd><dt>Role</dt><dd>{user.role}</dd></dl>
          <p>This is a demo profile. Account editing will be available when sign-in is connected.</p>
          <button type="button" className="button button-secondary" onClick={() => profileDialog.current.close()}>Close</button>
        </div>
      </dialog>
    </div>
  )
}