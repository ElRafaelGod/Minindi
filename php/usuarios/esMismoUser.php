<?php 
//Se realiza la comprobación de si la id externa recibida es la misma que la id del user activo. Si lo es, se devuelve un true
    session_start();
    
    $idUser=$_SESSION['idUser'];
    $idExterna=$_POST['idExterna'];
    
    if($idExterna == $idUser)
        echo true;
    else
        echo false;
    
?>