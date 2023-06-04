<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        $email = $_POST['email'];
        $codedURL = $_POST['codedURL'];

        $lista=mysqli_query($bd1,"SELECT codedPasswd FROM usuarios WHERE email='$email'");
    
        $resp = null;
    
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }
    
        if(password_verify($resp[0][0], $codedURL)){
            echo true;
        }
        else
            echo false;
    }   
?> 