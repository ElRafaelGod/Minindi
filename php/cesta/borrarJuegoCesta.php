<?php
    //Recoge la id del juego a eliminar, y lo retira de la sesión de la cesta del usuario, quitandolo de la cesta
    session_start();
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $idJuego = $_POST['idJuego'];
    foreach ($_SESSION['juegosCesta'] as $key => $value) {
        if ($value == $idJuego) {
            unset($_SESSION['juegosCesta'][$key]);
        }
    }
?>  