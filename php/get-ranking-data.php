<?php
function GetFileName(){
    $filename = "../csv/nameList.csv";
    return $filename;
}
 
$allData = file_get_contents(GetFileName());
echo $allData;
?>