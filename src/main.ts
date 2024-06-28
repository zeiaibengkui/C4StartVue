import './assets/main.scss';
import $ from 'jquery';
import 'jquery';
import 'jquery-ui/dist/jquery-ui.js';
import 'bootstrap';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'jquery-ui'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.use($);

app.mount('#app');

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const otherSettings = [
    { name: 'bgSettings', href: '#bgSettings' },
    { name: 'LoaclForageSettings', href: '#LoaclForageSettings' }
];
