const mysql = require('mysql2'); // Paso 1: Requerir el módulo 'mysql2'

var conectar = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'geoPrograma',
    database: 'db_soleado'
});

conectar.connect(function (err) {
    if (err) {
        console.error('Error en la conexión: ' + err.stack);
        return;
    }

    console.log('Conexión exitosa ID: ' + conectar.threadId);
});

module.exports = { conectar }; // Paso 7: Exportar la variable 'conectar'
