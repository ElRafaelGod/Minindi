<?php
//Realiza conexión con la base de datos, y una vez conectado, modifica la información del genero de la tabla "Genero" cuya id se 
//especifique
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";
        $newNombreGenero=$_POST['newNombreGenero'];
        $newDescripcionGenero=$_POST['newDescripcionGenero'];
        $id=$_POST['idGenero'];

        $bd1->query("UPDATE genero SET nombreGenero='$newNombreGenero',
                                       descripcion='$newDescripcionGenero' WHERE id='$id'");

    }   
?>  