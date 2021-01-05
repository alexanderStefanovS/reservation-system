<?php

class Reservation {

  public $id;
  public $date;
  public $usersId;	
  public $placesId;	
  public $numOfPeople;
  public $isApproved;

  function __construct($id, $numOfPeople, $date, $usersId, $placesId) {
    $this->id = $id;
    $this->numOfPeople = $numOfPeople;
    $this->usersId = $usersId;
    $this->placesId = $placesId;
    $this->date = $date;
    $this->isApproved = null;
  }

}

?>