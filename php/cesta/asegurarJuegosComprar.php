<?php
    //Recoge la id del juego a meter, el precio total de la venta, e introduce la id del juego en la sesion de "juegosComprar", 
    //que se usará cuando se compren los juegos
    session_start();
    
    $idJuego = $_POST['idJuego'];
    $precioTotal = $_POST['precioTotal'];

    $_SESSION["juegosComprar"][]=$idJuego; 
    $_SESSION["precioTotal"]=$precioTotal; 
?>  