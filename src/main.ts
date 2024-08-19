import './assets/main.scss';
import $ from 'jquery'
import 'jquery-ui/dist/themes/base/jquery-ui.css'
import 'bootstrap';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

void(bootstrap);

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use($);

app.mount('#app');


