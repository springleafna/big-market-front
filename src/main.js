import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLuckyCanvas from '@lucky-canvas/vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(router)
app.use(VueLuckyCanvas)
app.use(ElementPlus)

app.mount('#app')
