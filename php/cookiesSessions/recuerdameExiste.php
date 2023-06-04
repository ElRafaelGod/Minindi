<?php 
session_start();
if(isset($_COOKIE['recuerdame'])){
    echo $_COOKIE['recuerdame'];
    $_SESSION["idUser"]=$_COOKIE['recuerdame'];
    $_SESSION['juegosCesta']=array();
}
else
    echo false;

?>