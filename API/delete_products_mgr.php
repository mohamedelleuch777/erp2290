<?php


require 'core.php';

$tableName = "ProductsManagement";

$ref = $_GET["ref"];

// DELETE FROM ClientsManagement WHERE `ClientsManagement`.`Ref` = 10017

$sql = "DELETE FROM ".$dbName.".".$tableName." WHERE `".$tableName."`.`Ref` = ".$ref.";";


$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);
$affected = $query->GetAffectedRowsCount();
$error = $query->GetError();


echo '{
    "success": ' . ($affected>0?'true':'false') . ',
    "affectedRows": ' . $affected . ',
    "error": "' . $error . '"
}';
