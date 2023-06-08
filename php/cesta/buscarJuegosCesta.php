<?php
    //Reordena la sesion de los juegos de cesta para darles keys numericas y evitar repetidos, y devuelve la lista de juegos
    //de la cesta 
    session_start();
    
    if(isset($_SESSION["juegosCesta"])){
        $_SESSION["juegosCesta"] = array_values(array_filter($_SESSION["juegosCesta"]));
        $cad=json_encode($_SESSION["juegosCesta"]);
        echo $cad;
    }
?>  