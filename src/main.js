import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from "axios";

axios.defaults.baseURL = 'https://gncsdev.inconus.kr'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.config.globalProperties.$axios = axios;
app.mount('#app')
