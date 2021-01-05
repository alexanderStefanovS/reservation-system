<?php

class Role {

    public $id;
    public $name;
    public $code;

    function __construct($id, $name, $code) {
        $this->id = $id;
        $this->name = $name;
        $this->code = $code;
    }

}

?>