'use client'

import { useTheme } from '@/components/theme-provider/ThemeProvider'
import './theme-toggle.css'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {isDark ? 'MODO CLARO' : 'MODO OSCURO'}
    </button>
  )
}
