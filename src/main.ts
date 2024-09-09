import './assets/main.scss'
import $ from 'jquery'
import 'jquery-ui/dist/themes/base/jquery-ui.css'
import 'bootstrap'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'highlight.js/styles/stackoverflow-light.css'

const sleep = (delaytime = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, delaytime))
}
function toRealValue(value: any) {
    return JSON.parse(JSON.stringify(value))
}
export { sleep, toRealValue }

void [bootstrap, sleep]

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use($)

app.mount('#app')
