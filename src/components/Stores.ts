/* eslint-disable prefer-const */
import { defineStore } from 'pinia'
import { effectScope, watch } from 'vue'
import localforage from 'localforage'

export const useAppFrameStore = defineStore('AppFrame', () => {
    let appNum
    appNum = 0

    return { appNum }
})

export function autoSave(value: Array<any>, key: string) {
    let efSc = effectScope()
    efSc.run(async () => {
        for (let i = 0; i < value.length; i++){
            const el = value[i]
            const index: number = value.indexOf(el)
            let saved: Array<any> | null = await localforage.getItem(key)
            if (saved) el.value = saved[index]
        }
        watch(value, (newValue) => {
            localforage.setItem(key, toRealValue(newValue))
        })
    })
}

function toRealValue(value: any): any {
    return JSON.parse(JSON.stringify(value))
}
