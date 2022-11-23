<?php
function GetFileName(){
    $filename = "../csv/saveDataList.csv";
    return $filename;
}

$allData = file_get_contents(GetFileName());
echo $allData;
?>