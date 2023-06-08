var esUserConectado = false;
var esDeveloper = false;

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
    // console.log("Viendo las cosas de '"+id+"'");
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

//Función que manda recoger la información del usuario activo, comprobar si es developer, y mandar listar sus juegos publicados
function dataUserConectado() {
    // console.log("Verificando rango conectado");
    var dataUser = obtenerDataUser("buscarUsuarioActivo.php");
    // console.log(dataUser);
    if(dataUser[0][11] == 1)
        esDeveloper = true;
    
    // console.log(esDeveloper);
    buscarJuegos(dataUser[0][0]);
    
}

//Función que manda recoger la información de un usuario especificado, para mandar listar sus juegos publicados
function dataUserExterno(id) {
    // console.log("Verificando rango tio externo");
    const dataUser = obtenerDataUser("buscarUsuarioID.php",id);
    ajustesUserExterno(id);
    // console.log(dataUser);
    document.getElementById("usernameCreador").textContent = "Juegos publicados por "+dataUser[0][3];
    document.title = "Juegos publicados por "+dataUser[0][3];
    buscarJuegos(dataUser[0][0]);
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

//Función que busca los juegos desarrollados por un usuario especificado y manda imprimirlos. 
//En caso de no tener juegos subidos, o no ser developer, se mostrará un mensaje diferente
function buscarJuegos(idUser) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, cojamos el juego que es")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosIDUser.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        // console.log(listaJuegos);
        if(listaJuegos != null)
            cargarJuegos(listaJuegos);
        else{
            if (esUserConectado) {
                if (!esDeveloper) {
                    document.getElementById("noJuegoMensaje").textContent = "No puedes subir juegos ahora mismo. ¿Te interesa ser desarrollador?";
                    document.getElementById("noJuegoURL").textContent = "Pedir rango de desarrollador";
                    document.getElementById("noJuegoURL").href = "configuracion.html";
                }
                document.getElementById("noJuegosPropio").hidden = false;   
            }
            else{
                document.getElementById("noJuegosExterno").hidden = false;
            }
        }
        // datosJuego.push(respJuego);
    });
    xmlhttp.send("idUser="+idUser);
}

//Función para imprimir los juegos comprados en pantalla
function cargarJuegos(listaJuegos) {
    var cuerpoJuegosHechos =  document.getElementById("cuerpoJuegosHechos");

    for (var i = 0; i < listaJuegos.length; i++) {
        if(!esUserConectado && listaJuegos[i][9] == 0){
            continue;
        }
        else{
            var estadoJuego;
            var botonModificar;
            
            //Si son los juegos subidos del usuario conectado, se mostrará el estado de validación del juego, además de
            //añadir un boton que permita modificar los datos del juego 
            if(esUserConectado){
                if (listaJuegos[i][9] == 0) {
                    estadoJuego = '<div class="card-header bg-danger">'+
                                        '<span>En proceso...</span>'+
                                    '</div>';
                }
        
                else{
                    estadoJuego = '<div class="card-header bg-success">'+
                                        '<span>Aprobado</span>'+
                                    '</div>';
                }

                botonModificar = '<div class="text-center mt-2">'+
                                    '<a href="modificarJuego.html?id='+listaJuegos[i][0]+'" class="btn btn-outline-secondary">Modificar</a>'+
                                 '</div>';
            }
            else{
                estadoJuego = '';
                botonModificar = '';
            }
            
            var contentCuerpoJuegos = '<div style="display: none;" class="col-4 col-md-3 my-3 box'+listaJuegos[i][0]+'">' +
                                        '<div class="card cardJuego">'+
                                            estadoJuego+
                                            '<img class="card-img-top img-fluid" src="'+listaJuegos[i][6]+'" alt="imagenJuego">'+
                                                '<div class="card-body">'+
                                                    '<a href="detalleJuego.html?id='+listaJuegos[i][0]+'" class="stretched-link text-decoration-none text-dark">'+
                                                    listaJuegos[i][2]+'</a>'+
                                                '</div>'+
                                            '</div>'+
                                            botonModificar+
                                        '</div>';
                                                
            cuerpoJuegosHechos.innerHTML += contentCuerpoJuegos;
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
