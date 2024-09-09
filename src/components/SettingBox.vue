<script lang="ts" setup>
import HomeSettings from './HomeSettings.vue'
import LoaclForageSettings from './LoaclForageSettings.vue'
</script>

<template>
    <!-- Modal trigger button -->
    <button class="btn" data-bs-toggle="modal" data-bs-target="#settings-box" title="settings">
        <i class="bi bi-sliders"></i>
    </button>

    <div
        class="modal modal-xl fade"
        id="settings-box"
        tabindex="-1"
        role="dialog"
        aria-labelledby="settings-box"
        aria-hidden="true"
    >
        <div
            class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
            role="document"
        >
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title" id="settings-box">Settings</h2>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex align-items-start row h-100">
                        <div
                            class="nav flex-column nav-pills me-3 ms-3 col-auto position-sticky top-0"
                            id="v-pills-tab"
                            role="tablist"
                            aria-orientation="vertical"
                        >
                            <button
                                class="nav-link active"
                                id="v-pills-home-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-home"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-home"
                                aria-selected="true"
                            >
                                Home
                            </button>
                            <button
                                class="nav-link"
                                id="v-pills-wallpaper-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-wallpaper"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-wallpaper"
                                aria-selected="false"
                            >
                                Wallpaper
                            </button>
                            <!-- <button class="nav-link" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false" disabled>Disabled</button> -->
                            <!-- <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button> -->
                            <button
                                class="nav-link"
                                id="v-pills-localforage-tab"
                                data-bs-toggle="pill"
                                data-bs-target="#v-pills-localforage"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-localforage"
                                aria-selected="false"
                            >
                                Localforage
                            </button>
                        </div>
                        <div
                            class="tab-content col"
                            id="v-pills-tabContent"
                            style="/*height: 100vh*/"
                        >
                            <div
                                class="tab-pane fade show active"
                                id="v-pills-home"
                                role="tabpanel"
                                aria-labelledby="v-pills-home-tab"
                                tabindex="0"
                            >
                                <HomeSettings />
                            </div>
                            <div
                                class="tab-pane fade"
                                id="v-pills-wallpaper"
                                role="tabpanel"
                                aria-labelledby="v-pills-wallpaper-tab"
                                tabindex="0"
                            ></div>
                            <!-- <div class="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabindex="0">...</div> -->
                            <!-- <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">...</div> -->
                            <div
                                class="tab-pane fade"
                                id="v-pills-localforage"
                                role="tabpanel"
                                aria-labelledby="v-pills-localforage-tab"
                                tabindex="0"
                            >
                                <Suspense> <LoaclForageSettings /></Suspense>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">
                        Save and Quit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
    --bs-nav-pills-link-active-bg: transparent;
}

.modal-dialog-scrollable .modal-content {
    height: 100%;
}
[data-bs-target='#settings-box'] {
    position: absolute;
    z-index: 1;
}
</style>
