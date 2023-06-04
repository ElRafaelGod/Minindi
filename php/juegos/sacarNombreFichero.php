<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../rutasArchivos.php");
    
    $rutaArchivo=$_POST['rutaArchivo'];

    $nombreFichero = pathinfo($rutaArchivo, PATHINFO_BASENAME);
    echo $nombreFichero;

    // $rutaTemporalImagen = $rutaTemporal.$nombreFichero;
?>  