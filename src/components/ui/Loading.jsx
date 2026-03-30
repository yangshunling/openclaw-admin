import './Loading.css'

export function Loading({ text = '加载中...' }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <span>{text}</span>
    </div>
  )
}

export default Loading