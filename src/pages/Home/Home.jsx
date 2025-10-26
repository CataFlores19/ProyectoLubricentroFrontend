import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

const API_URL = 'http://localhost:5000/api/auth/login'

const Home = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    rut: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RUN: formData.rut,
          Password: formData.password
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      navigate('/dashboard')
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-12 col-md-8 col-lg-5">
            <div className={`card shadow-lg ${styles.loginCard}`}>
              <div className="card-body p-5">
                {/* Título */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold mt-3 mb-2">Lubricentro</h2>
                  <p className="text-muted">Sistema de Administración</p>
                  <p className="text-muted">De momento usar cualquier dato para acceder</p>
                </div>

                {/* Formulario de Login */}
                <form onSubmit={handleSubmit}>
                  {/* Campo RUT */}
                  <div className="mb-3">
                    <label htmlFor="rut" className="form-label fw-semibold">
                      RUT
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-person-badge"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="rut"
                        name="rut"
                        placeholder="Ej: 12345678-9"
                        value={formData.rut}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Campo Contraseña */}
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Contraseña
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="password"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Botón de inicio de sesión */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg fw-semibold"
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>

                {/* Información adicional */}
                <div className="text-center mt-4">
                  <small className="text-muted">
                    <i className="bi bi-shield-check me-1"></i>
                    Acceso seguro para personal autorizado
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home