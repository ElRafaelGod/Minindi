<?php
//Realiza conexión con la base de datos, y una vez conectado, busca el nombre del genero especificado en la tabla "Genero"
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $idGenero = $_POST['idGenero'];
        $lista=mysqli_query($bd1,"SELECT nombreGenero FROM genero WHERE id=$idGenero");

        $resp = null;

        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }

        echo $resp[0][0];
    }
?>  