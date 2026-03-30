// 通用 API 服务
const API_BASE = ''

export const api = {
  // 获取配置
  getConfig: () => fetch(`${API_BASE}/api/config`).then(r => r.json()),
  
  // 保存配置
  saveConfig: (data) => fetch(`${API_BASE}/api/config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data, null, 2)
  }).then(r => r.json()),
  
  // 获取系统状态
  getStatus: () => fetch(`${API_BASE}/api/status`).then(r => r.json()),
  
  // 获取 Skills
  getSkills: () => fetch(`${API_BASE}/api/skills`).then(r => r.json()),
}

export default api