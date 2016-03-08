<?php
header("Access-Control-Allow-Origin: *");
$mysqli = new mysqli('localhost','heavenri','6J83fCgy9v','heavenri_math');
$results_unlimited = $mysqli->query("SELECT name,record FROM Medium ORDER BY record DESC");
$results = $mysqli->query("SELECT name,record FROM Today ORDER BY record DESC LIMIT 100");//LIMITED TO JUST 100 RESULTS
$username = $_POST['username'];
if($results->num_rows>0)
{
  $number = 1;

  while($row = $results->fetch_assoc())
  {
    if($number%2 == 0)
    {
      echo '<tr class="active"><td style="width:10%; text-align:center;">'.$number.'</td><td style="text-align:right;">'.$row['name'].'</td><td>'.$row['record'].'</td></tr>';
    }
    else {
      echo '<tr class="danger"><td style="width:10%; text-align:center;">'.$number.'</td><td style="text-align:right;">'.$row['name'].'</td><td>'.$row['record'].'</td></tr>';
    }
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
  echo '<tr><td colspan="3" style="color:#fff;">'.'رتبه شما : '.$rank.'</tr>';
}
else
{
  echo ' <span style="text-align:center; color:#fff; font-weight:bold; font-size:150%;">رکوردی یافت نشد</span> ';
}

$mysqli->close();
?>
