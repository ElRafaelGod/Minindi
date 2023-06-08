<?php
//Realiza conexión con la base de datos, y una vez conectado, se solicita las rutas de las imagenes de la tabla "ImagenSecund" del
//juego especificado, y se devuelve el resultado
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $id=$_POST['idJuego'];

        $lista=mysqli_query($bd1,"SELECT rutaImagen FROM imagensecund WHERE idJuego=$id");

        $resp = null;
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        $cad=json_encode($resp);
        echo $cad;
    }
?>  