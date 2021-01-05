<?php

require_once "../../db/db.php";
require_once "../../models/place.php";

function getPlace($connection, $id) {
	$sql = "SELECT * FROM places WHERE id = :id";
	$query = $connection->prepare($sql);
	$query->execute(["id" => $id]);

	$row = $query->fetch();
  $place = new Place($row['id'], $row['name'], $row['description'], $row['users_id'], $row['place_types_id']);
  
	return $place;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $events = getPlace($connection, $_REQUEST['id']);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на заведение",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Заведение",
  'value' => $events
]);

echo $response;

?>