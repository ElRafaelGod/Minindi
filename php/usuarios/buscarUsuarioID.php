<?php
//Realiza conexión con la base de datos, y una vez conectado, devuelve la informacion completa de la tabla "Usuarios" del usuario
//cuya id se manda
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        $id = $_POST['id'];
        // echo $email."<br>";

        $lista=mysqli_query($bd1,"SELECT * FROM usuarios WHERE id='$id'");

        $resp = null;
        // var_dump($lista);
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        $cad=json_encode($resp);
        echo $cad;
    }   
?>  