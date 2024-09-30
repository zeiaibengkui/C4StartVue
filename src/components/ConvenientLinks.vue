<template>
    <div id="links">
        <figure
            class="convenient-link-item rounded-3 btn"
            v-for="(item, index) in links"
            :key="item.name"
            target="_blank"
            :href="item.url"
            @click="item.callback"
        >
            <RcMenuItem
                :value="{
                    callback: () => links.splice(index, 1),
                    name: 'Delete'
                }"
            />
            <img
                :src="item.icon"
                class="convenient-link-item-img rounded-3"
                :alt="item.name + `'s icon`"
            />

            <figcaption class="card-text">{{ item.name }}</figcaption>
        </figure>
    </div>
    <ul class="nav nav-pills" id="num" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link">1</button>
        </li>
    </ul>
</template>
<script setup lang="ts">
import { type Ref, ref, toRef } from 'vue'
import { autoSave, useLinksStore } from './Stores'
import RcMenuItem from './rcMenuItem.vue'

defineExpose({ draggable: true, resizeable: true })

const links = toRef(useLinksStore().links)
</script>
<style lang="scss">
#links {
    height: calc(100% - 40px);

    .convenient-link-item {
        width: 4rem;
        padding: 0.5rem;
        transition:
            background-color 0.2s,
            color 0.2s;
        color: var(--bs-body-color);
        &:hover {
            background-color: #ffffff22;
        }

        .convenient-link-item-img {
            width: 100%;
            display: inline-block;
            height: 3rem;
            box-sizing: border-box;
            padding: 0.2rem;
            aspect-ratio: 1;
            background-color: color-mix(in srgb, var(--bs-body-bg) 20%, transparent);
        }

        .card-text {
            text-align: center;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 2ex;
            text-shadow: #00000022 2px 2px 1px;
            width: 100%;
        }
    }
}
</style>
