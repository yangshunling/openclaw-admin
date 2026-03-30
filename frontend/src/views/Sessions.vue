<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">会话 Sessions</h1>
      <p class="page-subtitle">当前活动会话列表</p>
    </div>

    <div v-for="session in sessions" :key="session.id" class="session-card">
      <div class="session-header">
        <span class="session-id">{{ session.id }}</span>
        <span class="badge" :class="session.status === 'active' ? 'badge-success' : 'badge-info'">
          {{ session.status === 'active' ? '活跃' : '非活跃' }}
        </span>
      </div>
      <div class="session-meta">
        <div class="session-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          {{ session.channel }}
        </div>
        <div class="session-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          {{ formatTime(session.createdAt) }}
        </div>
        <div class="session-meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {{ session.type }}
        </div>
      </div>
    </div>

    <div v-if="sessions.length === 0" class="empty-state">
      <div class="empty-state-icon">📭</div>
      <div class="empty-state-text">暂无活动会话</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const sessions = ref([])

const formatTime = (isoString) => {
  if (!isoString) return 'N/A'
  const date = new Date(isoString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/sessions')
    sessions.value = response.data
  } catch (error) {
    console.error('Failed to fetch sessions:', error)
  }
})
</script>