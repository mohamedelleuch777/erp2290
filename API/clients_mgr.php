<?php


require 'core.php';

$tableName = "ClientsManagement";

$offset = $_GET["offset"] ? $_GET["offset"] : "0";
$limit  = $_GET["limit"] ? $_GET["limit"] : "25";
$field  = $_GET["field"] ? $_GET["field"] : "";
$value  = $_GET["value"] ? $_GET["value"] : "";
$operator  = $_GET["operator"] ? $_GET["operator"] : " = ";

$condition = "";

if($field!="" || $value!="") {
  $condition = " WHERE `".$field."` ".$operator." '".$value."'";
}

$reset = false;
$lastPage = false;
$totalCount = 0;
$sql = "SELECT COUNT(`Ref`) as totalCount FROM ".$dbName.".".$tableName;
if($offset=='-1'){
    $offset = 0;
    $sql = "SELECT COUNT(`Ref`) as totalCount FROM ".$dbName.".".$tableName;
    $lastPage = true;
}
$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);

if($res && $query->AvailableResult()) {
    $row = $query->GetObject();
    $totalCount = $row->totalCount;
    if($lastPage || ($offset>=$totalCount)) {
        $calculatedOffset = $totalCount - $limit ;
        $offset = $calculatedOffset;
        if($calculatedOffset<0 ) {
            $offset = 0;
            $reset = true;
        }
    }
}

// var_dump($calculatedOffset,$offset);die;


$sql = "SELECT * FROM ".$dbName.".".$tableName.$condition." LIMIT ".$limit." OFFSET ".$offset;
$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);
$column_count = 0;
$header = $query->GetTableHeader($dbName.".".$tableName);
// $keys = [];
// for($i=0; $i<sizeof($header); $i++) {
//     array_push($keys, "item_".$i);
// }
// $header = array_combine($keys, $header);
// $header = json_encode($header);

$myJsonHeader = '[';
for($i=0; $i<sizeof($header); $i++) {
    //var_dump($header[$i]);
    $myJsonHeader .=
    '"'.$header[$i].'",';
}
$myJsonHeader = substr($myJsonHeader, 0, -1);
$myJsonHeader .= ']';
$header = $myJsonHeader;
// echo $header;
// die;



$body = "[";
while($res && $query->AvailableResult()) {
    $row = $query->GetObject();
    $arr = json_decode(json_encode($row), true);
    $keys = array_keys($arr);
    $val = '[';
    for($i=0; $i<sizeof($keys); $i++) {
        $val .= '"' . $arr[$keys[$i]] . '",';
    }
    $val = substr($val, 0, -1);
    $body .=  $val . '],';
}


$body = substr($body, 0, -1);
$body .= ']';






echo '{
    "header": ' . $header . ',
    "body": ' . $body . ',
    "totalCount": ' . $totalCount . ',
    "reset": ' . ($reset?"true":"false") . '
}';
