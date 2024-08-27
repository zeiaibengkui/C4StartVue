<script setup lang="ts">
import SearchBar from './components/SearchBar.vue'
import WallPaper from './components/WallPaper.vue'
import BootstrapTheme from './components/BootstrapTheme.vue'
import LoaclForageSettings from './components/LoaclForageSettings.vue'
import ContextMenu from './components/ContextMenu.vue'
import AppFrame from './components/AppFrame.vue'
import ConvenientLinks from '@/components/ConvenientLinks.vue'
</script>

<template>
    <!-- <header>C4Start Vue</header> -->
    <WallPaper />
    <AppFrame :compent="ConvenientLinks" title="Links"></AppFrame>
    <AppFrame :compent="SearchBar" title="SearchBar"></AppFrame>
    <BootstrapTheme />
    <LoaclForageSettings />
    <ContextMenu />
</template>

<style scoped></style>
