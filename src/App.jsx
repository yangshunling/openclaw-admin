import { useLocation } from 'react-router-dom'
import { CacheProvider } from './hooks/useFetch'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Skills from './pages/Skills'
import Config from './pages/Config'
import Plugins from './pages/Plugins'
import McpServers from './pages/McpServers'
import Gateway from './pages/Gateway'
import Sessions from './pages/Sessions'

// 路由配置 - 使用 key 保持组件实例
const routes = [
  { path: '/', element: <Dashboard key="dashboard" /> },
  { path: '/gateway', element: <Gateway key="gateway" /> },
  { path: '/sessions', element: <Sessions key="sessions" /> },
  { path: '/config', element: <Config key="config" /> },
  { path: '/skills', element: <Skills key="skills" /> },
  { path: '/mcp', element: <McpServers key="mcp" /> },
  { path: '/plugins', element: <Plugins key="plugins" /> },
]

// 缓存路由组件 - 渲染所有路由但只显示当前活跃的
function CachedRoutes() {
  const location = useLocation()

  return (
    <>
      {routes.map(route => (
        <div
          key={route.path}
          style={{
            display: location.pathname === route.path ? 'block' : 'none',
            height: '100%'
          }}
        >
          {route.element}
        </div>
      ))}
    </>
  )
}

export default function App() {
  return (
    <CacheProvider>
      <Layout>
        <CachedRoutes />
      </Layout>
    </CacheProvider>
  )
}