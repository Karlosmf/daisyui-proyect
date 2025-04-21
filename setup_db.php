<?php
$databaseFile = __DIR__ . '/database.sqlite'; // Ruta segura para la base de datos

try {
    // Conectar o crear la base de datos
    $pdo = new PDO("sqlite:$databaseFile");
    // Configurar para lanzar excepciones en caso de error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Crear la tabla users
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL, -- Debería ser más largo para hashes
        role VARCHAR(20) NOT NULL,
        token VARCHAR(255) UNIQUE -- Debería ser generado y gestionado mejor
    )");

    // Insertar un usuario de prueba (Contraseña: Admin-123)
    // ¡¡IMPORTANTE!! En la vida real, HASHearías la contraseña aquí.
    // Aquí la guardamos en texto plano SOLO PARA ESTE EJEMPLO SIMPLE.
    $pdo->exec("INSERT OR IGNORE INTO users (username, password, role, token) VALUES ('admin', 'Admin-123', 'admin', 'abcdefg123456789')");

    echo "Base de datos SQLite y tabla 'users' creadas con éxito. Usuario 'admin' insertado.";

} catch (PDOException $e) {
    echo "Error al configurar la base de datos: " . $e->getMessage();
}
?>