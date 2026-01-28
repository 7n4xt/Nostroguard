<?php
// api/chat.php
header('Content-Type: application/json; charset=utf-8');

// Récupérer la clé depuis une variable d'environnement
$openai_api_key = getenv('OPENAI_API_KEY');
if (!$openai_api_key) {
    http_response_code(500);
    echo json_encode(['error' => 'Clé API non configurée sur le serveur.']);
    exit;
}

// Lecture du corps JSON
$input = json_decode(file_get_contents('php://input'), true);
if (!isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Paramètre "message" requis.']);
    exit;
}

$userMessage = trim($input['message']);
if ($userMessage === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Message vide.']);
    exit;
}
if (mb_strlen($userMessage) > 5000) {
    http_response_code(400);
    echo json_encode(['error' => 'Message trop long.']);
    exit;
}

// (Option) Simple historique en session
session_start();
if (!isset($_SESSION['chat_history'])) {
    $_SESSION['chat_history'] = [];
}
// limiter l'historique
$maxTurns = 6;
if (count($_SESSION['chat_history']) > $maxTurns * 2) {
    $_SESSION['chat_history'] = array_slice($_SESSION['chat_history'], -($maxTurns*2));
}

// Construire messages pour l'API
$messages = [
    ['role' => 'system', 'content' => "Tu es un assistant utile et poli. Réponds en français de manière concise."]
];
foreach ($_SESSION['chat_history'] as $m) {
    $messages[] = $m;
}
$messages[] = ['role' => 'user', 'content' => $userMessage];
$_SESSION['chat_history'][] = ['role' => 'user', 'content' => $userMessage];

// Appel à l'API OpenAI (chat complet)
$postData = json_encode([
    'model' => 'gpt-3.5-turbo',
    'messages' => $messages,
    'max_tokens' => 600,
    'temperature' => 0.6
]);

$ch = curl_init('https://api.openai.com/v1/chat/completions');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $openai_api_key,
]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    $err = curl_error($ch);
    curl_close($ch);
    http_response_code(500);
    echo json_encode(['error' => 'Erreur cURL: ' . $err]);
    exit;
}
curl_close($ch);

if ($httpcode !== 200) {
    http_response_code($httpcode);
    echo $response;
    exit;
}

$data = json_decode($response, true);
$reply = $data['choices'][0]['message']['content'] ?? '';

if ($reply !== '') {
    $_SESSION['chat_history'][] = ['role' => 'assistant', 'content' => $reply];
}

echo json_encode(['reply' => $reply]);
