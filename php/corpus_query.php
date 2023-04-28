<?php
//header("Access-Control-Allow-Origin: http://localhost:9000");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Content-Type: application/json');
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}
require 'config.php';
function getTargetWord($words) {
    $target_array = array_filter($words, function ($word) {
        return $word['target'];
    });
    if (count($target_array) > 0) {
        return array_values($target_array)[0]; 
    }
    return null;
}

function getParentWord($words, $UD_ncy) {
    $parent_array = array_filter($words, function ($word) use ($UD_ncy) {
        return $word['UD_id'] == $UD_ncy;
    });


    if (count($parent_array) > 0) {
       return array_values($parent_array)[0]; 
    }

    return null;
}
function get_target($tab, $query, $row) {
    switch ($tab) {
        case "lemma":
            return $row["lemma"] == $query;
        case "annotation":
            $pattern = str_replace('_', '.', $query); // replace ? with .
            return preg_match("/$pattern/", $row["PoS_tag"]) === 1;
        case "ud":
            return $row["UD_type"] == $query;
    }
    return false;
    
}
function compareWords($a, $b) {
    if ($a['token_order'] == $b['token_order']) {
        return 0;
    }
    return ($a['token_order'] < $b['token_order']) ? -1 : 1;
}


    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    $tab = $data["tab"] ? $data["tab"] : '';
    $query = $data["query"] ? $data["query"] : '';
    $language = $data["language"] ? $data["language"] : 'Macedonian';



// Get request payload


// Set up pagination variables
// $page = isset($_POST["page"]) ? (int)$_POST["page"] : 1;
// $perPage = isset($_POST["perPage"]) ? (int)$_POST["perPage"] : 10;
// $start = ($page - 1) * $perPage;

$sql = "";

try {

switch ($tab) {
    case "lemma":
        $sql = "SELECT * FROM records 
        INNER JOIN sentences ON records.id = sentences.text_id 
        INNER JOIN words ON sentences.sent_id = words.sent_id 
        WHERE sentences.sent_id IN 
            (SELECT sent_id FROM words WHERE lemma = '$query')
        ORDER BY records.id ASC";
        break;
        
    case "annotation":
       
        $query = str_replace("?", "_", $query);

        $sql = "SELECT * FROM records 
        INNER JOIN sentences ON records.id = sentences.text_id 
        INNER JOIN words ON sentences.sent_id = words.sent_id 
        WHERE sentences.sent_id IN 
            (SELECT sent_id FROM words WHERE PoS_tag LIKE '$query%')
            AND records.language = '$language'

        ORDER BY records.id ASC";
        break;
    case "ud":
        $query = $data["ud"]  ? $data["ud"] : '';
        $sql = "SELECT * FROM records 
        INNER JOIN sentences ON records.id = sentences.text_id 
        INNER JOIN words ON sentences.sent_id = words.sent_id 
        WHERE sentences.sent_id IN 
            (SELECT sent_id FROM words WHERE ud_type = '$query')
            AND records.language = '$language'
        ORDER BY records.id ASC";
        break;
    case "simple":
            $sql = "SELECT * FROM records 
                    INNER JOIN sentences ON records.id = sentences.text_id 
                    INNER JOIN words ON sentences.sent_id = words.sent_id 
                    WHERE plain LIKE '%$query%'
                    AND records.language = '$language'
                    ORDER BY records.id ASC";
            break;


    default:
        throw new Exception('Invalid tab parameter' . json_encode($_POST));
}


$result = mysqli_query($conn, $sql);

// Initialize variables
//$sentences = array();
$sentences = array();
$number = 1;
$text_id = '';
$translation = '';
$words = array();
$sent_id = null;
$metadata = array();



// Loop through the result
while ($row = mysqli_fetch_assoc($result)) {

    // Check if this is a new sentence
    if ($sent_id != $row['sent_id']) {
        // Add the previous sentence to the array, if any
        if (!empty($words)) {
            $sentences[] = array(
                'number' => $number,
                'text_id' => $text_id,
                'translation' => $translation,
                'words' => $words,
                'metadata' => $metadata,
            );
            $number++;
        }
        // Reset the variables for the new sentence
        $text_id = $row['id'];
        $translation = $row['translation'];
        $words = array();
        $sent_id = $row['sent_id'];
        $metadata = array(
            'text_source' => $row['text_source'],
            'language' => $row['language'],
            'latitude' => $row['latitude'],
            'longitude' => $row['longitude'],
            'interview_year' => $row['interview_year'],
            'speaker_ID' => $row['speaker_ID'],
            'speaker_birthyear' => $row['speaker_birthyear'],
            'local_variety' => $row['local_variety'],
            'id' => $row['id'],
            'speaker_gender' => $row['speaker_gender'],
            'speaker_L1' => $row['speaker_L1'],
            'speaker_religion' => $row['speaker_religion'],
            'theme' => $row['theme'],
            'description' => $row['description']);
        }

    // Add the word to the current sentence
    $words[] = array(
        'source' => $row['source'],
        'cyrillic' => $row['cyrillic'],
        'diplomatic' => $row['diplomatic'],
        'lemma' => $row['lemma'],
        'PoS_tag' => $row['PoS_tag'],
        'PoS_ext' => $row['PoS_ext'],
        'sent_id' => $row['sent_id'],
        'UD_id' => $row['UD_id'],
        'UD_ncy' => $row['UD_ncy'],
        'UD_type' => $row['UD_type'],
        'UD_ext' => $row['UD_ext'],
        'text_id' => $row['text_id'],
        'text' => $row['plain'],
        'target' => get_target($tab, $query, $row),
        'token_order' => $row['UD_id']
    );
}
// Add the last sentence to the array

if (!empty($words)) {
   // usort($words, 'compareWords');
    $sentences[] = array(
        'number' => $number,
        'text_id' => $text_id,
        'translation' => $translation,
        'words' => $words,
        'metadata' => $metadata,
    );
}


if ($tab == 'ud' && $data['udOfParent'] && $data['udOfParent'] != 'any') {
    $new_sentences = array();
    for ($i = 0; $i < count($sentences); $i++) {
        $sentence = $sentences[$i];
        $target = getTargetWord($sentence['words']);
    
        if (!$target) {
            continue;
        }
    
        $UD_ncy = $target['UD_ncy'];
        $parent = getParentWord($sentence['words'], $UD_ncy);
    
        if (!$parent) {
            continue;
        }
    
        $parent_ud_type = $parent['UD_type'];
    
        if ($parent_ud_type == $data['udOfParent']) {
            $new_sentences[] = $sentence;
        }
    }

    echo json_encode($new_sentences);
} else {
    echo json_encode($sentences);
}

} catch (Exception $e) {
    echo json_encode(array(
        'success' => false,
        'error' => $e->getMessage()
    ));
}