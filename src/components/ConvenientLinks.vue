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
import { type Ref, ref } from 'vue'
import { autoSave } from './Stores'
import RcMenuItem from './rcMenuItem.vue'

defineExpose({ draggable: true, resizeable: true })

const links: Ref<
    {
        icon: string
        name: string
        url?: string
        callback?: (event: any) => any
    }[]
> = ref([
    {
        icon: 'https://www.emojiall.com/images/60/htc/2795.png',
        name: 'Add',
        callback: async function () {
            links.value.push({
                icon: await swal({
                    content: 'input',
                    text: 'icon'
                }),
                name: await swal({
                    content: 'input',
                    text: 'name'
                }),
                url: await swal({
                    content: 'input',
                    text: 'url'
                })
            })
        }
    }
])

autoSave([links], 'convent-links')
</script>
<style lang="scss">
#links {
    height: calc(100% - 40px);

    .convenient-link-item {
        width: 4rem;
        padding: 0.5rem;
        margin: 0.5rem;
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
            aspect-ratio: 1;
            background-color: transparent;
        }

        .card-text {
            text-align: center;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 2ex;
            width: 100%;
        }
    }
}
</style>
