<script setup>
import { onMounted } from 'vue'

onMounted(function () {
    $(document).ready(function () {
        $('.drag').parent().draggable({ scroll: false, handle: '.drag' })
    })
})
</script>

<template>
    <div class="drag" onmousedown="">: : : :</div>
</template>

<style scoped lang="scss">
.drag {
    position: absolute;
    top: 0;
    left: 50%;
    font-size: 8px;
    font-weight: bold;
    text-shadow: var(--bs-body-bg) 1px 1px;
    display: flex;
    justify-content: center;
    width: 20px;
    margin-left: -10px;
    cursor: grab;
}
</style>
