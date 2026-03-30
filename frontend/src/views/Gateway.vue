<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">网关 Gateway</h1>
      <p class="page-subtitle">连接状态和通道管理</p>
    </div>

    <!-- Gateway Status -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-status" :class="gateway.status"></div>
        <div class="stat-value">{{ gateway.status === 'connected' ? '已连接' : '未连接' }}</div>
        <div class="stat-label">网关状态</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ gateway.url || 'N/A' }}</div>
        <div class="stat-label">网关地址</div>
      </div>
    </div>

    <!-- Channels -->
    <h2 style="font-family: var(--font-display); font-size: 1.25rem; margin-bottom: var(--spacing-lg); color: var(--color-text-primary);">
      通道列表
    </h2>
    <div class="channel-grid">
      <div v-for="channel in channels" :key="channel.id" class="channel-card">
        <div class="channel-icon">
          <span v-if="channel.id === 'dingtalk'">💬</span>
          <span v-else-if="channel.id === 'discord'">🎮</span>
          <span v-else>📱</span>
        </div>
        <div class="channel-info">
          <div class="channel-name">{{ channel.name }}</div>
          <div class="channel-type">{{ channel.type }} · {{ channel.id }}</div>
        </div>
        <span class="badge" :class="channel.status === 'active' ? 'badge-success' : 'badge-warning'">
          {{ channel.status === 'active' ? '活跃' : '未活跃' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const gateway = ref({
  status: 'disconnected',
  url: ''
})
const channels = ref([])

onMounted(async () => {
  try {
    const [gatewayRes, channelsRes] = await Promise.all([
      axios.get('/api/gateway/status'),
      axios.get('/api/gateway/channels')
    ])
    gateway.value = gatewayRes.data
    channels.value = channelsRes.data
  } catch (error) {
    console.error('Failed to fetch gateway data:', error)
  }
})
</script>