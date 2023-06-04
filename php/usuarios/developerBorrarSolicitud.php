<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";
        $id=$_POST['idUser'];

        // $bd1->query("DELETE FROM solicitudascenso WHERE idUsuario='$id'");
        $bd1->query("UPDATE usuarios SET solicitaAscenso='' WHERE id='$id'");
    }   
?>  