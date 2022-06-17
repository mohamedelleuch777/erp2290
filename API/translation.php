<?php


require 'core.php';


$sql = "SELECT * FROM ".$dbName.".Translations";
$query = new MySQL_Query($servername, $username, $password, $dbName);
$res = $query->ExecSql($sql);
$column_count = 0;
$header = $query->GetTableHeader($dbName.".Translations");
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
    '
    {
        "name": "' . $header[$i] . '",
        "selector": "row => row.' . $header[$i] . '",
        "sortable": ' . "true" . '
    },';
}
$myJsonHeader = substr($myJsonHeader, 0, -1);
$myJsonHeader .= ']';
$header = $myJsonHeader;
// echo $header;
// die;





$body = [];

while($res && $query->AvailableResult()) {
    $row = $query->GetObject();
    array_push($body, $row);
}

$body = json_encode($body);

// $data = array(
//     "header" => $header,
//     "body" => $body

// );

// echo json_encode($data);
echo '{
    "header": ' . $header . ',
    "body": ' . $body . '
}';
