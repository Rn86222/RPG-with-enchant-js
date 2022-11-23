<?php
// 上位30位まで保存
$MaxCount = 8;
 
saveData();

function GetFileName(){
    $filename = "../csv//nameList.csv";
    return $filename;
}

function sortByKey($key_name, $sort_order, $array) {
    foreach ($array as $key => $value) {
        $standard_key_array[$key] = $value[$key_name];
    }
    array_multisort($standard_key_array, $sort_order, $array);
    return $array;
}

function saveData(){
    // rn86222rpg.starfree.jp* 以外からのリクエストは拒否する
    $referer = $_SERVER['HTTP_REFERER'];
    if(strpos($referer,'rn86222rpg.starfree.jp')  === false)
        return;

   $stack = array();

    // csvファイルが存在するならデータを配列に変換
    if(file_exists(GetFileName())){
        $allData = file_get_contents(GetFileName());

        $lines = explode("\n", $allData);
        foreach ( $lines as $line ) {
            $words = explode(",", $line);
            if($words[0] == "")
                continue;

            $newArray = array(
                'name'=> $words[0],
                'level' => $words[1],
                'now'=> $words[2],
            );

            $stack[] = $newArray;
        }
    }

    // 配列に送られてきたデータを追加
    $name = "";
    $score = 0;

    $name = $_POST["name"];
    $level = $_POST["level"];
    $now = date("Y-m-d H:i:s");

    // 不適切なデータは処理しない
    // nameがない、長すぎるなど
    if(mb_strlen($name) > 10)
        return;

    if($name == "")
      return;

    $newArray = array(
        'name'=> $name,
        'level' => $level,
        'now'=> $now,
    );
    $stack[] = $newArray;

    // socreが大きい順に配列をソート
    $sorted_array = sortByKey('level', SORT_DESC, $stack);

    // 上位からMaxCountだけデータを取得してcsvファイルとして保存する
    global $MaxCount;

    $dataCount = count($sorted_array);
    $str = "";
    for($i = 0; $i < $dataCount; $i++){
        if($i >= $MaxCount)
            break;

        $str .= join(",", $sorted_array[$i]);
        $str .= "\n";
    }
    echo $name;
    echo $level;
    echo $now;

    file_put_contents( GetFileName(), $str, LOCK_EX );
}
?>