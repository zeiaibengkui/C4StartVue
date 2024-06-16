<script setup lang="ts">
import localforage from 'localforage';
import { effectScope, ref, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import swal from 'sweetalert/dist/sweetalert.min.js';
import 'bootstrap-sweetalert/dist/sweetalert.css';

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
</script>

<template>
    {{
        (() => {
            /*console.log(target)*/
        })()
    }}
    <form @submit="submit" id="searchBar" class="input-group shadow">
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
            <a class="dropdown-item" id="add" @click="addEngine">[+] Add</a>
        </div>

        <input
            class="form-control"
            id="searchText"
            type="text"
            v-model="text"
            placeholder="搜索..."
        />
        <input class="btn btn-outline-primary" type="submit" value="GO!" />
    </form>
</template>

<style scoped lang="scss">
#searchBar {
    width: max-content;
    --bs-border-radius: 19px;
    border-radius: var(--bs-border-radius);
    position: absolute;
    left: 50%;
    top: 50%;
    background-color: var(--bs-body-bg);
    transform: translate(-50%, -50%);
}
</style>
async async
