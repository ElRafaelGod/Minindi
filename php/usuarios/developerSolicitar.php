<?php
//Realiza conexión con la base de datos, y una vez conectado, registra la solicitud de ascenso realizado por el usuario activo en la
//tabla "Usuarios"
    session_start();

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        $idUser = $_SESSION['idUser'];

        $bd1->query("UPDATE usuarios SET solicitaAscenso=1 WHERE id='$idUser'");
    }
?>  