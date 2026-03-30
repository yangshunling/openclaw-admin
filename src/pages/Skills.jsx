import { useState } from 'react'
import { Search, RefreshCw, Wrench } from 'lucide-react'
import { useSkills } from '../hooks/useFetch'
import { Loading } from '../components/ui/Loading'
import './Skills.css'

export default function Skills() {
  const { data: skills = [], loading, reload } = useSkills()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('全部')

  const filters = ['全部', '已启用', '已禁用']

  const skillsList = skills || []
  const filtered = skillsList.filter(s => {
    const match = s.name.toLowerCase().includes(search.toLowerCase())
    if (filter === '已启用') return match && s.enabled
    if (filter === '已禁用') return match && !s.enabled
    return match
  })

  if (loading) return <Loading />

  return (
    <div className="fade-in">
      <div className="section-header">
        <div className="section-title-group">
          <Wrench size={22} className="section-icon" />
          <h2 className="section-title">Skills</h2>
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

      <div className="grid-auto">
        {filtered.map(skill => (
          <div key={skill.name} className={'card ' + (skill.enabled ? '' : 'card-disabled')}>
            <div className="flex-between mb-sm">
              <h3 className="text-accent font-mono">{skill.name}</h3>
              <span className="badge-gray">v{skill.version || '1.0.0'}</span>
            </div>
            <p className="text-muted text-sm mb-md">{skill.description || '自定义技能'}</p>
          </div>
        ))}
      </div>

      <div className="footer-stats">共 {skills.length} 个 Skills</div>
    </div>
  )
}