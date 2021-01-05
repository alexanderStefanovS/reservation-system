<?php

require_once "../../db/db.php";
require_once "../../models/user.php";

session_start();

$phpInput = json_decode(file_get_contents('php://input'), true);

if (isset($phpInput['email']) && isset($phpInput['password'])) {

  try {
    $database = new DB();
    $connection = $database->getConnection();
  }
  catch (PDOException $e) {
    echo json_encode([
      'success' => false,
      'message' => "Грешка при опит за вход",
      'value' => null
    ]);
    exit();
  }

  $sql = "SELECT * FROM users WHERE email = :email";
	$query = $connection->prepare($sql);
  $query->execute(['email' => $phpInput['email']]);  
  $dbUser = $query->fetch();

  try {

    if ($dbUser == false) {
      throw new Exception("Грешно потребителско име.");
    }

    $user = new User($dbUser["id"], $dbUser["first_name"], $dbUser["last_name"],
                     $dbUser["email"], $dbUser["phone"], null, $dbUser["roles_id"]);
      
    if (!password_verify($phpInput["password"], $dbUser['password'])) {
      throw new Exception("Грешна парола.");
    }

  } catch (Exception $exc) {
    echo json_encode([
      'success' => false,
      'message' => $exc->getMessage(),
      'value' => null
    ]);
    exit();
  }

  $_SESSION['email'] = $phpInput['email'];
  $_SESSION['rolesId'] = $user->rolesId;
  $_SESSION['usersId'] = $user->id;

  echo json_encode([
    'success' => true,
    'message' => "Входът е успешен",
    'value' => json_encode($user)
  ]);

} else {
  echo json_encode([
    'success' => false,
    'message' => "Грешка при опит за вход",
    'value' => null
  ]);
}

?>