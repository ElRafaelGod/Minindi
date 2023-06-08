var listaGeneros;
var generosSelected = [];
verifyUser();

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado
$(document).ready(function () {
    escribirGeneros();
});

//Función que verifica que el usuario conectado es considerado valido para visitar la pagina
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
        //Si los datos recibidos del usuario conectado son null (no hay una cuenta activa), o no es developer o admin,
        //se redirige a otra página
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

//Función que imprime los generos disponibles en el formulario
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

//Función que valida los campos del formulario, y si todos los campos mirados son correctos, sube un nuevo juego.
//Si no, se muestra un mensaje de error en el campo que presente el error
function addJuego() {
    var tituloJuego = document.getElementById("tituloJuego");
    var ficheroJuego = document.getElementById("ficheroJuego");
    var precio = document.getElementById("precio");
    var miniatura = document.getElementById("miniatura");
    var imagenesSecundarias = document.getElementById("imagenesSecundarias");

    if(precio.value == "")
        precio.value = 0;

    if (validarTituloJuego(tituloJuego.value) &&
        validarJuegoSubido(ficheroJuego.files) &&
        validarMiniatura(miniatura.files) &&
        validarImagenesSec(imagenesSecundarias.files) &&
        validarPrecio(precio.value) &&
        validarGeneros() &&
        validarCaptcha()) {
            // console.log("El formulario es valido. Increible");
            activarPantallaCargando();
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

//Función que oculta el campo mandado
function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

//Funcion que valida que el campo de "Titulo del juego" cumpla las condiciones dadas
function validarTituloJuego(titulo) {
    if (titulo.length <= 0)
        return false;
    else
        return true;
}

//Funcion que valida que el campo de "Precio" cumpla las condiciones dadas
function validarPrecio(precio) {
    if (precio < 0.00)
        return false;
    else
        return true;
}

//Funcion que valida que el campo de "JuegoSubido" cumpla las condiciones dadas
function validarJuegoSubido(archivo) {
    if (archivo.length <= 0)
        return false;
    else
        return true;
}

//Funcion que valida que el campo de "Miniatura" cumpla las condiciones dadas
function validarMiniatura(imagen) {
    if (imagen.length <= 0)
        return false;
    else
        return true;
}

//Funcion que valida que el campo de "Imagenes secundarias" cumpla las condiciones dadas
function validarImagenesSec(imagenes) {
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

//Funcion que valida que se haya seleccionado al menos un genero
function validarGeneros() {
    var esValido = false;
    generosSelected = [];

    for (var i = 0; i < listaGeneros.length; i++) {
        if(document.getElementById("genero"+i).checked){
            generosSelected.push(listaGeneros[i][0])
            esValido = true;
        }
    }
    return esValido;
}

//Función que valida que el captcha ha sido aceptado
function validarCaptcha(){
    var response = grecaptcha.getResponse();
    if (response.length <= 0)
        return false;
    else
        return true;
}