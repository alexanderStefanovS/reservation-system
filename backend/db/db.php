<?php

class DB {

	private $conn;
	
	public function __construct() 
	{
		$configs = include('../../config.php');

		$dbHost = $configs->DB_HOST;
		$dbName = $configs->DB_NAME;
		$userName = $configs->DB_USER;
    $password = $configs->DB_PASSWORD;
    
		$this->conn = new PDO("mysql:host=$dbHost;dbname=$dbName", $userName, $password,
			[
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			]);
  }
  
	public function getConnection() 
	{
		return $this->conn;
  }
  
}

?>