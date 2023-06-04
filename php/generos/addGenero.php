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
        $nombreGenero = $_POST['nombreGenero'];
        $descripcionGenero = $_POST['descripcionGenero'];
        echo $nombreGenero.'<br>';
        echo $descripcionGenero.'<br>';

        $bd1->query("INSERT into genero (nombreGenero,descripcion) VALUES 
            ('$nombreGenero',
            '$descripcionGenero')");
    }   
?>  