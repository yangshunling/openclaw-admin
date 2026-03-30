<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="page-title">Skills 管理</h1>
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