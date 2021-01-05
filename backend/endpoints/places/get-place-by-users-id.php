<?php

require_once "../../db/db.php";
require_once "../../models/place.php";

$usersId = $_REQUEST["usersId"];

function getPlaceByUsersId($connection, $usersId) {
	$sql = "SELECT * FROM places WHERE users_id = :usersId";
	$query = $connection->prepare($sql);
	$query->execute(["usersId" => $usersId]);

  $row = $query->fetch();
  $place = new Place($row['id'], $row['name'], $row['description'], $row['users_id'], $row['place_types_id']);
  
	return $place;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $place = getPlaceByUsersId($connection, $usersId);
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
  'value' => $place
]);

echo $response;

?>