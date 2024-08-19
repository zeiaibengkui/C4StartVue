<template>
    <ul id='suggestions' class='container-fluid'>
        <!-- <iframe
        :src="`http://localhost:8012/proxy/AS/Suggestions?pt=page.home&mkt=zh-cn&qry=${text}&cp=1&msbqf=false&cvid=1`"
        id="suggestionsFr"
    >
    </iframe> -->
        <li v-for='item in suggestionsList' :key='item.text'>{{ item.text }}</li>
    </ul>
</template>
<script>
export default {
    name: 'SearchSuggest'
}
</script>
<style scoped lang='scss'>

#suggestions {
    //position: absolute;
    //top: 19px;
    //padding: 19px 0 0 0;
    //background: var(--bs-body-bg);
    margin-top: 0.5em;
    transition: height 0.3s;
    height: auto;

    &:not(:has(li:first-child)) {
        display: none;
    }

    li {
        text-decoration: none;
        list-style: none;
    }
}
</style>