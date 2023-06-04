<?php
    function conexion() {
        $bdhost = "localhost";
        $bddatabase = "rafabd";
        $bduser = "rafabd";
        $bdpass = "1234";

        // $bdhost = "localhost";
        // $bddatabase = "u961494587_rafabd";
        // $bduser = "u961494587_rafabd";
        // $bdpass = "hJ1xOhPApds|";
        
        $bd1=new mysqli($bdhost,$bduser,$bdpass,$bddatabase);
        if($bd1){
            // echo "Conexion exitosa<br>";
            return $bd1;
        }
        else{
            echo "No se conecto con exito";
        }
    }
?>