<?php

class Event {

    public $id;
    public $name;
    public $date;
    public $placesId;

    function __construct($id, $name, $date, $placesId) {
      $this->id = $id;
      $this->name = $name;
      $this->date = $date;
      $this->placesId = $placesId;
    }

}

?>