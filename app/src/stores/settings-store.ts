import {defineStore} from 'pinia'



export const useSettingsStore = defineStore( {
  id: 'settings',
  state: () => ({
    transcription: 'Source',
  }),


})
