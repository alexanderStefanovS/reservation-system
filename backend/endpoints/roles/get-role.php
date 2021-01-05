<?php

require_once "../../db/db.php";
require_once "../../models/role.php";

function getRole($connection, $id) {
	$sql = "SELECT * FROM roles WHERE id = :id";
	$query = $connection->prepare($sql);
	$query->execute(["id" => $id]);

	$row = $query->fetch();
  $role = new Role($row['id'], $row['name'], $row['code']);
  
	return $role;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $events = getRole($connection, $_REQUEST['id']);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на роля",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Роля",
  'value' => $events
]);

echo $response;

?>