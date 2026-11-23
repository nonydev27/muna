import { useEffect, useState } from 'react'
import { Menu, X } from '../icons'
//importing the muna logo the nav bar
import munaLogo from '../assets/muna-mark.svg'

export default function Navbar({ onOpenModal }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => setMenuOpen((open) => !open)

  useEffect(() => {
    if (!menuOpen) return undefined
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className="navbar">
      <div className="content-wrap nav-content">
        <div className="brand-group">
          <div className="brand-icon-box">
            <img src={munaLogo} alt="Muna logo" /> 
          </div>
          <div>
            <div className="brand-title">MUNA</div>
            <div className="brand-tag">Assessment Platform</div>
          </div>
        </div>

        <nav className="nav-links" aria-label="Primary">
          <a href="#features" className="nav-link">Features</a>
          <a href="#studio" className="nav-link">Question Studio</a>
          <a href="#security" className="nav-link">Security Model</a>
          <a href="#workspaces" className="nav-link">Workspaces</a>
        </nav>

        <div className="nav-actions">
          <a className="btn btn-outline" href="/login">Log in</a>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onOpenModal('join')}
          >
            Enter Code
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenModal('mentor')}
          >
            Mentor Portal
          </button>
          <button
            type="button"
            className="nav-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav className="mobile-menu-links" aria-label="Primary mobile">
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#studio" onClick={closeMenu}>Question Studio</a>
          <a href="#security" onClick={closeMenu}>Security Model</a>
          <a href="#workspaces" onClick={closeMenu}>Workspaces</a>
        </nav>
      </div>
    </header>
  )
}
