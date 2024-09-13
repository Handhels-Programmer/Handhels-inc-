jQuery('document').ready(function($){

//menu
var menuBtn=$('.menu-icon'),
menu=$('.navigation ul');

    menuBtn.click(function(){
        if(menu.hasClass('show')){
            menu.removeClass('show');
        }else{
            menu.addClass('show');
        }
    });

//carrito-menu
var carritoMenuBtn=$('.car'),
carritomenu=$('.dropdown-menu');

carritoMenuBtn.click(function(){
        if(carritomenu.hasClass('show')){
            carritomenu.removeClass('show');
        }else{
            carritomenu.addClass('show');
        }
    });

});


//productos
let imagenes = document.querySelectorAll('.card-img');
let modal = document.querySelector('#modal');
let img = document.querySelector('#modal-img');
let boton = document.querySelector('#modal-boton');

for(let i = 0; i<imagenes.length;i++){
    imagenes[i].addEventListener('click',function(e){
        modal.classList.toggle("modal-open");
        let src = e.target.src;
        img.setAttribute("src",src);
    });
}
boton.addEventListener('click',function(){
    modal.classList.toggle("modal-open");
});


//validar correo
function validarCorreo(correo){
    var expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test(correo);
    if(esValido == true){
        console.log("es valido el correo");
    }
    else{
        alert("el correo no es válido");
    }
}

//validar nombres
function sololetras(e){
    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key).toLowerCase();
    letras = " abcdefghijklmnñopqrstuvwxyzáéíóúü";
    especiales = "8-37-38-46-164";
    teclado_especial = false;
    for(var i in especiales){
        if(key == especiales[i]){
            teclado_especial = true; break;
        }
    }
    if(letras.indexOf(teclado) == -1 && !teclado_especial){
        return false;
    }
}

//validar numeros
function solonumeros(e){
    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key).toLowerCase();
    numeros = "0123456789";
    especiales = "8-37-38-46-164";
    teclado_especial = false;
    for(var i in especiales){
        if(key == especiales[i]){
            teclado_especial = true; break;
        }
    }
    if(numeros.indexOf(teclado) == -1 && !teclado_especial){
        return false;
    }
}


//validar formulario-contacto
function validar(){
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let celular = document.getElementById("celular").value;
    let mensaje = document.getElementById("mensaje").value;
    let expresion = /\w+@\w+\.+[a-z]/;
    if(nombre ==="" || correo ==="" || celular ==="" || mensaje ===""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios',
            timer: 2500,
            showConfirmButton: true
        })
        return false;
    }
    else if(!expresion.test(correo)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo no es válido',
            timer: 2500,
            showConfirmButton: true
        })
        return false;
    }
    else if(celular.length>10){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El celular es muy largo',
            timer: 2500,
            showConfirmButton: true
        })
        return false;
    }
    else if(isNaN(celular)){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El celular ingresado no es un número',
            timer: 2500,
            showConfirmButton: true
        })
        return false;
    }
} 


// Función para obtener el HTML de la tabla
function obtenerTablaHTML() {
    // Obtiene el HTML del contenido de la tabla
    return document.querySelector('#lista-compra').outerHTML;
}


function procesarCompra(e) {
    e.preventDefault();
    
    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2500,
            showConfirmButton: false
        }).then(function () {
            window.location = "productos.html";
        });
    } else if (cliente.value === '' || correo.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese todos los campos requeridos',
            timer: 2500,
            showConfirmButton: false
        });
    } else {
        emailjs.init('FWyOjB3CtGk-Az4VY');

        const serviceID = 'service_fzqikcq';
        const templateID = 'template_pg9cvt7';

        // Obtén el HTML de la tabla
        const tablaHTML = obtenerTablaHTML();

        emailjs.send(serviceID, templateID, {
            cliente: cliente.value,
            correo: correo.value,
            tabla_compra: tablaHTML, // Aquí se incluye el HTML de la tabla
            subtotal: document.getElementById('subtotal').textContent,
            igv: document.getElementById('igv').textContent,
            total: document.getElementById('total').value
        })
        .then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                text: 'Tu pedido ha sido enviado',
                timer: 2500,
                showConfirmButton: false
            }).then(() => {
                compra.vaciarLocalStorage();
                window.location = "productos.html";
            });
        }, (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar el correo',
                timer: 2500,
                showConfirmButton: false
            });
            console.log('Error:', err);
        });
    }
}

