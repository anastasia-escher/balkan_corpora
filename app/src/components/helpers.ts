export const setTarget = (payload: any, word: any) => {
    if (payload.tab === 'lemma') {
        if (word.lemma === payload.lemma) {
            word.target = true
        }
    } else if (payload.tab === 'simple') {
        if (word.text.startsWith(payload.simple)) {
            word.target = true
        }
    } else if (payload.tab === 'annotation') {
        if (word.PoS_tag.toLowerCase().startsWith(payload.annotation.toLowerCase())) {
            word.target = true
        }
    } else if (payload.tab === 'ud') {
        if (word.UD_type === payload.ud) {
            word.target = true
        }
    }
}

const filterUdAndUdOfParent = (ud: string, udOfParent: string, sentence: any) => {
    const word = sentence.words.filter((word: any) => word.UD_type === ud)[0]

    if (word) {
        const UD_ncy = Number.parseInt(word.UD_ncy)
        return sentence.words[UD_ncy - 1].UD_type === udOfParent
    }
    return false
}

export const searchQuery = (payload: any, sentences: any) => {
    let res = []
    switch (payload.tab) {
        case 'simple':
            res = sentences.filter((sentence: any) => sentence.plain.diplomatic.includes(payload.simple))
            break
        case 'lemma':
            res = sentences.filter((sentence: any) => {
                return sentence.words.filter((word: any) => word.lemma === payload.lemma).length > 0
            })
            break
        case 'annotation':
            res = sentences.filter((sentence: any) => {
                return (
                    sentence.words.filter((word: any) =>
                        word.PoS_tag.toLowerCase().startsWith(payload.annotation.toLowerCase())
                    ).length > 0
                )
            })
            break
        case 'ud':
            if (payload.udOfParent === 'any' || payload.udOfParent === null) {
                res = sentences.filter((sentence: any) => {
                    return sentence.words.filter((word: any) => word.UD_type === payload.ud).length > 0
                })
                break
            } else {
                res = sentences.filter((sentence: any) =>
                    filterUdAndUdOfParent(payload.ud, payload.udOfParent, sentence)
                )
            }
    }

    console.log(
        res.map((elem: any, i: number) => {
            for (const word of elem.words) {
                word.text = word[payload.transcription.toLowerCase()]
                word.target = false
                setTarget(payload, word)
            }
            return {
                number: i + 1,
                metadata: elem.text_id,
                translation: elem.translation,
                words: elem.words,
            }
        })
    )

    return res.map((elem: any, i: number) => {
        for (const word of elem.words) {
            word.text = word[payload.transcription.toLowerCase()]
            word.target = false
            setTarget(payload, word)
        }
        return {
            number: i + 1,
            metadata: elem.text_id,
            translation: elem.translation,
            words: elem.words,
        }
    })
}

export const downloadCSVData = (items: any[], columns: any[], name: string) => {
    let csv = columns.map((item: any) => item.label).join(',')
    csv += '\r\n'
    items.forEach((row: any) => {
        csv += Object.values(row).join(',')
        csv += '\r\n'
    })

    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'})
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = name
    link.click()
}
