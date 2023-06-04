var esUserConectado = false;
var esDeveloper = false;

$(document).ready(function () {
    verificarUser();
});

function verificarUser() {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var idExterna = urlParams.get('id');
    console.log(idExterna);

    if(idExterna == null){
        console.log("Es el perfil del propio usuario");
        esUserConectado = true;
        dataUserConectado();
    }
    else if(!Number(idExterna)){
        console.log("La URL no tiene una id");
        errorUsuarioNoExiste();
    }
    else{
        console.log("La URL si tiene una id");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Parece que va bien");
            }
        }
        xmlhttp.open("POST", "php/usuarios/esMismoUser.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.addEventListener("load", function (datos) {
            const respuesta = datos.target.response;
            console.log("'"+respuesta+"'");
            if(respuesta == 1){
                console.log("El usuario esta viendo su propia cuenta")
                esUserConectado = true;
                dataUserConectado();
            }
            else{
                console.log("El usuario esta viendo otra cuenta ajena")
                dataUserExterno(idExterna);
            }
            
        });
        xmlhttp.send("idExterna="+idExterna);
    }
}

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

function dataUserConectado() {
    console.log("Verificando rango conectado");
    var dataUser = obtenerDataUser("buscarUsuarioActivo.php");
    console.log(dataUser);
    if(dataUser[0][11] == 1)
        esDeveloper = true;
    
    console.log(esDeveloper);
    buscarJuegos(dataUser[0][0]);
    
}

function dataUserExterno(id) {
    console.log("Verificando rango tio externo");
    const dataUser = obtenerDataUser("buscarUsuarioID.php",id);
    ajustesUserExterno(id);
    console.log(dataUser);
    document.getElementById("usernameCreador").textContent = "Juegos publicados por "+dataUser[0][3];
    document.title = "Juegos publicados por "+dataUser[0][3];
    buscarJuegos(dataUser[0][0]);
}

function obtenerDataUser(url,id){
    var xmlhttp = new XMLHttpRequest();
    var datosUser;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien")
        }
    }
    xmlhttp.open("POST", "php/usuarios/"+url, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        datosUser = JSON.parse(datos.target.response);
    });
    xmlhttp.send("id="+id);
    return datosUser;
}

function buscarJuegos(idUser) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien, cojamos el juego que es")
        }
    }
    xmlhttp.open("POST", "php/juegos/buscarJuegosIDUser.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        console.log(listaJuegos);
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

function cargarJuegos(listaJuegos) {
    var cuerpoJuegosHechos =  document.getElementById("cuerpoJuegosHechos");
    var rutaTemporal;

    console.log(listaJuegos.length);
    if(listaJuegos.length > 9){
        console.log("Hay suficientes juegos para rellenar");
        document.getElementById("footer").classList.remove("fixed-bottom");
    }

    for (var i = 0; i < listaJuegos.length; i++) {
        if(!esUserConectado && listaJuegos[i][9] == 0){
            continue
        }
        else{
            var estadoJuego;
            var botonModificar;
            // rutaTemporal = "/ArchivosTemporales/"+colocarMiniatura(listaJuegos[i][0], listaJuegos[i][6]);
            // console.log("Ruta: "+rutaTemporal);
    
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
            // setTimeout('borrarFichero("' + rutaTemporal + '")', 1000);
        }
    }
}

function fadeInJuego(idCaja) {
    $(idCaja).fadeIn(1000); 
}

function errorUsuarioNoExiste() {
    document.getElementById("contentCuerpo").hidden= true;
    document.getElementById("errorUser").hidden= false;
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


