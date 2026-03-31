import { useState } from 'react'
import { Search, RefreshCw, Wrench } from 'lucide-react'
import { useSkills } from '../hooks/useFetch'
import { Loading } from '../components/ui/Loading'
import './Skills.css'

export default function Skills() {
  const { data: skills = [], loading, reload } = useSkills()
  const [search, setSearch] = useState('')

  if (loading) return <Loading />

  const skillsList = Array.isArray(skills) ? skills : []

  const filtered = skillsList.filter(s => {
    const searchLower = search.toLowerCase()
    return (
      s.name?.toLowerCase().includes(searchLower) ||
      s.description?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="fade-in">
      <div className="section-header mb-lg">
        <div className="section-title-group">
          <Wrench size={22} className="section-icon" />
          <h2 className="section-title">Skills技能</h2>
          {skillsList.length > 0 && <span className="timeline-badge success">{skillsList.length} 个技能</span>}
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
          <div key={skill.name} className="card">
            <h3 className="text-accent font-mono skill-name">{skill.name}</h3>
            <p className="text-muted text-sm skill-description">{skill.description || '自定义技能'}</p>
            <span className="skill-version">v{skill.version || '1.0.0'}</span>
          </div>
        ))}
      </div>

      <div className="footer-stats">共 {skillsList.length} 个 Skills</div>
    </div>
  )
}