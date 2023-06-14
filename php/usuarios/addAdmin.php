<?php
//Realiza conexión con la base de datos, y una vez conectado, introduce en la tabla "Usuarios" unos usuarios predeterminados
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";

        $passwd = password_hash("Rafamar227", PASSWORD_DEFAULT);
        $bd1->query("INSERT into usuarios (email,nombreCompleto,username,password,esDeveloper,esAdmin) VALUES 
            ('rafaelmartinezpage@gmail.com',
            'Administrador',
            'admin',
            '$passwd',
            '1',
            '1')");

        $passwd = password_hash("123456", PASSWORD_DEFAULT);        
        $bd1->query("INSERT into usuarios (email,nombreCompleto,username,password,esDeveloper,esAdmin) VALUES 
            ('rafaelmartinezpage2@gmail.com',
            'Desarrollador',
            'developer',
            '$passwd',
            '1',
            '0')");

        $passwd = password_hash("123456", PASSWORD_DEFAULT);
        $bd1->query("INSERT into usuarios (email,nombreCompleto,username,password,esDeveloper,esAdmin) VALUES 
            ('rafaelmartinezpage3@gmail.com',
            'Usuario',
            'user',
            '$passwd',
            '0',
            '0')");
    }   
?>  