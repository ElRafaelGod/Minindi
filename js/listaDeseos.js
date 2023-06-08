var datosJuego = [];
verifyUser();

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado
$(document).ready(function () {
    buscarJuegosDeseados();
});

//Función que verifica que el usuario conectado es considerado valido para visitar la pagina
function verifyUser() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        // console.log(jsonDatos);
        //Si los datos recibidos del usuario conectado son null (no hay una cuenta activa), se redirige a otra página
        if (jsonDatos == null) {
            // console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

//Función que busca los los juegos dque haya dentro de la lista de deseos del usuario activo, busca la informacion de cada juego,
//e imprime los juegos en pantalla
function buscarJuegosDeseados() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, miremos que juegos favoritos tienes")
    //     }
    // }
    xmlhttp.open("POST", "php/favoritos/buscarJuegosDeseosUser.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respuesta = JSON.parse(datos.target.response);
        if(respuesta != null){
            for(i = 0; i < respuesta.length; i++){
                buscarJuego(respuesta[i][1]);
            }
            // console.log(datosJuego);
            cargarJuegos();
        }
        else{
            // console.log("Parece que no hay juegos");
            document.getElementById("noJuegos").removeAttribute("hidden");
        }
    });
    xmlhttp.send();
}

//Función que busca la información del juego mandado, y lo guarda en la lista de juegos a imprimir
function buscarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, cojamos el juego que es")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respJuego = JSON.parse(datos.target.response);
        datosJuego.push(respJuego);
    });
    xmlhttp.send("idJuego="+idJuego);
}

//Función para imprimir los juegos de la lista de deseos en pantalla
function cargarJuegos() {
    var cuerpoListaDeseos =  document.getElementById("cuerpoListaDeseos");

    document.getElementById("noJuegos").hidden = true;

    for (var i = 0; i < datosJuego.length; i++) {
        var contentCuerpoJuegos = '<div style="display: none;" class="col-4 col-md-3 my-3 box'+datosJuego[i][0][0]+'">' +
                                    '<div class="card cardJuego">'+
                                        '<img class="img-fluid" src="'+datosJuego[i][0][6]+'" alt="imagenJuego">'+
                                            '<div class="card-body">'+
                                                '<h5 class="card-title">'+datosJuego[i][0][2]+'</h5>'+
                                                '<a href="detalleJuego.html?id='+datosJuego[i][0][0]+'" class="stretched-link"></a>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>';

        cuerpoListaDeseos.innerHTML += contentCuerpoJuegos;
        setTimeout('fadeInJuego(".box'+datosJuego[i][0][0]+'")', 200);
    }
}

//Función que con jQuery hace aparecer la caja determinada
function fadeInJuego(idCaja) {
    $(idCaja).fadeIn(1000); 
}