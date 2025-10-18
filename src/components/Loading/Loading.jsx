import React from 'react'

const Loading = ({ message = 'Cargando...' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center p-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <span className="ms-3">{message}</span>
    </div>
  )
}

export default Loading