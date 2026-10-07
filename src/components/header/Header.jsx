'use client'

import './header.css'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle/ThemeToggle';

export const Header = ({ showBack = false }) => {
  return (
    <header className='header'>
      {showBack ? (
        <Link href="/" className="header-back">VOLVER</Link>
      ) : (
        <>
          <Link href="/" className="header-logo">
            <img className="header-logo-img header-logo-img-light" src="/img/ICONO.png" alt="Logo" />
            <img className="header-logo-img header-logo-img-dark" src="/img/logo-dark-mode.png" alt="Logo" />
          </Link>
          <Link href="/" className="header-logo-desk">
            <img className="header-logo-img header-logo-img-light" src="/img/ICONO.png" alt="Logo" />
            <img className="header-logo-img header-logo-img-dark" src="/img/logo-dark-mode.png" alt="Logo" />
          </Link>
        </>
      )}

      <ThemeToggle />
    </header>
  )
}
