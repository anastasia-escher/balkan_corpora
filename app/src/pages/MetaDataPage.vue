<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import MetaDialog from 'components/MetaDialog.vue'
import {useMetadataStore} from "stores/metadata-store";

onMounted(async () => {
  if (metadataStore.metadata.length === 0) {
    await metadataStore.getMetadata()
  }

})

const metadataStore = useMetadataStore()
const router = useRouter()
const {t} = useI18n()


</script>

<template>

    <q-page class="q-page-container">
        <q-btn color="primary" outline flat @click="router.go(-1)" class="q-ml-lg q-mt-lg">Go back</q-btn>
        <main class="q-page meta-page">
            <div class="text-primary doc-heading doc-h2 text-h4">{{ t('metadata.title') }}  </div>
            <MetaDialog  />
        </main>
    </q-page>
</template>

<style>
.meta-page {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
}
</style>


