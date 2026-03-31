<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">
        <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Skills 管理
      </h1>
      <p class="page-subtitle">查看和管理所有已安装的技能</p>
    </div>

    <div class="card-grid">
      <div
        v-for="skill in skills"
        :key="skill.id"
        class="skill-card"
      >
        <div class="skill-header">
          <span class="skill-name">{{ skill.name }}</span>
          <span class="skill-status" :class="skill.status">
            {{ skill.status === 'active' ? '正常' : '失效' }}
          </span>
        </div>
        <p class="skill-description">{{ skill.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const skills = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('/api/skills')
    skills.value = response.data
  } catch (error) {
    console.error('Failed to fetch skills:', error)
  }
})
</script>