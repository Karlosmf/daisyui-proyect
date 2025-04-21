<?php
// login.php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  // Pre-flight request
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
  header('Access-Control-Allow-Headers: token, Content-Type');
  header('Access-Control-Max-Age: 1728000');
  header('Content-Length: 0');
  header('Content-Type: text/plain');
  die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

// --- Configuración de la Base de Datos ---
$databaseFile = __DIR__ . '/database.sqlite'; // Ruta segura (ajusta si es necesario)
// Si database.sqlite está en el mismo directorio que login.php, __DIR__ es correcto.
// Considera mover database.sqlite fuera del directorio accesible por web.

// --- Conectar a la Base de Datos ---
try {
  $pdo = new PDO("sqlite:$databaseFile");
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  // Deshabilitar emulación de prepared statements para seguridad
  $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
  http_response_code(500); // Internal Server Error
  echo json_encode(["error" => "Error de conexión a la base de datos"]);
  exit(); // Detener la ejecución
}

// --- Leer los datos POST ---
// Esperamos recibir un JSON body con 'username' y 'password'
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'] ?? ''; // Usar ?? para manejar si no vienen los datos
$password = $data['password'] ?? '';

// --- Validar datos recibidos (básico) ---
if (empty($username) || empty($password)) {
  http_response_code(400); // Bad Request
  echo json_encode(["error" => "Faltan usuario o contraseña"]);
  exit();
}

// --- Consultar la Base de Datos ---
// ¡¡IMPORTANTE!! Consulta muy básica y NO SEGURA con password en texto plano.
// En producción, harías un SELECT por username y luego verificarías el hash de la password.
$stmt = $pdo->prepare("SELECT username, role, token FROM users WHERE username = :username AND password = :password");
$stmt->bindParam(':username', $username);
$stmt->bindParam(':password', $password); // ¡¡NO SEGURO!!
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC); // Obtener la fila como array asociativo

// --- Preparar y enviar la Respuesta ---
if ($user) {
  // Login exitoso
  http_response_code(200); // OK
  // Devolver el array con los datos del usuario dentro de un array, como pide el ejemplo
  echo json_encode([$user]); // Ejemplo: [{username:'...', role:'...', token:'...'}]
} else {
  // Login fallido
  http_response_code(401); // Unauthorized
  echo json_encode(["error" => "Credenciales incorrectas"]);
}
