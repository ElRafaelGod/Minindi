<?php
    function conexion() {
        $bdhost = "localhost";
        $bddatabase = "rafabd";
        $bduser = "rafabd";
        $bdpass = "1234";

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