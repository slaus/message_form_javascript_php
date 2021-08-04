<?php
$_POST = json_decode( file_get_contents("php://input"), true ); //If use JSON. Else need to comment it string.
echo var_dump($_POST);
