<?php

//error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);

ini_set('error_reporting', E_ALL & ~E_WARNING & ~E_NOTICE); // or error_reporting(E_ALL); to show only erros without warnings and notices
//ini_set('error_reporting', E_ALL ); // or error_reporting(E_ALL): to show all erros, warnings and notices
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');

$servername = "localhost";
$username = "user_mobile_battles";
$password = "ecr49t8nA/";
$dbName = "erp2290";

$mailserver = GetGlobalData("mail-server");
$mail_noreply_port = GetGlobalData("mail-port");
$mail_noreply_user = GetGlobalData("mail-user");
$mail_noreply_pass = GetGlobalData("mail-password");


// require_once "Mail.php";
// GRANT ALL PRIVILEGES ON *.* TO 'user_mobile_battles'@'localhost';
//$settings = file_get_contents('settings.json');

function encrypt($string, $key) {
  $result = '';
  for($i=0; $i<strlen($string); $i++) {
    $char = substr($string, $i, 1);
    $keychar = substr($key, ($i % strlen($key))-1, 1);
    $char = chr(ord($char)+ord($keychar));
    $result.=$char;
  }

  return base64_encode($result);
}

function decrypt($string, $key) {
  if(strlen($key)==0) {
    die("cannot decrypt string with emppty key: decrypt core.php line 23 error");
  }
  $result = '';
  $string = base64_decode($string);

  for($i=0; $i<strlen($string); $i++) {
    $char = substr($string, $i, 1);
    $keychar = substr($key, ($i % strlen($key))-1, 1);
    $char = chr(ord($char)-ord($keychar));
    $result.=$char;
  }

  return $result;
}

function Json_POST() {
  $my_POST = json_decode(file_get_contents('php://input'));

  $my_POST = json_decode(json_encode($my_POST), true);
  return $my_POST;
}

function Post_return_JSON($message) {
  echo $message;
}

function Post_return_ARRAY($message) {
  $data = json_encode($message);
  echo json_encode(json_decode($data));
}

function GenerateToken($user,$token_id,$expiration="+1 year") {
  //$token_brut = $user . "," . $token_id . "," . date("Y-m-d h:i:sa");
  //$date = date("Y-m-d h:i:sa");
  $date = strtotime("now");
  $expire = strtotime($expiration, $date);
  $token_brut = '{
    "user": "'.$user.'",
    "token_id": "'.$token_id.'",
    "date_creation": "'.$date.'",
    "date_expiration": "'.$expire.'"
  }';
  $token = encrypt($token_brut,$user);
  $charList = array(",",";",".","%","&","|","#","^",":","?","*","!");
  $symbolString = "";
  for($i=0;$i<strlen($token)+mt_rand(1,10);$i++)
  {
      $charIndex = mt_rand(0,count($charList)-1);
      $symbolString = $symbolString . $charList[$charIndex];
  }
  $m=0;$n=0;
  $finalToken="";
  while(( $m<strlen($token) ) || ( $n<strlen($symbolString) ))
  {
      $decision = mt_rand(1,10);
      if($m>=strlen($token))
      {
          $decision = 10;
      }
      if($decision<=5)
      {
          $finalToken = $finalToken.$token[$m];
          $m++;
      }
      else
      {
          $finalToken = $finalToken.$symbolString[$n];
          $n++;
      }
  }
  $finalToken = encrypt($finalToken,$user);
  return $finalToken;
}

function DecryptToken($token, $user) {
  $charList = array(",",";",".","%","&","|","#","^",":","?","*","!");
  $decrpted_token = decrypt($token, $user);
  for($i=0;$i<count($charList);$i++)
  {
      $concernedChar = $charList[$i];
      $decrpted_token = str_replace($concernedChar, "", $decrpted_token);
  }
  $decrpted_token = decrypt($decrpted_token, $user);

  $decrpted_token = json_decode($decrpted_token);
  return $decrpted_token;
}

