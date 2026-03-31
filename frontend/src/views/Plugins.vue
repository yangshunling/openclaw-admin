<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">
        <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
        插件 Plugins
      </h1>
      <p class="page-subtitle">已安装的插件列表</p>
    </div>

    <div class="card">
      <table class="list-table">
        <thead>
          <tr>
            <th>名称</th>
            <th>版本</th>
            <th>描述</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plugin in plugins" :key="plugin.id">
            <td style="color: var(--color-text-primary); font-weight: 500;">{{ plugin.name }}</td>
            <td>{{ plugin.version }}</td>
            <td>{{ plugin.description }}</td>
            <td>
              <span class="badge" :class="plugin.status === 'active' ? 'badge-success' : 'badge-error'">
                {{ plugin.status === 'active' ? '已启用' : '已禁用' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const plugins = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/api/plugins')
    plugins.value = response.data
  } catch (error) {
    console.error('Failed to fetch plugins:', error)
  }
})
</script>