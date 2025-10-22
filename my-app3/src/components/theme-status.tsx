'use client'

import { useTheme } from './theme-provider'

export default function ThemeStatus() {
  const { theme, toggleTheme } = useTheme() 
  return (
    <div style={{ display: 'inline-block', marginLeft: 12 }}>
      <button onClick={toggleTheme} aria-label="toggle theme">
        Theme: {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  )
}