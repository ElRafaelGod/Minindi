<?php
    session_start();

    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    require("../rutasArchivos.php");

    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        echo "Conexion realizada con exito <br>";
        // $newImage=$_POST['datos'];
        
        // echo "<pre>";
        // print_r($_FILES);
        // echo "</pre>";

        // echo "<pre>";
        // print_r($_POST);
        // echo "</pre>";

        // echo "<pre>";
        // print_r($_SESSION);
        // echo "</pre>";

        $url = $_SESSION['rutaGuardada'];
        $datos = parse_url($url);
        parse_str($datos['query'], $output);
        $idJuego = $output['id'];
        echo $idJuego."<br>";

        $lista=mysqli_query($bd1,"SELECT enlaceDemo FROM juegos WHERE id=$idJuego");

        // var_dump($lista);
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;

        }

        $demo = $_FILES['addDemo'];


        $rutaDemo = $resp[0][0];
        echo "--".$rutaDemo."--<br>";
        if ($rutaDemo == "") {
            echo "-- No hay video de antes --<br>";
            $lista2=mysqli_query($bd1,"SELECT miniatura,nombreJuego FROM juegos WHERE id=$idJuego");

            // var_dump($lista);
            while ($reg=mysqli_fetch_array($lista2))  
            {
              $resp2[]=$reg;
            }

            $rutaDemo = pathinfo($resp2[0][0], PATHINFO_DIRNAME)."/".$resp2[0][1]."_demo".$idJuego.".".pathinfo($demo['name'], PATHINFO_EXTENSION);
        }
        echo "--".$rutaDemo."--<br>";

        $ruta_destino =$rutaRaiz.$rutaDemo;// Ruta completa de destino
        
        echo $ruta_destino."<br>";
        
        if (move_uploaded_file($demo["tmp_name"], $ruta_destino)) {
            echo 'El archivo se ha subido correctamente a la carpeta de destino.';
            $bd1->query("UPDATE juegos SET enlaceDemo='$rutaDemo' WHERE id='$idJuego'");
        } else {
            echo 'Error al subir el archivo.';
        }

        sleep(1);
        unset($_SESSION['rutaGuardada']);
        header('Location: '.$url);


        // $bd1->query("UPDATE juegos SET enlaceDemo='$rutaDemo' WHERE id='$idJuego'");

        // if($hftp = ftp_connect($ftp_server)){
        //     if(ftp_login($hftp, $ftp_user, $ftp_passwd)){
		// 		if(!ftp_put($hftp,$rutaDemo,$video["tmp_name"])){
		// 			echo "<p style='color: red'>Error al Establecer el Fichero</p>";
		// 		}
		// 		if(!ftp_close($hftp)) echo "<p style='color: red'>Error al Cerrar la Conexión</p>";
		// 	} else {
		// 		echo "<p style='color: red'>Error al Logear el Usuario</p>";
		// 		exit(); 
		// 	}
		// } 
        // else 
        //     echo "<p style='color: red'>Error al Establecer la Conexión</p>";

        // unset($_SESSION['rutaGuardada']);
        // header('Location: '.$url);
    }   
?>  