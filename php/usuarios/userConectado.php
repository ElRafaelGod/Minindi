<?php 
//Devuelve true si la sesion "idUser" esta puesta (hay un usuario activo)
    session_start();

    if(isset($_SESSION['idUser']))
        echo true;
    else
        echo false;
?>