<template>
    <div id="links" class="h-100">
        <figure
            class="convenient-link-item rounded-3 btn"
            v-for="(item, index) in links"
            :key="item.name"
            target="_blank"
            :href="item.url"
            @click="item.callback"
            @contextmenu.prevent="links.splice(index, 1)"
        >
            <img
                :src="item.icon"
                class="convenient-link-item-img rounded-3"
                :alt="item.name + `'s icon`"
            />

            <figcaption class="card-text">{{ item.name }}</figcaption>
        </figure>

        <ul class="nav nav-pills" id="links-pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link">1</button>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { autoSave } from './Stores'

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .convenient-link-item {
        width: 4rem;
        padding: 0.5rem;
        transition: background-color 0.2s;

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
