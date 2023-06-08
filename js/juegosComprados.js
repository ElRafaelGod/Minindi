var esUserConectado = false;
var juegosComprados = [];

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado
$(document).ready(function () {
    verificarUser();
});

//Función que verifica qué usuario es del que se debe buscar la informacion. 
// -Si la URL no tiene la variable ID, se buscará informacion sobre el usuario conectado
// -Si la URL tiene la variable ID, se comprobará a que usuario pertenece la ID, y se buscara su informacion
function verificarUser() {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var idExterna = urlParams.get('id');
    // console.log(idExterna);

    if(idExterna == null){
        // console.log("Es el perfil del propio usuario");
        esUserConectado = true;
        dataUserConectado();
    }
    else if(!Number(idExterna)){
        // console.log("La URL no tiene una id");
        errorUsuarioNoExiste();
    }
    else{
        // console.log("La URL si tiene una id");
        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Parece que va bien");
        //     }
        // }
        xmlhttp.open("POST", "php/usuarios/esMismoUser.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.addEventListener("load", function (datos) {
            const respuesta = datos.target.response;
            // console.log("'"+respuesta+"'");
            if(respuesta == 1){
                // console.log("El usuario esta viendo su propia cuenta")
                esUserConectado = true;
                dataUserConectado();
            }
            else{
                // console.log("El usuario esta viendo otra cuenta ajena")
                dataUserExterno(idExterna);
            }
            
        });
        xmlhttp.send("idExterna="+idExterna);
    }
}

//Función que ajustará el menu de navegación cuando se mire a un usuario diferente del conectado 
function ajustesUserExterno(id) {
    console.log("Viendo las cosas de '"+id+"'");
    document.getElementById("listaDeseos").hidden= true;
    document.getElementById("configuracion").hidden= true;
    document.getElementById("listaDeseos2").hidden= true;
    document.getElementById("configuracion2").hidden= true;

    document.getElementById("perfil").href = "perfil.html?id="+id;
    document.getElementById("perfil2").href = "perfil.html?id="+id;

    document.getElementById("juegosComprados").href = "juegosComprados.html?id="+id;
    document.getElementById("juegosComprados2").href = "juegosComprados.html?id="+id;

    document.getElementById("juegosPublicados").href = "juegosSubidos.html?id="+id;
    document.getElementById("juegosPublicados2").href = "juegosSubidos.html?id="+id;
}

//Función que manda recoger la información del usuario activo, para mandar listar sus juegos comprados
function dataUserConectado() {
    // console.log("Verificando rango conectado");
    var dataUser = obtenerDataUser("buscarUsuarioActivo.php");
    // console.log(dataUser);
    buscarJuegosComprados(dataUser[0][0]);
}

//Función que manda recoger la información de un usuario especificado, para mandar listar sus juegos comprados
function dataUserExterno(id) {
    // console.log("Verificando rango usuario externo");
    const dataUser = obtenerDataUser("buscarUsuarioID.php",id);
    ajustesUserExterno(id);
    // console.log(dataUser);
    document.getElementById("usernameCreador").textContent = "Juegos comprados por "+dataUser[0][3];
    document.title = "Juegos comprados por "+dataUser[0][3];
    buscarJuegosComprados(dataUser[0][0]);
}

//Función que manda obtener datos del usuario especificado segun la ruta de llamada
function obtenerDataUser(url,id){
    var xmlhttp = new XMLHttpRequest();
    var datosUser;
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/"+url, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        datosUser = JSON.parse(datos.target.response);
    });
    xmlhttp.send("id="+id);
    return datosUser;
}

//Función que busca la id de los juegos comprados por el usuario que se esta mirando, manda buscar la informacion de los mismos, 
//y manda imprimirlos
function buscarJuegosComprados(idUser) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Cojamos el juego que es")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosComprados.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        // console.log(listaJuegos);
        if (listaJuegos != null) {
            for(i=0;i<listaJuegos.length;i++){
                buscarDataJuego(listaJuegos[i][0]);
            }
            // console.log(juegosComprados);
            cargarJuegos(juegosComprados);
        }
        else{
            if (esUserConectado) {
                document.getElementById("noJuegosPropio").hidden = false;
            }
            else{
                document.getElementById("noJuegosExterno").hidden = false;
            }
        }
    });
    xmlhttp.send("idUser="+idUser);
}

//Función que busca la información del juego cuya id se le pasa 
function buscarDataJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Pillemos la data de el juego que es")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        dataJuego = JSON.parse(datos.target.response);
        // console.log(dataJuego);
        juegosComprados.push(dataJuego[0]);
    });
    xmlhttp.send("idJuego="+idJuego);
}

//Función para imprimir los juegos comprados en pantalla
function cargarJuegos(listaJuegos) {
    var cuerpoJuegosHechos =  document.getElementById("cuerpoJuegosComprados");

    for (var i = 0; i < listaJuegos.length; i++) {
        if(!esUserConectado && listaJuegos[i][9] == 0){
            continue;
        }
        else{
            //Si son los juegos comprados del usuario conectado, se incluirá un boton que permitirá que pueda 
            //descargar los juegos comprados
            if(esUserConectado){
                botonDescargar = '<div class="text-center mt-2" id="juego'+listaJuegos[i][0]+'">'+
                                    '<button type="button" class="btn btn-outline-secondary">Descargar</button>'+
                                 '</div>';
            }
            else{
                botonDescargar = '';
            }
            
            var contentCuerpoJuegos = '<div style="display: none;" class="col-4 col-md-3 my-3 box'+listaJuegos[i][0]+'">' +
                                        '<div class="card cardJuego">'+
                                            '<img class="card-img-top img-fluid" src="'+listaJuegos[i][6]+'" alt="imagenJuego">'+
                                                '<div class="card-body">'+
                                                    '<a href="detalleJuego.html?id='+listaJuegos[i][0]+'" class="stretched-link text-decoration-none text-dark">'+
                                                    listaJuegos[i][2]+'</a>'+
                                                '</div>'+
                                            '</div>'+
                                            botonDescargar+
                                        '</div>';
                                                
            cuerpoJuegosHechos.innerHTML += contentCuerpoJuegos;
            if(document.getElementById("juego"+listaJuegos[i][0])){
                document.getElementById("juego"+listaJuegos[i][0]).setAttribute("onclick","colocarJuego('"+listaJuegos[i][4]+"')");
            }
            setTimeout('fadeInJuego(".box'+listaJuegos[i][0]+'")', 200);
        }
    }
}

//Función que con jQuery hace aparecer la caja determinada
function fadeInJuego(idCaja) {
    $(idCaja).fadeIn(1000); 
}

//Función que hace aparecer la caja de error de la página cuando no se cumple los requisitos
function errorUsuarioNoExiste() {
    document.getElementById("contentCuerpo").hidden= true;
    document.getElementById("errorUser").hidden= false;
}

//Función para obtener de forma correcta el nombre de la demo a descargar, y solicitar su descarga
function colocarJuego(rutaJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, colocando juego sin validar");
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/sacarNombreFichero.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        var nombreFichero = datos.target.response;
        DownloadFromUrl(nombreFichero,rutaJuego);
    });
    xmlhttp.send("rutaArchivo="+rutaJuego);
}

//Función para descargar un archivo con el nombre y la ruta dada
function DownloadFromUrl(fileName,rutaJuego) {
    var link = document.createElement('a');
    link.href = rutaJuego;
    link.download = fileName.substring(0, (fileName.length-2));

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} 

