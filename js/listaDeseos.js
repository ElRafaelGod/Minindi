// var listaJuegos;
var datosJuego = [];
verifyUser();

$(document).ready(function () {
    buscarJuegosDeseados();
});

function verifyUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien")
        }
    }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        console.log(jsonDatos);
        if (jsonDatos == null) {
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "registro.html";
        }
        else {
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

function buscarJuegosDeseados() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien, miremos que juegos favoritos tienes")
        }
    }
    xmlhttp.open("POST", "php/favoritos/buscarJuegosDeseosUser.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respuesta = JSON.parse(datos.target.response);
        if(respuesta != null){
            for(i = 0; i < respuesta.length; i++){
                buscarJuego(respuesta[i][1]);
            }
            console.log(datosJuego);
            cargarJuegos();
        }
        else{
            console.log("Parece que no hay juegos");
            document.getElementById("noJuegos").removeAttribute("hidden");
        }
    });
    xmlhttp.send();
}

function buscarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien, cojamos el juego que es")
        }
    }
    xmlhttp.open("POST", "php/juegos/buscarJuegosID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respJuego = JSON.parse(datos.target.response);
        datosJuego.push(respJuego);
    });
    xmlhttp.send("idJuego="+idJuego);
}

function cargarJuegos() {
    var cuerpoListaDeseos =  document.getElementById("cuerpoListaDeseos");
    var rutaTemporal;

    document.getElementById("noJuegos").hidden = true;

    console.log(datosJuego.length);
    if(datosJuego.length > 9){
        console.log("Hay suficientes juegos para rellenar");
        document.getElementById("footer").classList.remove("fixed-bottom");
    }

    for (var i = 0; i < datosJuego.length; i++) {
        // rutaTemporal = "/ArchivosTemporales/"+colocarMiniatura(datosJuego[i][0][0], datosJuego[i][0][6]);
        // console.log("Ruta: "+rutaTemporal);
        
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
        // setTimeout('borrarFichero("' + rutaTemporal + '")', 1000);
    }
}

function fadeInJuego(idCaja) {
    $(idCaja).fadeIn(1000); 
}

// function colocarMiniatura(idJuego) {
//     var rutaRecogida;
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Parece que va bien, colocando la miniatura...")
//         }
//     }
//     xmlhttp.open("POST", "php/juegos/miniaturaColocar.php", false);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.addEventListener("load", function (datos) {
//         rutaRecogida = datos.target.response;
//     });
//     xmlhttp.send("idJuego="+idJuego);
//     return rutaRecogida;
// }

// function borrarFichero(rutaFichero) {
//     rutaFichero = rutaFichero.substring(0, (rutaFichero.length - 2));
//     console.log(rutaFichero);
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Borrando elemento")
//         }
//     }
//     xmlhttp.open("POST", "php/borrar/borrarFichero.php", true);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.send("rutaFichero=" + rutaFichero);
// }