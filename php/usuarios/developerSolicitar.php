<?php
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

        // $bd1->query("INSERT into solicitudascenso (idUsuario) VALUES ('$idUser')");
        $bd1->query("UPDATE usuarios SET solicitaAscenso=1 WHERE id='$idUser'");
    }
?>  