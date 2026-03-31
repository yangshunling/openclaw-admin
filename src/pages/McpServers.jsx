import { useState } from 'react'
import { Search, Wrench, RefreshCw, Server } from 'lucide-react'
import { useMcp } from '../hooks/useFetch'
import { Loading } from '../components/ui/Loading'
import './McpServers.css'

export default function McpServers() {
  const { data: mcpData, loading, reload } = useMcp()
  const [search, setSearch] = useState('')

  if (loading) return <Loading />

  // 合并内置工具和自定义 MCP 服务
  const builtinTools = mcpData?.builtin || []
  const customServers = mcpData?.custom || []

  // 搜索过滤
  const filterItems = (items) => items.filter(item =>
    item.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredBuiltin = filterItems(builtinTools)
  const filteredCustom = filterItems(customServers)

  return (
    <div className="fade-in">
      <div className="section-header mb-lg">
        <div className="section-title-group">
          <Wrench size={22} className="section-icon" />
          <h2 className="section-title">MCP服务</h2>
          {customServers.length > 0 && <span className="timeline-badge success">{customServers.length} 个自定义</span>}
        </div>
        <div className="section-actions">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="搜索..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-secondary" onClick={reload}>
            <RefreshCw size={16} />刷新
          </button>
        </div>
      </div>

      {/* 自定义 MCP 服务 */}
      {filteredCustom.length > 0 && (
        <>
          <div className="section-header mb-md">
            <div className="section-title-group">
              <Server size={18} className="section-icon" />
              <h3 className="section-title">自定义服务</h3>
            </div>
          </div>
          <div className="grid-auto mb-lg">
            {filteredCustom.map((server, index) => (
              <div key={server.name || index} className="card mcp-card">
                <div className="mcp-card-header">
                  <h3 className="font-mono">{server.name}</h3>
                  {server.running && <div className="status-dot"></div>}
                </div>
                <p className="text-muted text-sm mb-md">{server.description || '自定义 MCP 服务'}</p>
                <div className="mcp-card-footer">
                  <span className="badge-accent">自定义</span>
                  <span className="text-muted text-sm">{server.command?.split(' ')[0] || '-'}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 内置工具 */}
      <div className="section-header mb-md">
        <div className="section-title-group">
          <Wrench size={18} className="section-icon" />
          <h3 className="section-title">内置工具</h3>
        </div>
      </div>
      <div className="grid-auto">
        {filteredBuiltin.map(tool => (
          <div key={tool.name} className="card">
            <div className="card-header">
              <h3 className="font-mono">{tool.name}</h3>
            </div>
            <p className="text-muted text-sm mb-md">{tool.description || '工具描述'}</p>
            <div className="flex-between">
              <span className="badge-accent">{tool.category || '工具'}</span>
              <span className="badge-gray">内置</span>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-stats">
        共 {builtinTools.length + customServers.length} 个服务（自定义 {customServers.length}，内置 {builtinTools.length}）
      </div>
    </div>
  )
}