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

        $url = $_SESSION['rutaGuardada'];
        $datos = parse_url($url);
        parse_str($datos['query'], $output);
        $idJuego = $output['id'];
        echo $idJuego."<br>";

        $lista=mysqli_query($bd1,"SELECT rutaImagen FROM imagensecund WHERE idJuego=$idJuego");

        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        for ($i=0; $i < count($resp); $i++) { 
            unlink($rutaRaiz.$resp[$i][0]);
        }


        $rutaImagen = pathinfo($resp[0][0], PATHINFO_DIRNAME);
        echo $rutaImagen."<br>";

        $nombreImagen = pathinfo($resp[0][0], PATHINFO_FILENAME);
        $nombreImagen = substr($nombreImagen, 0, -1);
        echo $nombreImagen."<br>";

        $extension = pathinfo($resp[0][0], PATHINFO_EXTENSION);
        echo $extension."<br>";

        $imagenes = $_FILES['newImagenes'];

        $bd1->query("DELETE FROM imagensecund WHERE idJuego='$idJuego'");

        for ($i=0; $i < count($imagenes['name']); $i++) { 
            $rutaImagenSec=$rutaImagen."/".$nombreImagen."_img".$i.".".$extension;
            echo $rutaImagenSec."<br>";

            $ruta_destino =$rutaRaiz."/".$rutaImagenSec; // Ruta completa de destino
            echo $ruta_destino."<br>";

            if (move_uploaded_file($imagenes['tmp_name'][$i], $ruta_destino)) {
                // echo 'El video se ha subido correctamente a la carpeta de destino <br>.';
            } else {
                // echo 'Error al subir el archivo.';
            }

            $bd1->query("INSERT into imagensecund (idJuego,rutaImagen) VALUES 
            ('$idJuego',
            '$rutaImagenSec')");
        }
        
        sleep(1);
        unset($_SESSION['rutaGuardada']);
        header('Location: '.$url);

    }   
?>  