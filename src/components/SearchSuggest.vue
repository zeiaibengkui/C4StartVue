<template>
    <ul id="suggestions" class="container-fluid">
        <li v-for="item in suggestionsList" :key="JSON.stringify(item)">
            {{ item.text }}
        </li>
    </ul>
</template>
<script lang="ts" setup>
import { type Ref, watch } from 'vue'

const props = defineProps(['text'])

let suggestionsList: Ref<[{ text: string; url: string }]> | Array<{ text: string; url: string }>

const sleep = (delaytime = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, delaytime))
}

watch(props, loadSuggest)

async function loadSuggest(reText: any) {
    let text = props.text
    let er = false
    let result

    try {
        if (typeof reText !== 'string') {
            result = await $.ajax({
                url: `http://localhost:8012/proxy/AS/Suggestions?pt=page.home&mkt=zh-cn&qry=${text}&cp=1&msbqf=false&cvid=1`
            })
        } else {
            result = reText
            er = true
        }

        const html = $.parseHTML(result)[0]
        const list: Array<HTMLElement> = Array.from(html.childNodes as any)
        //;(suggestionsList as any) = []
        let list2: any = []
        list.forEach((el, index) => {
            let url: string
            try {
                url = decodeURI((el.getAttribute('url') as string).split('q=')[1].split('&')[0])
            } catch (error) {
                url = el.textContent || ''
            }
            list2[index] = {
                text: el.textContent || '',
                url: url
            }
        })
        suggestionsList = list2
        /* console.log('search result:', {
            suggestionsList: suggestionsList,
            list: list
        }) */
    } catch (error) {
        result = (error as any).responseText
        if (er) {
            console.log('No search suggestion', error)
            suggestionsList = [{ text: 'No result', url: '' }]
        } else {
            //console.log('Result:', result)
            loadSuggest(result)
        }
    }
}
</script>
<style scoped lang="scss">
#suggestions {
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
