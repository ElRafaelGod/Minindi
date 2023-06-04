var datosUser;

$(document).ready(function () {
    dataUser();
});

function dataUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        datosUser = jsonDatos;
        if (jsonDatos != null) {
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

function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

function newUsername() {
    var element = document.getElementById("newUsername");
    var newUsername = element.value;
    if (newUsername.length > 5) {
        modificarNewDataIndividual(newUsername, "modificarUsername.php");
    }
    else {
        document.getElementById("errorUsername").removeAttribute("hidden");
    }
}

function newImagePerfil() {
    var element = document.getElementById("newImagen");
    var newImage = element.value;
    if (newImage != '') {
        console.log("Imagen valida, cambiando");
    }
    else {
        document.getElementById("errorImagen").removeAttribute("hidden");
        return false;
    }
}

function newPassword() {
    var element = document.getElementById("newPassword");
    var newPassword = element.value;
    if (newPassword.length > 5) {
        modificarNewDataIndividual(newPassword, "modificarPasswd.php");
    }
    else {
        document.getElementById("errorPassword").removeAttribute("hidden");
    }
}

function newDescripcion() {
    var element = document.getElementById("newDescripcion");
    var newDescripcion = element.value;
    modificarNewDataIndividual(newDescripcion, "modificarDescripcion.php");
}

function modificarNewDataIndividual(datos, urlPHP) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/" + urlPHP, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("datos=" + datos);
    window.location = "configuracion.html";
}

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

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "php/usuarios/modificarEnlaces.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("enlaceTwitter=" + newTwitter +
            "&enlaceFacebook=" + newFacebook +
            "&enlaceInstagram=" + newInstagram);
        window.location = "configuracion.html";
    }

}

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

function solicitarDeveloper() {
    document.getElementById("botonAscender").setAttribute("disabled",'true');
    document.getElementById("botonAscender").textContent = "Solicitud enviada";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/developerSolicitar.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    mostrarToast("solicitudEnviada");
}

function mostrarToast(toast) {
    var toastLiveExample = document.getElementById(toast);
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

function borrarUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/usuarios/borrarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    cerrarSesion();
}

