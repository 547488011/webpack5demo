
import { createApp } from 'vue'
import App from './App'
import router from '@/router'
import globalRegister from '@/global'
import { createPinia } from 'pinia'
const pinia = createPinia()

import 'element-plus/dist/index.css'
import "@/assets/css/index.less"

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(globalRegister)
app.mount('#app')

