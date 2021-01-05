<?php

require_once "../../db/db.php";
require_once "../../models/user.php";


function getUsers($connection) {
	$sql = "SELECT * FROM users";
	$query = $connection->prepare($sql);
	$query->execute([]);

  $users = array();
	while ($row = $query->fetch()) {
    $user = new User($row['id'], $row['first_name'], $row['last_name'], $row['email'], $row['phone'],
                     null, $row['roles_id']);
    array_push($users, $user);
  }
  
	return $users;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $roles = getUsers($connection);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на списъка с потребители",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Списък от потребители",
  'value' => $roles
]);

echo $response;

?>