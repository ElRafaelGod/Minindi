<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../rutasArchivos.php");
    
    $rutaJuego=$_POST['rutaJuego'];

    $nombreFichero = pathinfo($rutaJuego, PATHINFO_BASENAME);
    echo $nombreFichero;
?>  