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
        $idUser = $_SESSION['idUser'];
    
        $lista=mysqli_query($bd1,"SELECT solicitaAscenso FROM usuarios WHERE id='$idUser'");
    
        $resp = null;
    
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        // if($resp == null)
        //     echo false;
        // else
        //     echo true;
    
        $cad=json_encode($resp);
        echo $cad;
    }
?>  