<template>
    <select class="btn" id="bsTheme" v-model="bsTheme">
        <option>light</option>
        <option>dark</option>
    </select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import * as bootstrap from 'bootstrap'

const bsTheme = ref('dark');
var saved = localStorage.getItem('bsTheme');
if (saved) bsTheme.value = saved;
document.body.setAttribute('data-bs-theme', bsTheme.value);
watch(bsTheme, function (newv) {
    document.body.setAttribute('data-bs-theme', newv);
    localStorage.setItem('bsTheme', newv);
});


const tooltipTriggerList = document.querySelectorAll('[title]');
[...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
)
</script>

<style scoped>
#bsTheme {
    position: absolute;
    top: 0;
    right: 0;
    text-shadow: 1px 1px 2px var(--bs-body-bg);
}
</style>
