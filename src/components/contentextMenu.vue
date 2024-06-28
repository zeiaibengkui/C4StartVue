<script setup lang='ts'>
import { ref } from 'vue';

const style = ref({
    top: '0px',
    left: '0px'
});
const actions = ref([{ name: 'rcMenu', href: 'javascript:console.log("You Opened rcMenu!");' }]);
const elActions = ref([{ name: 'Name', href: '#' }]);

$(document.body).on('contextmenu', (e) => {
    e.preventDefault();

    style.value.top = e.clientY + 'px';
    style.value.left = e.clientX + 'px';

    const parents = $(e.target).parents('[data-rcMenu],[data-rcMenu-name]')
    parents.each((index, element) => {
        const e = {target:element}
        if (e.target.getAttribute('data-rcMenu')) {
            elActions.value = JSON.parse(e.target.getAttribute('data-rcMenu') || 'null');
        } else if (
          e.target.getAttribute('data-rcMenu-name') &&
          e.target.getAttribute('data-rcMenu-href')
        ) {
            elActions.value = [
                {
                    name: e.target.getAttribute('data-rcMenu-name') || '',
                    href: e.target.getAttribute('data-rcMenu-href') || ''
                }
            ];
        } else if (
          e.target.getAttribute('data-rcMenu-name') &&
          e.target.getAttribute('data-rcMenu-js')
        ) {
            elActions.value = [
                {
                    name: e.target.getAttribute('data-rcMenu-name') || '',
                    href: 'javascript:' + e.target.getAttribute('data-rcMenu-js')
                }
            ];
        } else {
            console.log()
        }
    })


    $('#rcMenu').show('fast');
});

document.addEventListener('click', () => {
    $('#rcMenu').hide('fast');
});
</script>

<template>
    <div id='rcMenu' class='dropdown-menu' :style='style'>
        <a v-for='el in actions' :key='el.name' :href='el.href' class='dropdown-item'
        >{{ el.name }}
        </a>
        <a v-for='el in elActions' :key='el.name' :href='el.href' class='dropdown-item'
        >{{ el.name }}
        </a>
    </div>
</template>

<style scoped>
#rcMenu {
    position: fixed;
    z-index: 2024;
}
</style>
