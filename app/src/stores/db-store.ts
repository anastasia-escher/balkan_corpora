import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import {Notify} from "quasar";

interface DBState {
  corpusData: Array<any>;
  metadata: Array<any>;
}

export const useDBStore = defineStore({
  id: 'project',
  state: (): DBState => ({
    corpusData: [],
    metadata: [],

  }),
  actions: {
    async fetchCorpusQuery(payload: any) {

      const res = await api.post('/corpus_query.php', JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.corpusData = res.data;
      if (res.data.length === 0) {
        Notify.create({
          message: 'Your query has given no results',
            color: 'purple'
        })
      }
    },

  },

});
