const mysql = require('mysql2'); // Paso 1: Requerir el módulo 'mysql2'

var conectar = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME
});

conectar.connect(function (err) {
    if (err) {
        console.error('Error en la conexión: ' + err.stack);
        return;
    }

    console.log('Conexión exitosa ID: ' + conectar.threadId);
});

module.exports = { conectar }; // Paso 7: Exportar la variable 'conectar'
