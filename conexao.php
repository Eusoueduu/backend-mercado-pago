<?php
$servidor = "localhost";
$usuario = "u431586661_furm";
$senha = "Form2025.";
$banco = "u431586661_formulario";

$conexao = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica a conexão
if ($conexao->connect_error) {
    die("Erro na conexão: " . $conexao->connect_error);
}
?>
