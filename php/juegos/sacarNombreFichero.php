<?php
//De la ruta completa del archivo que se le pasa, se devuelve unicamente el nombre del archivo
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    
    $rutaArchivo=$_POST['rutaArchivo'];

    $nombreFichero = pathinfo($rutaArchivo, PATHINFO_BASENAME);
    echo $nombreFichero;
?>  