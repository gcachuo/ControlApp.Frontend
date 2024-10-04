<?php
$role = '';
if(!empty($_POST['token'])){
    $role = 'admin';
}
header('Content-Type: application/json; charset=utf-8');
exit(json_encode(compact( 'role')));
