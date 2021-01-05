<?php

require_once "../../db/db.php";
require_once "../../models/role.php";

function isNotAdmin($role) {
  return $role->code !== 'ADMIN';
}

function getRoles($connection) {
	$sql = "SELECT * FROM roles";
	$query = $connection->prepare($sql);
	$query->execute([]);

  $roles = array();
	while ($row = $query->fetch()) {
    $role = new Role($row['id'], $row['name'], $row['code']);
    array_push($roles, $role);
  }

  $roles = array_filter($roles, "isNotAdmin");
  
	return $roles;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $roles = getRoles($connection);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на списъка с роли",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Списък от роли",
  'value' => $roles
]);

echo $response;

?>