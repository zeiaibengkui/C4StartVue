<template>
    <button class="btn" type="button" id="bsTheme" @click="themeBoolean = !themeBoolean">
        {{ themeBoolean ? '&#xF1D1;' : '&#xF495;' }}
    </button>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import * as bootstrap from 'bootstrap'
import localforage from 'localforage'

const themeBoolean = ref(false)
const bsTheme = computed(() => (themeBoolean.value ? 'light' : 'dark'))
const saved = await localforage.getItem('bsTheme')
if (saved) themeBoolean.value = !!saved
document.body.setAttribute('data-bs-theme', bsTheme.value)
watch(themeBoolean, function (newV) {
    document.body.setAttribute('data-bs-theme', bsTheme.value)
    localforage.setItem('bsTheme', newV)
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
