<?php

class Place {

  public $id;
  public $description;
  public $usersId;	
  public $placeTypesId;	
  public $name;

  function __construct($id, $name, $description, $usersId, $placeTypesId) {
    $this->id = $id;
    $this->name = $name;
    $this->usersId = $usersId;
    $this->placeTypesId = $placeTypesId;
    $this->description = $description;
  }

}

?>