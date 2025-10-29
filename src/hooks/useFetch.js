import { useState, useEffect } from 'react'
import { getAuthHeaders } from '../utils/api'

// Custom hook para fetch de datos con autenticación JWT
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(url, {
          headers: {
            ...getAuthHeaders(),
            ...options.headers,
          },
          ...options,
        })
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      fetchData()
    }
  }, [url])

  return { data, loading, error }
}

export default useFetch