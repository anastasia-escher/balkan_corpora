<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import CorpusTabs from '../components/CorpusTabs.vue'
import ResultTable from '../components/ResultTable.vue'
import {useQuasar} from 'quasar'

const $q = useQuasar()
const {t} = useI18n()

</script>

<template>
  <q-page class="q-page-container">
    <main class="q-page index-doc-page">
      <div class="text-primary doc-heading doc-h2 text-h4">The Macedonian Corpus</div>
      <div class="q-mt-lg">
        <CorpusTabs lang="Macedonian"  />
      </div>
    </main>
    <div class="q-page table-container">
      <ResultTable  lang="Macedonian"  />
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
