<?php
require 'config.php';


$tsvFile = 'data.tsv';
$delimiter = "\t";

if (($handle = fopen($tsvFile, 'r')) !== false) {
    $headers = fgetcsv($handle, 1000, $delimiter);
    
    while (($data = fgetcsv($handle, 1000, $delimiter)) !== false) {
        $id = $conn->real_escape_string($data[0]);
        $url = $conn->real_escape_string($data[1]);
        $prev = $conn->real_escape_string($data[2]);
        $next = $conn->real_escape_string($data[3]);
        $lang = $conn->real_escape_string($data[4]);
        $latitude = $conn->real_escape_string($data[5]);
        $longitude = $conn->real_escape_string($data[6]);
        $local_variety = $conn->real_escape_string($data[7]);
        $interview_year = $conn->real_escape_string($data[8]);
        $speaker_ID = $conn->real_escape_string($data[9]);
        $speaker_birthyear = $conn->real_escape_string($data[10]);
        $speaker_gender = $conn->real_escape_string($data[11]);
        $speaker_L1 = $conn->real_escape_string($data[12]);
        $speaker_religion = $conn->real_escape_string($data[13]);
        $source = $conn->real_escape_string($data[14]);
        $theme = $conn->real_escape_string($data[15]);
        $description = $conn->real_escape_string($data[16]);

        $sql = "INSERT INTO records (id, url, prev, next, lang, latitude, longitude, local_variety, interview_year, speaker_ID, speaker_birthyear, speaker_gender, speaker_L1, speaker_religion, source, theme, description) VALUES ('$id', '$url', '$prev', '$next', '$lang', '$latitude', '$longitude', '$local_variety', '$interview_year', '$speaker_ID', '$speaker_birthyear', '$speaker_gender', '$speaker_L1', '$speaker_religion', '$source', '$theme', '$description')";
            if (!$conn->query($sql)) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
    fclose($handle);
}


?>