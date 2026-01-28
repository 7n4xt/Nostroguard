<?php
header('Content-Type: application/json');
$k = getenv('HF_API_KEY') ?: (file_exists(__DIR__ . '/config/hf_key.php') ? require __DIR__ . '/config/hf_key.php' : '');
$k = trim((string)$k);
echo json_encode([
  'starts_with' => substr($k, 0, 4),
  'length' => strlen($k),
  'is_empty' => ($k === '') ? true : false
]);
