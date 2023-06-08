<?php
//Realiza conexion a la base de datos, y una vez conectado:
//  1. Se guardan las ids de los generos deseados mandados
//  2. Se obtienen todos los resultados de la tabla "GeneroPorJuego"
//  3. Se buscan y guardan las ids de los juegos cuyas ids de generos coincidan con las buscadas, y se devuelve el resultado
    header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }

    else{
        $listaGenerosFiltrados = [];
        foreach ($_POST as $key => $value) {
            $listaGenerosFiltrados[] = $value;
        }
        
        $lista=mysqli_query($bd1,"SELECT * FROM generoporjuego");

        $respGenerosPorJuego = null;
        while ($reg=mysqli_fetch_array($lista))  
        {
          $respGenerosPorJuego[]=$reg;
        }

        $listaIdJuegos = [];
        for ($i=0; $i < count($listaGenerosFiltrados); $i++) { 
            for ($j=0; $j < count($respGenerosPorJuego); $j++) { 
                if ($listaGenerosFiltrados[$i][0] == $respGenerosPorJuego[$j][1]) {
                    $listaIdJuegos[] = $respGenerosPorJuego[$j][0];
                }
            }
        }
        $resultado = array_unique($listaIdJuegos);
        sort($resultado);

        $cad=json_encode($resultado);
        echo $cad;
    }
?>  