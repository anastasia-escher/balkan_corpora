<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="header">
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                    align="right" />
                <q-toolbar-title class="toolbar-title">{{ t('header.title') }}</q-toolbar-title>
            </q-toolbar>

            <q-tabs align="center">
                <q-route-tab to="/" :label="t('header.home')" exact />
                <q-route-tab to="/aromanian_corpus" :label="t('header.aromanian_corpus')" exact />
                <q-route-tab to="/mac_corpus" :label="t('header.mac_corpus')" exact />
            </q-tabs>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" bordered>
            <q-list>
                <q-item-label header>Essential Links</q-item-label>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
        <q-footer elevated class="bg-grey-8 text-white bg-primary">
            <q-toolbar>
                <div class="justify-center footer-content">
                    <q-avatar icon="school"></q-avatar>
                    <span class="text-body1">
                        {{ t('footer.university') }} {{ new Date().getFullYear() }}
                    </span>
                </div>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<style>
.header {
    height: 100px;
    background-image: url('src/assets/cover.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}
.toolbar-title {
    cursor: pointer;
}
.footer-content {
    margin: auto;
}
</style>
