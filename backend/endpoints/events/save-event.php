<?php

require_once "../../db/db.php";
require_once "../../logger/logger.php";

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

function saveEvent($connection, $event) {
  $sql = 'INSERT INTO events (name, date, places_id)
          VALUES (:name, :date, :placesId)';

  $query = $connection->prepare($sql);
  $query->execute(["name" => $event["name"], "placesId" => $event["placesId"], "date" => $event["date"]]);
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  saveEvent($connection, $phpInput);
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
$logger->log("Потребителят направи събитие.", $usersId);

$response = json_encode([
  'success' => true,
  'message' => "Записът е успешен",
  'value' => $connection->lastInsertId()
]);

echo $response;

?>