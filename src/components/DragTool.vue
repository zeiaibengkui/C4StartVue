<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'

const props = defineProps(['el'])
const child = ref()
let parent: HTMLElement

watch(props,mount)
onMounted(mount)

function mount() {
    if (props.el) {
        parent = props.el
    } else {
        parent = $(child.value).parent()[0]
    }
    $(document).ready(function() {
        $(parent).draggable({ scroll: false, handle: '.drag' })
    })
}
</script>

<template>
    <div class="drag" ref="child">: : : :</div>
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
