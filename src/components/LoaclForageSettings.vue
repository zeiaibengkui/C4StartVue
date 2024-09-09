<template>
    <div class="modal-body" id="lfs-body">
        <button class="btn btn-outline-warning fire" data-bs-toggle="button" @click="fire = !fire">
            {{ fire ? 'Fire' : 'Cancel' }}
        </button>
        <div
            class="progress w-50"
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

    <div id="lfs-view" class="pt-5">
        <h2>View <a class="btn float-end btn-secondary" @click="reload">Reload</a></h2>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Keys</th>
                    <th scope="col">Values</th>
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="item in view" :key="item.key">
                    <td>{{ item.key }}</td>
                    <td style="width: 30rem; display: block">
                        <hljsVuePlugin.component autodetect :code="item.value + ''" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import hljsVuePlugin from '@highlightjs/vue-plugin'
import localforage from 'localforage'
import swal from 'sweetalert'
import { defineComponent, onMounted, ref, watch, type Ref } from 'vue'

const bomb = () => {
    localforage.clear().then(() => {
        bombed.value = true
        swal({
            title: 'Your data has been cleared!',
            icon: 'success',
            buttons: ['not now', 'reload']
        }).then((btn: any) => {
            if (btn) {
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

const view: Ref<
    | {
          key: string
          value: unknown
      }[]
    | undefined
> = ref([])

const reload = async () => {
    let keys = await localforage.keys()
    view.value = []
    keys.forEach(async (el, index) => {
        view.value?.push({
            key: el,
            value: await localforage.getItem(el)
        })
    })
}
reload()
</script>

<style scoped>
[data-bs-target='#LoaclForageSettings'] {
    position: absolute;
    top: 0;
    right: 100px;
}

#lfs-body {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > button {
        width: 8rem;
    }

    .fire {
        width: 5rem;
    }
}
</style>
