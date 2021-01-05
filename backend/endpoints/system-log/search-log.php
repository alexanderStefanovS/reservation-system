<?php

require_once "../../db/db.php";
require_once "../../models/system-log.php";

function getLog($connection, $date, $usersId) {
  $sql = "SELECT * FROM system_log";
  
  if ($date || $usersId) {
    $sql = $sql." WHERE";
  }

  if ($date) {
    $sql = $sql." date = :date";
  }

  if ($usersId) {
    if ($date) {
      $sql = $sql." AND";
    }
    $sql = $sql." users_id = :usersId";
  }

  $query = $connection->prepare($sql);
  
  if ($date && !$usersId) {
    $query->execute(["date" => $date]);
  } else if ($usersId && !$date) {
    $query->execute(["usersId" => $usersId]);
  } else if ($date && $usersId) {
    $query->execute(["date" => $date, "usersId" => $usersId]);
  } else {
    $query->execute([]);
  }

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