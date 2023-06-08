<?php
//Realiza conexión con la base de datos, y una vez conectado:
//  1. Recoge las ruta guardada de la miniatura de la tabla "Juegos" del juego seleccionado. 
//  2. Usando esa ruta, se guarda la nueva minatura en la carpeta del juego y sobreescribe la anterior  
//  3. Tras un segundo de pausa, se redirige a la ruta guardada, y se borra la sesion "RutaGuardada"
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

        $url = $_SESSION['rutaGuardada'];
        $datos = parse_url($url);
        parse_str($datos['query'], $output);
        $idJuego = $output['id'];
        // echo $idJuego."<br>";

        $lista=mysqli_query($bd1,"SELECT miniatura FROM juegos WHERE id=$idJuego");

        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }

        $rutaImagen = $resp[0][0];
        // echo $rutaImagen;

        $imagen = $_FILES['newMiniatura'];

        $ruta_destino =$rutaRaiz.$rutaImagen; // Ruta completa de destino
        
        if (move_uploaded_file($imagen["tmp_name"], $ruta_destino)) {
            echo 'El archivo se ha subido correctamente a la carpeta de destino.';
            sleep(1);
            unset($_SESSION['rutaGuardada']);
            header('Location: '.$url);
        } else {
            echo 'Error al subir el archivo.';
        }
    }   
?>  