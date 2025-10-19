import React from 'react'
import styles from './Sidebar.module.css'

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      title: 'Usuarios',
      icon: 'bi-people-fill',
      path: '/usuarios'
    },
    {
      title: 'Clientes',
      icon: 'bi-person-check-fill',
      path: '/clientes'
    },
    {
      title: 'Vehículos',
      icon: 'bi-car-front-fill',
      path: '/vehiculos'
    },
    {
      title: 'Órdenes de Trabajo',
      icon: 'bi-clipboard-check-fill',
      path: '/ordenes'
    }
  ]

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      {/* Header del Sidebar */}
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          <i className="bi bi-tools fs-3 text-primary"></i>
          <h5 className="mb-0 ms-2 fw-bold">Lubricentro</h5>
        </div>
        <button 
          className={`${styles.closeButton} d-lg-none`}
          onClick={onClose}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      {/* Navegación */}
      <nav className={styles.sidebarNav}>
        <ul className={styles.menuList}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                <i className={`bi ${item.icon} ${styles.menuIcon}`}></i>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      
    </aside>
  )
}

export default Sidebar
