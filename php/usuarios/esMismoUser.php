<?php 
    session_start();
    
    $idUser=$_SESSION['idUser'];
    $idExterna=$_POST['idExterna'];
    
    if($idExterna == $idUser)
        echo true;
    else
        echo false;
    
?>