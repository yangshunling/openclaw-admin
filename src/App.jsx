import { Routes, Route } from 'react-router-dom'
import { CacheProvider } from './hooks/useFetch'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Skills from './pages/Skills'
import Config from './pages/Config'
import Plugins from './pages/Plugins'
import McpServers from './pages/McpServers'
import Gateway from './pages/Gateway'
import Sessions from './pages/Sessions'

export default function App() {
  return (
    <CacheProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="skills" element={<Skills />} />
          <Route path="config" element={<Config />} />
          <Route path="plugins" element={<Plugins />} />
          <Route path="mcp" element={<McpServers />} />
          <Route path="gateway" element={<Gateway />} />
          <Route path="sessions" element={<Sessions />} />
        </Route>
      </Routes>
    </CacheProvider>
  )
}
