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
        $resp = null;
        if(isset($_SESSION['idUser'])){
            $idJuego = $_POST['idJuego'];
            $idUser = $_SESSION['idUser'];
            $lista=mysqli_query($bd1,"SELECT * FROM puntuaje WHERE idJuego='$idJuego' AND idUsuario='$idUser'");
            
            // $cad = null;
            while ($reg=mysqli_fetch_array($lista))  
            {
              $resp[]=$reg;
            }

            if($resp != null){
                $resp[] = true;
            }

        }
        $cad=json_encode($resp);
        echo $cad;
    }   
?>  