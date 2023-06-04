<?php 
    session_start();
    
    $_SESSION = array();
    session_destroy();
    echo "Todo es borrado con exito";
?>