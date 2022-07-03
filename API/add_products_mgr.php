<?php


require 'core.php';

$tableName = "ProductsManagement";

$values = $_GET["values"];

$sql = "INSERT INTO ".$dbName.".".$tableName." VALUES(".$values.")";

// var_dump($sql);
// die;


$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);
$affected = $query->GetAffectedRowsCount();
$error = $query->GetError();


echo '{
    "success": ' . ($affected>0?'true':'false') . ',
    "affectedRows": ' . $affected . ',
    "error": "' . $error . '"
}';
