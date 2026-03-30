import { GitBranch } from 'lucide-react'
import { Loading } from '../components/ui/Loading'
import { useGateway } from '../hooks/useFetch'
import { formatTime, formatCountdown } from '../utils/format'
import './Gateway.css'

export default function Gateway() {
  const { gatewayStatus, logs, loading, countdown } = useGateway()

  if (loading) return <Loading />

  const isRunning = gatewayStatus?.running

  return (
    <div className="fade-in">
      <div className="section-header mb-lg">
        <div className="section-title-group">
          <GitBranch size={22} className="section-icon" />
          <h2 className="section-title">网关监控</h2>
          <span className={`timeline-badge ${isRunning ? 'success' : 'warning'}`}>{isRunning ? '运行中' : '已停止'}</span>
          <span className="timeline-badge highlight">每1分钟自动检测</span>
        </div>
      </div>

      <div className="gateway-stats">
        <div className="stat-card">
          <div className="stat-icon">●</div>
          <div className="stat-content">
            <span className={`stat-value ${isRunning ? 'success' : 'warning'}`}>{isRunning ? '正常' : '异常'}</span>
            <span className="stat-label">健康状态</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">●</div>
          <div className="stat-content">
            <span className="stat-value">{formatTime(gatewayStatus?.lastCheck)}</span>
            <span className="stat-label">最后检测</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">●</div>
          <div className="stat-content">
            <span className="stat-value countdown">{formatCountdown(countdown)}</span>
            <span className="stat-label">下次扫描</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">●</div>
          <div className="stat-content">
            <span className="stat-value">{logs.length}</span>
            <span className="stat-label">日志条数</span>
          </div>
        </div>
      </div>

      {isRunning && gatewayStatus?.processes?.map((proc, index) => (
        <div key={index} className="gateway-process-card">
          <div className="gateway-process-header">
            <div className="gateway-process-icon running">●</div>
            <div className="gateway-process-info">
              <h4>OpenClaw Gateway</h4>
              <span className="gateway-process-meta">PID: {proc.pid}</span>
            </div>
            <span className="gateway-process-status running">运行中</span>
          </div>
        </div>
      ))}
    </div>
  )
}
