<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

require 'vendor/autoload.php';

$host = "localhost";
$dbname = "lintechi_db_whatsapp";
$username = "lintechi_whatsapp";
$password = "Whats@pp222";


try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;

header('Content-type: application/json');

$app = new App();

// Fungsi untuk validasi input
function validateInput($entity, $requiredFields)
{
    $missingFields = [];
    foreach ($requiredFields as $field) {
        if (empty($entity[$field])) {
            $missingFields[] = $field;
        }
    }
    return $missingFields;
}

// Fungsi login dengan PDO
function login($db, $username, $password)
{
    $stmt = $db->prepare("SELECT * FROM t_admm WHERE username = :username AND pass = MD5(:password) LIMIT 1");
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":password", $password);
    $stmt->execute();

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

$app->post('/login', function (Request $request, Response $response) use ($app, $db) {
    $entity = $request->getParsedBody();
    
    if (!$entity) {
        return $response->withJson(['err_code' => 1, 'status' => false, 'message' => "No entity"], 401);
    }

    $requiredFields = ["user", "pass"];
    $missingFields = validateInput($entity, $requiredFields);
    
    if (!empty($missingFields)) {
        return $response->withJson(['err_code' => 1, 'message' => "Harap isi semua field yang dibutuhkan: " . implode(", ", $missingFields)], 401);
    }

    $user = login($db, $entity["user"], $entity["pass"]);

    if ($user) {
        $token = bin2hex(random_bytes(16)); // Generate token aman
        return $response->withJson(['err_code' => 0, 'message' => "Login berhasil", 'token' => $token], 200);
    }

    return $response->withJson(['err_code' => 1, 'message' => "Username atau password salah"], 400);
});

// Jalankan aplikasi Slim
$app->run();
