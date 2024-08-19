<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$task = $data['task'];

$stmt = $pdo->prepare("INSERT INTO tasks (task) VALUES (:task)");
$stmt->execute(['task' => $task]);

echo json_encode(['message' => 'Tarea agregada']);
?>
