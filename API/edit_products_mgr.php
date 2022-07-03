<?php


require 'core.php';

$tableName = "ProductsManagement";

$ref = $_GET["ref"];
$params = $_GET["params"];

// UPDATE `ClientsManagement` SET `FirstName` = 'tenflewe', `LastName`= '5orchi' WHERE `ClientsManagement`.`Ref` = 10005;

$sql = "UPDATE ".$dbName.".".$tableName." SET ".$params." WHERE `".$tableName."`.`Ref` = ".$ref.";";

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
