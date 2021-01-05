<?php

require_once "../../db/db.php";
require_once "../../models/event.php";

function getEvents($connection, $placesId) {
	$sql = "SELECT * FROM events WHERE places_id = :placesId";
	$query = $connection->prepare($sql);
	$query->execute(["placesId" => $placesId]);

  $events = array();
	while ($row = $query->fetch()) {
    $event = new Event($row['id'], $row['name'], $row['date'], $row['places_id']);
    array_push($events, $event);
  }
  
	return $events;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $events = getEvents($connection, $_REQUEST['placesId']);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на списъка със събития",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Списък от събития",
  'value' => $events
]);

echo $response;

?>