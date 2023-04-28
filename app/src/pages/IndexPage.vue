<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {contributors_en} from 'src/data/data'
import {onMounted} from 'vue'
import {useQuasar} from 'quasar'
import {useAromanianStore} from 'stores/aromanian-store'
import {useMetadataStore} from 'stores/metadata-store'
import {useDBStore} from 'stores/db-store'

const $q = useQuasar()
const {t} = useI18n()
const aromanianStore = useAromanianStore()
const metadataStore = useMetadataStore()
const dbStore = useDBStore()

onMounted( async () => {

  await metadataStore.getMetadata()
  console.log('METADATA', metadataStore.metadata)
    aromanianStore.getTexts()
    $q.localStorage.set('queryResult', [])

})

</script>

<template>

    <q-page class="content-container q-page-container">
        <main class="q-page index-doc-page">
            <div class="text-primary doc-h2 text-h4">
                {{ t('header.title') }}
            </div>
            <div class="text-h5 text-primary q-mt-md">{{ t('index.about') }}</div>
            <q-separator class="q-mt-md q-mb-md"></q-separator>
            <transition
                appear
                enter-active-class="animated backInDown"
                leave-active-class="animated backOutDown">
                <p class="text-body1">{{ t('index.about_text.p1') }}</p>
            </transition>
            <transition
                appear
                enter-active-class="animated backInDown"
                leave-active-class="animated backOutDown">
                <p class="text-body1">{{ t('index.about_text.p2') }}</p>
            </transition>
            <div class="text-h5 text-primary q-mt-lg">{{ t('index.aromanian_corpus.title') }}</div>
            <q-separator class="q-mt-md q-mb-md"></q-separator>
            <transition
                appear
                enter-active-class="animated backInDown"
                leave-active-class="animated backOutDown">
                <p class="text-body1">{{ t('index.aromanian_corpus.p1') }}</p>
            </transition>

            <div class="text-h5 text-primary q-mt-lg">{{ t('index.notes_on_annotation.title') }}</div>
            <q-separator class="q-mt-md q-mb-md"></q-separator>
            <transition
                appear
                enter-active-class="animated backInDown"
                leave-active-class="animated backOutDown">
                <p class="text-body1">{{ t('index.notes_on_annotation.p1') }}</p>
            </transition>

            <div class="text-h5 text-primary q-mt-lg">{{ t('index.citation.title') }}</div>
            <q-separator class="q-mt-md q-mb-md"></q-separator>
            <transition
                appear
                enter-active-class="animated backInDown"
                leave-active-class="animated backOutDown">
                <p class="text-body1">
                    {{ t('index.citation.p1') }} {{ ' ' }}
                    <span>
                        ( {{ t('index.citation.last_access') }} {{ ' '
                        }}{{ new Date().toLocaleDateString() }} )
                    </span>
                </p>
            </transition>

            <div class="text-h5 text-primary q-mt-lg">{{ t('index.contributors.title') }}</div>
            <q-separator class="q-mt-md q-mb-md"></q-separator>
            <transition-group
                appear
                enter-active-class="animated backInDown"
                leave-active-class="animated backOutDown">
                <div v-for="contributor in contributors_en" :key="contributor.name">
                    <p class="text-body1">
                        <b class="text-primary">{{ contributor.name }}:</b>
                        {{ ' ' }}
                        <span>{{ contributor.contribution }}</span>
                    </p>
                </div>
            </transition-group>
        </main>
    </q-page>
</template>

<style></style>
