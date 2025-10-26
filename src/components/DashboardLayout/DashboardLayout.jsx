import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from './DashboardLayout.module.css'

const DashboardLayout = ({ title, subtitle, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
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
            <div className="col-12">
              <h1 className="h2 fw-bold mb-2">{title}</h1>
              {subtitle && <p className="text-muted">{subtitle}</p>}
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