<?php
    session_start();
    
    $idJuego = $_POST['idJuego'];

    foreach ($_SESSION['juegosCesta'] as $key => $value) {
        if ($value == $idJuego) {
            echo true;
        }
    }
?>  