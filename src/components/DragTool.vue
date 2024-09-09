<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'

const props = defineProps(['el'])
const child = ref()
let parent: HTMLElement

watch(props, mount)
onMounted(mount)

function mount() {
    try {
        $(parent).draggable('destroy')
    } catch (er) {
        //console.log(parent)
    }
    if (props.el) {
        parent = props.el
    } else {
        parent = $(child.value).parent()[0]
    }
    $(document).on('DOMContentLoaded',function() {
        $(parent).draggable({ scroll: false, handle: '.drag' })
        $(parent).resizable()
    })
}
</script>

<template>
    <div class='drag' ref='child'>: : : :</div>
</template>

<style scoped lang='scss'>
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
