<!--suppress ALL -->
<script setup lang="ts">
import localforage from 'localforage';
import { effectScope, onMounted, ref, watch } from 'vue';
import swal from 'sweetalert/dist/sweetalert.min.js';
import 'bootstrap-sweetalert/dist/sweetalert.css';
import { VueDraggable } from 'vue-draggable-plus'

function toRealValue(value: any) {
    return JSON.parse(JSON.stringify(value));
}

let target = ref('_blank');
let text = ref('');
let engines = ref([
    {
        name: 'Bing',
        url: 'https://cn.bing.com/search?q=%23SearchWord%23'
    },
    {
        name: 'Google',
        url: 'https://www.google.com/search?q=%23SearchWord%23&oq=%23SearchWord%23'
    }
]);
let selectedEngine = ref(0);

const submit = (e: Event) => {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = engines.value[selectedEngine.value].url
        .replaceAll('#SearchWord#', text.value)
        .replaceAll('%23SearchWord%23', text.value);
    a.target = target.value;
    console.log(a.href);
    a.click();
};
const addEngine = async () => {
    engines.value[engines.value.length] = {
        name: await swal({
            text: 'Name',
            content: 'input'
        }),
        url: await swal({
            text: 'Url (Pls search "#SearchWord#")',
            content: 'input'
        })
    };
};
defineExpose({
    target,
    engines,
    selectedEngine
});

var efSc = effectScope();
efSc.run(async () => {
    let a = [target, engines, selectedEngine];
    a.forEach(async (el: any, index: number) => {
        var saved: Array<any> | null = await localforage.getItem('search');
        if (saved) el.value = saved[index];
    });
    watch(a, (newValue) => {
        localforage.setItem('search', toRealValue(newValue));
    });
});

onMounted(() => {
    $('#searchBar').draggable({ scroll: false, handle: '.drag' });
});

const textWidth = ref(300)
watch(text,function(newValue) {
    $('#textWidth').text ( newValue);
    textWidth.value = $('#textWidth').width() + 300;
})
</script>

<template>
    <div>
        <form @submit="submit" id="searchBar" class="input-group shadow" :style='{width:textWidth + "px"}'>
            <button
                class="btn dropdown-toggle btn-outline-secondary"
                type="button"
                id="searchEigine"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {{ engines[selectedEngine]?.name }}
            </button>

            <div
                class="dropdown-menu"
                aria-labelledby="searchEigine"
                style="--bs-border-radius: 0.375rem"
            >
                <VueDraggable ref="el" v-model="engines">
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
            <div id='textWidth'></div>
            <input class="btn btn-outline-primary" type="submit" value="GO!" />
        </form>
    </div>
</template>

<style scoped lang="scss">
#searchBar {
    width: 300px;
    max-width: 45vw;
    --bs-border-radius: 19px;
    border-radius: var(--bs-border-radius);
    background-color: var(--bs-body-bg);
    position: absolute;
    //transition: width .1s;
}

div:has(#searchBar) {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#textWidth{
    visibility: hidden;
    position: absolute;
    width: max-content;
    max-width: min(60vw,1000px);
}
</style>
