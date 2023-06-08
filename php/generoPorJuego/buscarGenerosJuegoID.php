<?php
//Realiza conexion a la base de datos, y una vez conectado:
//  1. Obtiene la id de los géneros asociados a un juego especifico de la tabla "GeneroPorJuego"
//  2. Obtiene la lista completa de los generos registrados en la tabla "Generos"
//  3. Se saca de la lista completa de los generos los resultados cuyas ids coincidan con los deseados, se guardan en un array, y 
    // se devuelve el array resultante
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $id=$_POST['idJuego'];
        
        //Primera llamada, coger las ids de los generos del juego
        $lista=mysqli_query($bd1,"SELECT idGenero FROM generoporjuego WHERE idJuego=$id");

        while ($reg=mysqli_fetch_array($lista))  
        {
          $respIdGeneros[]=$reg;
        }

        //Segunda llamada, coger los generos, y sacar solo los deseados
        $lista=mysqli_query($bd1,"SELECT * FROM genero");

        while ($reg=mysqli_fetch_array($lista))  
        {
          $respGeneros[]=$reg;
        }

        $listaGeneros = [];

        for ($i=0; $i < count($respGeneros); $i++) { 
            for ($j=0; $j < count($respIdGeneros); $j++) { 
                if ($respGeneros[$i][0] == $respIdGeneros[$j][0]) 
                    array_push($listaGeneros, $respGeneros[$i]);
            }
        }

        $cad=json_encode($listaGeneros);
        echo $cad;
    }
?>  