function isTokenValid($token, $user, $password = null){
  $token_array = DecryptToken($token, $user);

  if($password) {
    $token_array = DecryptToken($token, $password);
  }
  //var_dump($password);
  if($token_array==null)
  {
    // unvalid password
    return 0;
  }
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbName']);

  // Check connection
  if ($conn->connect_error) {
    /*Post_Return_JSON('{
      "result": 0,
      "message": "MySql connection not established"
    }');*/
    return 0;
  }
  else {
    $sql = "SELECT * FROM Users WHERE email = '".$user."'";

    $result =  $conn->query($sql);
    $num_rows = $result->num_rows;
    if($num_rows==0) {
      /*Post_Return_JSON('{
        "result": 0,
        "message": "User doesn\'t exist"
      }');*/
      return 3;
    } else {
      $current_record = $result->fetch_row();
      if( ($current_record[12]==$token_array->token_id) || ($password!=null) ) {
        $expire = $token_array->date_expiration;
        $now = strtotime('now');
        if($expire > $now)
        {
          /*Post_Return_JSON('{
            "result": 1,
            "message": "Valid token"
          }');*/
          return 1;
        }
        else
        {
          /*Post_Return_JSON('{
            "result": 0,
            "message": "Expired token"
          }');*/
          return 2;
        }
      } else {
        /*Post_Return_JSON('{
          "result": 0,
          "message": "Unvalid token"
        }');*/
        return 4;
      }
    }
  }
}

function isTokenValidAdmin($token, $user, $password = null){
  $token_array = DecryptToken($token, $user);
  if($password) {
    $token_array = DecryptToken($token, $password);
  }
  //var_dump($password);
  if($token_array==null)
  {
    // unvalid password
    return 5;
  }
  // Create connection
  $conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbName']);

  // Check connection
  if ($conn->connect_error) {
    /*Post_Return_JSON('{
      "result": 0,
      "message": "MySql connection not established"
    }');*/
    return 0;
  } else {
    $sql = "SELECT * FROM `Admins` WHERE `admin_email` = '$user'  ";

    $result =  $conn->query($sql);
    $num_rows = $result->num_rows;
    if($num_rows==0) {
      /*Post_Return_JSON('{
        "result": 0,
        "message": "User doesn\'t exist"
      }');*/
      return 3;
    } else {
      $current_record = $result->fetch_row();
      if( ($current_record[8]==$token_array->token_id) || ($password!=null) ) {
        $expire = $token_array->date_expiration;
        $now = strtotime('now');
        if($expire > $now)
        {
          /*Post_Return_JSON('{
            "result": 1,
            "message": "Valid token"
          }');*/
          return 1;
        }
        else
        {
          /*Post_Return_JSON('{
            "result": 0,
            "message": "Expired token"
          }');*/
          return 2;
        }
      } else {
        /*Post_Return_JSON('{
          "result": 0,
          "message": "Unvalid token"
        }');*/
        return 4;
      }
    }
  }
}

/*
****************************************************************************************************************************************
****************************************************************************************************************************************
****                                                                                                                                ****
****                                                    MySQL Query                                                                 ****
****                                                                                                                                ****
****************************************************************************************************************************************
****************************************************************************************************************************************
*/
class MySQL_Query {
  public $conn = null;
  private $result = null;
  private $obj = null;
  private $servername = null;
  private $username = null;
  private $password = null;
  private $dbName = null;

  public function __construct($servername, $username, $password, $dbName) {
    $this->servername = $servername;
    $this->username = $username;
    $this->password = $password;
    $this->dbName = $dbName;
    $this->SetupCnxDB();
  }

  public function SetupCnxDB() {
    $this->$conn = new mysqli(
                              $this->servername,
                              $this->username,
                              $this->password,
                              $this->dbName
                            );

    if ($this->$conn->connect_error) {
      return false;
    }
    return true;
  }

  public function ExecSql($sql) {
    $bool_Res = $this->result = $this->$conn->query($sql);
    return $bool_Res;
  }

  public function ExecMultiSql($sql) {
    return ($this->result = $this->$conn->multi_query($sql));
  }

  public function MultiQueryStoreResult() {
    return ($this->result = $this->$conn->store_result());
  }

  public function CountColumns() {
    // not working yet
    return $this->result->num_rows;
  }

  public function Length() {
    return $this->result->num_rows;
  }

  public function AvailableResult() {
    return ($this->obj = $this->result->fetch_object());
  }

  public function GetObject() {
    return $this->obj;
  }

  public function GetConnectionError() {
    return $this->$conn->connect_error;
  }

  public function GetError() {
    return $this->$conn->error;
  }

  public function GetAffectedRowsCount() {
    // var_dump($this->$conn);
    return $this->$conn->affected_rows;
  }

