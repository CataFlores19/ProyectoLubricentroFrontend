import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './pages/NotFound/NotFound'
import './styles/App.css'

function AppContent() {
  const location = useLocation()
  // Ocultar el Navbar en la página de login (Home) y Dashboard
  const showNavbar = location.pathname !== '/' && location.pathname !== '/dashboard'

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "container-fluid" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App