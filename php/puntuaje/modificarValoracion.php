<?php
//Realiza conexión con la base de datos, y una vez conectado, se modifica la puntuación y la fecha de publicación de la
//tabla "Puntuaje" del usuario y juego especificado
    session_start();
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";
        $idUser = $_SESSION['idUser'];
        $idJuego = $_POST['idJuego'];
        $puntuacion = $_POST['puntuacion'];

        date_default_timezone_set('UTC');
        $fechaActual = date("d/m/Y");

        // echo $idUser.'--<br>';
        // echo $idJuego.'--<br>';
        // echo $puntuacion.'--<br>';
        // echo $fechaActual.'--<br>';

        $bd1->query("UPDATE puntuaje SET puntuacion='$puntuacion',
                                        fechaPublicacion='$fechaActual' WHERE idUsuario='$idUser' AND idJuego='$idJuego'");
    }   
?>  