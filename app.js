const express = require("express"); // Paso 1: Requerir el módulo 'express'
const controlador = require("./controlador/control"); // Paso 7: Requerir el módulo Controlador 'control.js'
//const { conectar } = require('./modelo/db_conectar');

// Resto del código que utiliza la variable 'conectar'

const app = express(); // Paso 1: Crear una instancia de Express y asignarla a la variable 'app'

//hola mundo
//app.get('/',function(req,res){
//  res.send("Hola mundo")
//      })

//   app.get('/',function(req,res){
//    res.render("clientes/clientes")
//        })

//app.get('/',function(req,res){
//  conectar.query('SELECT id_cliente,identificacion,nombres,apellidos,direccion,telefono,date_format(fecha_nacimiento,"%d/%m/%Y") as fecha_nacimiento FROM clientes', (error,results)=>{
//     if(error){
//        throw error;
//    }else{
//        res.render('clientes/clientes',{resultado:results})
//    }

// })
// })

app.use(express.urlencoded({ extended: false })); // Paso 1: Configurar el middleware para analizar datos URL codificados
app.use(express.json()); // Paso 1: Configurar el middleware para analizar datos JSON

// Paso 4: Configurar el middleware para servir archivos estáticos desde los directorios './vistas', './controlador' y './modelo'
app.use(express.static("./modelo"));
app.use(express.static("./vista"));
app.use(express.static("./controlador"));

// Paso 5: Configurar la ubicación de las vistas y el motor de plantillas 'ejs'
app.set("views", "./vista");
app.set("view engine", "ejs");

// Paso 2: Iniciar el servidor en el puerto 3000 y mostrar un mensaje en la consola
app.listen("3000", function () {
  console.log("Aplicación Iniciada : http://localhost:3000/");
});

// Paso 3: Definir una ruta para el método GET en la ruta  '/clientes' que llama a la función 'leer' del módulo 'control.js'
app.get("/clientes", controlador.leer);

// Paso 3: Definir una ruta para el método POST en la ruta '/crud_c' que llama a la función 'cud' del módulo 'control.js'
app.post("/crud_c", controlador.cud);
