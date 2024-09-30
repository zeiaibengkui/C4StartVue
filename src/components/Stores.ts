/* eslint-disable prefer-const */
import { defineStore } from 'pinia'
import { effectScope, ref, watch, type Ref } from 'vue'
import localforage from 'localforage'

export const useAppFrameStore = defineStore('AppFrame', () => {
    let appNum
    appNum = 0

    return { appNum }
})

export const useLinksStore = defineStore('links', () => {
    const links: Ref<
        {
            icon: string
            name: string
            url?: string
            callback?: (event: any) => any
        }[]
    > = ref([
        {
            icon: 'https://www.emojiall.com/images/60/htc/2795.png',
            name: 'Add',
            callback: async function () {
                links.value.push({
                    icon: await swal({
                        content: 'input',
                        text: 'icon'
                    }),
                    name: await swal({
                        content: 'input',
                        text: 'name'
                    }),
                    url: await swal({
                        content: 'input',
                        text: 'url'
                    })
                })
            }
        }
    ])
    return { links }
})

export function autoSave(value: Array<any>, key: string) {
    let efSc = effectScope()
    efSc.run(async () => {
        for (let i = 0; i < value.length; i++) {
            const el = value[i]
            const index: number = value.indexOf(el)
            let saved: Array<any> | null = await localforage.getItem(key)
            if (saved) el.value = saved[index]
        }
        watch(value, (newValue) => {
            console.log(newValue)

            localforage.setItem(key, toRealValue(newValue))
        })
    })
}

export function toRealValue(value: any): any {
    return JSON.parse(JSON.stringify(value))
}
