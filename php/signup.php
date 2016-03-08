<?php
header("Access-Control-Allow-Origin: *");
$mysqli = new mysqli('localhost','heavenri','6J83fCgy9v','heavenri_math');
$name_signup = $_POST['name_signup'];

$check = $mysqli->query("SELECT name FROM Medium WHERE name='$name_signup'");
if($check->num_rows !=0)
{
  echo 1;
}

if($check->num_rows ==0)
{
  $pass_signup = $_POST['pass_signup'];
  $record = $_POST['record'];
  $new = $mysqli->query("INSERT INTO Medium (id,name,pass,record) VALUES (NULL,'$name_signup','$pass_signup','$record')");
  $new_today = $mysqli->query("INSERT INTO Today (id,name,pass,record) VALUES (NULL,'$name_signup','$pass_signup','$record')");
if($new == true && $new_today == true)
  {
    echo 2;
  }
}

$mysqli->close();
?>
