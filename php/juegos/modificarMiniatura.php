<?php
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
        echo "Conexion realizada con exito <br>";
        // $newImage=$_POST['datos'];

        $url = $_SESSION['rutaGuardada'];
        $datos = parse_url($url);
        parse_str($datos['query'], $output);
        $idJuego = $output['id'];
        echo $idJuego."<br>";

        $lista=mysqli_query($bd1,"SELECT miniatura FROM juegos WHERE id=$idJuego");

        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }

        $rutaImagen = $resp[0][0];
        echo $rutaImagen;

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