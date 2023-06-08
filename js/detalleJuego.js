var detalleJuego;
var listaImagenes;
var urlMiniatura = "";
var urlImagenes = [];
var usuarioConectado;
var juegoValorado = false;
var tieneVideo = false;

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado
$(document).ready(function () {
    cargarJuegos();
    usuarioConectado = userConectado();
});

// Función para cargar la información del juego deseado, siempre que cumpla las condiciones dadas. 
//Se cargará si:
//     -Es un juego validado
//     -Es un juego no validado, siendo visto por su creador
// No se cargará el juego si:
//     -El juego no existe (la id no corresponde a ningun juego)
//     -El juego a mirar no ha sido validado, y no es visto por su creador
function cargarJuegos() {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var idExterna = urlParams.get('id');

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, recojamos los detalles del juego")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        detalleJuego = JSON.parse(datos.target.response);
        if(detalleJuego != null){
            if(detalleJuego[0][9] == 0 && esCreador(detalleJuego[0][1])){
                configurarJuego(detalleJuego);
            }
            else if(detalleJuego[0][9] == 0){
                document.getElementById("contentCuerpo").hidden= true;
                document.getElementById("errorJuego").hidden= false;
                document.getElementById("footer").classList.add('fixed-bottom');
            }
            else{
                configurarJuego(detalleJuego);
            }
        }
        else{
            // console.log("El juego no existe");
            document.getElementById("contentCuerpo").hidden= true;
            document.getElementById("errorJuego").hidden= false;
            document.getElementById("footer").classList.add('fixed-bottom');
        }
    });
    xmlhttp.send('idJuego='+idExterna);
}

//Función que escribe todos los datos referentes al juego y comprueba todas las interacciones del usuario con el juego
function configurarJuego(detalleJuego){
    esDeseo();
    enCesta();
    juegoComprado();
    haSidoValorado();
    valoradoPorUser();
    escribirComentarios();

    document.title = detalleJuego[0][2];
    document.getElementById("migaTitulo").textContent = detalleJuego[0][2];
    document.getElementById("tituloJuego").textContent = detalleJuego[0][2];

    colocarCreadorDatos(detalleJuego[0][1],"creadorUsername");
    colocarFecha(detalleJuego[0][0]);

    document.getElementById("descripcionJuego").textContent = detalleJuego[0][3];

    if(detalleJuego[0][5] == 0)
        document.getElementById("precio").textContent = 'Gratuito';
    else
        document.getElementById("precio").textContent = detalleJuego[0][5]+'€';

    if(detalleJuego[0][7] != '')
        tieneVideo = true;

    if(detalleJuego[0][8] == '')
        document.getElementById("cajaDemo").hidden = true;
    else
        document.getElementById("botonDemo").setAttribute("onclick","colocarDemo('"+detalleJuego[0][8]+"')");

    //Dependiendo de si el juego tiene asignado un video o no, se llamará a una u otra función
    if (tieneVideo)
        colocarImagenesYVideo(detalleJuego[0][0]);
    else
        colocarImagenes(detalleJuego[0][0]);

    colocarGeneros(detalleJuego[0][0]);
}

//Función que coloca los datos del creador del juego
function colocarCreadorDatos(idCreador,element){
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, recojamos al creador del juego")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        datosCreador = JSON.parse(datos.target.response);
        document.getElementById(element).textContent = datosCreador[0][3];
        document.getElementById(element).href = "perfil.html?id="+datosCreador[0][0];
    });
    xmlhttp.send("id="+idCreador);
}

//Función que comprueba que el usuario conectado es el creador del juego
function esCreador(idCreador){
    var esCreador = false;
    if(idCreador == undefined){
        idCreador = 0;
    }
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Recojamos la id del creador")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/devolverIDConectado.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        idUser = datos.target.response;
        // console.log("idUser = " + idUser);
        // console.log("idCreador = " + idCreador);
        if(idCreador == idUser){
            // console.log("Son iguales");
            esCreador = true;
        }
    });
    xmlhttp.send();
    return esCreador;
}

//Función que coloca la fecha de publicación del juego
function colocarFecha(idJuego){
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, recojamos la fecha de publicacion")
    //     }
    // }
    xmlhttp.open("POST", "php/juegopordeveloper/buscarDatosID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        fechaSubida = datos.target.response;
        document.getElementById("fechaSubida").textContent = fechaSubida;

    });
    xmlhttp.send("idJuego="+idJuego);
}

