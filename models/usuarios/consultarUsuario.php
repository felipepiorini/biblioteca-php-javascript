<?php

include("../conexao.php");

header('Content-Type: application/json');

$userId = $_GET['userId'];

$sql = "SELECT * from usuarios where id = $userId";

$fetch = mysqli_query($conexao, $sql);

$row = mysqli_fetch_row($fetch);

echo (json_encode($row));