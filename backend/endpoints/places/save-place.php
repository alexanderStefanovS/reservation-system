<?php

require_once "../../db/db.php";

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

function savePlace($connection, $place) {
  
  $sql = 'INSERT INTO places (description, name, users_id, place_types_id)
          VALUES (:description, :name, :usersId, :placeTypesId)';

	$query = $connection->prepare($sql);
  $query->execute($place);
  
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  savePlace($connection, $phpInput);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при регистрация",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Заведението е записано",
  'value' => json_encode($phpInput)
]);

echo $response;

?>