var rutaVideo = '';
var urlImagenes = [];
var datosJuego;

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado:
$(document).ready(function () {
    cargarJuegos();
});

//Función que carga y coloca la información del juego especificado por la URL
function cargarJuegos() {
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    var idExterna = urlParams.get('id');
    // console.log(idExterna);

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Recojamos los detalles del juego")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosID.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        detalleJuego = JSON.parse(datos.target.response);
        datosJuego = detalleJuego;
        // console.log(detalleJuego);
        esCreadorDelJuego(detalleJuego[0][1]);

        document.getElementById("oldTitulo").innerText = detalleJuego[0][2];
        document.getElementById("oldDescripcion").innerText = detalleJuego[0][3];

        if (detalleJuego[0][5] == 0)
            document.getElementById("oldPrecio").innerText = "Gratuito ---> 0€";
        else
            document.getElementById("oldPrecio").innerText = detalleJuego[0][5]+"€";

        document.getElementById("oldMiniatura").src = detalleJuego[0][6];
        colocarImagenes(detalleJuego[0][0]);

        if (detalleJuego[0][7] == ""){
            document.getElementById("cajaOldVideo").innerHTML = '<span class="fst-italic text-start form-control-plaintext">No hay ningun video asignado</span>';
        }
        else{
            document.getElementById("cajaOldVideo").innerHTML = '<video id="oldVideo" class="col" width="320" height="240" autoplay loop>'+
                                                                    '<source src="'+detalleJuego[0][7]+'" type="video/mp4">'+
                                                                '</video>';
            document.getElementById("botonQuitarVideo").removeAttribute("hidden"); 
        }

        if (detalleJuego[0][8] == "")
            document.getElementById("cajaTieneDemo").innerHTML = '<span class="fst-italic fs-2 text-start form-control-plaintext"">NO</span>';
        else{
            document.getElementById("cajaTieneDemo").innerHTML = '<span class="fst-italic fs-2 text-start form-control-plaintext"">SI</span>';
            document.getElementById("botonQuitarDemo").removeAttribute("hidden");
        }

        document.getElementById("botonEliminar").setAttribute("onclick","borrarJuego('"+detalleJuego[0][0]+"')");

    });
    xmlhttp.send('idJuego='+idExterna);
}

//Función que comprueban si el usuario activo es el creador del juego. De no serlo, se le redirigirá a otra página
function esCreadorDelJuego(idCreador) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Comprobemos si es el mismo creador")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const datosActivo = JSON.parse(datos.target.response);
        // console.log(datosActivo);
        if (datosActivo != null) {
            if (idCreador != datosActivo[0][0]) {
                // console.log("NO es el creador D:!!");
                window.location = "juegosSubidos.html";
            }
        }
        else {
            // console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

//Función que coloca las imagenes actuales del juego
function colocarImagenes(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Coloquemos las imagenes del juego")
    //     }
    // }
    xmlhttp.open("POST", "php/imagenesSecund/imagenesJuegoColocar.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaImagenes = JSON.parse(datos.target.response);
        // console.log(listaImagenes);

        for (i = 0; i < listaImagenes.length; i++) {
            //Crea los indicadores de la imagen y los inserta
            if(i==0)
                var cajaIndicador1 = '<button type="button" data-bs-target="#oldImagenes" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>';
            else
                var cajaIndicador1 = '<button type="button" data-bs-target="#oldImagenes" data-bs-slide-to="'+i+'" aria-label="Slide '+(i+1)+'"></button>';

            document.getElementById("indicadorOldImagenes").innerHTML += cajaIndicador1;

            //Crea la caja de la imagen y la inserta
            if(i==0)
                var cajaImagen1 = "<div class='carousel-item active'>"+
                                        "<img src='"+listaImagenes[i][0]+"' class='d-block w-100' alt='...'></div>";
            else
                var cajaImagen1 = "<div class='carousel-item'>"+
                                        "<img src='"+listaImagenes[i][0]+"' class='d-block w-100' alt='...'></div>";

            document.getElementById("listaOldImagenes").innerHTML += cajaImagen1;
            // urlImagenes.push("ArchivosTemporales/"+listaImagenes[i]);                
        }
    });
    xmlhttp.send("idJuego="+idJuego);
}

//------------------------------------------------------------

//Función que oculta el campo mandado
function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

