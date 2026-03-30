import { useState, useEffect } from 'react'
import { Save, RefreshCw, Copy, Check, FileText, Settings, Edit3 } from 'lucide-react'
import { useConfig } from '../hooks/useFetch'
import { Loading } from '../components/ui/Loading'
import './Config.css'

export default function Config() {
  const { data: config, loading, reload } = useConfig()
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [jsonError, setJsonError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (config) setText(JSON.stringify(config, null, 2))
  }, [config])

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    if (!isEditing) {
      setIsEditing(true)
      return
    }
    try {
      JSON.parse(text)
      setJsonError(null)
      await fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: text })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      setIsEditing(false)
    } catch (e) {
      setJsonError(e.message)
    }
  }

  const handleChange = (e) => {
    const v = e.target.value
    setText(v)
    try { JSON.parse(v); setJsonError(null) } catch (e) { setJsonError(e.message) }
  }

  if (loading) return <Loading />

  return (
    <div className="fade-in">
      <div className="section-header mb-lg">
        <div className="section-title-group">
          <Settings size={22} className="section-icon" />
          <h2 className="section-title">配置管理</h2>
        </div>
        <div className="section-actions">
          <div className="flex-center gap-sm">
            <button className="btn btn-secondary" onClick={handleCopy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? '已复制' : '复制'}</button>
            <button className="btn btn-primary" onClick={handleSave} disabled={!!jsonError}>{isEditing ? <Save size={16} /> : <Edit3 size={16} />}{isEditing ? '保存' : '编辑'}</button>
          </div>
          <button className="btn btn-secondary" onClick={reload}>
            <RefreshCw size={16} />刷新
          </button>
        </div>
      </div>

      <div className="config-container">
        <div className="config-info mb-md">
          <div className="text-muted text-sm font-mono">C:\Users\yangsl25774\.openclaw\openclaw.json</div>
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-header">
          <span><FileText size={14} /> JSON 编辑器</span>
          <span className={jsonError ? 'text-error' : 'text-success'}>{jsonError ? 'JSON 错误' : '格式有效'}</span>
        </div>
        <textarea className="code-editor" value={text} onChange={handleChange} spellCheck="false" readOnly={!isEditing} />
      </div>

      {saved && <div className="toast-success">配置已保存</div>}
    </div>
  )
}