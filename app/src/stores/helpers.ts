import {SentObj, Word} from 'stores/models'

export const generatePlainText = (sentence: any) => {
    const plain = {diplomatic: '', source: ''}
    for (const word of sentence.words) {
        plain.diplomatic += word.diplomatic
        plain.source += word.source

        if (word.PoS_tag !== 'Z') {
            plain.diplomatic += ' '
            plain.source += ' '
        } else {
            plain.diplomatic = plain.diplomatic.slice(0, -2) + `${word.diplomatic} `
            plain.source = plain.source.slice(0, -2) + `${word.source} `
        }
    }

    plain.diplomatic = plain.diplomatic.trim()
    plain.source = plain.source.trim()

    return plain
}

export const createWordObj = (word: Word, textId: string) => {
    return {
        source: word.source.trim(),
        cyrillic: word.cyrillic.trim(),
        diplomatic: word.diplomatic.trim(),
        lemma: word.lemma.trim(),
        PoS_tag: word.PoS_tag.trim(),
        PoS_ext: word.PoS_ext.trim(),
        sent_id: word.sent_id.trim(),
        UD_id: word.UD_id.trim(),
        UD_ncy: word.UD_ncy.trim(),
        UD_type: word.UD_type.trim(),
        UD_ext: word.UD_ext.trim(),
        text_id: textId,
    }
}

export const parseTextData = (data: any, textId: string, desc: string) => {
    const text = {id: textId, description: desc}
    const sentences: SentObj = {}
    const words = data.filter((item: any) => item.source.length > 0)
    for (const word of words) {
        if (!(word.sent_id in sentences)) {
            sentences[word.sent_id] = {
                sent_id: word.sent_id,
                text_id: textId,
                translation: '',
                ro_translation: '',
                words: [],
                plain: {diplomatic: '', source: ''},
            }
        }
        const wordObj = createWordObj(word, textId)
        sentences[word.sent_id].words.push(wordObj)

        if (word.translation && word.translation.length > 0) {
            sentences[word.sent_id].translation = word.translation
        }
    }
    for (const [key, value] of Object.entries(sentences)) {
        sentences[key].plain = generatePlainText(value)
    }

    return [text, Object.values(sentences), words]
}
