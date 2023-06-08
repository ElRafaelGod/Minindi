<?php
//Realiza conexión con la base de datos, y una vez conectado, elimina todo registro del juego deseado de las tablas en las 
//que se le hace referencia (menos en la tabla "DetalleVenta"), finalizando por eliminarlo de la tabla "Juegos"
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";
        $idJuego=$_POST['idJuego'];

        $bd1->query("DELETE FROM comentarios WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM favoritos WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM juegoscomprados WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM generoporjuego WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM imagensecund WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM juegopordeveloper WHERE idJuego='$idJuego'");
        $bd1->query("DELETE FROM juegos WHERE id='$idJuego'");
    }   
?>  