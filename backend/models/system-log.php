<?php

class SystemLog {

  public $id;
  public $date;
  public $usersId;	
  public $description;

  function __construct($id, $date, $usersId, $description) {
    $this->id = $id;
    $this->usersId = $usersId;
    $this->description = $description;
    $this->date = $date;
  }

}

?>