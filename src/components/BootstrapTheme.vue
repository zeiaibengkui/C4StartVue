<template>
    <button class="btn" type="button" id="bsTheme" @click="themeBoolean = !themeBoolean">
        {{ themeBoolean ? '&#xF1D1;' : '&#xF495;' }}
    </button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as bootstrap from 'bootstrap'

const themeBoolean = ref(false)
watch(themeBoolean, function (newValue) {
    bsTheme.value = newValue ? 'light' : 'dark'
})
const bsTheme = ref('dark')
const saved = localStorage.getItem('bsTheme')
if (saved) bsTheme.value = saved
document.body.setAttribute('data-bs-theme', bsTheme.value)
watch(bsTheme, function (newV) {
    document.body.setAttribute('data-bs-theme', newV)
    localStorage.setItem('bsTheme', newV)
})

$(document).ready(() => {
    const tooltipTriggerList = document.querySelectorAll('[title]')
    ;[...tooltipTriggerList].map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
})
</script>

<style scoped>
#bsTheme {
    position: absolute;
    top: 0;
    right: 0;
    text-shadow: 0 0 4px var(--bs-body-bg);
    font-family: 'bootstrap-icons', sans-serif;
}
</style>
