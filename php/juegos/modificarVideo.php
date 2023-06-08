<?php
//Realiza conexión con la base de datos, y una vez conectado:
//  1. Recoge la ruta guardada del video de la tabla "Juegos". Si no tiene una ruta guardada, genera una nueva.
//  2. Se coloca el nuevo video en la carpeta del juego, y se actualiza la ruta nueva en la tabla del juego especificado
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

        $lista=mysqli_query($bd1,"SELECT video FROM juegos WHERE id=$idJuego");

        // var_dump($lista);
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        $video = $_FILES['newVideo'];

        $rutaVideo = $resp[0][0];
        // echo "--".$rutaVideo."--<br>";
        if ($rutaVideo == "") {
            // echo "-- No hay video de antes --<br>";
            $lista2=mysqli_query($bd1,"SELECT miniatura,nombreJuego FROM juegos WHERE id=$idJuego");

            // var_dump($lista);
            while ($reg=mysqli_fetch_array($lista2))  
            {
              $resp2[]=$reg;
            }

            $rutaVideo = pathinfo($resp2[0][0], PATHINFO_DIRNAME)."/".$resp2[0][1]."_video".$idJuego.".".pathinfo($video['name'], PATHINFO_EXTENSION);
        }
        // echo "--".$rutaVideo."--<br>";

        $ruta_destino =$rutaRaiz.$rutaVideo;// Ruta completa de destino
        
        // echo $ruta_destino."<br>";
        
        if (move_uploaded_file($video["tmp_name"], $ruta_destino)) {
            echo 'El archivo se ha subido correctamente a la carpeta de destino.';
            $bd1->query("UPDATE juegos SET video='$rutaVideo' WHERE id='$idJuego'");
        } else {
            echo 'Error al subir el archivo.';
        }

        sleep(1);
        unset($_SESSION['rutaGuardada']);
        header('Location: '.$url);
    }   
?>  