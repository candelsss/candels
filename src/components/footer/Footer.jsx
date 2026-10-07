'use client'

import './footer.css'

const EMAIL = 'hola.candels@gmail.com'
const INSTAGRAM_URL = 'https://www.instagram.com/candelsss__/'

export const Footer = () => {
  return (
    <footer className="site-footer">
      <a href={`mailto:${EMAIL}`} className="site-footer-link">EMAIL</a>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="site-footer-link"
      >
        INSTAGRAM
      </a>
    </footer>
  )
}