//Función que coloca las imagenes asignadas al juego
function colocarImagenes(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, coloquemos las imagenes del juego")
    //     }
    // }
    xmlhttp.open("POST", "php/imagenesSecund/imagenesJuegoColocar.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaImagenes = JSON.parse(datos.target.response);
        // console.log(listaImagenes);
        for (i = 0; i < listaImagenes.length; i++) {
            //Crea los indicadores de la imagen y los inserta
            if(i==0)
                var cajaIndicador1 = '<button type="button" data-bs-target="#imagenes1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';
            else
                var cajaIndicador1 = '<button type="button" data-bs-target="#imagenes2" data-bs-slide-to="'+i+'" aria-label="Slide '+(i+1)+'"></button>';

            document.getElementById("indicadorImagenes1").innerHTML += cajaIndicador1;

            //Crea la caja de la imagen y la inserta
            if(i==0){
                var cajaImagen1 = "<div class='carousel-item active'>"+
                                    "<img src='"+listaImagenes[i][0]+"' class='d-block w-100' alt='...'></div>";
            }
            else
                var cajaImagen1 = "<div class='carousel-item'>"+
                                        "<img src='"+listaImagenes[i][0]+"' class='d-block w-100' alt='...'></div>";

            document.getElementById("listaImagenes1").innerHTML += cajaImagen1;
            urlImagenes.push(listaImagenes[i][0]);   
            // setTimeout('borrarFichero("ArchivosTemporales/'+listaImagenes[i]+'")',1000);       
        }
        // console.log(urlImagenes);
    });
    xmlhttp.send("idJuego="+idJuego);
}

//Función que coloca el video y las imagenes asignadas al juego
function colocarImagenesYVideo(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, coloquemos las imagenes del juego")
    //     }
    // }
    xmlhttp.open("POST", "php/imagenesSecund/imagenesJuegoColocar.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaImagenes = JSON.parse(datos.target.response);
        // console.log(listaImagenes);

        document.getElementById("listaImagenes1").innerHTML += "<div class='carousel-item active'>"+
                                                                    '<video class="img-fluid" autoplay loop controls>' +
                                                                        '<source src='+detalleJuego[0][7]+' type="video/mp4"/>'+
                                                                    '</video>'+ 
                                                                '</div>';
        var cajaIndicador1 = '<button type="button" data-bs-target="#imagenes1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';
        document.getElementById("indicadorImagenes1").innerHTML += cajaIndicador1;

        for (i = 0; i < listaImagenes.length; i++) {
            //Crea los indicadores de la imagen y los inserta
            var cajaIndicador1 = '<button type="button" data-bs-target="#imagenes2" data-bs-slide-to="'+(i+1)+'" aria-label="Slide '+(i+1)+'"></button>';

            document.getElementById("indicadorImagenes1").innerHTML += cajaIndicador1;

            //Crea la caja de la imagen y la inserta
                var cajaImagen1 = "<div class='carousel-item'>"+
                                        "<img src='"+listaImagenes[i][0]+"' class='d-block w-100' alt='...'></div>";

            document.getElementById("listaImagenes1").innerHTML += cajaImagen1;
            urlImagenes.push(listaImagenes[i][0]);  
            // setTimeout('borrarFichero("ArchivosTemporales/'+listaImagenes[i]+'")',1000);       
        }
    });
    xmlhttp.send("idJuego="+idJuego);
}

//Función que imprime los generos asignados al juego
function colocarGeneros(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, coloquemos los generos del juego")
    //     }
    // }
    xmlhttp.open("POST", "php/generoPorJuego/buscarGenerosJuegoID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaGeneros = JSON.parse(datos.target.response);
        for (i = 0; i < listaGeneros.length; i++) {
            //Crea los indicadores de generos y los inserta
            var genero = '<button type="button" class="btn btn-secondary btn-sm me-2 mt-1" disabled>'+listaGeneros[i][1]+'</button>';
            document.getElementById("listaGeneros").innerHTML += genero;               
        }
    });
    xmlhttp.send("idJuego="+idJuego);
}

