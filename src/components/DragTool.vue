<template>
    <div class='drag' onmouseover="$('.drag').parent().draggable({ scroll: false, handle: '.drag' });">: : : :</div>
</template>

<script>



</script>

<style scoped lang='scss'>
.drag {
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -8px;
    cursor: grab;
    font-size: 8px;
    text-shadow: var(--bs-body-bg) 1px 1px;
    display: flex;
    justify-content: center;
    width: 16px;
}
</style>