<?php
    session_start();
    
    $idJuego = $_POST['idJuego'];
    $_SESSION["juegosCesta"][]=$idJuego; 
?>  