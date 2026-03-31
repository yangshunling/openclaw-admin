<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">
        <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        概览 Dashboard
      </h1>
      <p class="page-subtitle">OpenClaw 系统状态总览</p>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-status" :class="status.openclaw"></div>
        <div class="stat-value">{{ status.openclaw === 'running' ? '运行中' : '已停止' }}</div>
        <div class="stat-label">OpenClaw 状态</div>
      </div>
      <div class="stat-card">
        <div class="stat-status" :class="status.gateway"></div>
        <div class="stat-value">{{ status.gateway === 'connected' ? '已连接' : '未连接' }}</div>
        <div class="stat-label">Gateway 连接</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ version }}</div>
        <div class="stat-label">版本信息</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ skillsCount }}</div>
        <div class="stat-label">Skills 总数</div>
      </div>
    </div>

    <!-- Quick Info -->
    <div class="card-grid">
      <div class="card">
        <h3 class="card-title">
          <svg class="card-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
          系统信息
        </h3>
        <div style="color: var(--color-text-secondary); line-height: 2;">
          <div><strong>平台:</strong> Windows</div>
          <div><strong>运行时:</strong> Node.js v24.12.0</div>
          <div><strong>模型:</strong> hundsun/MiniMax-M2.5</div>
        </div>
      </div>
      <div class="card">
        <h3 class="card-title">
          <svg class="card-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          快速链接
        </h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
          <router-link to="/skills" class="quick-link">
            → 查看所有 Skills
          </router-link>
          <router-link to="/gateway" class="quick-link">
            → 网关设置
          </router-link>
          <router-link to="/sessions" class="quick-link">
            → 活动会话
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const status = ref({
  openclaw: 'stopped',
  gateway: 'disconnected'
})
const version = ref('1.0.0')
const skillsCount = ref(0)

onMounted(async () => {
  try {
    const [statusRes, versionRes, skillsRes] = await Promise.all([
      axios.get('/api/status'),
      axios.get('/api/version'),
      axios.get('/api/skills')
    ])
    status.value = statusRes.data
    version.value = versionRes.data.version
    skillsCount.value = skillsRes.data.length
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
})
</script>