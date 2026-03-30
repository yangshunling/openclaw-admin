export function formatTime(timestamp) {
  if (!timestamp) return '-'
  return new Date(timestamp).toLocaleTimeString('zh-CN')
}

export function formatCountdown(ms) {
  if (!ms || ms <= 0) return '0秒'
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (minutes > 0) return minutes + '分' + secs + '秒'
  return secs + '秒'
}

export function formatUptime(ms) {
  if (!ms || ms < 0) return '0h 0m'
  const d = Math.floor(ms / (1000 * 60 * 60 * 24))
  const h = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  return d > 0 ? d + 'd ' + h + 'h ' + m + 'm' : h + 'h ' + m + 'm'
}

export function formatDateTime(timestamp) {
  if (!timestamp) return '-'
  return new Date(timestamp).toLocaleString('zh-CN')
}

export function formatDate(timestamp) {
  if (!timestamp) return '-'
  return new Date(timestamp).toLocaleDateString('zh-CN')
}
