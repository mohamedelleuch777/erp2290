<?php
require 'core.php';


$sql = "SELECT * FROM ".$dbName.".Clients";
$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);
$column_count = 0;

$body = [];

while($res && $query->AvailableResult()) {
    $row = $query->GetObject();
    array_push($body, $row);
}

$body = json_encode($body);

echo $body;
