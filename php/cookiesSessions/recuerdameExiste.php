<?php 
//Si existe la página "Recuerdame", coloca la id en la sesion "idUser", iniciando la sesion del usuario, y crea la sesion
//"juegoCesta", donde guardará los juegos que se deseen comprar
session_start();
if(isset($_COOKIE['recuerdame'])){
    echo $_COOKIE['recuerdame'];
    $_SESSION["idUser"]=$_COOKIE['recuerdame'];
    $_SESSION['juegosCesta']=array();
}
else
    echo false;

?>