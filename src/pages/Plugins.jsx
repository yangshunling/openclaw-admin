import { useState, useEffect } from 'react'
import { Search, RefreshCw, Puzzle } from 'lucide-react'
import { useConfig } from '../hooks/useFetch'
import { Loading } from '../components/ui/Loading'
import './Plugins.css'

export default function Plugins() {
  const { data: config, loading, reload } = useConfig()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  if (loading) return <Loading />

  const plugins = Object.entries(config?.plugins?.entries || {}).map(([id, cfg]) => ({
    id, name: id, enabled: cfg.enabled !== false, version: config?.plugins?.installs?.[id]?.version || 'unknown'
  }))

  const filtered = plugins.filter(p => {
    const match = p.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'enabled') return match && p.enabled
    if (filter === 'disabled') return match && !p.enabled
    return match
  })

  const filterLabels = { all: '全部', enabled: '已启用', disabled: '已禁用' }

  return (
    <div className="fade-in">
      <div className="section-header mb-lg">
        <div className="section-title-group">
          <Puzzle size={22} className="section-icon" />
          <h2 className="section-title">插件管理</h2>
        </div>
        <div className="section-actions">
          <div className="search-box"><Search size={18} /><input type="text" placeholder="搜索插件..." value={search} onChange={e => setSearch(e.target.value)} /></div>
          <button className="btn btn-secondary" onClick={reload}><RefreshCw size={16} />刷新</button>
        </div>
      </div>

      <div className="grid-auto">
        {filtered.map(plugin => (
          <div key={plugin.id} className={'card ' + (plugin.enabled ? 'enabled' : 'disabled')}>
            <div className="flex-center gap-md mb-md">
              <div className="plugin-icon">P</div>
              <div><h3>{plugin.name}</h3><div className="text-muted text-sm">v{plugin.version}</div></div>
            </div>
            <span className={'badge ' + (plugin.enabled ? 'badge-success' : 'badge-muted')}>{plugin.enabled ? '运行中' : '已停止'}</span>
          </div>
        ))}
      </div>

      <div className="footer-stats">共 {plugins.length} 个插件，已启用 {plugins.filter(p => p.enabled).length} 个</div>
    </div>
  )
}