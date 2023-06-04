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
        $email = $_POST['email'];
        $passwd = $_POST['passwd'];
        // $recuerdame = $_POST['recuerdame'];
        // echo $email."<br>";
        // echo $passwd."<br>";

        $lista=mysqli_query($bd1,"SELECT email,password,id FROM usuarios WHERE email='$email'");

        // var_dump($lista);
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
            // echo "Cadena 0: ".$resp[0][0]."<br>";
            // echo "Cadena 1: ".$resp[0][1]."<br>";
            // echo "Cadena 2: ".$resp[0][2]."<br>";
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