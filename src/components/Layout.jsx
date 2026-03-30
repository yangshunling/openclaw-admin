import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { LayoutDashboard, Globe, MessageSquare, Settings, Wrench, Server, Puzzle, Search } from 'lucide-react'
import './Layout.css'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: '概览' },
  { path: '/gateway', icon: Globe, label: '网关监控' },
  { path: '/sessions', icon: MessageSquare, label: '会话管理' },
  { path: '/config', icon: Settings, label: '配置管理' },
  { path: '/skills', icon: Wrench, label: 'Skills技能' },
  { path: '/mcp', icon: Server, label: 'MCP服务' },
  { path: '/plugins', icon: Puzzle, label: '插件管理' },
]

export default function Layout() {
  const [search, setSearch] = useState('')
  const location = useLocation()

  const currentPage = navItems.find(i => i.path === location.pathname)?.label || '概览'

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo"><span className="logo-icon">⚡</span><span className="logo-text">OpenClaw监控</span></div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <item.icon size={20} /><span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h1 className="page-title">{currentPage}</h1>
          <div className="top-bar-actions">
            <div className="search-box"><Search size={18} /><input type="text" placeholder="搜索..." value={search} onChange={e => setSearch(e.target.value)} /></div>
            <div className="status-badge"><span className="status-dot"></span>运行中</div>
          </div>
        </header>
        <div className="content-area"><Outlet /></div>
      </main>
    </div>
  )
}