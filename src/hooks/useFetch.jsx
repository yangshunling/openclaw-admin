import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CacheContext = createContext(null)

const cache = new Map()
const CACHE_TIMEOUT = 60000

export function CacheProvider({ children }) {
  const [cacheData, setCacheData] = useState({})

  const setCache = useCallback((key, data) => {
    cache.set(key, { data, timestamp: Date.now() })
    setCacheData(prev => ({ ...prev, [key]: data }))
  }, [])

  const getCache = useCallback((key) => {
    const cached = cache.get(key)
    if (cached && Date.now() - cached.timestamp < CACHE_TIMEOUT) {
      return cached.data
    }
    return null
  }, [])

  const clearCache = useCallback((key) => {
    if (key) {
      cache.delete(key)
      setCacheData(prev => {
        const newData = { ...prev }
        delete newData[key]
        return newData
      })
    }
  }, [])

  return (
    <CacheContext.Provider value={{ setCache, getCache, clearCache }}>
      {children}
    </CacheContext.Provider>
  )
}

export function useCacheFetch(key, fetcher) {
  const context = useContext(CacheContext)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getCache = context?.getCache || (() => null)
  const setCache = context?.setCache || (() => {})

  const fetchData = useCallback(async () => {
    const cached = getCache(key)
    if (cached !== null) {
      setData(cached)
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const result = await fetcher()
      setCache(key, result)
      setData(result)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [key, fetcher, getCache, setCache])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, reload: fetchData }
}

export function useConfig() {
  return useCacheFetch('config', () => fetch('/api/config').then(r => r.json()))
}

export function useStatus(refreshInterval = 2000) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = () => {
      fetch('/api/status')
        .then(r => r.json())
        .then(setData)
        .catch(() => {})
        .finally(() => setLoading(false))
    }
    fetchStatus()
    const timer = setInterval(fetchStatus, refreshInterval)
    return () => clearInterval(timer)
  }, [refreshInterval])

  return { data, loading, reload: () => fetchStatus() }
}

export function useSkills() {
  return useCacheFetch('skills', () => fetch('/api/skills').then(r => r.json()))
}

export function useGateway() {
  const context = useContext(CacheContext)
  const [gatewayStatus, setGatewayStatus] = useState(null)
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState(60000)

  const getCache = context?.getCache || (() => null)
  const setCache = context?.setCache || (() => {})

  const fetchStatus = useCallback(async () => {
    try {
      const data = await fetch('/api/gateway').then(r => r.json())
      setGatewayStatus(data)
      setCache('gateway', data)
      setLoading(false)
      setCountdown(60000)
    } catch {
      setGatewayStatus({ running: false, count: 0, processes: [] })
      setLoading(false)
    }
  }, [setCache])

  const fetchLogs = useCallback(async () => {
    try {
      const data = await fetch('/api/gateway/logs').then(r => r.json())
      setLogs(data)
      setCache('gateway_logs', data)
    } catch {}
  }, [setCache])

  useEffect(() => {
    fetchStatus()
    fetchLogs()
    
    const timer = setInterval(() => {
      fetchStatus()
      fetchLogs()
    }, 60000)
    
    const countdownTimer = setInterval(() => {
      setCountdown(prev => (prev <= 1000 ? 60000 : prev - 1000))
    }, 1000)
    
    return () => {
      clearInterval(timer)
      clearInterval(countdownTimer)
    }
  }, [fetchStatus, fetchLogs])

  return { gatewayStatus, logs, loading, countdown, refetch: () => { fetchStatus(); fetchLogs() } }
}

export default CacheContext