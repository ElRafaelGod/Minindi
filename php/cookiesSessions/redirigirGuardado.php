<?php 
//Si existe la sesion "RutaGuardada", imprime y devuelve la ruta guardada para redirigir al usuario, y elimina la sesion
    session_start();
    if(isset($_SESSION['rutaGuardada'])){
        echo $_SESSION['rutaGuardada'];
        unset($_SESSION['rutaGuardada']);
    }
    else
        echo false;
?>