<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        
        $lista=mysqli_query($bd1,"SELECT * FROM genero");

        $resp = null;

        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }

        $cad=json_encode($resp);
        echo $cad;
    }
?>  