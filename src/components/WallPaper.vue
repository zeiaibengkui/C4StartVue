<script setup lang="ts">
import localforage from 'localforage';
import { effectScope, onMounted, ref, watch } from 'vue';
import OtherSettings from './OtherSettings.vue';

const bgIframeURL = ref('about:blank');
const bgIframeDisplay = ref(true);
const bgVideoURL = ref('about:blank');
const bgVideoDisplay = ref(true);
const waitToChange = ref(true);
const bgStyle = ref({
    backgroundImage: 'initial',
    backgroundPositionX: 'initial',
    backgroundPositionY: 'initial',
    backgroundSize: 'cover',
    backgroundRepeat: 'initial',
    backgroundAttachment: 'initial',
    backgroundOrigin: 'initial',
    backgroundClip: 'initial',
    backgroundColor: '#bcd'
});

function toRealValue(value: any) {
    return JSON.parse(JSON.stringify(value));
}
const a = [bgStyle, bgIframeDisplay, bgIframeURL, waitToChange];
effectScope().run(() => {
    watch(a, async (newValue) => {
        await localforage.setItem('wallpaper', toRealValue(newValue));
    });
    a.forEach(async (el: any, index: number) => {
        var saved: Array<any> | null = await localforage.getItem('wallpaper');
        if (saved) el.value = saved[index];
    });
});
</script>

<template>
    <div id="wallPaper" :style="bgStyle">
        <video
            id="bgVideo"
            preload="none"
            :src="bgVideoURL"
            :style="{ display: bgVideoDisplay ? 'block' : 'none', pointerEvents: 'none' }"
        ></video>
        <iframe
            id="bgIframe"
            :src="bgIframeURL"
            :style="{ display: bgIframeDisplay ? 'block' : 'none', pointerEvents: 'none' }"
        ></iframe>

        <!-- Modal trigger button -->
        <button
            type="button"
            class="btn z-1 position-fixed"
            data-bs-toggle="modal"
            data-bs-target="#bgSettings"
        >
            <i class="bi bi-sliders"></i>
        </button>

        <!-- Modal Body -->
        <div
            class="modal fade"
            id="bgSettings"
            tabindex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
                role="document"
                id="wp-d"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title" id="modalTitleId">Wallpaper Settings</h1>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            data-bs-toggle="tooltip"
                            title="Remember to save!"
                        ></button>
                    </div>
                    <div class="modal-body row">
                        <nav
                            class="col-3 flex-column align-items-stretch pe-4 border-end"
                            style="width: max-content"
                        >
                            <div style="position: sticky; top: 0">
                                <a class="nav-link" href="#bgStyle">bgStyle</a>
                                <a class="nav-link" href="#bgIframea">bgIframe</a>
                                <a class="nav-link" href="#bgVideoa">bgVideo</a>
                                <OtherSettings></OtherSettings>
                            </div>
                        </nav>

                        <div class="col">
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
                            <div id="bgStyle" class="collapse show">
                                <table class="table">
                                    <tbody>
                                        <tr
                                            class=""
                                            v-for="(value, key, index) in bgStyle"
                                            :key="key"
                                            role="group"
                                            aria-label="input group"
                                        >
                                            <td class="" style="width: 15rem; padding: 0.875rem">
                                                <label :for="bgStyle[key] + index">
                                                    {{ key }}</label
                                                >
                                            </td>
                                            <td>
                                                <input
                                                    v-model="bgStyle[key]"
                                                    :type="'text'"
                                                    class="form-control"
                                                    :id="bgStyle[key] + index"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2>bgIframe</h2>
                            <div class="input-group" id="bgIframea">
                                <div class="input-group-text">
                                    <input
                                        type="checkbox"
                                        class="form-check-input mt-0"
                                        v-model="bgIframeDisplay"
                                        id="bgIframeDisplay"
                                    />
                                </div>
                                <label for="bgIframeURL" class="input-group-text"
                                    >bgIframeURL
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="bgIframeURL"
                                    id="bgIframeURL"
                                    placeholder="bgIframeURL"
                                />
                            </div>

                            <h2>bgVideo</h2>
                            <div class="input-group" id="bgVideoa">
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
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                            @click="waitToChange = !waitToChange"
                        >
                            Save and Quit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts"></script>
<style scoped>
#wallPaper,
#bgVideo,
#bgIframe {
    position: absolute;
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
#bgStylePre {
    text-wrap: nowrap;
    height: 16.1rem;
}
#bgStyle ~ h2 {
    margin-top: 2.5rem;
}
</style>
