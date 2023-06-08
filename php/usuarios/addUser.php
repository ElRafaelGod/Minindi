<?php
//Realiza conexión con la base de datos, y una vez conectado:
//  1. Se comprueba si hay una imagen para incluir. Si la hay, posteriormente se incluirá.
//  2. Se asegura que el captcha ha sido aceptado, y si la respuesta es valida, se prosigue con la inclusión del usuario
//  3. Se comprueba si el formulario ha sido mandado desde AdminView. en caso de que si, se comprobarán los valores extras del formulario
//  4. Se introduce al nuevo usuario en la tabla "Usuarios" con los valores seleccionados
//  5. Si hay una imagen de perfil incluida, se llamará a la función que guardará la imagen en la carpeta especificada, y actualiza la
    // la ruta de la foto de perfil del nuevo usuario con la ruta del archivo
//  6. Tras haberse introducido, se redirige al usuario a la pagina designada
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        // echo "Conexion realizada con exito <br>";
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

        if(isset($_POST['g-recaptcha-response'])){
            echo "Esta puesto el captcha<br>";
            $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secretKey.'&response='.$_POST['g-recaptcha-response']);
            $responseData = json_decode($verifyResponse);

            if($responseData -> success){
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
            // echo $extension."<br>";

            $nombreImagen="id".$id.".".$extension;
            // echo $nombreImagen."<br>";

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