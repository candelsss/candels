'use client'

import { createContext, useContext, useSyncExternalStore } from 'react'

const ThemeContext = createContext(null)

// El tema "vive" en el atributo data-theme de <html> (ya lo pone ahí el script
// bloqueante de layout.jsx antes de hidratar). useSyncExternalStore lee ese valor
// sin necesitar un useState + useEffect, y evita el parpadeo/discrepancia entre
// lo que renderiza el servidor y lo que hay realmente en el navegador.
const listeners = new Set()
const notifyListeners = () => listeners.forEach((listener) => listener())
const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getSnapshot = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
const getServerSnapshot = () => 'light'

export const ThemeProvider = ({ children }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    notifyListeners()
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme debe usarse dentro de un ThemeProvider')
  return context
}
