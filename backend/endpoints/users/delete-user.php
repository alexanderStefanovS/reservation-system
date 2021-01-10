<?php

require_once "../../db/db.php";
require_once "../../logger/logger.php";

session_start();

function deleteUser($connection, $id) {
  $sql = 'DELETE FROM users WHERE id = :id';
	$query = $connection->prepare($sql);
  $query->execute(["id" => $id]);
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  deleteUser($connection, $_REQUEST["id"]);
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
$logger->log("Потребителят изтри потребител.", $usersId);

$response = json_encode([
  'success' => true,
  'message' => "Изтриването е успешено",
  'value' => null
]);

echo $response;

?>