export const contributors_en = [
    {name: 'Olivier Winistörfer', contribution: 'Organisation, field research, annotation.'},
    {name: 'Anastasia Escher', contribution: 'Software, field research, annotation'},
    {name: 'Maxim Makartsev', contribution: 'Field research, annotation.'},
    {name: 'Ivan Šimko', contribution: 'Annotation.'},
    {name: 'Hristina Angeleska', contribution: 'Annotation.'},
    {name: 'Michaela Lorelai Angel Ciurea', contribution: 'Annotation.'},
]

export const corpusTabs = [
    {name: 'simple', label: 'Simple'},
    {name: 'annotation', label: 'POS tag'},
    {name: 'lemma', label: 'Lemma'},
    {name: 'ud', label: 'UD'},
]

export const examples = {
    aromanian: {
        annotation: {
            Nnpnn: 'slovesa',
        },
        lemma: {
            noun: 'slovo',
            adjective: 'nov',
            verb: 'stana',
        },
    },
}

export const transcription_options = ['Source', 'Diplomatic']

export const columns = [
    {
        name: 'number',
        required: true,
        label: '№',
        align: 'center',
        field: 'number',
        sortable: true,
        headerClasses: 'text-center text-uppercase text-primary',
        style: 'max-width: 5px',
        classes: 'bg-blue-2 ellipsis',
    },
    {
        name: 'words',
        required: true,
        label: 'Text',
        align: 'left',
        field: 'words',
        sortable: true,
        headerClasses: 'text-center text-uppercase  text-primary',
    },
    {
        name: 'metadata',
        required: true,
        label: '',
        align: 'left',
        field: 'metadata',
        sortable: true,
        headerClasses: 'text-center text-uppercase  text-primary',
    },
]

const csvColumns = [
    'number',
    'text',
    'source',
    'variety',
    'theme',
    'interview_year',
    'gender',
    'speaker_birthyear',
    'speaker_L1',
    'speaker_religion',
    'description',
]

export const udOptions = [
    {value: 'any', label: 'any'},
    {value: 'root', label: 'root: sentence root'},
    {value: 'acl', label: 'acl: adnominal clause root'},
    {value: 'advcl', label: 'advcl: adverbial clause root'},
    {value: 'advmod', label: 'advmod: adverbial modifier'},
    {value: 'amod', label: 'amod: adjectival modifier'},
    {value: 'aux', label: 'aux: auxilla'},
    {value: 'case', label: 'case: analytic dependency marker'},
    {value: 'cc', label: 'cc: coordinating conjunction'},
    {value: 'cop', label: 'cop: copula'},
    {value: 'det', label: 'det: determiner'},
    {value: 'discourse', label: 'discourse: discourse marker'},
    {value: 'fixed', label: 'fixed: element of multiple word expression'},
    {value: 'mark', label: 'mark: subordinating conjunction/marker'},
    {value: 'nsubj', label: 'nsubj: subject of the main sentence'},
    {value: 'nmod', label: 'nmod: nominal modifier'},
    {value: 'nummod', label: 'nummod: numeric modifier'},
    {value: 'obj', label: 'obj: direct object'},
    {value: 'obl', label: 'obl: oblique argument'},
    {value: 'orphan', label: 'orphan: orphaned element (no direct head)'},
    {value: 'punct', label: 'punct: punctuation'},
    {value: 'reparandum', label: 'reparandum: stricken tokens (reparanda)'},
    {value: 'vocative', label: 'vocative: vocative element'},
]
