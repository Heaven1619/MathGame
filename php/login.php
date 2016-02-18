<?php
$mysqli = new mysqli('localhost','root','','Math');
$username = $_POST['username'];
$password= $_POST['password'];
$results = $mysqli->query("SELECT name,pass,record FROM Medium WHERE name='$username'and pass='$password'");

  while($row = $results->fetch_assoc())
  {
    echo $row['record'];
  }




$mysqli->close();
?>
