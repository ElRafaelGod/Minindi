<?php 
session_start();
if(isset($_SESSION)){
    echo "Se ha encontrado una sesion: <br>";
    echo "<pre>";
    print_r($_SESSION);
    echo "</pre><br>";
}
else
    echo "No se ha encontrado ninguna sesion<br>";

echo "<hr>";

if(isset($_COOKIE)){
    echo "Se ha encontrado unas ricas cookies: <br>";
    echo "<pre>";
    print_r($_COOKIE);
    echo "</pre><br>";
}
else
    echo "No se ha encontrado ninguna deliciosa cookie :(<br>";


?>