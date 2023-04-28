import {defineStore} from 'pinia'
import {tsv} from 'd3'
import {Sentence, Text, Word, SentObj} from 'stores/models'
import {parseTextData} from 'stores/helpers'

const TEXTS_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRiwoC1didF9d9I6gD88NKLA1lKms1bnj0A7jIrgPWgBb58BmumAn0F6P9mi7V2XzrwS3DVWGnokd0i/pub?output=tsv'

export const useAromanianStore = defineStore('counter', {
    state: () => ({
        texts: [] as Text[],
        sentences: [] as Sentence[],
        words: [] as Word[],
        meta: [] as any[],
    }),
    persist: true,
    actions: {
        async getTexts() {
            try {
                const res = []
                const texts = await tsv(TEXTS_URL)
                this.meta = texts
                for (const text of texts) {
                    if (text.url && text.id && text.desc && !text.id.startsWith('mac')) {
                        const text_data = await tsv(text.url)
                        res.push(parseTextData(text_data, text.id, text.desc))
                    }
                }

                const _texts: Text[] = []
                let _sentences: Sentence[] = []
                let _words: Word[] = []
                for (const item of res) {
                    _texts.push(item[0])
                    _sentences = _sentences.concat(item[1])
                    _words = _words.concat(item[2])
                }
                this.texts = _texts
                this.sentences = _sentences
                this.words = _words
            } catch (err) {
                console.error(err)
            }
        },
    },
})
