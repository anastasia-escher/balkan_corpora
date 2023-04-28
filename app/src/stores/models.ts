export interface Text {
    id: string
    description: string
}

export interface Word {
    source: string
    cyrillic: string
    diplomatic: string
    lemma: string
    PoS_tag: string
    PoS_ext: string
    sent_id: string
    UD_id: string
    UD_ncy: string
    UD_type: string
    UD_ext: string
    text_id: string
}

export interface Sentence {
    sent_id: string
    text_id: string
    translation: string
    ro_translation?: string
    words: Word[]
    plain: {diplomatic: string; source: string}
}

export interface SentObj {
    [key: string]: Sentence
}
