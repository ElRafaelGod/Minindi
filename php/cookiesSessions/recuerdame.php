<?php 
//Si han sido aceptadas las cookies de la página, coloca la cookie "Recuerdame".
session_start();
if(isset(($_COOKIE['cookiesActivadas'])))
    setcookie("recuerdame", $_SESSION["idUser"], time()+3600);
?>