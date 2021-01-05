<?php

class PlaceType {

  public $id;
  public $type;
  public $code;

  function __construct($id, $type, $code) {
    $this->id = $id;
    $this->type = $type;
    $this->code = $code;
  }

}

?>