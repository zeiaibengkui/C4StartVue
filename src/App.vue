<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';

const Search: any = ref(null);
</script>

<template>
    <!-- <header>C4Start Vue</header> -->
    <SearchBar ref="Search"></SearchBar>
</template>

<style scoped></style>
