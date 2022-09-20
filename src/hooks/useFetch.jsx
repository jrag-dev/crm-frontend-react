import { useEffect, useState } from "react"


export const useFetch = (url) => {

  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    if (url !== '') {
      console.log('consultando...')
      callapi(url)
    }
  }, [url])

  const callapi = async (url) => {
    try {
      setLoading(true)
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setData(data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    error,
    loading
  }
}