//Función que solicita modificar el titulo del juego por el nuevo mandado que cumpla las condiciones dadas
function newTitulo() {
    var element = document.getElementById("newTitulo");
    var newUsername = element.value;
    if (newUsername.length > 5) {
        // console.log("Titulo valido, cambiando...");
        activarPantallaCargando();
        modificarNewDataIndividual(newUsername, "modificarTitulo.php");
    }
    else {
        document.getElementById("errorTitulo").removeAttribute("hidden");
    }
}

//Función que solicita modificar la descripcion del juego por el nuevo mandado que cumpla las condiciones dadas
function newDescripcion() {
    var element = document.getElementById("newDescripcion");
    var newDescripcion = element.value;
    activarPantallaCargando();
    modificarNewDataIndividual(newDescripcion, "modificarDescripcion.php");
}

//Función que solicita modificar el precio del juego por el nuevo mandado que cumpla las condiciones dadas
function newPrecio() {
    var element = document.getElementById("newPrecio");
    var newDescripcion = element.value;
    activarPantallaCargando();
    modificarNewDataIndividual(newDescripcion, "modificarPrecio.php");
}

//Función que solicita modificar la miniatura del juego por la nueva mandada que cumpla las condiciones dadas
function cambiarMiniatura() {
    console.log('Entrando a newMiniatura');
    var element = document.getElementById("newMiniatura");
    var newImage = element.files;
    // console.log(newImage);
    if (newImage.length != '') {
        // console.log("Imagen valida, cambiando");
        guardarRuta(window.location);
        activarPantallaCargando();
        document.getElementById("formMiniatura").submit();
    }
    else {
        document.getElementById("errorMiniatura").removeAttribute("hidden");
        console.log("Error, no hay imagen");
    }
}

//Función que solicita modificar las imagenes del juego por las nuevas mandadas que cumplan las condiciones dadas
function cambiarImagenesJuego() {
    console.log('Entrando a newImagenes');
    var element = document.getElementById("newImagenes");
    var newImages = element.files;

    for (var i = 0; i < newImages.length; i++){
        console.log(newImages[i].name);
    }

    if (newImages.length >= 1 && newImages.length < 6) {
        // console.log("Imagen valida, cambiando");
        guardarRuta(window.location);
        activarPantallaCargando();
        document.getElementById("formImagenes").submit();
    }
    else {
        document.getElementById("errorImagenes").removeAttribute("hidden");
        // console.log("Error, no hay imagen");
    }
}

//Función que solicita modificar el video del juego por el nuevo mandado que cumpla las condiciones dadas
function cambiarVideo() {
    var element = document.getElementById("newVideo");
    var newVideo = element.files;
    // console.log(newVideo);
    if (newVideo.length != '') {
        // console.log("Video valida, cambiando");
        guardarRuta(window.location);
        activarPantallaCargando();
        document.getElementById("formVideo").submit();
    }
    else {
        document.getElementById("errorVideo").removeAttribute("hidden");
        // console.log("Error, no hay video");
    }
}

//Función que elimina el video puesto en el juego
function quitarVideo() {
    activarPantallaCargando();
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Quitando video")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/borrarVideo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego=" + datosJuego[0][0]);
    location.reload();
}

//Función que solicita modificar la demo del juego por el nuevo mandado que cumpla las condiciones dadas
function cambiarDemo() {
    var element = document.getElementById("addDemo");
    var addDemo = element.files;
    // console.log(addDemo);
    if (addDemo.length != '') {
        // console.log("demo valida, cambiando");
        guardarRuta(window.location);
        activarPantallaCargando();
        document.getElementById("formDemo").submit();
    }
    else {
        document.getElementById("errorDemo").removeAttribute("hidden");
        // console.log("Error, no hay demo");
    }
}

//Función que elimina la demo puesta en el juego
function quitarDemo() {
    // console.log('Quitando demo');
    activarPantallaCargando();
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Quitando Demo")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/borrarDemo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego=" + datosJuego[0][0]);
    location.reload();
}

//Función que guarda la ruta para devolver al usuario a esta página tras realizar la modificación deseada
function guardarRuta(ruta) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/guardarRuta.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("ruta=" + ruta);
    // location.reload();
}

//Función que modifica el campo deseado, llamando al modificador deseado, y mandandole los datos deseados
function modificarNewDataIndividual(datos, urlPHP) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/" + urlPHP, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("datos=" + datos+
                 "&idJuego=" + datosJuego[0][0]);
    location.reload();
}

//Función para eliminar el juego que se esta revisando
function borrarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, rechazando el juego con id "+idJuego);
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/borrarJuego.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego="+idJuego);
    window.location = "juegosSubidos.html";
}

