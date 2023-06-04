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
        echo "Soy AddUser <br>";

        echo "<pre>";
        print_r($_POST);
        echo "</pre>";

        echo "<pre>";
        print_r($_FILES);
        echo "</pre>";

        $secretKey = '6LcZ4VgkAAAAAJ2aKU8bhx3YXuL4s6LpXh6GCRXL';

        $nombre = $_POST['nombre'];
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password1'];
        $descripcion = $_POST['descripcion'];
        $urlTwitter = $_POST['twitter'];
        $urlFacebook = $_POST['facebook'];
        $urlInstagram = $_POST['instagram'];

        if($_FILES["fotoPerfil"]['name']==''){
            echo "No hay FILE mandado aca <br>";
            $imagen = '';
            $hayImagen = false;
        }
        else{
            echo "Hay un FILE mandado <br>";
            $imagen = $_FILES["fotoPerfil"];
            $hayImagen = true;
            
        }

        $codecPasswd = password_hash($password, PASSWORD_DEFAULT);

        echo "Elemento 1: ".$nombre."<br>";
        echo "Elemento 2: ".$username."<br>";
        echo "Elemento 3: ".$email."<br>";
        echo "Elemento 4: ".$password." = ".$codecPasswd."<br>";
        echo "Elemento 5: ".$descripcion."<br>";
        // echo "Elemento 6: ".$_FILES["fotoPerfil"]['name'].", ademas: ".$imagen['tmp_name']."<br>";
        echo "Elemento 7: ".$urlTwitter."<br>";
        echo "Elemento 8: ".$urlFacebook."<br>";
        echo "Elemento 9: ".$urlInstagram."<br>";
        echo "Hay imagen: ".$hayImagen."<br>";

        if(isset($_POST['g-recaptcha-response'])){
            echo "Esta puesto el captcha<br>";
            $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secretKey.'&response='.$_POST['g-recaptcha-response']);
            $responseData = json_decode($verifyResponse);

            if($responseData -> success){
                echo "Lo logró...<br>";
                if(isset($_POST['adminAdd'])){
                    echo "Lo esta metiendo un admin, redirigiendo a otra parte <br>";
                    if(isset($_POST['esDeveloper']))
                        $esDeveloper = 1;
                    else
                        $esDeveloper = 0;
                        
                    if(isset($_POST['esAdmin']))
                        $esAdmin = 1;
                    else
                        $esAdmin = 0;
                        
                    echo "Elemento 10: ".$esDeveloper."<br>";
                    echo "Elemento 11: ".$esAdmin."<br>";
                        
                    $bd1->query("INSERT into usuarios (email,nombreCompleto,username,password,descripcion,
                                                    userTwitter,userFacebook,userInstagram,esDeveloper,esAdmin) VALUES 
                    ('$email',
                    '$nombre',
                    '$username',
                    '$codecPasswd',
                    '$descripcion',
                    '$urlTwitter',
                    '$urlFacebook',
                    '$urlInstagram',
                    '$esDeveloper',
                    '$esAdmin')");
        
                    if($hayImagen){
                        addImage($imagen,$email);
                    }
                
                    header('Location: ../../adminView.html');
                }
                else{
                    $bd1->query("INSERT into usuarios (email,nombreCompleto,username,password,descripcion,
                                                    userTwitter,userFacebook,userInstagram,esDeveloper,esAdmin) VALUES 
                    ('$email',
                    '$nombre',
                    '$username',
                    '$codecPasswd',
                    '$descripcion',
                    '$urlTwitter',
                    '$urlFacebook',
                    '$urlInstagram',
                    '0',
                    '0')");
        
                    if($hayImagen){
                        addImage($imagen,$email);
                    }
                
                    echo "Lo esta metiendo un user normal, redirigiendo a otra parte";
                    
                    header('Location: ../../registro.html');
                }
            }
        }
    } 
    
    function addImage($imagen,$email){
        require("../rutasArchivos.php");
        $bd1=conexion();
        echo $imagen;
        if(!$bd1){
            die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
        }
        else{
            $lista=mysqli_query($bd1,"SELECT id FROM usuarios WHERE email='$email'");
        
            $resp = null;

            while ($reg=mysqli_fetch_array($lista))  
            {
              $resp[]=$reg;
            }

            $id=$resp[0][0];
            $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
            echo $extension."<br>";

            $nombreImagen="id".$id.".".$extension;
            echo $nombreImagen."<br>";

            $ruta_destino = $rutaRaiz.$rutaImagenUser.$nombreImagen; // Ruta completa de destino
        
            if (move_uploaded_file($imagen["tmp_name"], $ruta_destino)) {
                echo 'El archivo se ha subido correctamente a la carpeta de destino.';
            } else {
                echo 'Error al subir el archivo.';
            }    
            $bd1->query("UPDATE usuarios SET imagenUsuario='$rutaImagenUser$nombreImagen' WHERE id='$id'");
        }
    }
?>  