import { useState } from 'react'
import { Search } from 'lucide-react'
import { Loading } from '../components/ui/Loading'
import './Tools.css'

const defaultTools = [
  { name: 'read', category: 'file', description: '读取文件内容' },
  { name: 'write', category: 'file', description: '写入文件内容' },
  { name: 'edit', category: 'file', description: '编辑文件内容' },
  { name: 'exec', category: 'system', description: '执行 shell 命令' },
  { name: 'process', category: 'system', description: '管理后台进程' },
  { name: 'web_search', category: 'network', description: '网页搜索' },
  { name: 'web_fetch', category: 'network', description: '获取网页内容' },
  { name: 'memory_search', category: 'memory', description: '搜索记忆' },
  { name: 'memory_get', category: 'memory', description: '获取记忆片段' },
  { name: 'sessions_list', category: 'session', description: '列出会话' },
  { name: 'sessions_send', category: 'session', description: '发送消息到会话' },
  { name: 'sessions_spawn', category: 'session', description: '创建子会话' },
  { name: 'session_status', category: 'session', description: '会话状态' },
  { name: 'subagents', category: 'session', description: '子代理管理' },
]

const categoryNames = { file: '文件', system: '系统', network: '网络', memory: '记忆', session: '会话' }

export default function Tools() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [copied, setCopied] = useState(null)

  const filtered = defaultTools.filter(t => {
    const match = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.includes(search)
    return category === 'all' ? match : match && t.category === category
  })

  const handleCopy = (name) => { navigator.clipboard.writeText(name); setCopied(name); setTimeout(() => setCopied(null), 2000) }

  const categories = ['all', 'file', 'system', 'network', 'memory', 'session']

  return (
    <div className="fade-in">
      <div className="flex-center gap-md mb-lg">
        <div className="search-box"><Search size={18} /><input type="text" placeholder="搜索工具..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        <div className="filter-tabs">
          {categories.map(c => (
            <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c === 'all' ? '全部' : categoryNames[c]}</button>
          ))}
        </div>
      </div>

      <div className="grid-auto">
        {filtered.map(tool => (
          <div key={tool.name} className="card">
            <div className="card-header">
              <h3 className="font-mono">{tool.name}</h3>
              <button className={`copy-btn ${copied === tool.name ? 'copied' : ''}`} onClick={() => handleCopy(tool.name)}>{copied === tool.name ? 'OK' : 'CP'}</button>
            </div>
            <p className="text-muted text-sm mb-md">{tool.description}</p>
            <div className="flex-between">
              <span className="badge-accent">{tool.category}</span>
              <span className="text-muted text-sm">Built-in</span>
            </div>
          </div>
        ))}
      </div>

      <div className="footer-stats">共 {defaultTools.length} 个工具</div>
    </div>
  )
}