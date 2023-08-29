

// Llamando a la funcion del carrito

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", listoFuncionando);
} else {
    listoFuncionando();
};




// Menu Hamburguesa

const menuHamburguesa = document.getElementById('hamburguesa');
const cerrar = document.getElementById('cerrar');
const menuLista = document.getElementById('lista-menu')

if (menuHamburguesa) {
    menuHamburguesa.addEventListener('click', () => {
        menuLista.classList.add('active')
    })
};
if (cerrar) {
    cerrar.addEventListener('click', () => {
        menuLista.classList.remove('active')
    })
};


// Agregar Productos al Carrito

var BotonAgregarProductosAlCarrito = document.getElementById('agregarCarrito');
BotonAgregarProductosAlCarrito.addEventListener('click', agregarAlCarrito);


// Pagina Carrito Funcionamiento

function listoFuncionando() {

    var elementosCarrito = localStorage.getItem('elementosCarrito');
    if (elementosCarrito) {
        elementosCarrito = JSON.parse(elementosCarrito);
        if (elementosCarrito.length > 0) {
            var carritoDocument = document;

            var TablaCarrito = carritoDocument.querySelector('.contenedorCarrito');

            for (var i = 0; i < elementosCarrito.length; i++) {
                var elementoCarrito = elementosCarrito[i];

                // Crea una nueva fila para el elemento en el carrito
                var filaCarrito = document.createElement('tr');
                filaCarrito.classList.add('carrito-nuevo-contenedor');

                //  Agregando los elementos HTML necesarios a la fila del elemento del carrito
                var eliminarCeldaCarrito = document.createElement('td');
                var eliminarIcono = document.createElement('i');
                eliminarIcono.classList.add('bi', 'bi-x-circle-fill', 'eliminar-carrito');
                eliminarCeldaCarrito.appendChild(eliminarIcono);
                filaCarrito.appendChild(eliminarCeldaCarrito);

                var carritoCeldaImagen = document.createElement('td');
                var carritoImagen = document.createElement('img');
                carritoImagen.setAttribute('src', elementoCarrito.imagen);
                carritoCeldaImagen.appendChild(carritoImagen);
                filaCarrito.appendChild(carritoCeldaImagen);

                var carritoCeldaTitulo = document.createElement('td');
                carritoCeldaTitulo.textContent = elementoCarrito.titulo;
                filaCarrito.appendChild(carritoCeldaTitulo);

                var carritoCeldaPrecio = document.createElement('td');
                carritoCeldaPrecio.classList.add('carrito-precio');
                carritoCeldaPrecio.textContent = elementoCarrito.precio;
                filaCarrito.appendChild(carritoCeldaPrecio);

                var carritoCeldaCantidad = document.createElement('td');
                var carritoCantidadIngresada = document.createElement('input');
                carritoCantidadIngresada.setAttribute('type', 'number');
                carritoCantidadIngresada.setAttribute('value', elementoCarrito.cantidad);
                carritoCantidadIngresada.classList.add('carritoCantidad');
                carritoCeldaCantidad.appendChild(carritoCantidadIngresada);
                filaCarrito.appendChild(carritoCeldaCantidad);

                var carritoCeldaSubtotal = document.createElement('td');
                carritoCeldaSubtotal.classList.add('subtotal-precio');
                filaCarrito.appendChild(carritoCeldaSubtotal);

                console.log(carritoCeldaSubtotal)

                TablaCarrito.appendChild(filaCarrito);
            };
        } 
        
        else {
            var carritoMensajeVacio = document.getElementById('mensaje-Carrito-Vacio');
            carritoMensajeVacio.style.display = 'flex';
        };
    }
    
    else {
        var carritoMensajeVacio = document.getElementById('mensaje-Carrito-Vacio');
        carritoMensajeVacio.style.display = 'flex';
    };

    // Eliminar elementos del carrito
    var eliminarBotonesCarrito = document.getElementsByClassName("eliminar-carrito");
    console.log(eliminarBotonesCarrito)

    for (var i = 0; i < eliminarBotonesCarrito.length; i++) {
        var boton = eliminarBotonesCarrito[i];
        boton.addEventListener("click", eliminarElementoCarrito);
    };

    // actualizar subtotal y total

    var cantidadesIngresadas = document.querySelectorAll('.carritoCantidad');

    cantidadesIngresadas.forEach(function(cantidadIngresada) {
        cantidadIngresada.addEventListener('change', function() {
            ActualizarSubtotal();
            ActualizarTotal();
        });
    });

    function ActualizarSubtotal() {
        var cantidadesIngresadas = document.querySelectorAll('.carritoCantidad');
        var preciosTotales = document.querySelectorAll('.subtotal-precio');
        
        for (var i = 0; i < cantidadesIngresadas.length; i++) {
            var cantidadIngresada = cantidadesIngresadas[i];
            var precioTotal = preciosTotales[i];
            var carritoPrecio = cantidadIngresada.parentNode.previousElementSibling.textContent;
            
            var cantidad = parseInt(cantidadIngresada.value);
            var precio = parseFloat(carritoPrecio.replace('$', ''));
            
            if (isNaN(cantidad) || cantidad <= 0) {
                cantidad = 1;
                cantidadIngresada.value = 1;
            }
            
            var subtotal = cantidad * precio;
            precioTotal.textContent = '$' + subtotal.toFixed(3);
        }
    };
    ActualizarSubtotal();
    ActualizarTotal();

    // Funcion Comprar Ahora

    var botonComprarAhora = document.querySelector('.comprarAhora');
    botonComprarAhora.addEventListener('click', comprarAhora);

    function comprarAhora() {
        localStorage.removeItem('elementosCarrito');
        var TablaCarrito = document.querySelector('.contenedorCarrito');
        TablaCarrito.innerHTML = '';

        ActualizarTotal();
        var carritoMensajeVacio = document.getElementById('mensaje-Carrito-Vacio');
        carritoMensajeVacio.style.display = 'flex';

        alert("Felicitaciones!!!😁 Tu pedido se realizó correctamente corremos por ti y muy pronto disfrutarás de tu nuevo estilo 😎");
    };
};

