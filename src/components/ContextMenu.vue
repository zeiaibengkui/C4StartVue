<script setup lang="ts">
import { ref, type Ref } from 'vue'

const style = ref({
    top: '0px',
    left: '0px'
})

interface action {
    name: string
    href?: string
    callback?: (e: Event) => void
}
const actions: Ref<action[]> = ref([
    { name: 'rcMenu', href: 'javascript:console.log("You Opened rcMenu!");' }
])
const elActions: Ref<action[]> = ref([{ name: 'Name', href: '#' }])

$(document.body).on('contextmenu', (e) => {
    e.preventDefault()

    style.value.top = e.clientY + 'px'
    style.value.left = e.clientX + 'px'

    const elements = $(e.target).parents('[data-rcmenu],[data-rcmenu-name]').toArray()
    elements[elements.length] = e.target
    //console.log(parents)
    elements.forEach(function (el, index) {
        //console.log($(el))
        if ($(el).data('rcmenu')) {
            elActions.value = $(el).data('rcmenu')
        } else if ($(el).data('rcmenuName') && $(el).data('rcmenuHref')) {
            elActions.value = [
                {
                    name: $(el).data('rcmenuName'),
                    href: $(el).data('rcmenuHref')
                }
            ]
        } else if ($(el).data('rcmenuName') && $(el).data('rcmenuJs')) {
            elActions.value = [
                {
                    name: $(el).data('rcmenuNme'),
                    href: 'javascript:' + $(el).data('rcmenuJs')
                }
            ]
        } else {
            if (index !== 114514)
                console.log('No rcmenu', { parents: elements, elActions: elActions.value })
            elActions.value = []
        }
        //console.log({ parents: parents, elActions: elActions })
    })

    $('#rcmenu').fadeIn('fast')
})

document.addEventListener('click', () => {
    $('#rcmenu').fadeOut('fast')
})
</script>

<template>
    <div id="rcmenu" class="dropdown-menu shadow" :style="style">
        <a
            v-for="el in [actions, elActions].flat()"
            :key="el.name"
            :href="el.href"
            @click="el.callback"
            class="dropdown-item"
            >{{ el.name }}
        </a>
    </div>
</template>

<style scoped>
#rcmenu {
    position: fixed;
    z-index: 2024;
}
</style>
