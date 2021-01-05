<?php

require_once "../../db/db.php";
require_once "../../logger/logger.php";

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

function saveUser($connection, $user) {
  
  $user["password"] = password_hash($user["password"], PASSWORD_DEFAULT);

  $sql = 'INSERT INTO users (first_name, last_name, email, phone, password, roles_id)
          VALUES (:firstName, :lastName , :email, :phone, :password, :rolesId)';

	$query = $connection->prepare($sql);
  $query->execute($user);
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  saveUser($connection, $phpInput);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при регистрация",
    'value' => null
  ]);
  exit();
}

$userId = $connection->lastInsertId();
$logger = new Logger($connection);
$logger->log("Потребителят се регистрира.", $userId);

$response = json_encode([
  'success' => true,
  'message' => "Потрбителят е регистриран",
  'value' => $userId
]);

echo $response;

?>