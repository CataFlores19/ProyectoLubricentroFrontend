import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'
import Toast from '../../components/Toast/Toast'
import { fetchWithAuth, postWithAuth } from '../../utils/api'
import styles from './Vehiculos.module.css'

const API_URL = 'http://localhost:5000/api/vehicles'
const API_CLIENTES_URL = 'http://localhost:5000/api/clients'

const Vehiculos = () => {
  const location = useLocation()
  const [vehiculos, setVehiculos] = useState([])
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState(null)
  const [filtroClienteId, setFiltroClienteId] = useState(null)
  const [filtroClienteNombre, setFiltroClienteNombre] = useState('')
  const [formData, setFormData] = useState({
    LicensePlate: '',
    Color: '',
    Brand: '',
    Model: '',
    Year: '',
    ClientID: ''
  })

  useEffect(() => {
    // Verificar si viene filtro desde otra página
    if (location.state?.clienteId) {
      setFiltroClienteId(location.state.clienteId)
      setFiltroClienteNombre(location.state.clienteNombre || '')
    }
    cargarDatos()
  }, [location])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      
      const [vehiculosResult, clientesResult] = await Promise.all([
        fetchWithAuth(API_URL),
        fetchWithAuth(API_CLIENTES_URL)
      ])
      
      setVehiculos(vehiculosResult.data || [])
      setClientes(clientesResult.data || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
      
      // Datos ficticios para pruebas
      const clientesFicticios = [
        {
          ID: 1,
          RUN: '12.345.678-9',
          FirstName: 'Juan',
          LastName: 'Pérez',
          Phone: '0999123456',
          Email: 'juan.perez@email.com'
        },
        {
          ID: 2,
          RUN: '23.456.789-0',
          FirstName: 'María',
          LastName: 'González',
          Phone: '0987654321',
          Email: 'maria.gonzalez@email.com'
        }
      ]
      
      const vehiculosFicticios = [
        {
          id: 1,
          LicensePlate: 'AABB12',
          Color: 'Rojo',
          Brand: 'Toyota',
          Model: 'Corolla',
          Year: 2020,
          ClientID: 1
        },
        {
          id: 2,
          LicensePlate: 'CCDD34',
          Color: 'Azul',
          Brand: 'Honda',
          Model: 'Civic',
          Year: 2021,
          ClientID: 1
        },
        {
          id: 3,
          LicensePlate: 'EEFF56',
          Color: 'Blanco',
          Brand: 'Nissan',
          Model: 'Sentra',
          Year: 2019,
          ClientID: 2
        },
        {
          id: 4,
          LicensePlate: 'GGHH78',
          Color: 'Negro',
          Brand: 'Chevrolet',
          Model: 'Cruze',
          Year: 2022,
          ClientID: 2
        }
      ]
      
      setClientes(clientesFicticios)
      setVehiculos(vehiculosFicticios)
      
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
      // Preparar datos para enviar, convirtiendo ClientID a número
      const dataToSend = {
        ...formData,
        ClientID: parseInt(formData.ClientID) || null,
        Year: parseInt(formData.Year) || null
      }
      
      const nuevoVehiculo = await postWithAuth(API_URL, dataToSend)
      
      // Limpiar formulario y cerrar
      setFormData({
        LicensePlate: '',
        Color: '',
        Brand: '',
        Model: '',
        Year: '',
        ClientID: ''
      })
      setShowForm(false)
      
      // Mostrar notificación de éxito
      setToast({
        type: 'success',
        message: '✓ Vehículo creado exitosamente'
      })
      
      // Recargar la lista de vehículos
      await cargarDatos()
      
    } catch (error) {
      console.error('Error al crear vehículo:', error)
      setToast({
        type: 'error',
        message: `✗ ${error.message}`
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      LicensePlate: '',
      Color: '',
      Brand: '',
      Model: '',
      Year: '',
      ClientID: ''
    })
    setShowForm(false)
  }

  // Función para obtener el nombre completo del cliente
  const getClienteName = (clientId) => {
    const cliente = clientes.find(c => c.ID === clientId)
    return cliente ? `${cliente.FirstName} ${cliente.LastName}` : 'Cliente no encontrado'
  }

  // Filtrar vehículos por cliente si hay filtro activo
  const vehiculosFiltrados = filtroClienteId 
    ? vehiculos.filter(v => v.ClientID === filtroClienteId)
    : vehiculos

  // Función para limpiar el filtro
  const limpiarFiltro = () => {
    setFiltroClienteId(null)
    setFiltroClienteNombre('')
  }

  if (loading) {
    return (
      <DashboardLayout title="Gestión de Vehículos" subtitle="Administración de vehículos del lubricentro">
        <Loading />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Gestión de Vehículos" subtitle="Administración de vehículos del lubricentro">
      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {filtroClienteId && (
        <div className="alert alert-info alert-dismissible fade show mb-3" role="alert">
          <i className="bi bi-filter-circle me-2"></i>
          Mostrando vehículos de: <strong>{filtroClienteNombre}</strong>
          <button 
            type="button" 
            className="btn-close" 
            onClick={limpiarFiltro}
            aria-label="Close"
          ></button>
        </div>
      )}
      
      <div className={styles.header}>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <i className="bi bi-plus-circle me-2"></i>
            Nuevo Vehículo
          </Button>
        )}
      </div>

      {showForm && (
        <Card title="Nuevo Vehículo" className="mb-4">
          <form onSubmit={handleSubmit} className={styles.vehiculoForm}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="LicensePlate" className="form-label">
                  Patente <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="LicensePlate"
                  name="LicensePlate"
                  value={formData.LicensePlate}
                  onChange={handleInputChange}
                  required
                  placeholder="AABB12"
                  title="Formato: AABB12"
                  style={{ textTransform: 'uppercase' }}
                />
                <small className="text-muted">Formato: AABB12</small>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="ClientID" className="form-label">
                  Cliente <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="ClientID"
                  name="ClientID"
                  value={formData.ClientID}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.ID} value={cliente.ID}>
                      {cliente.FirstName} {cliente.LastName} - {cliente.RUN}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Brand" className="form-label">
                  Marca <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Brand"
                  name="Brand"
                  value={formData.Brand}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={50}
                  placeholder="Toyota, Honda, etc."
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Model" className="form-label">
                  Modelo <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Model"
                  name="Model"
                  value={formData.Model}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={50}
                  placeholder="Corolla, Civic, etc."
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Year" className="form-label">
                  Año <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Year"
                  name="Year"
                  value={formData.Year}
                  onChange={handleInputChange}
                  required
                  max={new Date().getFullYear() + 1}
                  placeholder="2020"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Color" className="form-label">
                  Color <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Color"
                  name="Color"
                  value={formData.Color}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={30}
                  placeholder="Azul, Rojo, Blanco, etc."
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <Button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </Button>
              <Button type="submit">
                Guardar Vehículo
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card title="Lista de Vehículos">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Patente</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
                <th>Color</th>
                <th>Cliente</th>
              </tr>
            </thead>
            <tbody>
              {vehiculosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    {filtroClienteId 
                      ? 'Este cliente no tiene vehículos registrados' 
                      : 'No hay vehículos registrados'}
                  </td>
                </tr>
              ) : (
                vehiculosFiltrados.map((vehiculo) => (
                  <tr key={vehiculo.id}>
                    <td>
                      <span className={styles.patente}>
                        {vehiculo.LicensePlate}
                      </span>
                    </td>
                    <td>{vehiculo.Brand}</td>
                    <td>{vehiculo.Model}</td>
                    <td>{vehiculo.Year}</td>
                    <td>
                      <span className={styles.colorBadge}>
                        {vehiculo.Color}
                      </span>
                    </td>
                    <td>{getClienteName(vehiculo.ClientID)}</td>
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

export default Vehiculos