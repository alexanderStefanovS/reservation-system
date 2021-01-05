<?php

require_once "../../db/db.php";
require_once "../../models/place.php";

function getPlaces($connection) {
	$sql = "SELECT * FROM places";
  $query = $connection->prepare($sql);
  $query->execute([]);

  $places = array();
	while ($row = $query->fetch()) {
    $place = new Place($row['id'], $row['name'], $row['description'], $row['users_id'], $row['place_types_id']);
    array_push($places, $place);
  }

	return $places;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $places = getPlaces($connection);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене списък със заведения",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Заведения",
  'value' => $places
]);

echo $response;

?>