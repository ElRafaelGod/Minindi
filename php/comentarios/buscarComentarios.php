<?php
//Se hace conexión con la base de datos, y una vez conectado, hace una llamada a todos los comentarios del juego especificado, 
//y los devuelve
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $idJuego = $_POST["idJuego"];
        $lista=mysqli_query($bd1,"SELECT * FROM comentarios WHERE idJuego='$idJuego'");

        $resp = null;

        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }
        
        $cad=json_encode($resp);
        echo $cad;
    } 
?>  