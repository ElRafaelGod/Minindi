<?php 
//Guarda una ruta que se usará para redirigir al usuario a la ruta deseada tras iniciar sesion
session_start();
$_SESSION['rutaGuardada'] = $_POST['ruta'];
?>