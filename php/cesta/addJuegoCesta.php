<?php
    //Recoge la id del juego a meter, y lo introduce en la sesion "JuegosCesta", para rellenar la cesta del usuario
    session_start();
    
    $idJuego = $_POST['idJuego'];
    $_SESSION["juegosCesta"][]=$idJuego; 
?>  