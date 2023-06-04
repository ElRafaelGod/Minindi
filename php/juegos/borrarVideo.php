<?php
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

        $lista=mysqli_query($bd1,"SELECT video FROM juegos WHERE id=$idJuego");

        // var_dump($lista);
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }

        $rutaVideo = $resp[0][0];

        echo $rutaVideo."<br>";
        if($rutaVideo == ""){
            echo "No hay video puesto";
        }
        else{
            echo "SI hay un video puesto. Ole";
            unlink($rutaRaiz.$resp[0][0]);
            $bd1->query("UPDATE juegos SET video='' WHERE id='$idJuego'");    
        }
    }   
?>  