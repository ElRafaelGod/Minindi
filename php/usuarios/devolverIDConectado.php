<?php
//Devuelve la id guardada en la sesion "IdUser"
    session_start();
    echo $_SESSION['idUser'];
?>