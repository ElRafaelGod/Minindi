createBD();

$(document).ready(function () {
    ultimasNovedades();
});

// window.addEventListener('load', function() {
//     // Ocultar la pantalla de carga
//     document.querySelector('.loading-overlay').style.display = 'none';
//   });

function createBD() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/crearBD.php", false);
    xmlhttp.addEventListener("load", function (datos) {
        if (!adminExists()) {
            console.log("Admin no existe. Añadiendo");
            addPrimerosUsers();
        }
    
        if(!generosExist()){
            console.log("No hay generos introducidos, metiendo...");
            addGenerosBase();
        }
    });
    xmlhttp.send();
}

function adminExists() {
    var adminExists = true;
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, miremos si existe admin")
    //     }
    // }
    xmlhttp.open("GET", "php/usuarios/buscarUsuario.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        // console.log(jsonDatos);
        if(jsonDatos == null) {
            // console.log("No hay coincidencias de otros usuarios con el mismo correo");
            adminExists = false;
        }
    });
    xmlhttp.send();
    return adminExists;
}

function addPrimerosUsers() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/addAdmin.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function generosExist() {
    var generosExist = true;
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, miremos los generos")
    //     }
    // }
    xmlhttp.open("POST", "php/generos/buscarGeneros.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        // console.log(jsonDatos);
        if (jsonDatos == null) {
            generosExist = false;
            console.log("No hay generos introducidos");
        }
    });
    xmlhttp.send();
    return generosExist;
}

function addGenerosBase() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien")
        }
    }
    xmlhttp.open("POST", "php/generos/addGenerosBase.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send()
}

function ultimasNovedades() {
    var cuerpoJuegos =  document.getElementById("cuerpoNovedades");

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Carguemos los juegos validados")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosValidados.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        if(listaJuegos == null){
            console.log("No hay juegos validados!!!!");
            document.getElementById("noJuegos").removeAttribute("hidden");
            // document.getElementById("footerFaltante").classList.add("visually-hidden");
        }
        else{
            document.getElementById("noJuegos").hidden = true;
            listaJuegos.reverse();
            // console.log(listaJuegos);

            if(listaJuegos.length < 6)
                var longitud = listaJuegos.length;
            else
                var longitud = 6;

            // console.log(longitud);
            for (var i = 0; i < longitud; i++) {
                var contentCuerpoJuegos = '<div style="display: none;" class="col-md-2 col-sm-4 col-12 my-3 box'+listaJuegos[i][0]+'">' +
                                            '<div class="card cardJuego">'+
                                                '<img class="img-fluid" src="'+listaJuegos[i][6]+'" alt="imagenJuego">'+
                                                    '<div class="card-body">'+
                                                        '<a href="detalleJuego.html?id='+listaJuegos[i][0]+'" class="stretched-link text-decoration-none text-dark">'+
                                                            listaJuegos[i][2]+
                                                        '</a>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>';
                 
                cuerpoJuegos.innerHTML += contentCuerpoJuegos;
                setTimeout('fadeInJuego(".box'+listaJuegos[i][0]+'")', 200);
                // setTimeout('borrarFichero("'+rutaTemporal+'")',1000);
            }
        }
    });
    xmlhttp.send();
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

function pedirDeveloper() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, colocando imagen...")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/userConectado.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respuesta = datos.target.response;
        // console.log(respuesta);
        if(respuesta == 1){
            // console.log("Hay un usuario conectado");
            window.location = "configuracion.html";
        }
        else{
            // console.log("No hay usuario conectado");
            redirigirRegistro()
            // window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

function redirigirRegistro(){
    console.log(window.location.host);
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, comprobemos si hay una sesion iniciada")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/guardarRuta.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("ruta=configuracion.html");
    window.location = "registro.html";
}

// function borrarFichero(rutaFichero) {
//     rutaFichero = rutaFichero.substring(0, (rutaFichero.length-2));
//     console.log(rutaFichero);
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Borrando elemento")
//         }
//     }
//     xmlhttp.open("POST", "php/borrar/borrarFichero.php", true);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.send("rutaFichero="+rutaFichero);
// }