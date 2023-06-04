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
        $id=$_POST['id'];
        $nombre = $_POST['nombre'];
        $username = $_POST['username'];
        $email = $_POST['email'];
        // $password = $_POST['password1'];
        $descripcion = $_POST['descripcion'];
        $enlaceTwitter = $_POST['enlaceTwitter'];
        $enlaceFacebook = $_POST['enlaceFacebook'];
        $enlaceInstagram = $_POST['enlaceInstagram'];
        $esDeveloper = $_POST['esDeveloper'];
        $esAdmin = $_POST['esAdmin'];

        $bd1->query("UPDATE usuarios SET nombreCompleto='$nombre',
                                         username='$username',
                                         descripcion='$descripcion',
                                         userTwitter='$enlaceTwitter',
                                         userFacebook='$enlaceFacebook',
                                         userInstagram='$enlaceInstagram',
                                         esDeveloper='$esDeveloper',
                                         esAdmin='$esAdmin' WHERE id='$id'");
                                         

    }   
?>  