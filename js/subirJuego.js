var listaGeneros;
var generosSelected = [];
verifyUser();

$(document).ready(function () {
    escribirGeneros();
});

function verifyUser() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, comprobando usuario")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        // console.log(jsonDatos);
        if (jsonDatos != null) {
            var noPuedeEstar = false;

            if(jsonDatos[0][10] != 1 && jsonDatos[0][11] != 1)
                noPuedeEstar = true;

            if(noPuedeEstar){
                // console.log("Se ha accedido aqui sin permiso. Echando");
                window.location = "registro.html";
            }
        }
        else {
            // console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

function escribirGeneros() {
    var cajaGeneros = document.getElementById("cajaGeneros");

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, recogiendo los generos");
    //     }
    // }
    xmlhttp.open("POST", "php/generos/buscarGeneros.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaGeneros = JSON.parse(datos.target.response);
        for(var i = 0; i < listaGeneros.length; i++){
            cajaGeneros.innerHTML  += '<div class="col-2">' +
                                     '<div class="form-check">' +
                                     '<input class="form-check-input" type="checkbox" value="'+listaGeneros[i][0]+'" id=genero'+i+' name=genero'+i+'>' +
                                     '<label class="form-check-label" for="genero'+i+'" data-mdb-toggle="popover" data-mdb-placement="top" data-mdb-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." data-mdb-trigger="hover">'+listaGeneros[i][1]+'</label>' +
                                     '</div> </div>';
            document.getElementById("genero"+i).setAttribute("onclick","applyHidden('errorGenero')");
         }      
        cajaGeneros.innerHTML += "<span id='errorGenero' class='text-danger' hidden>Debes elegir al menos un genero</span>"
        });
    xmlhttp.send();

}

function addJuego() {
    var tituloJuego = document.getElementById("tituloJuego");
    var descripcionJuego = document.getElementById("descripcionJuego");
    var ficheroJuego = document.getElementById("ficheroJuego");
    var precio = document.getElementById("precio");
    var miniatura = document.getElementById("miniatura");
    var imagenesSecundarias = document.getElementById("imagenesSecundarias");
    var video = document.getElementById("video");
    var demo = document.getElementById("demo");

    if(precio.value == "")
        precio.value = 0;

    // console.log(precio.value);
    
    // console.log(tituloJuego.value);
    // console.log(descripcionJuego.value);
    // console.log(ficheroJuego.value);
    // console.log(precio.value);
    // console.log(miniatura.value);
    // console.log(imagenesSecundarias.value);
    // console.log(video.value);
    // console.log(demo.value);

    // console.log(miniatura.files);
    // console.log(imagenesSecundarias.files);

    // validarTituloJuego(tituloJuego.value);
    // validarJuegoSubido(ficheroJuego.files);
    // validarMiniatura(miniatura.files);
    // validarImagenesSec(imagenesSecundarias.files);
    // validarGeneros();

    if (validarTituloJuego(tituloJuego.value) &&
        validarJuegoSubido(ficheroJuego.files) &&
        validarMiniatura(miniatura.files) &&
        validarImagenesSec(imagenesSecundarias.files) &&
        validarPrecio(precio.value) &&
        validarGeneros() &&
        validarCaptcha()) {
            // console.log("El formulario es valido. Increible");
            return true;
            // return false;
    }

    else {
        // console.log("El formulario no es valido");
        window.scrollTo({
            top:0, behavior:"smooth"
          })
        if (!validarTituloJuego(tituloJuego.value))
            document.getElementById("errorTitulo").removeAttribute("hidden");
        if (!validarJuegoSubido(ficheroJuego.files))
            document.getElementById("errorFicheroJuego").removeAttribute("hidden");
        if (!validarMiniatura(miniatura.files))
            document.getElementById("errorMiniatura").removeAttribute("hidden");
        if (!validarImagenesSec(imagenesSecundarias.files))
            document.getElementById("errorImagSec").removeAttribute("hidden");
        if (!validarPrecio(precio.value))
            document.getElementById("errorPrecio").removeAttribute("hidden");
        if (!validarGeneros())
            document.getElementById("errorGenero").removeAttribute("hidden");
        if (!validarCaptcha())
            document.getElementById("errorCaptcha").removeAttribute("hidden");
    }

    return false;
}

function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

function validarTituloJuego(titulo) {
    if (titulo.length <= 0)
        return false;
    else
        return true;
}

function validarPrecio(precio) {
    if (precio < 0.00)
        return false;
    else
        return true;
}

function validarJuegoSubido(archivo) {
    // console.log("Informacion archivo:");
    // console.log(archivo);
    // console.log(archivo[0].name);

    if (archivo.length <= 0)
        return false;
    else
        return true;
}

function validarMiniatura(imagen) {
    // console.log("Informacion miniatura:");
    // console.log(imagen);
    // console.log(imagen[0].name);

    if (imagen.length <= 0)
        return false;
    else
        return true;
}

function validarImagenesSec(imagenes) {
    // console.log(imagenes);

    // for (var i = 0; i < imagenes.length; i++){
    //     console.log(imagenes[i].name);
    // }
    // console.log(imagenes);

    if (imagenes.length <= 0){
        document.getElementById("errorImagSec").textContent = "Debes subir al menos una imagen del juego";
        return false;
    }
    else if(imagenes.length > 5){
        document.getElementById("errorImagSec").textContent = "No puedes subir más de 5 imagenes";
        return false;
    }
    else
        return true;
}

function validarGeneros() {
    var esValido = false;
    generosSelected = [];

    for (var i = 0; i < listaGeneros.length; i++) {
        if(document.getElementById("genero"+i).checked){
            generosSelected.push(listaGeneros[i][0])
            esValido = true;
        }
    }
    // console.log("¿Es valido? "+esValido);
    // console.log(generosSelected);
    return esValido;
}

function validarCaptcha(){
    var response = grecaptcha.getResponse();
    // console.log(response);
    if (response.length <= 0)
        return false;
    else
        return true;
}