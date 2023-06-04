<?php 
session_start();
if(isset(($_COOKIE['cookiesActivadas'])))
    setcookie("recuerdame", $_SESSION["idUser"], time()+3600);
?>