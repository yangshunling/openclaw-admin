<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">
        <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        MCP Servers
      </h1>
      <p class="page-subtitle">Model Context Protocol 服务器配置</p>
    </div>

    <div class="card-grid">
      <div v-for="server in mcpServers" :key="server.id" class="card">
        <div class="skill-header">
          <span class="skill-name">{{ server.name }}</span>
          <span class="badge" :class="server.status === 'active' ? 'badge-success' : 'badge-error'">
            {{ server.status === 'active' ? '运行中' : '已停止' }}
          </span>
        </div>
        <p style="color: var(--color-text-muted); margin: var(--spacing-md) 0; font-size: 0.875rem;">
          类型: {{ server.type }}
        </p>
        <div style="background: var(--color-bg-primary); border-radius: var(--radius-sm); padding: var(--spacing-md);">
          <pre style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-secondary); overflow-x: auto;">{{ JSON.stringify(server.config, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const mcpServers = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/api/mcp')
    mcpServers.value = response.data
  } catch (error) {
    console.error('Failed to fetch MCP servers:', error)
  }
})
</script>