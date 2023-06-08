<?php
//Realiza conexión con la base de datos, y una vez conectado, elimina de la tabla "Genero" el genero cuya id se ha especificado
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        // echo "Conexion realizada con exito <br>";
        $id = $_POST['id'];

        $bd1->query("DELETE FROM genero WHERE id='$id'");
    }   
?>  