//Función que comprueba si el juego ya se encuentra en la lista de deseos del usuario
function esDeseo() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Comprobemos si es un juego ya favorito del usuario")
    //     }
    // }
    xmlhttp.open("POST", "php/favoritos/esJuegoDeseado.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respuesta = datos.target.response;
        if(respuesta == 1){
            document.getElementById("botonDeseos").innerHTML = "En tu lista de deseos";
            document.getElementById("botonDeseos").setAttribute("onclick","quitToDeseos()");
            document.getElementById("botonDeseos").classList.add("juegoEnListaDeseos");
            document.getElementById("botonDeseos").classList.add("btn-danger");
            document.getElementById("botonDeseos").classList.remove("btn-secondary");
        }
    });
    xmlhttp.send("idJuego="+detalleJuego[0][0]); 

    
}

//Función que comprueba si el juego ya se encuentra en la cesta del usuario
function enCesta() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Miremos si ya esta en la cesta")
    //     }
    // }
    xmlhttp.open("POST", "php/cesta/juegoEnCesta.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respuesta = datos.target.response;
        if(respuesta == 1){
            document.getElementById("botonCesta").innerHTML = "Quitar de tu cesta";
            document.getElementById("botonCesta").setAttribute("onclick","quitToCesta()");
            document.getElementById("botonCesta").classList.add("btn-secondary");
            document.getElementById("botonCesta").classList.remove("btn-dark");
        }
    });
    xmlhttp.send("idJuego="+detalleJuego[0][0]); 
}

//Función que comprueba si el juego ha sido valorado, y hace la media de sus valoraciones
function haSidoValorado() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Comprobemos si el juego tiene valoraciones")
    //     }
    // }
    xmlhttp.open("POST", "php/puntuaje/buscarValoraciones.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaValoraciones = JSON.parse(datos.target.response);
        // console.log(listaValoraciones);
        if (listaValoraciones != null) {
            var mediaPuntuaciones = 0;
            for(i = 0; i<listaValoraciones.length; i++){
                mediaPuntuaciones += parseInt(listaValoraciones[i][3]);
            }
            resultado = mediaPuntuaciones / listaValoraciones.length
            document.getElementById('valoracion').textContent = parseFloat(resultado).toFixed(2) + " / 5 ";
            document.getElementById('numValoraciones').textContent = "Valoraciones recibidas: "+ listaValoraciones.length;
            document.getElementById('numValoraciones').removeAttribute("hidden");
        }
        else{
            document.getElementById('valoracion').textContent = "Sin puntuar"
            document.getElementById('valoracion').classList.remove('btn-outline-warning');
            document.getElementById('valoracion').classList.remove('border-3');
            document.getElementById('valoracion').classList.remove('rounded-circle');
            document.getElementById('valoracion').classList.remove('valoracion');
        }
    });
    xmlhttp.send("idJuego="+detalleJuego[0][0]); 
}

//Función que comprueba si el usuario ya ha valorado el juego
function valoradoPorUser(){
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Comprobemos si TU has valorado este juego")
    //     }
    // }
    xmlhttp.open("POST", "php/puntuaje/valoradoPorUser.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        valoracionUser = JSON.parse(datos.target.response);
        // console.log(valoracionUser);
        if (valoracionUser != null) {
            document.getElementById("star"+valoracionUser[0][3]).checked = true;
            juegoValorado = true;
        }
    });
    xmlhttp.send("idJuego="+detalleJuego[0][0]);
}

//Función que comprueba si el juego tiene comentarios recibidos, y los carga
function escribirComentarios() {
    cajaComentarios = document.getElementById("comentariosJuego");
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Comprobemos si ya hay comentarios en el juego")
    //     }
    // }
    xmlhttp.open("POST", "php/comentarios/buscarComentarios.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaComentarios = JSON.parse(datos.target.response);
        // console.log(listaComentarios);
        if(listaComentarios != null){
            listaComentarios.reverse();
            for(i = 0; i < listaComentarios.length; i++){
                var comentario = '<div class="col-md-12 col-lg-10 col-xl-8 mb-3">'+
                                      '<div class="card">'+
                                        '<div class="card-body">'+
                                          '<div class="d-flex flex-start align-items-center">'+
                                            '<div>'+
                                              '<a id="comentario'+i+'" class="text-decoration-none text-dark comentario">Soy creado</a>'+
                                              '<p class="text-muted small mb-0">'+listaComentarios[i][4]+'</p>'+
                                            '</div>'+
                                          '</div>'+
                                          '<p class="mt-3 mb-2">'+listaComentarios[i][3]+'</p>'+
                                        '</div>'+
                                      '</div>'+
                                    '</div>';
                cajaComentarios.innerHTML += comentario;
                colocarCreadorDatos(listaComentarios[i][1],"comentario"+i);
            }
        }
    });
    xmlhttp.send("idJuego="+detalleJuego[0][0]); 
}

