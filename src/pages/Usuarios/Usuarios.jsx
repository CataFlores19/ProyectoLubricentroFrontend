import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import Loading from '../../components/Loading/Loading'
import Toast from '../../components/Toast/Toast'
import { fetchWithAuth, postWithAuth } from '../../utils/api'
import styles from './Usuarios.module.css'

const API_URL = 'http://localhost:5000/api/users'
const API_ROLES_URL = 'http://localhost:5000/api/roles'

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState(null)
  const [formData, setFormData] = useState({
    Email: '',
    FirstName: '',
    LastName: '',
    Password: '',
    Phone: '',
    RUN: '',
    RoleID: ''
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      
      const [usuariosResult, rolesResult] = await Promise.all([
        fetchWithAuth(API_URL),
        fetchWithAuth(API_ROLES_URL)
      ])
      
      setUsuarios(usuariosResult.data || [])
      setRoles(rolesResult.data || [])
    } catch (error) {
      console.error('Error al cargar datos:', error)
      
      // Datos ficticios para pruebas
      const rolesFicticios = [
        { ID: 1, Name: 'Administrador' },
        { ID: 2, Name: 'Técnico' },
        { ID: 3, Name: 'Recepcionista' }
      ]
      
      const usuariosFicticios = [
        {
          id: 1,
          RUN: '11.111.111-1',
          FirstName: 'Admin',
          LastName: 'Sistema',
          Email: 'admin@lubricentro.com',
          Phone: '0999111111',
          RoleID: 1
        },
        {
          id: 2,
          RUN: '22.222.222-2',
          FirstName: 'Pedro',
          LastName: 'Técnico',
          Email: 'pedro.tecnico@lubricentro.com',
          Phone: '0999222222',
          RoleID: 2
        },
        {
          id: 3,
          RUN: '33.333.333-3',
          FirstName: 'Laura',
          LastName: 'Recepción',
          Email: 'laura.recepcion@lubricentro.com',
          Phone: '0999333333',
          RoleID: 3
        },
        {
          id: 4,
          RUN: '44.444.444-4',
          FirstName: 'Miguel',
          LastName: 'Torres',
          Email: 'miguel.torres@lubricentro.com',
          Phone: '0999444444',
          RoleID: 2
        }
      ]
      
      setRoles(rolesFicticios)
      setUsuarios(usuariosFicticios)
      
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
      const nuevoUsuario = await postWithAuth(API_URL, {
        ...formData,
        RoleID: parseInt(formData.RoleID) // Convertir a número
      })
      
      // Limpiar formulario y cerrar
      setFormData({
        Email: '',
        FirstName: '',
        LastName: '',
        Password: '',
        Phone: '',
        RUN: '',
        RoleID: ''
      })
      setShowForm(false)
      
      // Mostrar notificación de éxito
      setToast({
        type: 'success',
        message: '✓ Usuario creado exitosamente'
      })
      
      // Recargar la lista de usuarios
      await cargarDatos()
      
    } catch (error) {
      console.error('Error al crear usuario:', error)
      setToast({
        type: 'error',
        message: `✗ ${error.message}`
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      Email: '',
      FirstName: '',
      LastName: '',
      Password: '',
      Phone: '',
      RUN: '',
      RoleID: ''
    })
    setShowForm(false)
  }

  // Función para obtener el nombre del rol por ID
  const getRoleName = (roleId) => {
    const rol = roles.find(r => r.ID === roleId)
    return rol ? rol.Name : 'Sin rol'
  }

  if (loading) {
    return (
      <DashboardLayout title="Gestión de Usuarios" subtitle="Administración de usuarios del sistema">
        <Loading />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Gestión de Usuarios" subtitle="Administración de usuarios del sistema">
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
            Nuevo Usuario
          </Button>
        )}
      </div>

      {showForm && (
        <Card title="Nuevo Usuario" className="mb-4">
          <form onSubmit={handleSubmit} className={styles.usuarioForm}>
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
                
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="Password" className="form-label">
                  Contraseña <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  placeholder="Mínimo 6 caracteres"
                />
                <small className="text-muted">Mínimo 6 caracteres</small>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="RoleID" className="form-label">
                  Rol <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="RoleID"
                  name="RoleID"
                  value={formData.RoleID}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un rol</option>
                  {roles.map((rol) => (
                    <option key={rol.ID} value={rol.ID}>
                      {rol.Name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formActions}>
              <Button type="button" onClick={handleCancel} className="btn-secondary">
                Cancelar
              </Button>
              <Button type="submit">
                Guardar Usuario
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card title="Lista de Usuarios">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>RUN</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.RUN}</td>
                    <td>{usuario.FirstName}</td>
                    <td>{usuario.LastName}</td>
                    <td>{usuario.Email}</td>
                    <td>{usuario.Phone}</td>
                    <td>
                      <span className={`badge bg-primary`}>
                        {usuario.RoleID ? getRoleName(usuario.RoleID) : (usuario.Role || 'Sin rol')}
                      </span>
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

export default Usuarios