  public function GetTableHeader($table_name) {
    $sql = "DESCRIBE ".$table_name;
    $localQuery = new mysqli($this->servername, $this->username, $this->password, $this->dbName);
    $table_header = [];
    $mysql_res = $localQuery->query($sql);
    while($obj = $mysql_res->fetch_object()) {
        array_push($table_header, $obj->Field);
    }
    // while($res && $query->AvailableResult()) {
    //     array_push($table_header, $query->GetObject()->Field);
    // }
    return $table_header;
  }
}

function GenerateConfirmationCode($length = 4) {
  $ret = 0;
  while($ret<100000) {
    $ret = rand(
        ((int) str_pad(1, $length, 0, STR_PAD_RIGHT)),
        ((int) str_pad(9, $length, 9, STR_PAD_RIGHT))
    );
  }
  return $ret;
}

function millitime() {
  $microtime = microtime();
  $comps = explode(' ', $microtime);

  // Note: Using a string here to prevent loss of precision
  // in case of "overflow" (PHP converts it to a double)
  return sprintf('%d%03d', $comps[1], $comps[0] * 1000);
}


function GetSetting($sName) {
  $temp = json_decode(file_get_contents('settings.json'));

  return $temp->$sName;
}

/*
****************************************************************************************************************************************
****************************************************************************************************************************************
****                                                                                                                                ****
****                                                    SMTP MAIL                                                                   ****
****                                                                                                                                ****
****************************************************************************************************************************************
****************************************************************************************************************************************
*/

class SMTP_Email {
  private $smtp = null;
  private $account = null;
  private $ssl = false;
  private $port = null;

  public function __construct($host, $username, $password, $ssl=false, $port=465) {
    $this->SetupSMTP($host, $username, $password, $ssl, $port);
    $this->ssl = $ssl;
    $this->port = $port;
  }

  public function SetupSMTP($host, $username, $password, $ssl=false, $port=465) {
    $this->$account = $username;
    if($ssl)
    {
      $this->smtp = Mail::factory('smtp',
      array ('host' => 'ssl://'.$host,
        'port' => $port ,
        'auth' => true,
        'username' => $username,
        'password' => $password)
      );
    }
    else
    {
      $this->smtp = Mail::factory('smtp',
      array ('host' => $host,
        'auth' => true,
        'username' => $username,
        'password' => $password)
      );
    }
  }
  public function Send($to, $subject, $body, $html=true)
  {
    if($html)
    {
      $headers = array (
        'From' => $this->$account,
        'To' => $to,
        'Subject' => $subject,
        'MIME-Version' => '1.0',
        'Content-type' => 'text/html; charset=iso-8859-1'
      );
    }
    else
    {
      $headers = array (
        'From' => $this->$account,
        'To' => $to,
        'Subject' => $subject
      );
    }
    return $this->smtp->Send($to, $headers, $body);
  }

}

function var_dump_str()
{
    $argc = func_num_args();
    $argv = func_get_args();

    if ($argc > 0) {
        ob_start();
        call_user_func_array('var_dump', $argv);
        $result = ob_get_contents();
        ob_end_clean();
        return $result;
    }

    return '';
}

