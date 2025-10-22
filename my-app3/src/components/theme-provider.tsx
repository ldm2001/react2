'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// 타입 정의
type ThemeContextType = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// 커스텀 훅 추가
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dataset.theme = theme
    }
  }, [theme])
  
  const toggleTheme = () => { 
    setTheme((t) => (t === 'dark' ? 'light' : 'dark')) 
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}