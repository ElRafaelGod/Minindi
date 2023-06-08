createBD();

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado
$(document).ready(function () {
    ultimasNovedades();
});

//Función que crea la base de datos de la página en caso de no existir, y rellena de usuarios y generos si no hay ninguno guardado
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
            // console.log("Admin no existe. Añadiendo");
            addPrimerosUsers();
        }
        if(!generosExist()){
            // console.log("No hay generos introducidos, metiendo...");
            addGenerosBase();
        }
    });
    xmlhttp.send();
}

//Función que comprueba si hay algun usuario guardado en la base de datos
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

//Función que introduce a varios usuarios predeterminados
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

//Función que comprueba si hay algun genero guardado en la base de datos
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

//Función que introduce varios generos predeterminados
function addGenerosBase() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/generos/addGenerosBase.php",false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send()
}

//Función que imprime los 6 ultimos juegos validados
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
            document.getElementById("noJuegos").removeAttribute("hidden");
        }
        else{
            document.getElementById("noJuegos").hidden = true;
            listaJuegos.reverse();
            if(listaJuegos.length < 6)
                var longitud = listaJuegos.length;
            else
                var longitud = 6;

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
            }
        }
    });
    xmlhttp.send();
}

//Función que con jQuery hace aparecer la caja determinada
function fadeInJuego(idCaja) {
    $(idCaja).fadeIn(1000); 
}

//Función que:
//-Si el usuario tiene una cuenta encendida, lo redigire a configuracion
//-Si no, guarda el enlace a redirigir, y lo lleva a registro
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
        if(respuesta == 1){
            window.location = "configuracion.html";
        }
        else{
            redirigirRegistro();
        }
    });
    xmlhttp.send();
}

//Función que guarda la ruta a redirigir tras el inicio de sesión
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