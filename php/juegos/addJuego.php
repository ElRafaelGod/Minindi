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
        // echo "Ha llegado hasta aqui. increible"."<br><br><br>";

        // echo "<pre>";
        // print_r($_POST);
        // echo "</pre> <br>";

        // echo "<pre>";
        // print_r($_FILES);
        // echo "</pre>";

        $tituloJuego=$_POST["tituloJuego"];
        $descripcionJuego=$_POST["descripcionJuego"];
        $ficheroJuego=$_FILES['ficheroJuego'];
        $precio=$_POST["precio"];
        $miniatura=$_FILES["miniatura"];
        $imagenesSecundarias=$_FILES["imagenesSecundarias"];
        $video=$_FILES["video"];
        $demo=$_FILES["demo"];

        if($precio == ""){
            $precio = 0.00;
        }

        $secretKey = '6LcZ4VgkAAAAAJ2aKU8bhx3YXuL4s6LpXh6GCRXL';

        if(isset($_POST['g-recaptcha-response'])){
            // echo "Esta puesto el captcha<br>";
            $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secretKey.'&response='.$_POST['g-recaptcha-response']);
            $responseData = json_decode($verifyResponse);

            if($responseData -> success){

                $lista=mysqli_query($bd1,"SELECT * FROM juegos");
                $resp = null;

                while ($reg=mysqli_fetch_array($lista))  
                {
                  $resp[]=$reg;
                }

                if($resp == null){
                    $numeroJuego = 1;
                    // echo "Numero de juego subido: 0<br>";
                }
                else{
                    $numeroJuego = count($resp)+1;
                    // echo "Numero de juego subido: $numeroJuego<br>";
                }
            
                $id = $_SESSION['idUser'];
                $direccionJuego = $rutaRaiz.$rutaCarpetaJuegos.$tituloJuego."_user$id"."_id$numeroJuego";

                if (mkdir($direccionJuego,0755)) {
                    chmod($direccionJuego, 0755);
                    // echo "creado con éxito <br><br>";
                    //Metiendo el juego en pendientes
                            $extension = pathinfo($_FILES['ficheroJuego']['name'], PATHINFO_EXTENSION);
                            $rutaJuego=$rutaCarpetaJuegos.$tituloJuego."_user$id"."_id$numeroJuego/".$tituloJuego."_id".$id.".".$extension;
                            // echo $rutaJuego."<br><br>";
            
                            $ruta_destino =$direccionJuego."/".$tituloJuego."_id".$id.".".$extension; // Ruta completa de destino
                            // echo $ruta_destino."<br>";
                    
                            if (move_uploaded_file($_FILES['ficheroJuego']['tmp_name'], $ruta_destino)) {
                                // echo 'El fichero se ha subido correctamente a la carpeta de destino <br>.';
                            } else {
                                // echo 'Error al subir el archivo.';
                            }
            
                    //Metiendo la imagen miniatura en pendientes
                            $extension = pathinfo($_FILES['miniatura']['name'], PATHINFO_EXTENSION);
                            $rutaMiniatura=$rutaCarpetaJuegos.$tituloJuego."_user$id"."_id$numeroJuego/".$tituloJuego."_miniatura".$id.".".$extension;
                            // echo $rutaMiniatura."<br><br>";
            
                            $ruta_destino =$direccionJuego."/".$tituloJuego."_miniatura".$id.".".$extension; // Ruta completa de destino
                            // echo $ruta_destino."<br>";
                    
                            if (move_uploaded_file($_FILES['miniatura']['tmp_name'], $ruta_destino)) {
                                // echo 'La miniatura se ha subido correctamente a la carpeta de destino <br>.';
                            } else {
                                // echo 'Error al subir el archivo.';
                            }
            
                    //Metiendo el video (si hay) en pendientes
                            if($video['size'] != 0){
                                $extension = pathinfo($_FILES['video']['name'], PATHINFO_EXTENSION);
                                $rutaVideo=$rutaCarpetaJuegos.$tituloJuego."_user$id"."_id$numeroJuego/".$tituloJuego."_video".$id.".".$extension;
            
                                $ruta_destino =$direccionJuego."/".$tituloJuego."_video".$id.".".$extension; // Ruta completa de destino
                                // echo $ruta_destino."<br>";
                    
                                if (move_uploaded_file($_FILES['video']['tmp_name'], $ruta_destino)) {
                                    // echo 'El video se ha subido correctamente a la carpeta de destino <br>.';
                                } else {
                                    // echo 'Error al subir el archivo.';
                                }
                            }
                            else
                                $rutaVideo = "";
                            // echo $rutaVideo."<br><br>";
            
                    //Metiendo la demo (si hay) en pendientes
                            if($demo['size'] != 0){
                                $extension = pathinfo($_FILES['demo']['name'], PATHINFO_EXTENSION);
                                $rutaDemo=$rutaCarpetaJuegos.$tituloJuego."_user$id"."_id$numeroJuego/".$tituloJuego."_demo".$id.".".$extension;
            
                                $ruta_destino =$direccionJuego."/".$tituloJuego."_demo".$id.".".$extension; // Ruta completa de destino
                                // echo $ruta_destino."<br>";
                    
                                if (move_uploaded_file($_FILES['demo']['tmp_name'], $ruta_destino)) {
                                    // echo 'La demo se ha subido correctamente a la carpeta de destino <br>.';
                                } else {
                                    // echo 'Error al subir el archivo.';
                                }
                            }
                            else
                                $rutaDemo = "";
            
                            // echo $rutaDemo."<br><br>";
            
                            if($bd1->query("INSERT into juegos (idUsuario,nombreJuego,descripcion,precio,enlaceJuego,miniatura,video,enlaceDemo,validado) VALUES 
                            ('$id',
                            '$tituloJuego',
                            '$descripcionJuego',
                            '$precio',
                            '$rutaJuego',
                            '$rutaMiniatura',
                            '$rutaVideo',
                            '$rutaDemo',
                            0)")){
                                //Sacar la ID del juego metiendose, que será el ultimo del usuario
                                $lista=mysqli_query($bd1,"SELECT id FROM juegos WHERE idUsuario='$id'");
                                while ($reg=mysqli_fetch_array($lista))  
                                {
                                  $resp[]=$reg;
                                }
                                    
                                $idJuego = $resp[count($resp) - 1][0];
                        
                                date_default_timezone_set('UTC');
                                $fechaActual = date("d/m/Y");
                        
                                $bd1->query("INSERT into juegopordeveloper (idUsuario,idJuego,fechaSubida) VALUES 
                                ('$id',
                                '$idJuego',
                                '$fechaActual')");
                        
                                $idGenero = $resp[count($resp) - 1];
                        
                                // //Metiendo los generos en la tabla generoporjuego
                                $listaGeneros=mysqli_query($bd1,"SELECT * FROM genero");
                                while ($reg=mysqli_fetch_array($listaGeneros))  
                                {
                                  $respGeneros[]=$reg;
                                }
                        
                                for ($i=0; $i < count($respGeneros); $i++) { 
                                    if(isset($_POST['genero'.$i])){
                                        $idGenero = $_POST['genero'.$i];
                                        // echo "Existe, y además la ID del genero".$i." es ".$_POST['genero'.$i]."<br>";
                                        $bd1->query("INSERT into generoporjuego (idJuego,idGenero) VALUES 
                                        ('$idJuego',
                                        '$idGenero')");
                                    }
                                }
                        
                                // //Metiendo las imagenes secundarias en la tabla imagenesSec
                                for ($i=0; $i < count($imagenesSecundarias['name']); $i++) { 
                                    $extension = pathinfo($_FILES['imagenesSecundarias']['name'][$i], PATHINFO_EXTENSION);
                                    $rutaImagenSec=$rutaCarpetaJuegos.$tituloJuego."_user$id"."_id$numeroJuego/".$tituloJuego."_img".$i.".".$extension;
                        
                                    $ruta_destino =$direccionJuego."/".$tituloJuego."_img".$i.".".$extension; // Ruta completa de destino
                        
                                    if (move_uploaded_file($_FILES['imagenesSecundarias']['tmp_name'][$i], $ruta_destino)) {
                                        // echo 'El video se ha subido correctamente a la carpeta de destino <br>.';
                                    } else {
                                        // echo 'Error al subir el archivo.';
                                    }
                        
                                    $bd1->query("INSERT into imagensecund (idJuego,rutaImagen) VALUES 
                                    ('$idJuego',
                                    '$rutaImagenSec')");
                                }
                                header("Location: ../../index.html");
                                die();
                   }
                }
            }
        } 
    }