function uuidV4($data = null) {
  // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
  $data = $data ?? random_bytes(16);
  assert(strlen($data) == 16);

  // Set version to 0100
  $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
  // Set bits 6-7 to 10
  $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

  // Output the 36 character UUID.
  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function PayPal_get_transaction_details( $transaction_id ) {
  $api_request = 'USER=' . urlencode( $GLOBALS['apiPaypalUser'] )
              .  '&PWD=' . urlencode( $GLOBALS['apiPaypalPassword'] )
              .  '&SIGNATURE=' . urlencode( $GLOBALS['apiPaypalSignature'] )
              .  '&VERSION=76.0'
              .  '&METHOD=GetTransactionDetails'
              .  '&TransactionID=' . $transaction_id;

  $ch = curl_init();
  curl_setopt( $ch, CURLOPT_URL, $GLOBALS['apiPaypalUrl'] ); // For sandbox transactions, change to 'https://api-3t.sandbox.paypal.com/nvp'
                                                                            // For live transactions, change to 'https://api-3t.paypal.com/nvp'
  curl_setopt( $ch, CURLOPT_VERBOSE, 1 );

  // Uncomment these to turn off server and peer verification
  // curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, FALSE );
  // curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, FALSE );
  curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
  curl_setopt( $ch, CURLOPT_POST, 1 );

  // Set the API parameters for this transaction
  curl_setopt( $ch, CURLOPT_POSTFIELDS, $api_request );

  // Request response from PayPal
  $response = curl_exec( $ch );
  // print_r($response);

  // If no response was received from PayPal there is no point parsing the response
  if( ! $response )
      die( 'Calling PayPal to change_subscription_status failed: ' . curl_error( $ch ) . '(' . curl_errno( $ch ) . ')' );

  curl_close( $ch );

  // An associative array is more usable than a parameter string
  parse_str( $response, $parsed_response );

  return $parsed_response;
}

/*
****************************************************************************************************************************************
****************************************************************************************************************************************
****                                                                                                                                ****
****                                                    PHP MAILER                                                                  ****
****                                                                                                                                ****
****************************************************************************************************************************************
****************************************************************************************************************************************
*/
use PHPMailer\PHPMailer\PHPMailer;

$path = getcwd();
require "${path}/vendor/autoload.php";

function SendEmailSsl($___server, $___user, $___pass, $___port, $___sender_name,$___receiver_email, $___subject, $___mail_content, $___debug=false)
{
    $mail = new PHPMailer();

    //Now let’s move to an SMTP configuration:

    $mail->isSMTP();
    $mail->Host = $___server;
    $mail->SMTPAuth = true;
    $mail->Username = $___user;
    $mail->Password = $___pass;
    // godaddy server: $mail->SMTPSecure = 'ssl';
    // ionos server: $mail->SMTPSecure = 'tsl';
    $mail->SMTPSecure = 'tsl';
    $mail->Port = $___port;

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->setFrom($___user, $___sender_name);
    //$mail->addReplyTo('info@mailtrap.io', 'Mailtrap');

    //Specify the recipient of your message:
    $mail->addAddress($___receiver_email);

    //Optionally you can add a CC:
    //$mail->addCC('mohamed.elleuch@arneca.com');

    //Set a subject for your message:
    $mail->Subject = $___subject;

    //Then set the email format to HTML with isHTML(true) property:
    $mail->isHTML(true);

    //Now you can input the desired content:
    $mail->Body = $___mail_content;



    if($___debug)
    {
      //Enable SMTP debugging and set the debug level
      //level 1 = client; will show you messages sent by the client
      //level 2  = client and server; will add server messages, it’s the recommended setting.
      //level 3 = client, server, and connection; will add information about the initial information, might be useful for discovering STARTTLS failures
      //level 4 = low-level information.
      //Use level 3 or level 4 if you are not able to connect at all. Setting level 0 will turn the debugging off, it is usually used for production.
      $mail->SMTPDebug = 3;

      $ret = $mail->send();
      if(!$ret){
          echo 'Message could not be sent.';
          echo 'Mailer Error: ' . $mail->ErrorInfo;
          LogEmailStatus($___receiver_email,$mail->ErrorInfo);
      }else{
          echo 'Message has been sent';
          LogEmailStatus($___receiver_email);
      }
      return $ret;
    }
    else
    {
      LogEmailStatus($___receiver_email);
      return $mail->send();
    }
}

function LogEmailStatus($___receiver_email,$err="")
{
    $log_path = "Emails/log.log";
    $msg = "An email was sent successfully to: $___receiver_email";
    if($err!="")
    {
      $msg = "An email was not sent to: $___receiver_email"."...Error: $err";
    }
    $log = file_get_contents($log_path);
    $line = date("Y-m-d H:i:s")." => ".$msg."\n";
    file_put_contents($log_path,$log.$line);
}

function GetGlobalData($data_name) {
  $sql = "SELECT * FROM `Data` WHERE `data_name` = '".$data_name."'";
  // var_dump($GLOBALS["servername"], $GLOBALS["username"], $GLOBALS["password"], $GLOBALS["dbName"]);
  // die;
  $query = new MySQL_Query($GLOBALS["servername"], $GLOBALS["username"], $GLOBALS["password"], $GLOBALS["dbName"]);
  $res = $query->ExecSql($sql);
  if($res && $query->AvailableResult()) {
    return $query->GetObject()->data_value;
  } else {
    throw new Exception("No existing data with this name '${data_name}' in the database");
    return "";
  }
}

if (!function_exists('str_contains')) {
  function str_contains(string $haystack, string $needle): bool
  {
      return '' === $needle || false !== strpos($haystack, $needle);
  }
}












?>
