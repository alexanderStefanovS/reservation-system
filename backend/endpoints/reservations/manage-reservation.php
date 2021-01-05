<?php

require_once "../../db/db.php";

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

function setIsApproved($connection, $id, $isApproved) {
  $sql = 'UPDATE reservations
          SET is_approved = :isApproved
          WHERE id = :id';

  $query = $connection->prepare($sql);
  $query->execute(["id" => $id, "isApproved" => $isApproved]);
}

try {
  $database = new DB();
  $connection = $database->getConnection();
  setIsApproved($connection, $_REQUEST['id'], $_REQUEST['isApproved']);
}
catch (PDOException $e) {
	echo json_encode([
		'success' => false,
    'message' => "Грешка при промяна",
    'value' => null
  ]);
  exit();
}

$approveMsg = $_REQUEST['isApproved'] ? 'одобри' : 'отказа';

$usersId = $_SESSION['usersId'];
$logger = new Logger($connection);
$logger->log("Потребителят ".$approveMsg." резервация.", $usersId);

$response = json_encode([
  'success' => true,
  'message' => "Действието е успешено",
  'value' => null
]);

echo $response;

?>