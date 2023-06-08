<?php 
//Se destruyen todas las sesiones activas de la página
    session_start();
    
    $_SESSION = array();
    session_destroy();
    echo "Todo es borrado con exito";
?>