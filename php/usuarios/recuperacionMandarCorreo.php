 <?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    require("../rutasArchivos.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";
        $email = $_POST['email'];
        $codedPasswd = password_hash($email, PASSWORD_DEFAULT);

        $bd1->query("UPDATE usuarios SET codedPasswd='$codedPasswd' WHERE email='$email'");

        $codedURL = password_hash($codedPasswd, PASSWORD_DEFAULT);

        $to = $email;
        $subject = "Recuperación de contraseña";
        $message = "¡Hola! <br> Vemos que has perdido tu contraseña, asi que te mandamos un enlace para que puedas cambiar tu contraseña.
                    Para ello, haz click en 
                    <a href='http://$urlEmail/cambiarPasswd.html?email=".$email."&codedURL=".$codedURL."'>este enlace.</a>";
        $headers = "From: ".$mandadorEmail."\r\n";
        $headers .= "Content-type: text/html\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo "El correo ha sido enviado correctamente.";
        } else {
            echo "Error al enviar el correo.";
        }
    }   
?> 