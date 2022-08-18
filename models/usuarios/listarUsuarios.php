<?php

include("../conexao.php");

header('Content-Type: application/json');

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$sql = "SELECT * from usuarios ";

$fetch = mysqli_query($conexao, $sql);

$rows = mysqli_fetch_all($fetch, MYSQLI_ASSOC);

foreach ($rows as $row) {
    $result[] = $row;
}

echo (json_encode($result));