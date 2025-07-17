import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { blink } from './blink/client'
import Dashboard from './pages/Dashboard'
import BrandGuideSetup from './pages/BrandGuideSetup'
import ContentIdeas from './pages/ContentIdeas'
import ContentCreation from './pages/ContentCreation'
import ContentCalendar from './pages/ContentCalendar'
import Analytics from './pages/Analytics'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brand-guide" element={<BrandGuideSetup />} />
          <Route path="/content-ideas" element={<ContentIdeas />} />
          <Route path="/content-creation" element={<ContentCreation />} />
          <Route path="/content-calendar" element={<ContentCalendar />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App