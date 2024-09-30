<template lang="html">
    <div class="app-frame" ref="dragEl">
        <nav>
            <h2 class="app-title">{{ props.title }}</h2>
            <DragTool
                :el="dragEl"
                :draggable="mountedCompent?.draggable"
                :resizeable="mountedCompent?.resizeable"
            ></DragTool>
        </nav>
        <div class="app-compent">
            <props.compent ref="mountedCompent" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import DragTool from './DragTool.vue'
import { useAppFrameStore } from './Stores'

const AppFrameStore = useAppFrameStore()

const props = defineProps(['title', 'compent'])
const dragEl = ref(document.createElement('div'))
const mountedCompent = ref()

watch(mountedCompent, (value) => {
    if (value.transparentFrame) dragEl.value.classList.add('transparent-frame')
})

onMounted(() => {
    AppFrameStore.appNum += 1
    //console.log(AppFrameStore.appNum)
    dragEl.value.style.top = (AppFrameStore.appNum + 1) * 2 + 'rem'
    dragEl.value.style.left = (AppFrameStore.appNum + 1) * 2 + 'rem'
})
</script>

<style lang="scss">
.app-frame {
    position: absolute;
    color: white;
    height: max-content;
    width: max-content;
    min-height: 309px;
    min-width: 500px;
    transition:
        background-color 0.2s,
        text-shadow 0.2s;
    padding: 1rem;
    border-radius: var(--bs-border-radius);
    resize: both;

    &.transparent-frame {
        min-width: 0;
        min-height: 0;
        padding: 0;
        max-width: 0;
        max-height: 0;
        overflow: visible;
    }

    > nav {
        width: 100%;
        height: 2ex;
        display: block;
        opacity: 0;
        font-size: 14pt;
        transition: opacity 0.2s;
        margin-bottom: 1rem;
        text-shadow: black 0 0 2px;

        > h2 {
            font-size: inherit;
            font-family:
                Segoe WPC,
                Segoe UI,
                sans-serif;
            text-transform: uppercase;
        }
    }

    &:hover:not(.transparent-frame) {
        background-color: #00000022;
        box-shadow: #00000022 0 0 5px 0;
        //z-index: 3;

        > nav {
            opacity: 1;
        }
    }
}

.app-title {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.app-compent {
    inset: calc(2ex + 1.5rem) 1rem 1rem 1rem;
    position: absolute;
}
</style>
