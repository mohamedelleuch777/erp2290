<?php


require 'core.php';

$tableName = "SalesManagement";

// Ref	ClientId	ProductId	SellingPriceTTC	Timestamp	UserAccountId

$ClientId = $_GET["ClientId"];
$ProductId = $_GET["ProductId"];
$SellingPriceTTC = $_GET["SellingPriceTTC"];
$forSaleQuantity = $_GET["Quantity"];
$Ts = time();
$UserAccountId = "'".$_GET["UserAccountId"]."'";


function get_request($URL){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $URL);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

function checkForClient () {
  global $website_url, $ClientId;
  $json_url = "/API/clients_mgr.php?field=Ref&value=".$ClientId;
  $json = get_request($website_url.$json_url);
  $data = json_decode($json, TRUE);
  $body = $data['body'];
  return sizeof($body)>0;
}

function checkForProductInStock () {
  global $website_url, $ClientId, $ProductId, $forSaleQuantity;
  $json_url = "/API/stock_mgr.php?field=ProductId&value=".$ProductId;
  $json = get_request($website_url.$json_url);
  $data = json_decode($json, TRUE);
  $body = $data['body'];
  if(sizeof($body)<=0) {
    return false;
  }
  $qnty = $body[0]['Quantity'];
  if($qnty<=0) {
    return false;
  }

  if($qnty<$forSaleQuantity) {
    return false;
  }
  return true;
}

if((!$_GET["ClientId"]) || (!$_GET["ProductId"]) || (!$_GET["Quantity"]) || (!$_GET["SellingPriceTTC"]) ) {
  echo '{
      "success": false,
      "affected rows": -2
  }';die;
}


if( checkForClient() == false || checkForProductInStock() == false ) {
  echo '{
      "success": false,
      "affected rows": -1
  }';
  die;
}


$sql = "INSERT INTO ${dbName}.${tableName} VALUES(NULL,${ClientId},${ProductId},${forSaleQuantity},${SellingPriceTTC},${Ts},${UserAccountId})";

$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);
$affected = $query->GetAffectedRowsCount();

// reduce stock:
$remove = "/API/stock_decrease.php?ProductId=".$ProductId."&Quantity=".$forSaleQuantity;
get_request($website_url.$remove);


echo '{
    "success": ' . ($affected>0?'true':'false') . ',
    "affected rows": ' . $affected . '
}';
