<?php
//Realiza conexión con la base de datos, y una vez conectado, busca todos los registros de la tabla "GeneroPorJuego"
//del juego especificado, y lo devuelve
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $idJuego = $_POST['idJuego'];

        $lista=mysqli_query($bd1,"SELECT * FROM generoporjuego WHERE idJuego=$idJuego");

        // var_dump($lista);
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }

        $cad=json_encode($resp);
        echo $cad;
    }
?>  