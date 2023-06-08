var datosUser;

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado
$(document).ready(function () {
    dataUser();
});

//Función que busca y coloca la información del usuario conectado. Si no se recibe datos de usuario, se redirige a otra pagina
function dataUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        datosUser = jsonDatos;
        if (jsonDatos != null) {
            //Si el usuario es developer, se elimina la caja para solicitar el ascenso
            if(jsonDatos[0][10] == 1){
                var elem = document.getElementById("solicitarDeveloper");
                elem.parentNode.removeChild(elem);
            }
            else if(comprobarSolicitud()){
                document.getElementById("botonAscender").setAttribute("disabled",'true');
                document.getElementById("botonAscender").textContent = "Solicitud enviada";
            }

            document.getElementById("oldUsername").innerText = jsonDatos[0][3];

            if (jsonDatos[0][5] != null && jsonDatos[0][5] != '')
                document.getElementById("oldDescripcion").innerText = jsonDatos[0][5];
            else
                document.getElementById("oldDescripcion").innerText = "No tienes ninguna descripcion escrita. ¡Animate a escribir algo sobre ti!";

            document.getElementById("facebookURL").value = jsonDatos[0][8];
            document.getElementById("twitterURL").value = jsonDatos[0][7];
            document.getElementById("instagramURL").value = jsonDatos[0][9];
        }
        else {
            window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

//Función que oculta el campo mandado
function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

//Función que solicita modifica el nombre de usuario por el nuevo mandado que cumpla las condiciones dadas
function newUsername() {
    var element = document.getElementById("newUsername");
    var newUsername = element.value;
    if (newUsername.length > 5) {
        activarPantallaCargando();
        modificarNewDataIndividual(newUsername, "modificarUsername.php");
    }
    else {
        document.getElementById("errorUsername").removeAttribute("hidden");
    }
}

//Función que modifica la imagen de perfil por el nuevo mandado que cumpla las condiciones dadas
function newImagePerfil() {
    var element = document.getElementById("newImagen");
    var newImage = element.value;
    if (newImage != '') {
        console.log("Imagen valida, cambiando");
        activarPantallaCargando();
    }
    else {
        document.getElementById("errorImagen").removeAttribute("hidden");
        return false;
    }
}

//Función que solicita modifica la contraseña del usuario por el nuevo mandado que cumpla las condiciones dadas
function newPassword() {
    var element = document.getElementById("newPassword");
    var newPassword = element.value;
    if (newPassword.length >= 8){
        if(newPassword.match(/[A-Z]/)){
            if(newPassword.match(/\d/)){
                activarPantallaCargando();
                modificarNewDataIndividual(newPassword, "modificarPasswd.php");
            }
            else
                document.getElementById("errorPassword").removeAttribute("hidden");
        }
        else
            document.getElementById("errorPassword").removeAttribute("hidden");
    }
    else
        document.getElementById("errorPassword").removeAttribute("hidden");
}

//Función que solicita modificar la descripcion del usuario por el nuevo mandado
function newDescripcion() {
    var element = document.getElementById("newDescripcion");
    var newDescripcion = element.value;
    activarPantallaCargando();
    modificarNewDataIndividual(newDescripcion, "modificarDescripcion.php");
}

//Función que modifica el campo deseado, llamando al modificador deseado, y mandandole los datos deseados
function modificarNewDataIndividual(datos, urlPHP) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/" + urlPHP, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("datos=" + datos);
    window.location = "configuracion.html";
}

//Función que modifica los enlaces a redes del usuario por los deseados, que cumplan las condiciones
function modificarEnlaces() {
    var element1 = document.getElementById("facebookURL");
    var element2 = document.getElementById("twitterURL");
    var element3 = document.getElementById("instagramURL");
    var newFacebook = element1.value;
    var newTwitter = element2.value;
    var newInstagram = element3.value;
    var FacebookValido = true;
    var twitterValido = true;
    var InstagramValido = true;

    if (newFacebook.length > 0)
        if (!newFacebook.includes('facebook.com/')) {
            document.getElementById("errorFacebook").removeAttribute("hidden");
            FacebookValido = false;
        }


    if (newTwitter.length > 0)
        if (!newTwitter.includes('twitter.com/')) {
            document.getElementById("errorTwitter").removeAttribute("hidden");
            twitterValido = false;
        }

    if (newInstagram.length > 0)
        if (!newInstagram.includes('instagram.com/')) {
            document.getElementById("errorInstagram").removeAttribute("hidden");
            InstagramValido = false;
        }

    if (twitterValido && FacebookValido && InstagramValido) {
        activarPantallaCargando();
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "php/usuarios/modificarEnlaces.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("enlaceTwitter=" + newTwitter +
            "&enlaceFacebook=" + newFacebook +
            "&enlaceInstagram=" + newInstagram);
        window.location = "configuracion.html";
    }

}

//Función que comprueba si el usuario ha solicitado ascender a desarrollador
function comprobarSolicitud() {
    var solicitudMandada = false;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/developerComprobarSolicitudPropia.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const respuesta =  JSON.parse(datos.target.response);
        if (respuesta[0] == 1) {
            solicitudMandada = true;
        }
    });
    xmlhttp.send();
    return solicitudMandada;
}

//Función que registra que el usuario ha mandado la solicitud de ascenso
function solicitarDeveloper() {
    document.getElementById("botonAscender").setAttribute("disabled",'true');
    document.getElementById("botonAscender").textContent = "Solicitud enviada";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/developerSolicitar.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    mostrarToast("solicitudEnviada");
}

//Función para mostrar el mensaje emergente que se especifique
function mostrarToast(toast) {
    var toastLiveExample = document.getElementById(toast);
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

//Función que elimina el usuario activo, y cierra su sesion
function borrarUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/borrarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    cerrarSesion();
}

