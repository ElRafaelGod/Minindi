<?php
//Realiza conexión con la base de datos, y una vez conectado, se hace una comprobación de si el usuario activo ha mandado 
//una solicitu de ascenso, y se devuelve el resultado de la llamada
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
    
        $cad=json_encode($resp);
        echo $cad;
    }
?>  