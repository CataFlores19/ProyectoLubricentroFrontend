// Utilidad para realizar peticiones HTTP con autenticación JWT

/**
 * Obtiene el token JWT del localStorage
 * @returns {string|null} El token JWT o null si no existe
 */
export const getAuthToken = () => {
  return localStorage.getItem('token')
}

/**
 * Obtiene los headers con autenticación JWT
 * @returns {object} Headers con el token de autenticación
 */
export const getAuthHeaders = () => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

/**
 * Realiza una petición GET autenticada
 * @param {string} url - URL de la API
 * @returns {Promise} Promesa con los datos de la respuesta
 */
export const fetchWithAuth = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  
  return await response.json()
}

/**
 * Realiza una petición POST autenticada
 * @param {string} url - URL de la API
 * @param {object} data - Datos a enviar en el body
 * @returns {Promise} Promesa con los datos de la respuesta
 */
export const postWithAuth = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || errorData.msg || 'Error en la petición')
  }
  
  return await response.json()
}

/**
 * Realiza una petición PUT autenticada
 * @param {string} url - URL de la API
 * @param {object} data - Datos a actualizar
 * @returns {Promise} Promesa con los datos de la respuesta
 */
export const putWithAuth = async (url, data) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || errorData.msg || 'Error en la petición')
  }
  
  return await response.json()
}

/**
 * Realiza una petición DELETE autenticada
 * @param {string} url - URL de la API
 * @returns {Promise} Promesa con los datos de la respuesta
 */
export const deleteWithAuth = async (url) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || errorData.msg || 'Error en la petición')
  }
  
  return await response.json()
}
