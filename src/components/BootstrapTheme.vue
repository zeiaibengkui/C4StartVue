<template>
    <select class="btn" id="bsTheme" v-model="bsTheme">
        <option>light</option>
        <option>dark</option>
    </select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const bsTheme = ref('dark');
var saved = localStorage.getItem('bsTheme');
if (saved) bsTheme.value = saved;
document.body.setAttribute('data-bs-theme', bsTheme.value);
watch(bsTheme, function (newv) {
    document.body.setAttribute('data-bs-theme', newv);
    localStorage.setItem('bsTheme', newv);
});
</script>

<style scoped>
#bsTheme {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
