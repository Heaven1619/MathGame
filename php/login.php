<?php
header("Access-Control-Allow-Origin: *");
$mysqli = new mysqli('localhost','heavenri','6J83fCgy9v','heavenri_math');
$username = $_POST['username'];
$password= $_POST['password'];
$results = $mysqli->query("SELECT name,pass,record FROM Medium WHERE name='$username'and pass='$password'");

  while($row = $results->fetch_assoc())
  {
    echo $row['record'];
  }




$mysqli->close();
?>
