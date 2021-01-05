<?php

require_once "../../db/db.php";
require_once "../../models/user.php";

function getUser($connection, $id) {
	$sql = "SELECT * FROM users WHERE id = :id";
	$query = $connection->prepare($sql);
	$query->execute(["id" => $id]);

	$row = $query->fetch();
  $user = new User($row['id'], $row['first_name'], $row['last_name'], $row['email'], $row['phone'],
                  null, $row['roles_id']);
  
	return $user;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $events = getUser($connection, $_REQUEST['id']);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на потребител",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Потребител",
  'value' => $events
]);

echo $response;

?>