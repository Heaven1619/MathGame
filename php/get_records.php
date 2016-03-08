<?php
header("Access-Control-Allow-Origin: *");
$mysqli = new mysqli('localhost','heavenri','6J83fCgy9v','heavenri_math');
$results_unlimited = $mysqli->query("SELECT name,record FROM Medium ORDER BY record DESC");
$results = $mysqli->query("SELECT name,record FROM Medium ORDER BY record DESC LIMIT 100");
$username = $_POST['username'];
if($results->num_rows>0)
{
  $number = 1;
  while($row = $results->fetch_assoc())
  {
    if($number%2 == 0 && $row['name']!==$username)
    {
      echo '<tr class="active"><td style="width:10%; text-align:center;">'.$number.'</td><td style="text-align:right;">'.$row['name'].'</td><td>'.$row['record'].'</td></tr>';
    }
    else if($row['name']!==$username) {
      echo '<tr class="danger"><td style="width:10%; text-align:center;">'.$number.'</td><td style="text-align:right;">'.$row['name'].'</td><td>'.$row['record'].'</td></tr>';
    }
    if($row['name']===$username)
    {
      echo '<tr class="danger" style="font-weight:bold; color:red; font-size:110%;"><td style="width:10%; text-align:center;">'.$number.'</td><td style="text-align:right;">'.$row['name'].'</td><td>'.$row['record'].'</td></tr>';
      $record = $row['record'];
    }
    $number++;
  }

  $number = 1;
  while($row = $results_unlimited->fetch_assoc())
  {
    if($row['name'] == $username)
    {
      $rank = $number;
    }
    $number++;
  }


  if(!$username)
  {
    $rank = 'شما هنوز رکوردی ثبت نکرده اید';
  }
  echo '<tr><td colspan="3" style="color:black; font-weight:bold; font-size:120%;">'.'رتبه شما : '.$rank.' و '.'   رکورد شما : '.$record.'</tr>';
}
else
{
  echo ' <span style="text-align:center; color:#fff; font-weight:bold; font-size:150%;">رکوردی یافت نشد</span> ';
}

$mysqli->close();
?>
