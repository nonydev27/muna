import { useEffect, useId, useRef, useState } from 'react'
import './NotificationsMenu.css'

export default function NotificationsMenu({ items, onSelect, children }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const root = useRef(null)
  const trigger = useRef(null)
  const total = items.reduce((sum, item) => sum + item.count, 0)

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

  function selectItem(item) {
    setOpen(false)
    trigger.current?.focus()
    onSelect(item)
  }

  return (
    <div ref={root} className="notifications-menu">
      <button
        ref={trigger}
        type="button"
        className="icon-button notification-button"
        aria-label={`Notifications, ${total} pending ${total === 1 ? 'item' : 'items'}`}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        {children}
        {total > 0 && <span className="notification-badge" aria-hidden="true">{total > 99 ? '99+' : total}</span>}
      </button>
      {open && (
        <section id={panelId} className="notifications-panel" aria-labelledby={`${panelId}-title`}>
          <div className="notifications-heading">
            <h2 id={`${panelId}-title`}>Notifications</h2>
            <p>{total ? `${total} ${total === 1 ? 'item needs' : 'items need'} your attention` : 'No pending items'}</p>
          </div>
          {items.length > 0 ? (
            <ul className="notifications-list">
              {items.map((item) => (
                <li key={item.id}>
                  <button type="button" className="notification-item" onClick={() => selectItem(item)}>
                    <span className={`attention-icon ${item.tone}`}>{item.icon}</span>
                    <span className="notification-copy"><strong>{item.title}</strong><small>{item.description}</small></span>
                    <span className="notification-chevron" aria-hidden="true">&rsaquo;</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="notifications-empty">
              <strong>You&apos;re all caught up</strong>
              <p>No answers or integrity flags are waiting for review.</p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}