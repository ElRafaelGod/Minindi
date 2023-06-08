<?php 
//Si han sido aceptadas las cookies de la pagina, se devuelve una respuesta "true", sino, una false
if(isset(($_COOKIE['cookiesActivadas'])))
    echo $_COOKIE['cookiesActivadas'];
else
    return false;
?>