<template>
    <!-- Button trigger modal -->
    <!-- <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#LoaclForageSettings"
    >
        LoaclForageSettings
    </button> -->

    <!-- Modal -->
    <div
        class="modal-lg modal fade"
        id="LoaclForageSettings"
        tabindex="-1"
        role="dialog"
        aria-labelledby="LoaclForageSettingsTitleId"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title" id="LoaclForageSettingsTitleId">
                        LoaclForage Settings
                    </h2>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body" id="lfs-body">
                    <nav
                        class="col-3 flex-column align-items-stretch pe-4 border-end me-4"
                        style="width: max-content"
                    >
                        <a
                            v-for="el in otherSettings"
                            data-bs-toggle="modal"
                            :key="el.name"
                            class="nav-link"
                            :href="el.href"
                            >{{ el.name }}</a
                        >
                    </nav>
                    <button
                        class="btn btn-outline-warning"
                        data-bs-toggle="button"
                        @click="fire = !fire"
                    >
                        {{ fire ? 'Fire' : 'Cancel' }}
                    </button>
                    <div
                        class="progress w-25"
                        role="progressbar"
                        aria-label="progress"
                        :aria-valuenow="progress"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        <div
                            class="progress-bar progress-bar-striped bg-danger"
                            :style="{ width: progress + '%' }"
                        >
                            {{ 'left:' + (6 - progress / 20) + 's' }}
                        </div>
                    </div>
                    <button class="btn btn-danger" id="clearNow" @click="bomb">
                        {{ bombed ? 'Succeed' : 'CLEAR NOW' }}
                    </button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import localforage from 'localforage'
import swal from 'sweetalert'
import { ref, watch } from 'vue'
import otherSettings from './OtherSettings.ts'

const bomb = () => {
    localforage.clear().then(() => {
        bombed.value = true
        swal({
            title: 'Your data has been cleared!',
            icon: 'success',
            buttons: ['not now', 'reload']
        }).then((btn) => {
            if (btn) {
                //console.log(btn)
                location.reload()
            }
        })
    })
}

const fire = ref(true)
const progress = ref(0)
const bombed = ref(false)
var running: number
watch(fire, async (n) => {
    if (!n) {
        running = setInterval(function () {
            if (progress.value >= 100) {
                bomb()
                fire.value = true
            }
            progress.value += 20
        }, 1000)
    } else {
        clearInterval(running)
        progress.value = 0
    }
})
</script>

<style scoped>
[data-bs-target='#LoaclForageSettings'] {
    position: absolute;
    top: 0;
    right: 100px;
}

#lfs-body {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>
