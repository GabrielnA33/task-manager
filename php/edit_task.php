<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];
$new_task = $data['task'];

$stmt = $pdo->prepare("UPDATE tasks SET task = :task WHERE id = :id");
$stmt->execute(['task' => $new_task, 'id' => $id]);

echo json_encode(['message' => 'Tarea actualizada']);
?>