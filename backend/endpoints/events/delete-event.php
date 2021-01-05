<?php

require_once "../../db/db.php";

session_start();

function deleteEvent($connection, $id) {
  $sql = 'DELETE FROM events WHERE id = :id';
	$query = $connection->prepare($sql);
  $query->execute(["id" => $id]);
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  deleteEvent($connection, $_REQUEST["id"]);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при изтриване",
    'value' => null
  ]);
  exit();
}

$usersId = $_SESSION['usersId'];
$logger = new Logger($connection);
$logger->log("Потребителят изтри събитие.", $usersId);

$response = json_encode([
  'success' => true,
  'message' => "Изтриването е успешено",
  'value' => null
]);

echo $response;

?>