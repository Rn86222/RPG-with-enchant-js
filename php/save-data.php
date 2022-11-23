<?php
// 上位30位まで保存
//$MaxCount = 8;
 
saveData();

function GetFileName(){
    $filename = "../csv/saveDataList.csv";
    return $filename;
}

function sortByKey($key_name, $sort_order, $array) {
    array_multisort(array_map("strtotime", array_column( $array, $key_name )), $sort_order, $array);
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
                'maxHp'=> $words[1],
                'maxMp' => $words[2],
                'hp' => $words[3],
                'mp' => $words[4],
                'level' => $words[5],
                'exp' => $words[6],
                'x' => $words[7],
                'y' => $words[8],
                'password' => $words[9],
                'now'=> $words[10],
            );

            $stack[] = $newArray;
        }
    }

    // 配列に送られてきたデータを追加
    $name = "";
    $score = 0;

    $name = $_POST["name"];
    $maxHp = $_POST["maxHp"];
    $maxMp = $_POST["maxMp"];
    $hp = $_POST["hp"];
    $mp = $_POST["mp"];
    $level = $_POST["level"];
    $exp = $_POST["exp"];
    $x = $_POST["x"];
    $y = $_POST["y"];
    $password = $_POST["password"];
    $now = date("Y-m-d H:i:s");

    // 不適切なデータは処理しない
    // nameがない、長すぎるなど
    if(mb_strlen($name) > 10)
        return;

    if($name == "")
      return;

    $newArray = array(
        'name'=> $name,
        'maxHp'=> $maxHp,
        'maxMp' => $maxMp,
        'hp' => $hp,
        'mp' => $mp,
        'level' => $level,
        'exp' => $exp,
        'x' => $x,
        'y' => $y,
        'password' => $password,
        'now'=> $now,
    );
    $stack[] = $newArray;

    // socreが大きい順に配列をソート
    //$sorted_array = sortByKey('level', SORT_DESC, $stack);
    $sorted_array = sortByKey('now', SORT_DESC, $stack);

    // 上位からMaxCountだけデータを取得してcsvファイルとして保存する
    global $MaxCount;

    $dataCount = count($sorted_array);
    $str = "";

    for($i = 0; $i < $dataCount; $i++){
        //if($i >= $MaxCount)
          //  break;

        $str .= join(",", $sorted_array[$i]);
        $str .= "\n";

    }
    echo $name;
    echo $level;
    echo $now;

    file_put_contents( GetFileName(), $str, LOCK_EX );
}
?>