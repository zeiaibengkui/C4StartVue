<!--suppress ALL -->
<script setup lang="ts">
import localforage from 'localforage'
import { effectScope, onMounted, ref, watch } from 'vue'
import swal from 'sweetalert'
import DragTool from './DragTool.vue'
import { VueDraggable } from 'vue-draggable-plus'
import SearchSuggest from '@/components/SearchSuggest.vue'
import type { ContentOptions } from 'sweetalert/typings/modules/options/content'

void VueDraggable

function toRealValue(value: any) {
    return JSON.parse(JSON.stringify(value))
}

let target = ref('_blank')
let text = ref('')
let engines = ref([
    {
        name: 'Bing',
        url: 'https://cn.bing.com/search?q=%23SearchWord%23'
    },
    {
        name: 'Google',
        url: 'https://www.google.com/search?q=%23SearchWord%23&oq=%23SearchWord%23'
    }
])
let selectedEngine = ref(0)

const submit = (e: Event) => {
    e.preventDefault()
    const a = document.createElement('a')
    a.href = (engines.value[selectedEngine.value].url as any)
        .replaceAll('#SearchWord#', text.value)
        .replaceAll('%23SearchWord%23', text.value)
    a.target = target.value
    console.log(a.href)
    a.click()
}

const addEngine = async () => {
    engines.value[engines.value.length] = {
        name: await swal({
            text: 'Name',
            content: 'input' as unknown as ContentOptions
        }),
        url: await swal({
            text: 'Url (Pls search "#SearchWord#")',
            content: 'input' as unknown as ContentOptions
        })
    }
}
defineExpose({
    target,
    engines,
    selectedEngine
})

let efSc = effectScope()
efSc.run(async () => {
    let a = [target, engines, selectedEngine]
    a.forEach(async (el: any, index: number) => {
        var saved: Array<any> | null = await localforage.getItem('search')
        if (saved) el.value = saved[index]
    })
    watch(a, (newValue) => {
        localforage.setItem('search', toRealValue(newValue))
    })
})

const textWidth = ref(300)
watch(text, function (newValue) {
    $('#textWidth').text(newValue)
    textWidth.value = ($('#textWidth').width() as number) + 50
})

/* const centerPosition = () => {
    if ($('#searchBar')[0].style.top.match(/vh/)?.join('')) {
        console.log($('#searchBar')[0].style.top.match(/vh/))
        $('#searchBar')[0].style.top = 'unset'
        $('#searchBar')[0].style.left = 'unset'
    }
    let position = $('#searchBar')[0].getBoundingClientRect()
    $('#searchBar')[0].style.top = (position.top / document.body.clientHeight) * 100 + 'vh'
    $('#searchBar')[0].style.left = (position.left / document.body.clientWidth) * 100 + 'vw'
} */

const emits = defineEmits(['transparentFrame'])

onMounted(() => {
    emits('transparentFrame', true)
    /* 
    centerPosition()
    window.addEventListener('resize', centerPosition) 
    */
})
</script>

<template>
    <form
        @submit="submit"
        id="searchBar"
        class="input-group shadow"
        :style="{ width: textWidth + 'px' }"
    >
        <div class="input-group">
            <button
                class="btn dropdown-toggle btn-outline-secondary"
                type="button"
                id="searchEngine"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {{ engines[selectedEngine]?.name }}
            </button>

            <div
                class="dropdown-menu"
                aria-labelledby="searchEngine"
                style="--bs-border-radius: 0.375rem"
                title="Drag to change order  Right click to remove"
            >
                <VueDraggable v-model="engines" ref="enginesEl" :animation="150">
                    <a
                        class="dropdown-item"
                        href="javascript:void(0)"
                        v-for="(a, index) in engines"
                        :key="index"
                        @click="selectedEngine = index"
                        @contextmenu.prevent="engines.splice(index, 1)"
                        >{{ a.name }}
                    </a>
                </VueDraggable>
                <a class="dropdown-item" id="add" @click="addEngine" href="#">[+] Add</a>
            </div>

            <input
                class="form-control"
                id="searchText"
                type="text"
                v-model="text"
                placeholder="搜索..."
            />
            <pre id="textWidth"></pre>

            <input class="btn btn-outline-primary" type="submit" value="GO!" />
        </div>
        <DragTool />
        <SearchSuggest :text="text" />
    </form>
</template>

<style scoped lang="scss">
#searchBar {
    min-width: 300px;
    max-width: 45vw;
    --bs-border-radius: 19px;
    border-radius: var(--bs-border-radius);
    background-color: var(--bs-body-bg);
    //transition: width .1s;
}
#textWidth {
    visibility: hidden;
    position: absolute;
    width: max-content;
    max-width: min(60vw, 1000px);
}
</style>
