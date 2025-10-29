import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './DashboardLayout.module.css'

const DashboardLayout = ({ title, subtitle, children }) => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleLogout = () => {
    // Limpiar el token del localStorage
    localStorage.removeItem('token')
    // Redirigir al login
    navigate('/')
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Botón para abrir sidebar en mobile */}
      <button 
        className={`${styles.menuButton} d-lg-none`}
        onClick={toggleSidebar}
      >
        <i className="bi bi-list fs-3"></i>
      </button>

      {/* Overlay para cerrar sidebar en mobile */}
      {sidebarOpen && (
        <div 
          className={styles.overlay}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />

      {/* Contenido principal */}
      <div className={styles.mainContent}>
        <div className="container-fluid py-4">
          {/* Encabezado */}
          <div className="row mb-4">
            <div className="col-12 d-flex justify-content-between align-items-start">
              <div>
                <h1 className="h2 fw-bold mb-2">{title}</h1>
                {subtitle && <p className="text-muted">{subtitle}</p>}
              </div>
              <button 
                className="btn btn-outline-danger d-flex align-items-center gap-2"
                onClick={handleLogout}
                title="Cerrar sesión"
              >
                <i className="bi bi-box-arrow-right"></i>
                <span className="d-none d-md-inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>

          {/* Contenido dinámico */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout