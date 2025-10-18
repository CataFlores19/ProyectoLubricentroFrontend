import React from 'react'
import styles from './Button.module.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '' 
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${className} ${styles.customButton}`

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button