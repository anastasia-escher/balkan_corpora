<script setup lang="ts">
import {defineProps} from 'vue'
import {useQuasar} from 'quasar'
import {useI18n} from 'vue-i18n'
import {columns} from 'src/data/data'
import {useRouter} from 'vue-router'
import {storeToRefs} from "pinia";
import {useDBStore} from "stores/db-store";
import {useSettingsStore} from "stores/settings-store";


const {transcription} = storeToRefs(useSettingsStore())

const props = defineProps({
    lang: {
        type: String,
        required: false,
    },

})

const $q = useQuasar()
const {t} = useI18n()
const router = useRouter()

const prepareCsvColumns = () => {
    console.log('preparing')
}

const {corpusData} = storeToRefs(useDBStore())
</script>

<template>

    <div class="table-cont" v-if="corpusData.length > 0">

<!--                <q-btn-->
<!--                    class="q-mt-sm q-mb-lg"-->
<!--                    @click="downloadWithNotify(props.result, columns, 'corpus_sentences')"-->
<!--                    color="primary"-->
<!--                    label="CSV" />-->

      <q-table file_name="sample" :rows="corpusData" :columns="columns">
<!--        <q-grid file_name="sample" :data="corpusData" :columns="columns">-->

        <template v-slot:body="props">
          <q-tr :props="props" class="text-body1">

            <q-td key="number" class="number-td">
              <p class="text-body1 text-grey-7 text-center">{{ props.row.number }}</p>
            </q-td>
            <q-td key="words"  style="max-width: 400px; word-wrap: break-word;  white-space: normal;">
                        <span class="token table-text" v-for="(word, i) in props.row.words" :key="word + i">
                            <span v-if="word.PoS_tag !== 'Z'" :class="word.target ? 'target' : ''">
                                {{ ` ${word[transcription.toLowerCase()]}` }}
                            </span>
                            <span v-if="word.PoS_tag === 'Z'">{{ `${word.source}` }}</span>
                            <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, -10]">
                                <div class="tooltip">Lemma: {{ word.lemma }}</div>
                                <div class="tooltip">PoS Tag: {{ word.PoS_tag }}</div>
                                <div class="tooltip">UD type: {{ word.UD_type }}</div>
                                <div class="tooltip">UD dependency: {{ word.UD_ncy }}</div>
                            </q-tooltip>
                        </span>
              <p class="text-body2 text-grey-7">{{ props.row.translation }}</p>
            </q-td>
            <q-td key="metadata">
                        <span class="text-caption">
                            {{ props.row.metadata.text_source }}
                        </span>
              <br />
              <span
                class="token text-body1"
                @click="router.push({path: `metadata/${props.row.text_id}/${lang}`})">
                            {{ t('result.showAllMeta').toUpperCase() }}
                        </span>
            </q-td>
          </q-tr>
        </template>
      </q-table>

    </div>

</template>

<style>
.table-cont {
    margin-bottom: 200px;
}

.table-text {
    font-size: 1rem;
}

.token {
    color: #1976d2;
    cursor: pointer;
}

.token:hover {
    color: darkblue;
    font-weight: bold;
}

.th {
    font-size: 1.2rem;
    font-weight: bold;
}
.tooltip {
    font-size: 1rem;
}

.number-td {
    width: 3px;
}

.target {
    color: red;
}

.center {
  text-align: center;
}

.q-table-container .q-td {
  max-width: 400px;
  word-wrap: break-word;
}

</style>
