<?php
//Realiza conexión con la base de datos, y una vez conectado, modifica la descripicion del juego asociado en la tabla "Juegos"
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
        $newDescripcion=$_POST['datos'];
        $id=$_POST['idJuego'];

        $bd1->query("UPDATE juegos SET descripcion='$newDescripcion' WHERE id='$id'");

    }   
?>  