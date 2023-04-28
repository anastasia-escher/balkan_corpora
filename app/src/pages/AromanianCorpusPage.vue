<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {useAromanianStore} from 'stores/aromanian-store'
import {onMounted, ref} from 'vue'
import CorpusTabs from '../components/CorpusTabs.vue'
import ResultTable from '../components/ResultTable.vue'
import {searchQuery} from 'components/helpers'
import {useQuasar} from 'quasar'

onMounted(() => {
    aromanianStore.getTexts()
    if ($q.localStorage.getItem('queryResult')) {
        dataToRepresentation.value = $q.localStorage.getItem('queryResult')
    }
    console.log('SENTENCES', aromanianStore.sentences)
})

const $q = useQuasar()
const {t} = useI18n()
const aromanianStore = useAromanianStore()

const dataToRepresentation = ref<any>([])

const search = (payload: any) => {
    $q.localStorage.set('queryResult', [])
    dataToRepresentation.value = searchQuery(payload, aromanianStore.sentences)
    $q.localStorage.set('queryResult', dataToRepresentation.value)
}
</script>

<template>
    <q-page class="q-page-container">
        <main class="q-page index-doc-page">
            <div class="text-primary doc-heading doc-h2 text-h4">
                {{ t('aromanian_corpus.title') }}
            </div>

            <div class="q-mt-lg">
                <CorpusTabs lang="Aromanian" @submitFromCorpusTabs="search" />
            </div>
        </main>
        <div class="q-page table-container">
            <ResultTable :result="dataToRepresentation" :meta="aromanianStore.meta" lang="aromanian" />
        </div>
    </q-page>
</template>

<style>
.table-container {
    width: 90%;
    margin: auto;
}

@media only screen and (max-width: 700px) {
    .table-container {
        width: 96%;
    }
}
</style>
