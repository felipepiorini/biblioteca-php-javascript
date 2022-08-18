<?php

include("../conexao.php");

header('Content-Type: application/json');

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

$sql = "insert into usuarios"
    . " (nome, data_nascimento, cpf)"
    . " VALUES ('{$decoded["nome"]}', '{$decoded["dataNasc"]}', '{$decoded["cpf"]}')";

$row = mysqli_query($conexao, $sql);

if ($row) {
    echo "ok";
} else {
    $erro = mysqli_error($conexao);
    echo $erro;
}