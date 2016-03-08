<?php
header("Access-Control-Allow-Origin: *");
$mysqli = new mysqli('localhost','heavenri','6J83fCgy9v','heavenri_math');
$username = $_POST['username'];
$record = $_POST['record'];
$new = $mysqli->query("UPDATE Medium SET record='$record' WHERE name='$username'");
$new_today = $mysqli->query("UPDATE Today SET record='$record' WHERE name='$username'");
if($new === TRUE && $new_today ==true)
{
  echo 'رکورد شما با موفقیت ثبت شد';
}
$mysqli->close();
?>
