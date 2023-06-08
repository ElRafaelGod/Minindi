<?php
//Realiza conexión con la base de datos, y una vez conectado, se obtiene un listado completo de los usuarios de la tabla "Usuarios"
//en la que el email mandado coincida. Si no hay coincidencias, es que el correo esta libre, y se devuelve un true
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        $email = $_POST['email'];
        // echo $email."<br>";

        $lista=mysqli_query($bd1,"SELECT * FROM usuarios WHERE email='$email'");

        $resp = null;
        // var_dump($lista);
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        $cad=json_encode($resp);
        // echo $cad;

        if($cad == 'null'){
            // echo "No hay coincidencias<br>";
            echo "true";
        }
        else{
            // echo "Si hay coincidencias<br>";
            echo "false";
        }
    }   
?>  