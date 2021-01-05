<?php

class User {

    public $id;
    public $firstName;
    public $lastName;
    public $email;
    public $phone;
    public $password;
    public $rolesId;

    function __construct($id, $firstName, $lastName, $email, $phone, $password, $rolesId) {
      $this->id = $id;
      $this->firstName = $firstName;
      $this->lastName = $lastName;
      $this->email = $email;
      $this->phone = $phone;
      $this->password = $password;
      $this->rolesId = $rolesId;
    }

}

?>