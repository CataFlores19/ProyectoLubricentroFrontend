import React from 'react'
import styles from './Card.module.css'

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`card ${className} ${styles.customCard}`}>
      {title && (
        <div className="card-header">
          <h5 className="card-title mb-0">{title}</h5>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default Card