// Eliminar elementos del carrito

function eliminarElementoCarrito(event) {
    var botonOprimido = event.target;
    var carritoFilaElemento = botonOprimido.closest('tr');
    var elementosCarrito = JSON.parse(localStorage.getItem('elementosCarrito'));

    // encontrar el index del elemento en el carrito en el array
    var index = Array.from(carritoFilaElemento.parentNode.children).indexOf(carritoFilaElemento);

    // eliminar el elemento del carrito del array
    elementosCarrito.splice(index, 1);

    // actualizar el elemento del carrito en el localStorage
    localStorage.setItem('elementosCarrito', JSON.stringify(elementosCarrito));

    // eleminar el elemento del carrito del Html
    carritoFilaElemento.remove();

    ActualizarTotal();
};

// actualizar el subtotal del carrito completo

function ActualizarTotal() {
    var subtotalElementos = document.querySelectorAll('.subtotal-precio');
    var subtotal = 0;
    
    for (var i = 0; i < subtotalElementos.length; i++) {
      var subtotalValor = parseFloat(subtotalElementos[i].textContent.replace('$', ''));
      subtotal += subtotalValor;
    }
  
    var carritoSubtotalElemento = document.querySelector('.carritoSubtotal');
    var carritoTotalElemento = document.querySelector('.carritoTotal');
    carritoSubtotalElemento.textContent = '$' + subtotal.toFixed(3);
    carritoTotalElemento.textContent = '$' + subtotal.toFixed(3);
};

// Agregar gafas al carrito

function agregarAlCarrito() {
    var gafasImagen = document.querySelector('#imagenPrincipal').getAttribute('src');
    var gafasTitulo = document.querySelector('.tituloGafas').textContent;
    var gafasPrecio = document.querySelector('.precio').textContent;
    var carritoCantidad = document.querySelector('.carritoCantidad').value;

    var elementoCarrito = {
        imagen: gafasImagen,
        titulo: gafasTitulo,
        precio: gafasPrecio,
        cantidad: carritoCantidad
    };

    var elementosCarrito = localStorage.getItem('elementosCarrito');
    if (elementosCarrito) {
        elementosCarrito = JSON.parse(elementosCarrito);
    } else {
        elementosCarrito = [];
    }
    elementosCarrito.push(elementoCarrito);

    localStorage.setItem('elementosCarrito', JSON.stringify(elementosCarrito));

    window.location.href = 'carrito.html';
};
