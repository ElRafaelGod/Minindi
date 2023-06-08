<?php
//Realiza conexión con la base de datos, y una vez conectado:
//  1. Genera una nueva ruta de guardado para la nueva imagen de usuario.
//  2. Guarda la nueva imagen en la carpeta designada, y reescribe la anterior (si la hubiese)
//  3. Actualiza la ruta guardada en la informacion del usuario en la tabla "Usuarios"
//  4. Un segundo despues, redirige al usuario a la pagina seleccionada
    session_start();

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    require("../rutasArchivos.php");

    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        // echo "Conexion realizada con exito <br>";
        $imagen = $_FILES['newImagen'];
        $id=$_SESSION['idUser'];

        $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
        // echo $extension."<br>";

        $nombreImagen="id".$id.".".$extension;
        // echo $nombreImagen."<br>";
        
        $ruta_destino =$rutaRaiz.$rutaImagenUser.$nombreImagen; // Ruta completa de destino
        // echo $imagen["tmp_name"]."<br>";
        // echo $ruta_destino."<br>";
        
        if (move_uploaded_file($imagen["tmp_name"], $ruta_destino)) {
            echo 'El archivo se ha subido correctamente a la carpeta de destino.';
            $bd1->query("UPDATE usuarios SET imagenUsuario='$rutaImagenUser$nombreImagen' WHERE id='$id'");
            sleep(1);
            header('Location: ../../configuracion.html');
        } else {
            echo 'Error al subir el archivo.';
        }
    }   
?>  