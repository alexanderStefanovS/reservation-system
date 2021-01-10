<?php

require_once "../../db/db.php";
require_once "../../models/system-log.php";

function getLog($connection, $date, $usersId) {
  $sql = "SELECT * FROM system_log";
  
  if ($date != 'null' || $usersId != 'null') {
    $sql = $sql." WHERE";
  }

  if ($date != 'null') {
    $sql = $sql." DATE(date) = :date";
  }

  if ($usersId != 'null') {
    if ($date != 'null') {
      $sql = $sql." AND";
    }
    $sql = $sql." users_id = :usersId";
  }

  $query = $connection->prepare($sql);
  
  $executeArray = null;
  if ($date != 'null' && $usersId == 'null') {
    $executeArray = ["date" => $date];
  } else if ($usersId != 'null' && $date == 'null') {
    $executeArray = ["usersId" => $usersId];
  } else if ($date != 'null' && $usersId != 'null') {
    $executeArray = ["date" => $date, "usersId" => $usersId];
  } else {
    $executeArray = [];
  }

  $query->execute($executeArray);

  $logs = array();
	while ($row = $query->fetch()) {
    $log = new SystemLog($row['id'], $row['date'], $row['users_id'], $row['description']);
    array_push($logs, $log);
  }
  
	return $logs;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $events = getLog($connection, $_REQUEST['date'], $_REQUEST['usersId']);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на системния журнал",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Системен журнал",
  'value' => $events
]);

echo $response;

?>