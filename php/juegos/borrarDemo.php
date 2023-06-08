<?php
//Realiza conexión con la base de datos, y una vez conectado, comprueba si hay una demo asociada al juego especificado en la tabla
//"Juegos". De haberlo, elimina la demo de la carpeta, y vacia su ruta guardada en la base de datos
    session_start();

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    require("../rutasArchivos.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";

        $idJuego = $_POST['idJuego'];
        echo $idJuego."<br>";

        $lista=mysqli_query($bd1,"SELECT enlaceDemo FROM juegos WHERE id=$idJuego");

        // var_dump($lista);
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }

        $rutaVideo = $resp[0][0];

        // echo $rutaVideo."<br>";
        if($rutaVideo != ""){
            unlink($rutaRaiz.$resp[0][0]);
            $bd1->query("UPDATE juegos SET enlaceDemo='' WHERE id='$idJuego'");
        }
    }   
?>  