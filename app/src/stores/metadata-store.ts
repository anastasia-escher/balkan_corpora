import {defineStore} from 'pinia'
import {api} from "boot/axios";

export const useMetadataStore = defineStore( {
  id: 'metadata',
  state: () => ({
    metadata: [] as any[],
  }),
  persist: true,
  actions: {
    async getMetadata() {
        const res = await api.get('/get_data.php');
        this.metadata = res.data;
        console.log(this.metadata);
      },

  },
})
