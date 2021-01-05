<?php

require_once "../../db/db.php";

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

function saveFood($connection, $food) {
  $sql = 'INSERT INTO food (name, price, type, places_id)
          VALUES (:name, :price, :type, :placesId)';

  $query = $connection->prepare($sql);
  $query->execute($food);
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  saveFood($connection, $phpInput);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при запис",
    'value' => null
  ]);
  exit();
}

$usersId = $_SESSION['usersId'];
$logger = new Logger($connection);
$logger->log("Потребителят добави храна.", $usersId);

$response = json_encode([
  'success' => true,
  'message' => "Записът е успешен",
  'value' => $connection->lastInsertId()
]);

echo $response;

?>