<?php
// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger los datos del formulario
    $nombre = htmlspecialchars($_POST['cliente']);
    $correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);
    $celular = htmlspecialchars($_POST['celular']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    // Validar el correo electrónico
    if (filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        // Detalles del correo electrónico
        $destinatario = "programmer@handhelsinc.net";
        $asunto = "Mensaje de contacto de $nombre";
        
        // Cuerpo del mensaje
        $cuerpo = "
        Nombre: $nombre\n
        Correo: $correo\n
        Celular: $celular\n
        Mensaje:\n$mensaje
        ";

        // Encabezados
        $encabezados = "From: $correo\r\n";
        $encabezados .= "Reply-To: $correo\r\n";
        $encabezados .= "X-Mailer: PHP/" . phpversion();

        // Enviar el correo
        if (mail($destinatario, $asunto, $cuerpo, $encabezados)) {
            echo "Correo enviado con éxito.";
        } else {
            echo "Error al enviar el correo.";
        }
    } else {
        echo "Correo inválido.";
    }
}
?>
