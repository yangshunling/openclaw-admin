import { useState, useEffect } from 'react'
import { Activity, Clock, Zap, Cpu, HardDrive, Network } from 'lucide-react'
import { useConfig, useStatus } from '../hooks/useFetch'
import { Loading } from '../components/ui/Loading'
import { formatUptime } from '../utils/format'
import './Dashboard.css'

export default function Dashboard() {
  const { data: config, loading: configLoading } = useConfig()
  const { data: status, loading: statusLoading } = useStatus(2000)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (configLoading || statusLoading) return <Loading />

  const version = config?.meta?.lastTouchedVersion || 'unknown'
  const channelsCount = Object.keys(config?.channels || {}).length

  return (
    <div className="fade-in">
      <div className="grid-4">
        <div className="card flex-center gap-md">
          <div className="icon-box accent"><Zap size={24} /></div>
          <div><div className="text-muted text-sm">版本</div><div className="text-lg font-mono">v{version}</div></div>
        </div>
        <div className="card flex-center gap-md">
          <div className="icon-box success"><Clock size={24} /></div>
          <div><div className="text-muted text-sm">运行时间</div><div className="text-lg font-mono">{formatUptime(status?.uptime)}</div></div>
        </div>
        <div className="card flex-center gap-md">
          <div className="icon-box info"><Activity size={24} /></div>
          <div><div className="text-muted text-sm">当前时间</div><div className="text-lg font-mono">{currentTime.toLocaleTimeString()}</div></div>
        </div>
        <div className="card flex-center gap-md">
          <div className="icon-box warning"><Network size={24} /></div>
          <div><div className="text-muted text-sm">通道数</div><div className="text-lg font-mono">{channelsCount}</div></div>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <div className="section-title-group">
            <Cpu size={20} className="section-icon" />
            <h2 className="section-title">系统资源</h2>
          </div>
        </div>
        <div className="grid-3">
          <div className="card"><div className="monitor"><div className="monitor-header"><Cpu size={20}/>CPU</div><div className="progress-bar"><div className="progress-fill" style={{width: (status?.cpu||0)+'%'}}></div></div><div className="text-right font-mono">{status?.cpu||0}%</div></div></div>
          <div className="card"><div className="monitor"><div className="monitor-header"><Activity size={20}/>内存</div><div className="progress-bar"><div className="progress-fill memory" style={{width: (status?.memory||0)+'%'}}></div></div><div className="text-right font-mono">{status?.memory||0}%</div></div></div>
          <div className="card"><div className="monitor"><div className="monitor-header"><HardDrive size={20}/>磁盘</div><div className="progress-bar"><div className="progress-fill disk" style={{width: (status?.disk||0)+'%'}}></div></div><div className="text-right font-mono">{status?.disk||0}%</div></div></div>
        </div>
      </section>
    </div>
  )
}
