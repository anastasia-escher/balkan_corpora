<script setup lang="ts">
import {ref, defineEmits, defineProps} from 'vue'
import {corpusTabs} from 'src/data/data'
import DynamicForm from 'components/DynamicForm.vue'
import FormHelperText from 'components/FormHelperText.vue'

const props = defineProps({
    lang: {
        type: String,
        required: true,
    },
})
const emit = defineEmits(['submitFromCorpusTabs'])
const tab = ref<string>('simple')


</script>

<template>
    <q-card class="search-panel">
        <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
            <q-tab v-for="tab in corpusTabs" :key="tab.name" :name="tab.name" :label="tab.label"></q-tab>
        </q-tabs>
        <q-separator></q-separator>
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel :name="tab.name" v-for="tab in corpusTabs" :key="tab.name + tab.label">
                <FormHelperText :tab="tab.name" :lang="props.lang" />
                <DynamicForm :tab="tab.name" :lang="props.lang"/>
            </q-tab-panel>
        </q-tab-panels>
    </q-card>
</template>

<style>
.search-panel {
    min-height: 400px;
    margin: 60px auto;
    overflow: auto;
}

@media only screen and (max-width: 700px) {
    .search-panel {
        width: 95%;
        margin: auto;
    }
}
</style>
