<?php
    session_start();
    
    if(isset($_SESSION["juegosCesta"])){
        $_SESSION["juegosCesta"] = array_values(array_filter($_SESSION["juegosCesta"]));
        $cad=json_encode($_SESSION["juegosCesta"]);
        echo $cad;
    }
?>  