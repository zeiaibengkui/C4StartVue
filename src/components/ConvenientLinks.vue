<template>
    <div id="links" class="h-100">
        <div class="convenient-link-item" v-for="item in links" :key="item.name">
            <img :src="item.icon" class="convenient-link-item-img" :alt="item.name + `'s icon`" />
            <div class="card-body">
                <p class="card-text">{{ item.name }}</p>
            </div>
        </div>

        <ul class="nav nav-pills" id="links-pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link">1</button>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import localforage from 'localforage'
import { effectScope, ref, watch } from 'vue'

const links = ref([
    {
        icon: 'a',
        name: 'a',
        url: 'a'
    }
])

function toRealValue(value: any) {
    return JSON.parse(JSON.stringify(value))
}

var efSc = effectScope()
efSc.run(async () => {
    let a = [links]
    a.forEach(async (el: any, index: number) => {
        var saved: Array<any> | null = await localforage.getItem('search')
        if (saved) el.value = saved[index]
    })
    watch(a, (newValue) => {
        localforage.setItem('search', toRealValue(newValue))
    })
})
</script>
<style lang="scss">
#links {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .convenient-link-item {
        width: 5rem;

        .convenient-link-item-img {
            width: 100%;
            display: inline-block;
            height: 5rem;
            aspect-ratio: 1;
        }
    }
}
</style>
