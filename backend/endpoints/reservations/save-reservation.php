<?php

require_once "../../db/db.php";
require_once "../../logger/logger.php";

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

function saveReservation($connection, $reservation) {
  $sql = 'INSERT INTO reservations (users_id, date, places_id, num_of_people)
          VALUES (:usersId, :date, :placesId, :numOfPeople)';

  $query = $connection->prepare($sql);
  $query->execute(["usersId" => $reservation["usersId"], "placesId" => $reservation["placesId"], 
                   "date" => $reservation["date"], "numOfPeople" => $reservation["numOfPeople"]]);
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  saveReservation($connection, $phpInput);
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
$logger->log("Потребителят направи резервация.", $usersId);

$response = json_encode([
  'success' => true,
  'message' => "Записът е успешен",
  'value' => $connection->lastInsertId()
]);

echo $response;

?>