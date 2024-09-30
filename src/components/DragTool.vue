<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
    el?: HTMLElement
    draggable?: boolean
    resizeable?: boolean
}>()
const child = ref(document.createElement('div'))
let parent: HTMLElement

watch(props, mount)
onMounted(mount)

function mount(value: any = props) {
    try {
        $(parent).draggable('destroy')
    } catch (er) {
        //console.log(parent)
    }
    if (value.el) {
        parent = value.el
    } else {
        parent = $(child.value).parent()[0]
    }
    $(document).on('DOMContentLoaded', function () {
        if (value.draggable) {
            $(parent).draggable({ scroll: false, handle: '.drag' })
        } else {
            $(child.value).hide(0)
        }

        if (value.resizeable) $(parent).resizable({ autoHide: true })
    })
}
</script>

<template>
    <div class="drag" ref="child">: : : :</div>
</template>

<style lang="scss">
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
    color: var(--bs-body-color);
}
</style>
