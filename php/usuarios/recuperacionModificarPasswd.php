<?php
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";
        $newPasswd=password_hash($_POST['passwd'], PASSWORD_DEFAULT);
        $email=$_POST['email'];
        
        $bd1->query("UPDATE usuarios SET password='$newPasswd',codedPasswd='' WHERE email='$email'");
    }   
?>  