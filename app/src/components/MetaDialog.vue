<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from 'vue'
import {useQuasar} from 'quasar'
import {useI18n} from 'vue-i18n'
import {storeToRefs} from "pinia";
import {useMetadataStore} from "stores/metadata-store";
import {useRouter} from "vue-router";
import L from "leaflet";
import 'leaflet/dist/leaflet.css'


const router = useRouter()

onMounted(async () => {

  if (metadataStore.metadata.length === 0) {
    await metadataStore.getMetadata()
  }

  map.value = L.map('mapContainer').setView([41.49484630651534, 20.79235321642247], 5)
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value)
  let customPane = map.value.createPane('customPane')
  let canvasRenderer = L.canvas({pane: 'customPane'})
  customPane.style.zIndex = 399

  if (metadataFiltered.value.latitude !== 'NA' && metadataFiltered.value.longitude !== 'NA') {
    L.circleMarker([parseFloat(metadataFiltered.value.latitude.trim()), parseFloat(metadataFiltered.value.longitude.trim())], {
      radius: 5,
      opacity: 1,
      color: 'blue',
      fill: true,
      fillColor: 'blue',
      fillOpacity: 1,
    }).addTo(map.value)
  }

})
const metadataStore = useMetadataStore()
const {metadata} = storeToRefs(useMetadataStore())

const metadataFiltered = computed(() => {
  return metadataStore.metadata.filter((item: any) => item.id === router.currentRoute.value.params.text_id)[0]
})

const map = ref<any>(null)

const $q = useQuasar()
const {t} = useI18n()
</script>

<template>
    <q-card>
        <q-card-section horizontal>
            <q-card-section>
                <q-list class="q-mt-lg">
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="library_books"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.source') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.text_source }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="language"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.variety') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.local_variety }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="mark_unread_chat_alt"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.theme') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.theme }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="calendar_month"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.interview_year') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.interview_year }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="transgender"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.speaker_gender') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.speaker_gender }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="calendar_month"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.speaker_birthyear') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.speaker_birthyear }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="translate"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.speaker_L1') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.speaker_L1 }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="temple_buddhist"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.speaker_religion') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.speaker_religion }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section avatar>
                            <q-icon color="primary" name="description"></q-icon>
                        </q-item-section>

                        <q-item-section>
                            <q-item-label caption>{{ t('result.description') }}</q-item-label>
                            <q-item-label>{{ metadataFiltered.description }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-img>
              <div id="mapContainer"></div>

            </q-img>
        </q-card-section>
    </q-card>
</template>

<style>
.metaCard {
    overflow: scroll;
    margin: auto;
}

#mapContainer {
  width: 90%;
  height: 400px;
  margin: 40px auto 20px;

}
</style>
