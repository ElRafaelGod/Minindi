<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $id=$_POST['idJuego'];

        $lista=mysqli_query($bd1,"SELECT fechaSubida FROM juegopordeveloper WHERE idJuego=$id");

        // var_dump($lista);
        $resp = null;
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        echo $resp[0][0];

    }
?>  