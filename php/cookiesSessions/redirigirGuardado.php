<?php 
    session_start();
    if(isset($_SESSION['rutaGuardada'])){
        echo $_SESSION['rutaGuardada'];
        unset($_SESSION['rutaGuardada']);
    }
    else
        echo false;
?>