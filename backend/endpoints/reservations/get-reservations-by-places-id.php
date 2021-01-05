<?php

require_once "../../db/db.php";
require_once "../../models/reservation.php";

function getReservations($connection, $placesId) {
	$sql = "SELECT * FROM reservations WHERE places_id = :placesId";
	$query = $connection->prepare($sql);
	$query->execute(["placesId" => $placesId]);

  $reservations = array();
	while ($row = $query->fetch()) {
    if ($row['is_approved'] == null) {
      $reservation = new Reservation($row['id'], $row['num_of_people'], $row['date'], 
                                     $row['users_id'] ,$row['places_id']);
      array_push($reservations, $reservation);
    }
  }
  
	return $reservations;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $events = getReservations($connection, $_REQUEST['placesId']);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на списъка с резервации",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Списък от резервации",
  'value' => $events
]);

echo $response;

?>