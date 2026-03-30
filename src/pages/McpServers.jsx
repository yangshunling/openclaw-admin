import { useState } from 'react'
import { Search, Wrench, RefreshCw } from 'lucide-react'
import './McpServers.css'

const defaultTools = [
  { name: 'read', category: '文件', description: '读取文件内容' },
  { name: 'write', category: '文件', description: '写入文件内容' },
  { name: 'edit', category: '文件', description: '编辑文件内容' },
  { name: 'exec', category: '系统', description: '执行 shell 命令' },
  { name: 'process', category: '系统', description: '管理后台进程' },
  { name: 'web_search', category: '网络', description: '网页搜索' },
  { name: 'web_fetch', category: '网络', description: '获取网页内容' },
  { name: 'memory_search', category: '记忆', description: '搜索记忆' },
  { name: 'memory_get', category: '记忆', description: '获取记忆片段' },
  { name: 'sessions_list', category: '会话', description: '列出会话' },
  { name: 'sessions_send', category: '会话', description: '发送消息到会话' },
  { name: 'sessions_spawn', category: '会话', description: '创建子会话' },
  { name: 'session_status', category: '会话', description: '会话状态' },
  { name: 'subagents', category: '会话', description: '子代理管理' },
]

export default function McpServers() {
  const [search, setSearch] = useState('')

  const filtered = defaultTools.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || t.description.includes(search)
  )

  const handleRefresh = () => {
    setSearch('')
  }

  return (
    <div className="fade-in">
      <div className="section-header mb-lg">
        <div className="section-title-group">
          <Wrench size={22} className="section-icon" />
          <h2 className="section-title">MCP工具</h2>
        </div>
        <div className="section-actions">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="搜索工具..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="btn btn-secondary" onClick={handleRefresh}>
            <RefreshCw size={16} />刷新
          </button>
        </div>
      </div>

      <div className="grid-auto">
        {filtered.map(tool => (
          <div key={tool.name} className="card">
            <div className="card-header">
              <h3 className="font-mono">{tool.name}</h3>
            </div>
            <p className="text-muted text-sm mb-md">{tool.description}</p>
            <div className="flex-between">
              <span className="badge-accent">{tool.category}</span>
              <span className="badge-gray">内置工具</span>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-stats">共 {defaultTools.length} 个工具</div>
    </div>
  )
}