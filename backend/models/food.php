<?php

class Food {

    public $id;
    public $name;
    public $price;
    public $type;
    public $placesId;

    function __construct($id, $name, $price, $type, $placesId) {
      $this->id = $id;
      $this->name = $name;
      $this->price = $price;
      $this->type = $type;
      $this->placesId = $placesId;
    }

}

?>