import { useState, useEffect } from 'react'
import { Search, RefreshCw, Users, MessageSquare, Clock } from 'lucide-react'
import { useConfig } from '../hooks/useFetch'
import { Loading } from '../components/ui/Loading'
import './Sessions.css'

const channelNames = { feishu: '飞书', dingtalk: '钉钉' }

function formatTime(timestamp) {
  if (!timestamp) return '-'
  return new Date(timestamp).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export default function Sessions() {
  const { data: config, loading: configLoading, reload } = useConfig()
  const [sessions, setSessions] = useState([])
  const [sessionsLoading, setSessionsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [channelFilter, setChannelFilter] = useState('全部')

  useEffect(() => {
    const fetchSessions = () => {
      fetch('/api/sessions')
        .then(r => r.json())
        .then(data => {
          setSessions(data)
          setSessionsLoading(false)
        })
        .catch(() => setSessionsLoading(false))
    }
    fetchSessions()
    const timer = setInterval(fetchSessions, 5000)
    return () => clearInterval(timer)
  }, [])

  if (configLoading || sessionsLoading) return <Loading />

  const agents = (config?.agents?.list || []).map(a => ({
    id: a.id,
    name: a.name || a.id,
    workspace: a.workspace
  }))

  const bindings = config?.bindings || []
  const agentChannels = {}
  bindings.forEach(b => {
    if (!agentChannels[b.agentId]) agentChannels[b.agentId] = []
    agentChannels[b.agentId].push(b.match?.channel)
  })

  const channels = ['全部', ...new Set(sessions.map(s => s.channel).filter(Boolean))]

  const filteredAgents = agents.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
  const filteredSessions = sessions.filter(s => {
    const match = s.label?.toLowerCase().includes(search.toLowerCase()) || s.key?.toLowerCase().includes(search.toLowerCase())
    if (channelFilter === '全部') return match
    return match && s.channel === channelFilter
  })

  return (
    <div className="fade-in">
      <section className="mb-xl">
        <div className="section-header">
          <div className="section-title-group">
            <Users size={22} className="section-icon" />
            <h2 className="section-title">智能体列表</h2>
          </div>
          <div className="section-actions">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="搜索智能体..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="btn btn-secondary" onClick={reload}>
              <RefreshCw size={16} />刷新
            </button>
          </div>
        </div>

        <div className="agents-grid">
          {filteredAgents.map(agent => {
            const channels = agentChannels[agent.id] || []
            const agentSessions = sessions.filter(s => s.agentId === agent.id)
            const workspaceName = agent.workspace?.split('\\').pop() || '默认'
            return (
              <div key={agent.id} className="agent-card">
                <div className="agent-card-header">
                  <div className="agent-avatar">{agent.name.charAt(0).toUpperCase()}</div>
                  <div className="agent-info">
                    <h3 className="agent-name">{agent.name}</h3>
                    <span className="agent-id">{agent.id}</span>
                  </div>
                </div>
                <div className="agent-card-body">
                  <div className="agent-stat">
                    <span className="stat-label">工作空间</span>
                    <span className="stat-value">{workspaceName}</span>
                  </div>
                  <div className="agent-stat">
                    <span className="stat-label">会话数</span>
                    <span className="stat-value highlight">{agentSessions.length}</span>
                  </div>
                  <div className="agent-stat">
                    <span className="stat-label">渠道</span>
                    <div className="channel-tags">
                      {channels.length > 0 ? channels.slice(0, 3).map((ch, i) => (
                        <span key={i} className="channel-tag">{channelNames[ch] || ch}</span>
                      )) : <span className="no-channel">未配置</span>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <div className="section-header">
          <div className="section-title-group">
            <MessageSquare size={22} className="section-icon" />
            <h2 className="section-title">实时会话</h2>
          </div>
          <div className="section-actions">
            <div className="filter-buttons">
              {channels.map(ch => (
                <button key={ch} className={channelFilter === ch ? 'active' : ''} onClick={() => setChannelFilter(ch)}>
                  {ch === '全部' ? ch : (channelNames[ch] || ch)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sessions-table">
          <div className="table-header">
            <span className="col-session">会话</span>
            <span className="col-agent">智能体</span>
            <span className="col-channel">渠道</span>
            <span className="col-kind">类型</span>
            <span className="col-time">最后活跃</span>
          </div>
          <div className="table-body">
            {filteredSessions.length === 0 ? (
              <div className="table-empty">暂无会话数据</div>
            ) : (
              filteredSessions.map((session, index) => (
                <div key={index} className="table-row">
                  <span className="col-session session-label">{session.label || session.key?.split(':').pop()}</span>
                  <span className="col-agent agent-badge">{session.agentId}</span>
                  <span className="col-channel channel-badge">{channelNames[session.channel] || session.channel}</span>
                  <span className="col-kind kind-badge">{session.kind === 'group' ? '群聊' : '私聊'}</span>
                  <span className="col-time time-info">{formatTime(session.lastActive)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}