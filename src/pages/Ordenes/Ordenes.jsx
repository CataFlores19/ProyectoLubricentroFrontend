import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'
import Toast from '../../components/Toast/Toast'
import styles from './Ordenes.module.css'

const API_URL = 'http://localhost:5000/api/work-orders'
const API_VEHICULOS_URL = 'http://localhost:5000/api/vehicles'
const API_MECANICOS_URL = 'http://localhost:5000/api/users/mechanics'

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([])
  const [vehiculos, setVehiculos] = useState([])
  const [mecanicos, setMecanicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState(null)
  const [formData, setFormData] = useState({
    OrderDate: '',
    Status: 'Pendiente',
    Description: '',
    VehicleID: '',
    UserID: '',
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      
      const [ordenesRes, vehiculosRes, mecanicosRes] = await Promise.all([
        fetch(API_URL),
        fetch(API_VEHICULOS_URL),
        fetch(API_MECANICOS_URL)
      ])
      
      const ordenesResult = await ordenesRes.json()
      const vehiculosResult = await vehiculosRes.json()
      const mecanicosResult = await mecanicosRes.json()
      
      setOrdenes(ordenesResult.data || [])
      setVehiculos(vehiculosResult.data || [])
      setMecanicos(mecanicosResult.data || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
      
      // Datos ficticios para pruebas
      const vehiculosFicticios = [
        {
          ID: 1,
          LicensePlate: 'AABB12',
          Brand: 'Toyota',
          Model: 'Corolla',
          Year: 2020,
          Color: 'Rojo'
        },
        {
          ID: 2,
          LicensePlate: 'CCDD34',
          Brand: 'Honda',
          Model: 'Civic',
          Year: 2021,
          Color: 'Azul'
        }
      ]
      
      const mecanicosFicticios = [
        {
          ID: 1,
          FirstName: 'Pedro',
          LastName: 'Técnico',
          Email: 'pedro.tecnico@lubricentro.com'
        },
        {
          ID: 2,
          FirstName: 'Miguel',
          LastName: 'Torres',
          Email: 'miguel.torres@lubricentro.com'
        }
      ]
      
      const ordenesFicticias = [
        {
          id: 1,
          OrderDate: '2025-10-20',
          Status: 'Completada',
          Description: 'Cambio de aceite y filtro completo. Revisión general del motor.',
          VehicleID: 1,
          UserID: 1,
          LicensePlate: 'AABB12',
          TechnicianName: 'Pedro Técnico'
        },
        {
          id: 2,
          OrderDate: '2025-10-23',
          Status: 'Pendiente',
          Description: 'Mantenimiento preventivo de 10.000 km. Incluye revisión de frenos y suspensión.',
          VehicleID: 2,
          UserID: 2,
          LicensePlate: 'CCDD34',
          TechnicianName: 'Miguel Torres'
        },
        {
          id: 3,
          OrderDate: '2025-10-25',
          Status: 'Pendiente',
          Description: 'Cambio de neumáticos delanteros y balanceo de ruedas.',
          VehicleID: 1,
          UserID: 1,
          LicensePlate: 'AABB12',
          TechnicianName: 'Pedro Técnico'
        }
      ]
      
      setVehiculos(vehiculosFicticios)
      setMecanicos(mecanicosFicticios)
      setOrdenes(ordenesFicticias)
      
      setToast({
        type: 'error',
        message: 'Error al cargar los datos, mostrando datos ficticios'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Preparar datos para enviar, convirtiendo IDs a números
      const dataToSend = {
        ...formData,
        VehicleID: parseInt(formData.VehicleID),
        UserID: parseInt(formData.UserID)
      }
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear la orden')
      }
      
      const nuevaOrden = await response.json()
      
      // Limpiar formulario y cerrar
      setFormData({
        OrderDate: '',
        Status: 'Pendiente',
        Description: '',
        VehicleID: '',
        UserID: '',
      })
      setShowForm(false)
      
      // Mostrar notificación de éxito
      setToast({
        type: 'success',
        message: '✓ Orden de trabajo creada exitosamente'
      })
      
      // Recargar la lista de órdenes
      await cargarDatos()
      
    } catch (error) {
      console.error('Error al crear orden:', error)
      setToast({
        type: 'error',
        message: `✗ ${error.message}`
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      OrderDate: '',
      Status: 'Pendiente',
      Description: '',
      VehicleID: '',
      UserID: ''
    })
    setShowForm(false)
  }

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  }

  if (loading) {
    return (
      <DashboardLayout title="Órdenes de Trabajo" subtitle="Gestión de órdenes de trabajo del lubricentro">
        <Loading />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Órdenes de Trabajo" subtitle="Gestión de órdenes de trabajo del lubricentro">
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
            Nueva Orden
          </Button>
        )}
      </div>

      {showForm && (
        <Card title="Nueva Orden de Trabajo" className="mb-4">
          <form onSubmit={handleSubmit} className={styles.ordenForm}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="OrderDate" className="form-label">
                  Fecha de Orden <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="OrderDate"
                  name="OrderDate"
                  value={formData.OrderDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Status" className="form-label">
                  Estado <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="Status"
                  name="Status"
                  value={formData.Status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completada">Completada</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="VehicleID" className="form-label">
                  Vehículo <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="VehicleID"
                  name="VehicleID"
                  value={formData.VehicleID}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un vehículo</option>
                  {vehiculos.map((vehiculo) => (
                    <option key={vehiculo.ID || vehiculo.id} value={vehiculo.ID || vehiculo.id}>
                      {vehiculo.LicensePlate} - {vehiculo.Brand} {vehiculo.Model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="UserID" className="form-label">
                  Técnico Asignado <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="UserID"
                  name="UserID"
                  value={formData.UserID}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un técnico</option>
                  {mecanicos.map((mecanico) => (
                    <option key={mecanico.ID || mecanico.id} value={mecanico.ID || mecanico.id}>
                      {mecanico.FirstName} {mecanico.LastName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="Description" className="form-label">
                  Descripción del Trabajo <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="Description"
                  name="Description"
                  value={formData.Description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  minLength={10}
                  maxLength={500}
                  placeholder="Describa brevemente el trabajo a realizar..."
                />
                <small className="text-muted">Mínimo 10 caracteres, máximo 500</small>
              </div>
            </div>

            <div className={styles.formActions}>
              <Button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </Button>
              <Button type="submit">
                Guardar Orden
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card title="Lista de Órdenes de Trabajo">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Fecha Orden</th>
                <th>Estado</th>
                <th>Vehículo</th>
                <th>Técnico</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No hay órdenes de trabajo registradas
                  </td>
                </tr>
              ) : (
                ordenes.map((orden) => (
                  <tr key={orden.id}>
                    <td>{formatDate(orden.OrderDate)}</td>
                    <td>
                      <span className={`badge ${styles[orden.Status.toLowerCase()]}`}>
                        {orden.Status}
                      </span>
                    </td>
                    <td>{orden.LicensePlate || 'N/A'}</td>
                    <td>{orden.TechnicianName || 'N/A'}</td>
                    <td className={styles.description}>
                      {orden.Description.length > 50 
                        ? `${orden.Description.substring(0, 50)}...` 
                        : orden.Description
                      }
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

export default Ordenes