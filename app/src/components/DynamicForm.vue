<script setup lang="ts">
import {ref, defineProps} from 'vue'
import {transcription_options, udOptions} from 'src/data/data'
import {useQuasar} from 'quasar'
import {useDBStore} from "stores/db-store";

import {useSettingsStore} from "stores/settings-store";
import {storeToRefs} from "pinia";

const props = defineProps({
    tab: {
        type: String,
        required: true,
        default: 'simple',
    },
    lang: {
        type: String,
        required: false,
    },
})



const $q = useQuasar()

const {transcription} = storeToRefs(useSettingsStore())
const simpleQuery = ref<string>('')
const lemmaQuery = ref<string>('')
const annotationQuery = ref<string>('')
const udQuery = ref<string | null>(null)
const udOfParentQuery = ref<string | null>(null)

const DBStore = useDBStore()

const onSubmit = async () => {
  const payload: any = {transcription: transcription, tab: props.tab, query: '', language: props.lang}
  if (props.tab === 'simple') {
    payload.query = simpleQuery.value
  } else if (props.tab === 'lemma') {
    payload.query = lemmaQuery.value
  } else if (props.tab === 'annotation') {
    payload.query = annotationQuery.value
  } else if (props.tab === 'ud') {
    if (udQuery.value === 'root' && udOfParentQuery.value !== null) {
      $q.notify('root element has no parents')
      return
    }
    payload.ud = udQuery.value
    payload.udOfParent = udOfParentQuery.value

  }
  await DBStore.fetchCorpusQuery(payload)
}


const onReset = () => {
    lemmaQuery.value = ''
}
</script>

<template>

    <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <div v-if="props.tab === 'lemma'">
                <q-input
                    v-model="lemmaQuery"
                    hint="Enter a lemma"
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || 'Please type something']"></q-input>
            </div>
            <div v-if="props.tab === 'simple'">
                <q-input
                    v-model="simpleQuery"
                    hint="Enter a full text query "
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || 'Please type something']"></q-input>
            </div>
            <div v-if="props.tab === 'annotation'">
                <q-input
                    v-model="annotationQuery"
                    hint="Enter a PoS query (e. g. 'Nmnsy')"
                    lazy-rules
                    :rules="[val => (val && val.length > 0) || 'Please type something']"></q-input>
            </div>

            <div v-if="props.tab === 'ud'">
                <q-select
                    :rules="[val => (val && val.length > 0) || 'Please select something']"
                    v-model="udQuery"
                    :options="udOptions.slice(1)"
                    hint="Select an UD tag"
                    emit-value
                    map-options></q-select>
                <q-select
                    v-model="udOfParentQuery"
                    :options="udOptions"
                    hint="UD of parent (optional)"
                    emit-value
                    map-options></q-select>
            </div>

            <div>
                <q-select
                    v-model="transcription"
                    :options="transcription_options"
                    hint="Select transcription"></q-select>

            </div>

            <div class="q-mt-lg">
                <q-btn label="Submit" type="submit" color="primary"></q-btn>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
            </div>
        </q-form>
    </div>
</template>

<style>
.helper-text-container {
    padding: 20px;
}
</style>
