<?php
//Llama a la base de datos, y una vez conectado:
//  -Crea una venta que inserta en la tabla "Ventas", junto a la id del usuario y el precioTotal
//  -Recoge la id de la nueva venta, para poder guardar correctamente los detalles de la venta
//  -Recoge todos los juegos de la lista de favoritos del usuario activo, con el fin de retirar los juegos que se vayan a comprar y figuren
//  -En bucle, se van introduciendo cada juego en "DetalleCompra" junto a la id de la venta, y en "JuegosComprados" junto a la
    //id del usuario de la venta, y se va eliminando cada juego de "Favoritos" que coincida con el juego comprado
//  -Por ultimo, se vacia la sesion de "JuegosComprados", de "PrecioTotal", y de "JuegosCesta"
    session_start();
    require("../conexion.php");
    $bd1=conexion();

    if(!$bd1){
        die("No ha podido conectarse con la base de datos: ".mysqli_connect_error());
    }
    else{
        // echo "Conexion realizada con exito <br>";
        $idUser = $_SESSION['idUser'];
        $precioTotal = $_SESSION['precioTotal'];

        date_default_timezone_set('UTC');
        $fechaActual = date("d/m/Y");

        //Metemos el hecho de que se ha hecho una venta
        $bd1->query("INSERT into ventas (idUsuario,fecha,precioTotal) VALUES 
            ('$idUser',
            '$fechaActual',
            '$precioTotal')");

        //Sacamos la id de lo que es esta venta
        $lista=mysqli_query($bd1," SELECT id FROM ventas WHERE idUsuario='$idUser' ORDER BY id DESC LIMIT 1");
        while ($reg=mysqli_fetch_array($lista))  
        {
          $resp[]=$reg;
        }
        $idVenta=$resp[0][0];

        //Sacamos la lista de juegos en favoritos, para que si alguno de los juegos favoritos es comprado, se quite de favoritos
        $lista2 = null;
        $lista2=mysqli_query($bd1," SELECT idJuego FROM favoritos WHERE idUsuario='$idUser'");
        while ($reg=mysqli_fetch_array($lista2))  
        {
          $juegosFav[]=$reg;
        }

        //Metemos los juegos realizados en el detalleVenta, junto con la id del pedido especifico, y despues es eliminado de la lista
        foreach ($_SESSION['juegosComprar'] as $key => $idJuego) {
            $bd1->query("INSERT into detalleventa (idJuego,idVenta) VALUES 
                    ('$idJuego',
                    '$idVenta')");
            $bd1->query("INSERT into juegoscomprados (idUsuario,idJuego) VALUES 
                    ('$idUser',
                    '$idJuego')");

            if($juegosFav != null){
                for ($i=0; $i < count($juegosFav); $i++) { 
                    if($idJuego == $juegosFav[$i][0])
                        $bd1->query("DELETE FROM favoritos WHERE idUsuario='$idUser' AND idJuego='$idJuego'");
                }
            }
        }

        foreach ($_SESSION['juegosCesta'] as $key => $idJuego) {
            unset($_SESSION['juegosCesta'][$key]);
        }

        unset($_SESSION['juegosComprar']);
        unset($_SESSION['precioTotal']);
    } 
?>