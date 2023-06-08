<?php
//Se hace conexión con la base de datos, y una vez conectado, se elimina de la tabla "Favoritos" el juego especificado del 
//usuario especificado
    session_start();
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";

        $idUser = $_SESSION['idUser'];
        $idJuego = $_POST['idJuego'];
        // echo $idUser.'--<br>';
        // echo $idJuego.'--<br>';

        $bd1->query("DELETE FROM favoritos WHERE idUsuario='$idUser' AND idJuego='$idJuego'");
    }   
?>  