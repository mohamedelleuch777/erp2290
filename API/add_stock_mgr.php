<?php


require 'core.php';

$tableName = "StockManagement";

$values = $_GET["values"];
$token = getBearerToken();
if($token=="") {
  header("HTTP/1.1 401 Unauthorized");
  die;
}

$token = base64_decode($token);
$jsonObject = json_decode($token, true);
// print_r(json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $token)[1])))));

$sql = "INSERT INTO ".$dbName.".".$tableName." VALUES(".$values.")";

// var_dump($sql);
// die;


$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);
$affected = $query->GetAffectedRowsCount();


echo '{
    "success": ' . ($affected>0?'true':'false') . ',
    "affected rows": ' . $affected . '
}';
