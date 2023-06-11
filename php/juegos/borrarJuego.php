<?php
//Realiza conexión con la base de datos, y una vez conectado, elimina todo registro del juego deseado de las tablas en las 
//que se le hace referencia (menos en la tabla "DetalleVenta"), finalizando por eliminarlo de la tabla "Juegos"
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
        $idJuego=$_POST['idJuego'];

        $lista=mysqli_query($bd1,"SELECT miniatura FROM juegos WHERE id=$idJuego");

        $resp = null;
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        $rutaCarpeta = pathinfo($resp[0][0], PATHINFO_DIRNAME);
        // echo $rutaCarpeta;

        if(is_dir($rutaRaiz.$rutaCarpeta)){
            $listaFicheros  = scandir($rutaRaiz.$rutaCarpeta);
            for ($i=0; $i < count($listaFicheros); $i++) { 
                if ($listaFicheros[$i] != "." && $listaFicheros[$i] != "..") {
                    // echo $rutaRaiz.$rutaCarpeta."/".$listaFicheros[$i]."<br>";
                    unlink($rutaRaiz.$rutaCarpeta."/".$listaFicheros[$i]);
                }
            }
        }
        rmdir($rutaRaiz.$rutaCarpeta);

        $bd1->query("DELETE FROM comentarios WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM favoritos WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM juegoscomprados WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM generoporjuego WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM imagensecund WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM juegopordeveloper WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM juegos WHERE id='$idJuego'");
    }   
?>  