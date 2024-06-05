<template>
    <video id="bgVideo"></video>
    <iframe id="bgIframe" :src="bgIframeURL"></iframe>
</template>
<script setup>
const bgIframeURL = ref('about:blank');
</script>
