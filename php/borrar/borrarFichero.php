<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    require("../conexionFTP.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $rutaFichero=$_POST['rutaFichero'];
        echo $rutaFichero."---------------";
        if($rutaFichero != '') {
            $nombreFichero = pathinfo($rutaFichero, PATHINFO_BASENAME);
            echo $nombreFichero."---------------";
            if($rutaTemporal != ""){
                $rutaBorrar = $rutaTemporal.$nombreFichero;
                echo $rutaBorrar;
                unlink($rutaBorrar);
            }
        }
    }
?>  