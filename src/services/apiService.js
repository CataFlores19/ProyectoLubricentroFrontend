// Ejemplo de servicio API usando Fetch
const API_BASE_URL = 'http://localhost:8000/api' // Cambiar por la URL de tu API

// Configuración base para fetch
const fetchConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

// Función helper para manejar respuestas
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || 'Error en la petición')
  }
  
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }
  return response.text()
}

// Servicio API genérico
export const apiService = {
  // GET request
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        ...fetchConfig,
      })
      return await handleResponse(response)
    } catch (error) {
      console.error('GET Error:', error)
      throw error
    }
  },

  // POST request
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        ...fetchConfig,
        body: JSON.stringify(data),
      })
      return await handleResponse(response)
    } catch (error) {
      console.error('POST Error:', error)
      throw error
    }
  },

  // PUT request
  put: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        ...fetchConfig,
        body: JSON.stringify(data),
      })
      return await handleResponse(response)
    } catch (error) {
      console.error('PUT Error:', error)
      throw error
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        ...fetchConfig,
      })
      return await handleResponse(response)
    } catch (error) {
      console.error('DELETE Error:', error)
      throw error
    }
  },
}

export default apiService