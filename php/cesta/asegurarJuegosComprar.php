<?php
    session_start();
    
    $idJuego = $_POST['idJuego'];
    $precioTotal = $_POST['precioTotal'];
    $_SESSION["juegosComprar"][]=$idJuego; 
    $_SESSION["precioTotal"]=$precioTotal; 
?>  