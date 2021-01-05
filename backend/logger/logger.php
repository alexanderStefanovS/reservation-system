<?php

require_once "../../db/db.php";

class Logger {

  private $connection;

  function __construct($connection) {
    $this->connection = $connection;
  }

  function log($description, $usersId) {
    $sql = 'INSERT INTO system_log (date, description, users_id)
            VALUES (:date, :description, :usersId)';

    $log = [ "date" => date("Y-m-d H:i:s"), "description" => $description, "usersId" => $usersId ]; 
    $query = $this->connection->prepare($sql);
    $query->execute($log);
  }
  
}

?>