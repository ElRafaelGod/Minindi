<?php
//Recoge la id del juego, y se verifica que se encuentra dentro de la sesion "JuegosCesta"
    session_start();
    
    $idJuego = $_POST['idJuego'];

    foreach ($_SESSION['juegosCesta'] as $key => $value) {
        if ($value == $idJuego) {
            echo true;
        }
    }
?>  