import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Skills from '../views/Skills.vue'
import Config from '../views/Config.vue'
import Plugins from '../views/Plugins.vue'
import MCP from '../views/MCP.vue'
import Gateway from '../views/Gateway.vue'
import Sessions from '../views/Sessions.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/skills', name: 'Skills', component: Skills, meta: { keepAlive: true } },
  { path: '/config', name: 'Config', component: Config, meta: { keepAlive: true } },
  { path: '/plugins', name: 'Plugins', component: Plugins, meta: { keepAlive: true } },
  { path: '/mcp', name: 'MCP', component: MCP, meta: { keepAlive: true } },
  { path: '/gateway', name: 'Gateway', component: Gateway, meta: { keepAlive: true } },
  { path: '/sessions', name: 'Sessions', component: Sessions, meta: { keepAlive: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router