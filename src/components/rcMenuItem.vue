<template lang="html">
    <div ref="child"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps(['value'])
const child = ref()
onMounted(() => {
    //$(child.value).parent().attr('data-rcMenu', '')
    $(child.value).parent().data('rcmenu', props.value)
    // console.log($(child.value).parent())
})
</script>
<style lang="scss"></style>
