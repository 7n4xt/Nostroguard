<?php
// chemin : Ressources/config/db.php

$host = 'db5019350227.hosting-data.io';
$db   = 'dbs15149399';
$user = 'dbu5504295';
$pass = '<VOTRE_MOT_DE_PASSE>';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    // Pour les tests seulement, vous pouvez décommenter la ligne suivante :
    // echo "Connexion OK";
} catch (PDOException $e) {
    error_log('DB connexion : ' . $e->getMessage());
    exit('Impossible de se connecter à la base de données.');
}
