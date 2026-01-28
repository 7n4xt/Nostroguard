<?php
// test-db-pdo.php
require_once __DIR__ . '/Ressources/config/db.php'; // ou '/config/db.php' selon votre arborescence

// On exécute une requête simple pour vérifier la connexion
try {
    $stmt = $pdo->query('SELECT NOW() AS now, 1 AS ok');
    $row = $stmt->fetch();
    if ($row && isset($row['ok'])) {
        echo 'Connexion OK — serveur MySQL répond. Date/heure serveur : ' . htmlspecialchars($row['now']);
    } else {
        echo 'Connexion établie mais la requête de test n’a pas retourné de résultat.';
    }
} catch (Exception $e) {
    // Affiche un message générique ; loggez l'erreur détaillée côté serveur
    error_log('Erreur test DB (PDO) : ' . $e->getMessage());
    echo 'Erreur lors du test de connexion à la base de données. Vérifiez les logs.';
}
