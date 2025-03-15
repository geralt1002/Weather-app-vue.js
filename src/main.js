import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './vendor/weather-icons/css/weather-icons.min.css'

import './style/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
