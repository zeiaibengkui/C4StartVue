import './assets/main.scss'
import $ from 'jquery'
window.$ = $
window.jQuery = $
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery-ui'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use($)

app.mount('#app')
