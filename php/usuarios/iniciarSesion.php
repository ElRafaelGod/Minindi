<?php
//Realiza conexión con la base de datos, y una vez conectado:
//  1. Se recoge el correo y la contraseña del usuario en la tabla "Usuarios" con el email especificado
//  2. Si la llamada recibe información, se comprueba si la contraseña mandada y la registrada coinciden.
//  3. Si la comprobación es correcta, se crean la sesion "idUser", que guarda la id del usuario, y "juegosCesta", que guardara
    // las ids de los juegos que se quieran comprar
    session_start();
    
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        $email = $_POST['email'];
        $passwd = $_POST['passwd'];

        $lista=mysqli_query($bd1,"SELECT email,password,id FROM usuarios WHERE email='$email'");

        $resp = null;
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }

        $cad=json_encode($resp);
        // echo $cad;

        if($cad == 'null'){
            // echo "No hay coincidencias<br>";
            echo "false";
        }
        else{
            if (password_verify($passwd, $resp[0][1])) {
                echo "true";
                $_SESSION["idUser"]=$resp[0][2];
                $_SESSION['juegosCesta']=array();
            } else {
                echo 'false';
            }
        }
    }   
?>  