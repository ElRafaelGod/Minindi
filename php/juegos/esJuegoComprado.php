<?php
//Realiza conexión con la base de datos, y una vez conectado, recoge la información de la tabla "JuegosComprados" del juego
//deseado y asociado al usuario activo. Si hay contenido en la llamada, el juego ha sido comprado por el usuario, y devuelve un true
    session_start();

    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $idUser = $_SESSION['idUser'];
        $idJuego = $_POST['idJuego'];

        $lista=mysqli_query($bd1,"SELECT * FROM juegoscomprados WHERE idUsuario=$idUser AND idJuego=$idJuego" );

        // var_dump($lista);
        $resp = null;
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        if($resp == null)
            echo false;
        else
            echo true;

    }
?>  