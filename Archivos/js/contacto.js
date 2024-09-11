// Inicializar EmailJS con tu ID de usuario
emailjs.init('FWyOjB3CtGk-Az4VY');  // Reemplaza con tu User ID de EmailJS

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar que el formulario recargue la página

    // Cambia el valor del botón mientras se envía el correo
    const btn = document.getElementById('button-contacto');
    btn.value = 'Enviando...';

    const serviceID = 'service_fzqikcq';  // Verifica que coincida con tu ID de servicio en EmailJS
    const templateID = 'template_zeqt1nl';  // Verifica que coincida con tu ID de template en EmailJS

    // Enviar el formulario usando EmailJS
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // Mostrar notificación de éxito usando SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Se envió el mensaje',
                timer: 2500,
                showConfirmButton: false
            });

            // Restablecer el valor del botón y el formulario
            btn.value = 'ENVIAR';
            document.getElementById('form').reset();
        }, (err) => {
            // Mostrar mensaje de error si ocurre algún problema
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el mensaje',
                text: 'Hubo un problema al enviar el correo. Inténtalo más tarde.'
            });

            // Restablecer el valor del botón
            btn.value = 'ENVIAR';
            console.error('Error:', err);
        });
})

