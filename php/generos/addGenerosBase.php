<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";

        $bd1->query("INSERT into genero (nombreGenero,descripcion) VALUES 
            ('Accion',
            'Requieren que el jugador haga uso de sus reflejos, puntería y habilidad, a menudo en un contexto de combate o de superación de obstáculos y peligros.')");

        $bd1->query("INSERT into genero (nombreGenero,descripcion) VALUES 
            ('Disparos',
            'El protagonista hace un uso continuo de armas de fuego para abrirse paso en el juego.')");

        $bd1->query("INSERT into genero (nombreGenero,descripcion) VALUES 
            ('Estrategia',
            'Se caracterizan por la necesidad de manipular a un numeroso grupo de personajes, objetos o datos, haciendo uso de la inteligencia y la planificación, para lograr los objetivos.')");

        $bd1->query("INSERT into genero (nombreGenero,descripcion) VALUES 
            ('Deporte',
            'Son aquellos que simulan deportes del mundo real.')");

        $bd1->query("INSERT into genero (nombreGenero,descripcion) VALUES 
            ('Carreras',
            'Sitúan al jugador en un recorrido en el que debe llegar a una meta antes que sus contrincantes o dentro de un tiempo límite.')");

        $bd1->query("INSERT into genero (nombreGenero,descripcion) VALUES 
            ('Aventura',
            'Son videojuegos en los que el protagonista debe avanzar en la trama interactuando con diversos personajes y objetos.')");
    }   
?>  