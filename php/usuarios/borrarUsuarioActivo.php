<?php
//Realiza conexión con la base de datos, y una vez conectado, se elimina al usuario conectado de la tabla "Usuarios"
    session_start();

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");

    $bd1=conexion();
    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        // echo "Conexion realizada con exito <br>";
        $id = $_SESSION['idUser'];

        $bd1->query("DELETE FROM comentarios WHERE idUsuario='$id'");
        $bd1->query("DELETE FROM favoritos WHERE idUsuario='$id'");
        $bd1->query("DELETE FROM juegopordeveloper WHERE idUsuario='$id'");
        $bd1->query("DELETE FROM juegoscomprados WHERE idUsuario='$id'");
        $bd1->query("DELETE FROM puntuaje WHERE idUsuario='$id'");
        $bd1->query("DELETE FROM ventas WHERE idUsuario='$id'");

        $bd1->query("DELETE FROM usuarios WHERE id='$id'");
    }   
?>  