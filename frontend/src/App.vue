<template>
  <div class="app-container">
    <div class="bubbles">
      <div class="bubble" style="left: 10%; width: 20px; height: 20px; animation-duration: 15s;"></div>
      <div class="bubble" style="left: 30%; width: 10px; height: 10px; animation-duration: 12s; animation-delay: 2s;"></div>
      <div class="bubble" style="left: 50%; width: 25px; height: 25px; animation-duration: 18s; animation-delay: 4s;"></div>
      <div class="bubble" style="left: 70%; width: 15px; height: 15px; animation-duration: 14s; animation-delay: 1s;"></div>
      <div class="bubble" style="left: 90%; width: 12px; height: 12px; animation-duration: 16s; animation-delay: 3s;"></div>
    </div>

    <!-- Header -->
    <header class="app-header">
      <div class="header-left">
        <button class="mobile-menu-btn" @click="toggleSidebar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>
        </button>
        <div class="logo">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="#00d4ff" stroke-width="2" fill="rgba(0,212,255,0.1)"/>
            <path d="M24 8c-2 0-4 1-5 3-1-2-3-3-5-3-4 0-7 3-7 7 0 8 12 18 12 18s12-10 12-18c0-4-3-7-7-7z" fill="#00d4ff" opacity="0.8"/>
            <circle cx="18" cy="20" r="2" fill="#0a0e17"/>
            <circle cx="30" cy="20" r="2" fill="#0a0e17"/>
            <path d="M20 26c2 2 8 2 8 0" stroke="#0a0e17" stroke-width="2" stroke-linecap="round"/>
            <path d="M14 10c0-2 2-4 5-4s5 2 5 4" stroke="#00ff88" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <h1 class="app-title">OpenClaw Admin</h1>
      </div>
      <div class="header-right">
        <div class="connection-status" :class="gatewayStatus">
          <span class="status-dot" :class="gatewayStatus"></span>
          <span>{{ gatewayStatus === 'connected' ? 'Gateway 已连接' : 'Gateway 未连接' }}</span>
        </div>
      </div>
    </header>

    <!-- Sidebar Overlay -->
    <div class="sidebar-overlay" :class="{ visible: sidebarOpen }" @click="closeSidebar"></div>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <nav>
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click="closeSidebar">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              概览 Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/skills" class="nav-link" @click="closeSidebar">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              Skills 技能
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/config" class="nav-link" @click="closeSidebar">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              配置管理
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/plugins" class="nav-link" @click="closeSidebar">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              插件 Plugins
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/mcp" class="nav-link" @click="closeSidebar">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              MCP Servers
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/gateway" class="nav-link" @click="closeSidebar">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                <circle cx="12" cy="20" r="1"/>
              </svg>
              网关 Gateway
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sessions" class="nav-link" @click="closeSidebar">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              会话 Sessions
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const sidebarOpen = ref(false)
const gatewayStatus = ref('disconnected')
const router = useRouter()

const cachedViews = computed(() => {
  return router.getRoutes()
    .filter(route => route.meta?.keepAlive)
    .map(route => route.name)
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/gateway/status')
    gatewayStatus.value = response.data.status || 'disconnected'
  } catch (error) {
    console.error('Failed to fetch gateway status:', error)
    gatewayStatus.value = 'disconnected'
  }
})
</script>