//Función que comprueba si el juego ya ha sido comprado por el usuario
function juegoComprado() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Comprobemos si es un juego ya comprado")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/esJuegoComprado.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respuesta = datos.target.response;
        if(respuesta == 1){
            document.getElementById("botonCesta").innerHTML = "Juego ya comprado";
            document.getElementById("botonCesta").setAttribute("onclick","quitToCesta()");
            document.getElementById("botonCesta").setAttribute("disabled","true");
            document.getElementById("botonCesta").classList.add("btn-success");
            document.getElementById("botonCesta").classList.remove("btn-dark");
            document.getElementById("cajaDeseos").hidden = true;

        }
    });
    xmlhttp.send("idJuego="+detalleJuego[0][0]); 
}

//Función que comprueba si el usuario activo tiene una cuenta iniciada
function userConectado() {
    var resultado = true;
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, comprobemos si hay una sesion iniciada")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/userConectado.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        resp = datos.target.response;
        if (resp != 1) {
            // console.log("No es un usuario con cuenta encendida");
            resultado = false;
        }
    });
    xmlhttp.send();
    return resultado;
}

//Función que, si el usuario tiene su cuenta abierta, añade el juego a su lista de deseos. Sino, manda un aviso
function addToDeseos() {
    if(usuarioConectado){
        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Parece que va bien, comprobemos si hay una sesion iniciada")
        //     }
        // }
        xmlhttp.open("POST", "php/favoritos/addJuegoDeseos.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("idJuego="+detalleJuego[0][0]);
        mostrarToast('addDeseos');
        quitarToast('quitDeseos');

        document.getElementById("botonDeseos").innerHTML = "En tu lista de deseos";
        document.getElementById("botonDeseos").setAttribute("onclick","quitToDeseos()");
        document.getElementById("botonDeseos").classList.add("juegoEnListaDeseos");
        document.getElementById("botonDeseos").classList.add("btn-danger");
        document.getElementById("botonDeseos").classList.remove("btn-secondary");
    }
    else{
        mostrarToast('noConectado');
    }
}

//Función que, si el usuario tiene su cuenta abierta, quita el juego de su lista de deseos. Sino, manda un aviso
function quitToDeseos() {
    if(usuarioConectado){
        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Parece que va bien, comprobemos si hay una sesion iniciada")
        //     }
        // }
        xmlhttp.open("POST", "php/favoritos/borrarJuegoDeseos.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("idJuego="+detalleJuego[0][0]);
        mostrarToast('quitDeseos');
        quitarToast('addDeseos');

        document.getElementById("botonDeseos").innerHTML = "Añadir a la lista de deseos";
        document.getElementById("botonDeseos").setAttribute("onclick","addToDeseos()");
        document.getElementById("botonDeseos").classList.remove("juegoEnListaDeseos");
        document.getElementById("botonDeseos").classList.remove("btn-danger");
        document.getElementById("botonDeseos").classList.add("btn-secondary")
    }
    else{
        mostrarToast('noConectado');
    }
}

//Función que, si el usuario tiene su cuenta abierta, añade el juego a la cesta, y actualiza el numero de la cesta. Sino, manda un aviso
function addToCesta() {
    if(usuarioConectado){
        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Añadamos el juego a la cesta")
        //     }
        // }
        console.log(detalleJuego[0][0]);
        xmlhttp.open("POST", "php/cesta/addJuegoCesta.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("idJuego="+detalleJuego[0][0]);
        mostrarToast('addCesta');
        quitarToast('quitCesta');
        revisarCesta();

        document.getElementById("botonCesta").innerHTML = "Quitar de tu cesta";
        document.getElementById("botonCesta").setAttribute("onclick","quitToCesta()");
        document.getElementById("botonCesta").classList.add("btn-secondary");
        document.getElementById("botonCesta").classList.remove("btn-dark");
    }
    else{
        mostrarToast('noConectado');
    }
}

//Función que, si el usuario tiene su cuenta abierta, quita el juego de la cesta, y actualiza el numero de la cesta. Sino, manda un aviso
function quitToCesta() {
    if(usuarioConectado){
        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Quitemos el juego de la cesta")
        //     }
        // }
        console.log(detalleJuego[0][0]);
        xmlhttp.open("POST", "php/cesta/borrarJuegoCesta.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("idJuego="+detalleJuego[0][0]);
        mostrarToast('quitCesta');
        quitarToast('addCesta');
        revisarCesta();

        document.getElementById("botonCesta").innerHTML = "Añadir a la cesta";
        document.getElementById("botonCesta").setAttribute("onclick","addToCesta()");
        document.getElementById("botonCesta").classList.add("btn-dark");
        document.getElementById("botonCesta").classList.remove("btn-secondary");
    }
    else{
        mostrarToast('noConectado');
    }
}

//Función para obtener de forma correcta el nombre de la demo a descargar, y solicitar su descarga
function colocarDemo(rutaJuego) {
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

//Función que comprueba si el juego ha sido valorado antes por el usuario, y de ser asi, pregunte si quiere modificar su valoracion
function juegoAntesValorado(puntuacion) {
    if(usuarioConectado){
        if (juegoValorado) {
            let text = "Ya has votado este juego. Esta nueva valoracion eliminará la anterior. ¿Quieres continuar?";
            if (confirm(text) == true)
                modificarPuntuacion(puntuacion);
        }
        else{
            puntuarJuego(puntuacion);
        }
    }
    else{
        mostrarToast('noConectado');
    }
}

//Función que guarda la puntuación dada al juego por el usuario conectado
function puntuarJuego(puntuacion) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, comprobemos si hay una sesion iniciada")
    //     }
    // }
    console.log(detalleJuego[0][0]);
    xmlhttp.open("POST", "php/puntuaje/valorarJuego.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego="+detalleJuego[0][0]+
                "&puntuacion="+puntuacion);
    location.reload();
}

//Función que modifica la puntuación dada al juego por el usuario conectado
function modificarPuntuacion(puntuacion) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Cambiemos la puntuacion dada")
    //     }
    // }
    console.log(detalleJuego[0][0]);
    xmlhttp.open("POST", "php/puntuaje/modificarValoracion.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego="+detalleJuego[0][0]+
                "&puntuacion="+puntuacion);
    location.reload();
}

//Función para mostrar el mensaje emergente que se especifique
function mostrarToast(toast) {
    var toastLiveExample = document.getElementById(toast);
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

//Función para quitar el mensaje emergente que se especifique
function quitarToast(toast) {
    var toastLiveExample = document.getElementById(toast);
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.hide();
}

//Función que guarda la ruta del juego para redirigirlo a la pagina actual una vez se inicie sesion
function redirigirRegistro(){
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, comprobemos si hay una sesion iniciada")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/guardarRuta.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("ruta="+window.location);
    window.location = "registro.html";
}

//Función que, en caso de no haber una cuenta iniciada, bloquea la caja de comentarios
function clickComentario() {
    if(!usuarioConectado){
        mostrarToast('noConectado');
        document.getElementById("comentarioUser").setAttribute("disabled","true");
        document.getElementById("botonComentar").setAttribute("disabled","true");
    }
}

//Función que registra el comentario publicado en el juego por el usuario
function comentarJuego() {
    if(usuarioConectado){
        console.log("Esta conectado, puede comentar");
        var comentario = document.getElementById("comentarioUser").value;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Parece que va bien, comprobemos si hay una sesion iniciada")
            }
        }
        console.log(detalleJuego[0][0]);
        xmlhttp.open("POST", "php/comentarios/comentarJuego.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("idJuego="+detalleJuego[0][0]+
                    "&comentario="+comentario);
        console.log("Guardando comentario");
        location.reload();
    }
    else{
        mostrarToast('noConectado');
        document.getElementById("comentarioUser").setAttribute("disabled","true");
        document.getElementById("botonComentar").setAttribute("disabled","true");
    }
}
