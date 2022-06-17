<?php


require 'core.php';

$tableName = "StockManagement";

$ProductId = $_GET["ProductId"];
$qnty = $_GET["Quantity"];

//UPDATE `StockManagement` SET `Quantity` = '291' WHERE `StockManagement`.`Ref` = 1;
$sql = "UPDATE ".$dbName.".".$tableName." SET `Quantity` =  `Quantity` - '$qnty' WHERE `ProductId` = $ProductId ";

// var_dump($sql);
// die;


$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);
$affected = $query->GetAffectedRowsCount();


echo '{
    "success": ' . ($affected>0?'true':'false') . ',
    "affected rows": ' . $affected . '
}';
