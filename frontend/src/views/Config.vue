<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">配置管理</h1>
      <p class="page-subtitle">OpenClaw 配置文件查看</p>
    </div>

    <div class="json-viewer">
      <div class="json-header">
        <span class="json-title">openclaw.json</span>
        <button class="json-copy-btn" @click="copyConfig">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          复制
        </button>
      </div>
      <div class="json-content" v-html="syntaxHighlight(configJson)"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const config = ref({})

const configJson = computed(() => {
  return JSON.stringify(config.value, null, 2)
})

const syntaxHighlight = (json) => {
  if (!json) return ''
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'json-number'
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key'
        } else {
          cls = 'json-string'
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean'
      } else if (/null/.test(match)) {
        cls = 'json-null'
      }
      return `<span class="${cls}">${match}</span>`
    })
}

const copyConfig = async () => {
  try {
    await navigator.clipboard.writeText(configJson.value)
    alert('配置已复制到剪贴板')
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/config')
    config.value = response.data
  } catch (error) {
    console.error('Failed to fetch config:', error)
    config.value = { error: 'Failed to load configuration' }
  }
})
</script>