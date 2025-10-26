import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Usuarios from './pages/Usuarios/Usuarios'
import Clientes from './pages/Clientes/Clientes'
import Vehiculos from './pages/Vehiculos/Vehiculos'
import Ordenes from './pages/Ordenes/Ordenes'
import NotFound from './pages/NotFound/NotFound'
import './styles/App.css'

function AppContent() {
  const location = useLocation()
  // Ocultar el Navbar en las páginas internas del dashboard
  const hiddenNavbarPaths = ['/', '/dashboard', '/usuarios', '/clientes', '/vehiculos', '/ordenes']
  const showNavbar = !hiddenNavbarPaths.includes(location.pathname)

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <main className={showNavbar ? "container-fluid" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/vehiculos" element={<Vehiculos />} />
          <Route path="/ordenes" element={<Ordenes />} />
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