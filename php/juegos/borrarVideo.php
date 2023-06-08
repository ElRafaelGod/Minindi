<?php
//Realiza conexión con la base de datos, y una vez conectado, comprueba si hay un video asociado al juego especificado en la tabla
//"Juegos". De haberlo, elimina el video de la carpeta, y vacia su ruta guardada en la base de datos
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

        $rutaDemo = $resp[0][0];

        // echo $rutaDemo."<br>";
        if($rutaDemo != ""){
            unlink($rutaRaiz.$resp[0][0]);
            $bd1->query("UPDATE juegos SET video='' WHERE id='$idJuego'");    
        }
    }   
?>  