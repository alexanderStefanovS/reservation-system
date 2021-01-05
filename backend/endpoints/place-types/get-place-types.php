<?php

require_once "../../db/db.php";
require_once "../../models/place-type.php";

function getPlaceTypes($connection) {
	$sql = "SELECT * FROM place_types";
	$query = $connection->prepare($sql);
	$query->execute([]);

  $placeTypes = array();
	while ($row = $query->fetch()) {
    $placeType = new PlaceType($row['id'], $row['type'], $row['code']);
    array_push($placeTypes, $placeType);
  }
  
	return $placeTypes;
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  $placeTypes = getPlaceTypes($connection);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при четене на списъка с типове заведения",
    'value' => null
  ]);
  exit();
}

$response = json_encode([
  'success' => true,
  'message' => "Списък от типове заведения",
  'value' => $placeTypes
]);

echo $response;

?>