// controlador/control.js

const { conectar } = require('../modelo/db_conectar'); // Asegúrate de ajustar la ruta correcta al archivo de conexión

var controlador = {};

controlador.leer = (req, res) => {
    conectar.query('SELECT id_cliente, identificacion, nombres, apellidos, direccion, telefono, date_format(fecha_nacimiento, "%d/%m/%Y") as fecha_nacimiento FROM clientes', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.render('clientes/clientes', { resultado: results });
        }
    });
};

controlador.cud = (req, res) => {
    const btn_crear = req.body.btn_crear;
    const btn_actualizar = req.body.btn_actualizar;
    const btn_borrar = req.body.btn_borrar;
    const id = req.body.txt_id;
    const identificacion = req.body.txt_identificacion;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const direccion = req.body.txt_direccion;
    const telefono = req.body.txt_telefono;
    const fecha_nacimiento = req.body.txt_fn;

    if (btn_crear) {
        conectar.query('insert into clientes SET ?', { identificacion: identificacion, nombres: nombres, apellidos: apellidos, direccion: direccion, telefono: telefono, fecha_nacimiento: fecha_nacimiento }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/clientes');
            }
        });
    }
    if (btn_actualizar) {
        conectar.query('update clientes SET ? where id_cliente = ?', [{identificacion: identificacion, nombres: nombres, apellidos: apellidos, direccion: direccion, telefono: telefono, fecha_nacimiento: fecha_nacimiento }, id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/clientes');
            }
        });
    }
    if (btn_borrar) {
        conectar.query('delete from clientes where id_cliente = ?', [id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/clientes');
            }
        });
    }
};

module.exports = controlador;
