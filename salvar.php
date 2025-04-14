<?php
include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Campos comuns
    $empresa = $_POST['empresa'] ?? '';
    $segmento = $_POST['segmento'] ?? '';
    $telefone = $_POST['telefone'] ?? '';

    // Detecta se é o formulário PRO (tem mais campos)
    $isPro = isset($_POST['endereco']) && isset($_POST['horario']) && isset($_POST['cartoes']) && isset($_POST['objetivo']);

    if ($isPro) {
        // Campos do formulário Pro
        $redesocial = $_POST['redesocial'] ?? '';
        $endereco = $_POST['endereco'] ?? '';
        $horario = $_POST['horario'] ?? '';
        $cartoes = $_POST['cartoes'] ?? '';
        $objetivo = $_POST['objetivo'] ?? '';

        // SQL para formulário Pro
        $sql = "INSERT INTO formulario_pro (empresa, segmento, telefone, redesocial, endereco, horario, cartoes, objetivo)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conexao->prepare($sql);
        $stmt->bind_param("ssssssss", $empresa, $segmento, $telefone, $redesocial, $endereco, $horario, $cartoes, $objetivo);
    } else {
        // SQL para formulário Grátis
        $sql = "INSERT INTO formulario_gratis (empresa, segmento, telefone)
                VALUES (?, ?, ?)";

        $stmt = $conexao->prepare($sql);
        $stmt->bind_param("sss", $empresa, $segmento, $telefone);
    }

    // Executa e retorna resposta
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "Erro ao salvar: " . $stmt->error;
    }

    $stmt->close();
    $conexao->close();
} else {
    echo "Método inválido.";
}
?>
