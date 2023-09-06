const crypto = require("crypto");

const username = "nombre_de_usuario"; // El nombre de usuario para el que deseas generar el hash

// Crear un objeto hash utilizando el algoritmo SHA-256
const hash = crypto.createHash("sha256");

// Actualizar el objeto hash con los datos del nombre de usuario
hash.update(username);

// Calcular el hash y obtener la representación en formato hexadecimal
const hashedUsername = hash.digest("hex");

console.log("Hash generado:", hashedUsername);

// Aquí puedes usar el valor de hashedUsername según tus necesidades
// Por ejemplo, podrías enviarlo como respuesta a una solicitud HTTP
// o almacenarlo en una base de datos, entre otras cosas.
