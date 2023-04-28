<?php

function populateDb($sentences) {
    require 'config.php';

    $stmt1 = $conn->prepare("INSERT INTO sentences (text_id, translation, plain, plain_diplomatic, source) VALUES (?, ?, ?, ?, ?)");
    $stmt2 = $conn->prepare("INSERT INTO words (source, cyrillic, diplomatic, lemma, PoS_tag, PoS_ext, sent_number, UD_id, UD_ncy, UD_type, UD_ext, sent_id, text_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if (!$stmt1 || !$stmt2) {
        echo "Error preparing statement: " . $conn->error;
        return;
    }

    foreach ($sentences as $sentence) {
        $text_id = $sentence['text_id'];
        $translation = $sentence['translation'];
        $plain = $sentence['plain'];
        $plain_diplomatic = $sentence['plain_diplomatic'];
        $source = $sentence['source'];

        // Insert data into the sentences table
        $stmt1->bind_param("sssss", $text_id, $translation, $plain, $plain_diplomatic, $source);
        $stmt1->execute();

        if ($stmt1->errno) {
            echo "Execute failed for sentence: (" . $stmt1->errno . ") " . $stmt1->error;
            continue;
        }

        $sent_id = $stmt1->insert_id;

        foreach ($sentence['words'] as $word) {
            $source = $word['source'];
            $cyrillic = $word['cyrillic'];
            $diplomatic = $word['diplomatic'];
            $lemma = $word['lemma'];
            $PoS_tag = $word['PoS_tag'];
            $PoS_ext = $word['PoS_ext'];
            $sent_number = $word['sent_number'];
            $UD_id = $word['UD_id'];
            $UD_ncy = $word['UD_ncy'];
            $UD_type = $word['UD_type'];
            $UD_ext = $word['UD_ext'];
            $sent_id = $sent_id;
            $text_id = $sentence['text_id'];

            $stmt2->bind_param("ssssssiiissii", $source, $cyrillic, $diplomatic, $lemma, $PoS_tag, $PoS_ext, $sent_number, $UD_id, $UD_ncy, $UD_type, $UD_ext, $sent_id, $text_id);
            $stmt2->execute();
        }
    }

    $stmt1->close();
    $stmt2->close();
    $conn->close();
}

function parse_file($url, $id, $text_name) {

    $content = file_get_contents($url);
    $sentences_raw = explode("\t\t\t\t\t\t\t\t\t\t\t", $content);
    $sentences = [];

    foreach ($sentences_raw as $sentence_raw) {

        $words_raw = explode("\n", ltrim(trim($sentence_raw, '\t'), '\t'));
        
        $words = array();
        $plain = '';
        $plain_diplomatic = '';
        $translation = '';

        foreach ($words_raw as $word_raw) {
            $components = explode("\t", $word_raw);
           
            if (count($components) > 5) {
                $word = [
                    'source' => $components[0],
                    'cyrillic' => $components[1],
                    'diplomatic' => $components[2],
                    'lemma' => $components[3],
                    'PoS_tag' => $components[4],
                    'PoS_ext' => $components[5],
                    'sent_number' => $components[6],
                    'UD_id' => $components[7],
                    'UD_ncy' => $components[8],
                    'UD_type' => $components[9],
                    'UD_ext' => $components[10],
                    'text_id' => $id,
                    
                ];
    
                if ($components[11] && strlen($components[11]) > 1) {
                    $translation = $components[11];
                }
    
                $plain .= $word['source'] . ' ';
                $plain_diplomatic .= $word['diplomatic'] . ' ';
                $words[] = $word;
            }

        }

        $sentence = [
            'source' => $text_name,
            'text_id' => $id,
            'translation' => $translation,
            'plain' => rtrim($plain),
            'plain_diplomatic' => rtrim($plain_diplomatic),
            'words' => $words,
        ];

        $sentences[] = $sentence;
    }
  
    return $sentences;
}

$sentences = parse_file('text1.tsv', 'mac_resen_escher_1', 'Escher 2020');
populateDb($sentences);
echo 'Done';



?>