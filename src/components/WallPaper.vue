<script setup lang="ts">
import localforage from 'localforage'
import { effectScope, ref, watch } from 'vue'
import RcMenuItem from './rcMenuItem.vue'
import $ from 'jquery'

const bgIframeURL = ref('about:blank')
const bgIframeDisplay = ref(false)
const bgVideoURL = ref('about:blank')
const bgVideoDisplay = ref(false)
const waitToChange = ref(true)
const bgStyle = ref({
    backgroundImage: 'url(/wallpaper.png)',
    backgroundPositionX: 'initial',
    backgroundPositionY: 'initial',
    backgroundSize: 'cover',
    backgroundRepeat: 'initial',
    backgroundAttachment: 'initial',
    backgroundOrigin: 'initial',
    backgroundClip: 'initial',
    backgroundColor: '#bcd'
})

function toRealValue(value: any) {
    return JSON.parse(JSON.stringify(value))
}
const a = [bgStyle, bgIframeDisplay, bgIframeURL, waitToChange]
effectScope().run(() => {
    watch(a, async (newValue) => {
        await localforage.setItem('wallpaper', toRealValue(newValue))
    })
    a.forEach(async (el: any, index: number) => {
        const saved: Array<any> | null = await localforage.getItem('wallpaper')
        if (saved) el.value = saved[index]
    })
})
</script>

<template>
    <div id="wallPaper" :style="bgStyle">
        <RcMenuItem
            :value="{
                name: 'Wallpaper Settings',
                callback: (e) => {
                    $(`[data-bs-target=&quot;#v-pills-wallpaper&quot;]`)[0].click()
                }
            }"
        ></RcMenuItem>
        <video
            id="bgVideo"
            preload="none"
            :src="bgVideoURL"
            :style="{ display: bgVideoDisplay ? 'block' : 'none' }"
        ></video>
        <iframe
            id="bgIframe"
            :src="bgIframeURL"
            :style="{ display: bgIframeDisplay ? 'block' : 'none' }"
        ></iframe>
    </div>

    <Teleport to="#v-pills-wallpaper">
        <div class="col" id="wallpaper-settings">
            <h2>
                bgStyle<button
                    class="btn"
                    data-bs-toggle="collapse"
                    data-bs-target="#bgStyle"
                    aria-expanded="true"
                    aria-controls="bgStyle"
                >
                    <i class="bi bi-arrow-down"></i>
                </button>
            </h2>
            <ul id="bgStyle" class="collapse show list-group">
                <li class="list-group-item" v-for="(value, key, index) in bgStyle" :key="key">
                    <label class="" :for="bgStyle[key] + index"> {{ key }}</label>

                    <input
                        v-model="bgStyle[key]"
                        :type="'text'"
                        class="form-control float-end w-auto"
                        :id="value + index"
                    />
                </li>
            </ul>

            <h2>bgIframe</h2>
            <div class="input-group" id="bgIframeSet">
                <div class="input-group-text">
                    <input
                        type="checkbox"
                        class="form-check-input mt-0"
                        v-model="bgIframeDisplay"
                        id="bgIframeDisplay"
                    />
                </div>
                <label for="bgIframeURL" class="input-group-text">bgIframeURL </label>
                <input
                    type="text"
                    class="form-control"
                    v-model="bgIframeURL"
                    id="bgIframeURL"
                    placeholder="bgIframeURL"
                />
            </div>

            <h2>bgVideo</h2>
            <div class="input-group" id="bgVideoSet">
                <div class="input-group-text">
                    <input
                        type="checkbox"
                        class="form-check-input mt-0"
                        v-model="bgVideoDisplay"
                        id="bgVideoDisplay"
                    />
                </div>
                <label for="bgVideoURL" class="input-group-text">bgVideoURL </label>
                <input
                    type="text"
                    class="form-control"
                    v-model="bgVideoURL"
                    id="bgVideoURL"
                    placeholder="bgVideoURL"
                />
            </div>
        </div>
    </Teleport>
</template>
<script lang="ts"></script>
<style scoped>
#wallPaper,
#bgVideo,
#bgIframe {
    position: absolute;
    z-index: 0;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: block;
}

#bgVideo,
#bgIframe {
    z-index: 0;
}

#bgStyle ~ h2 {
    margin-top: 2.5rem;
}
</style>
