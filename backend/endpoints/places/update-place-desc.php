<?php

require_once "../../db/db.php";

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

function updatePlace($connection, $data) {
  
  $sql = 'UPDATE places SET description = :description
          WHERE id = :id';

	$query = $connection->prepare($sql);
  $query->execute($data);
  
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  updatePlace($connection, $phpInput);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при редакция на описание",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Описанието е редактирано",
  'value' => json_encode($phpInput)
]);

echo $response;

?>