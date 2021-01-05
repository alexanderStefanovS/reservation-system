<?php

require_once "../../db/db.php";
require_once "../../models/food.php";

function getFoods($connection, $placesId, $type) {
	$sql = "SELECT * FROM food WHERE places_id = :placesId AND type = :type";
	$query = $connection->prepare($sql);
	$query->execute(["placesId" => $placesId, "type" => $type]);

  $foods = array();
	while ($row = $query->fetch()) {
    $food = new Food($row['id'], $row['name'], $row['price'], $row['type'], $row['places_id']);
    array_push($foods, $food);
  }
  
	return $foods;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $foods = getFoods($connection, $_REQUEST['placesId'], $_REQUEST['type']);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на списъка с храни",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Списък от храни",
  'value' => $foods
]);

echo $response;

?>