
import { createApp } from 'vue'
import App from './App'
import router from '@/router'
import globalRegister from '@/global'

import 'element-plus/dist/index.css'
import "@/assets/css/index.less"

const app = createApp(App)
app.use(router)
app.use(globalRegister)
app.mount('#app')

