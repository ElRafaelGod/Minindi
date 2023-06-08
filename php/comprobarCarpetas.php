<?php
//Comprueba si existe las carpetas de almacenaje. De no ser asi, creará las carpetas faltantes
require "rutasArchivos.php";

if(!file_exists("../Storage")){
    // echo "No existe la carpeta Storagess! Creando esa y las de dentro<br>";
    crearCarpeta("../Storage");
    crearCarpeta("../".$rutaImagenUser);
    crearCarpeta("../".$rutaCarpetaJuegos);
}
else{
    // echo "Existe la carpeta Storage <br>";
    if(!file_exists("../".$rutaImagenUser)){
        // echo "No existe la carpeta de imagens perfil! Creandola<br>";
        crearCarpeta("../".$rutaImagenUser);
    }

    if(!file_exists("../".$rutaCarpetaJuegos)){
        // echo "No existe la carpeta de juegos! Creandolo<br>";
        crearCarpeta("../".$rutaCarpetaJuegos);
    }
}

function crearCarpeta($ruta){
    mkdir($ruta);
}
?>