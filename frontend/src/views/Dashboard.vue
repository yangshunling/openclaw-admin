<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">概览 Dashboard</h1>
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
        <h3 style="font-family: var(--font-display); margin-bottom: var(--spacing-md); color: var(--color-accent-primary);">
          系统信息
        </h3>
        <div style="color: var(--color-text-secondary); line-height: 2;">
          <div><strong>平台:</strong> Windows</div>
          <div><strong>运行时:</strong> Node.js v24.12.0</div>
          <div><strong>模型:</strong> hundsun/MiniMax-M2.5</div>
        </div>
      </div>
      <div class="card">
        <h3 style="font-family: var(--font-display); margin-bottom: var(--spacing-md); color: var(--color-accent-secondary);">
          快速链接
        </h3>
        <div style="display: flex; flex-direction: column; gap: var(--spacing-sm);">
          <router-link to="/skills" style="color: var(--color-text-secondary); text-decoration: none; hover: color: var(--color-accent-primary);">
            → 查看所有 Skills
          </router-link>
          <router-link to="/gateway" style="color: var(--color-text-secondary); text-decoration: none;">
            → 网关设置
          </router-link>
          <router-link to="/sessions" style="color: var(--color-text-secondary); text-decoration: none;">
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