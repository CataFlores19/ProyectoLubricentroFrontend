import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'
import Toast from '../../components/Toast/Toast'
import styles from './Clientes.module.css'

const API_URL = 'http://localhost:5000/api/clients'

const Clientes = () => {
  const navigate = useNavigate()
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState(null)
  const [formData, setFormData] = useState({
    RUN: '',
    FirstName: '',
    LastName: '',
    Phone: '',
    Email: ''
  })

  useEffect(() => {
    cargarClientes()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const cargarClientes = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      const result = await response.json()
      setClientes(result.data || [])
    } catch (error) {
      console.error('Error al cargar clientes:', error)
      
      // Datos ficticios para pruebas
      const clientesFicticios = [
        {
          id: 1,
          RUN: '12.345.678-9',
          FirstName: 'Juan',
          LastName: 'Pérez',
          Phone: '0999123456',
          Email: 'juan.perez@email.com'
        },
        {
          id: 2,
          RUN: '23.456.789-0',
          FirstName: 'María',
          LastName: 'González',
          Phone: '0987654321',
          Email: 'maria.gonzalez@email.com'
        },
        {
          id: 3,
          RUN: '34.567.890-1',
          FirstName: 'Carlos',
          LastName: 'Rodríguez',
          Phone: '0991234567',
          Email: 'carlos.rodriguez@email.com'
        },
        {
          id: 4,
          RUN: '45.678.901-2',
          FirstName: 'Ana',
          LastName: 'Martínez',
          Phone: '0989876543',
          Email: 'ana.martinez@email.com'
        }
      ]
      
      setClientes(clientesFicticios)
      
      setToast({
        type: 'error',
        message: 'Error al cargar los datos, mostrando datos ficticios'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      if (!response.ok) {
        throw new Error('Error al crear el cliente')
      }
      
      const nuevoCliente = await response.json()
      
      // Limpiar formulario y cerrar
      setFormData({
        RUN: '',
        FirstName: '',
        LastName: '',
        Phone: '',
        Email: ''
      })
      setShowForm(false)
      
      // Mostrar notificación de éxito
      setToast({
        type: 'success',
        message: '✓ Cliente creado exitosamente'
      })
      
      // Recargar la lista de clientes
      await cargarClientes()
      
    } catch (error) {
      console.error('Error al crear cliente:', error)
      setToast({
        type: 'error',
        message: '✗ Error al crear el cliente. Por favor, intente nuevamente.'
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      RUN: '',
      FirstName: '',
      LastName: '',
      Phone: '',
      Email: ''
    })
    setShowForm(false)
  }

  // Función para navegar a vehículos con filtro por cliente
  const verVehiculosCliente = (cliente) => {
    navigate('/vehiculos', {
      state: {
        clienteId: cliente.id,
        clienteNombre: `${cliente.FirstName} ${cliente.LastName}`
      }
    })
  }

  if (loading) {
    return (
      <DashboardLayout title="Gestión de Clientes" subtitle="Administración de clientes del lubricentro">
        <Loading />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Gestión de Clientes" subtitle="Administración de clientes del lubricentro">
      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className={styles.header}>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Cliente
          </Button>
        )}
      </div>

      {showForm && (
        <Card title="Nuevo Cliente" className="mb-4">
          <form onSubmit={handleSubmit} className={styles.clienteForm}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="RUN" className="form-label">
                  RUN <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="RUN"
                  name="RUN"
                  value={formData.RUN}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]{1}"
                  placeholder="12.345.678-9"
                  title="Formato: XX.XXX.XXX-X"
                />
                <small className="text-muted">Formato: XX.XXX.XXX-X</small>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Email" className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  required
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="FirstName" className="form-label">
                  Nombre <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="FirstName"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={50}
                  placeholder="Ingrese el nombre"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="LastName" className="form-label">
                  Apellido <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="LastName"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={50}
                  placeholder="Ingrese el apellido"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Phone" className="form-label">
                  Teléfono <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="Phone"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10}"
                  placeholder="0999123456"
                  title="Debe ingresar 10 dígitos"
                />
                <small className="text-muted">Formato: 10 dígitos sin espacios</small>
              </div>
            </div>

            <div className={styles.formActions}>
              <Button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </Button>
              <Button type="submit">
                Guardar Cliente
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card title="Lista de Clientes">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No hay clientes registrados
                  </td>
                </tr>
              ) : (
                clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.RUN}</td>
                    <td>{cliente.FirstName}</td>
                    <td>{cliente.LastName}</td>
                    <td>{cliente.Phone}</td>
                    <td>{cliente.Email}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => verVehiculosCliente(cliente)}
                        title="Ver vehículos de este cliente"
                      >
                        <i className="bi bi-car-front me-1"></i>
                        Vehículos
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  )
}

export default Clientes