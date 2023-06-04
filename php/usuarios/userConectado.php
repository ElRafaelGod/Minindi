<?php 
    session_start();

    if(isset($_SESSION['idUser']))
        echo true;
    else
        echo false;
?>