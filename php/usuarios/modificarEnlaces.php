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
        echo "Conexion realizada con exito <br>";
        $enlaceTwitter=$_POST['enlaceTwitter'];
        $enlaceFacebook=$_POST['enlaceFacebook'];
        $enlaceInstagram=$_POST['enlaceInstagram'];
        $id=$_SESSION['idUser'];

        $bd1->query("UPDATE usuarios SET userTwitter='$enlaceTwitter',
                                         userFacebook='$enlaceFacebook',
                                         userInstagram='$enlaceInstagram' WHERE id='$id'");

    }   
?>  