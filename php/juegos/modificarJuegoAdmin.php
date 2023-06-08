<?php
//Realiza conexión con la base de datos, y una vez conectado, modifica los campos especificos del juego referenciado en la tabla "Juegos"
    session_start();

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        // echo "Conexion realizada con exito <br>";
        $id=$_POST['idJuego'];
        $titulo=$_POST['titulo'];
        $descripcion=$_POST['descripcion'];
        $precio=$_POST['precio'];
        $validado=$_POST['validado'];

        $bd1->query("UPDATE juegos SET nombreJuego='$titulo', 
                                       descripcion='$descripcion',
                                       precio='$precio',
                                       validado='$validado' WHERE id='$id'");

    }   
?>  