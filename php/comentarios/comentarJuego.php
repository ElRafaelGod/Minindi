<?php
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
        $comentario = $_POST['comentario'];

        date_default_timezone_set('Europe/Madrid');
        $fechaActual = date("d-m-Y h:i:s");

        echo $idUser.'--<br>';
        echo $idJuego.'--<br>';
        echo $puntuacion.'--<br>';
        echo $fechaActual.'--<br>';

        $bd1->query("INSERT into comentarios (idUsuario,idJuego,comentario,subidoEn) VALUES 
            ('$idUser',
             '$idJuego',
             '$comentario',
             '$fechaActual')");
    }   
?>  