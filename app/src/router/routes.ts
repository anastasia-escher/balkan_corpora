import {RouteRecordRaw} from 'vue-router'
import AromanianCorpusPage from 'pages/AromanianCorpusPage.vue'
import MacCorpusPage from 'pages/MacCorpusPage.vue'
import MacCorpusPage2 from 'pages/MacCorpusPage.vue'
import MetaDataPage from 'pages/MetaDataPage.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {path: '', component: () => import('pages/IndexPage.vue')},
            {path: 'aromanian_corpus', component: AromanianCorpusPage},
            {path: 'mac_corpus', component: MacCorpusPage},
          {path: 'mac_corpus2', component: MacCorpusPage2},
            {path: 'metadata/:text_id/:lang', component: MetaDataPage},
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
]

export default routes
