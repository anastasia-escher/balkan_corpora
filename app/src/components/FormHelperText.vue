<script setup lang="ts">
import {examples} from 'src/data/data'

const props = defineProps({
    tab: {
        type: String,
        required: true,
    },
    lang: {
        type: String,
        required: false,
    },
})
</script>

<template>
    <div class="text-body1" v-if="props.tab === 'ud'">
        <b>UD Tag</b>
        — search tokens by syntactic annotation.
        <br />
        <br />
        Each sentence is syntactically annotated by the
        <a href="https://universaldependencies.org/u/overview/syntax.html" target="_blank">
            Universal Dependencies
        </a>
        standard.
        <br />
        Each token is given an ID according to the position in the sentence.
        <br />
        <br />
        For each token, a dependency on other elements within the sentence is declared by these ids, as well
        as by the character of the dependency.
        <br />
        <br />
        One token in each sentence is marked as its root, usually representing the most verbal element.
        <br />
        <br />
    </div>

    <div class="text-body1" v-if="props.tab === 'lemma'">
        <p>
            <b>Lemma</b>
            — search tokens by lemma, i.e. basic or dictionary form of the word. Nouns are usually given in
            sg.nom (e.g.
            <i>{{ examples.aromanian.lemma.noun }}</i>
            'word'), adjectives in m.sg.nom (e.g.
            <i>{{ examples.aromanian.lemma.adjective }}</i>
            'new'), verbs in 1sg.prs (e.g.
            <i>{{ examples.aromanian.lemma.verb }}</i>
            'stand up').
        </p>
    </div>

    <div class="text-body1" v-if="props.tab === 'annotation'">
        <p>
            <b>PoS Tag</b>
            — search tokens by tags reflecting part-of-speech category and morphological properties.
        </p>
        <p>
            Morphological annotation follows the
            <a href="http://nl.ijs.si/ME/V6/msd/html/msd-bg-dam.html">MULTEXT-East</a>
            standard with minor modifications. The information is provided by a string of characters,
            reflecting the part-of-speech category (capital) and information marked by the inflection.
        </p>
        <p>
            The strings are specific for each part-of-speech category. For example,
            <i>{{ examples.aromanian.annotation.Nnpnn }}</i>
            'words' would be annotated as
            <b>Nnpnn</b>
            , denoting category as "noun" and inflection (neutral gender, plural number, default/nominative
            case, not animated).
        </p>
        <p>
            It is possible to search for a full tag and for a part: for example, the query
            <b>N</b>
            will find all the nouns and the query
            <b>Nf</b>
            — all the feminine nouns. Also, you can replace a category tag with '?' in order to get any value,
            e. g.
            <b>N?sny</b>
            will return singular animate nouns in nominative of all genders.
        </p>
    </div>
</template>

<style></style>
