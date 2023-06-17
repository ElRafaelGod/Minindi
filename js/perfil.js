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

    if (idExterna == null) {
        // console.log("Es el perfil del propio usuario");
        dataUserConectado();
    }
    else if (!Number(idExterna)) {
        // console.log("La URL no tiene una id");
        errorUsuarioNoExiste();
    }
    else {
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
            // console.log("'" + respuesta + "'");
            if (respuesta == 1) {
                // console.log("El usuario esta viendo su propia cuenta")
                dataUserConectado();
            }
            else {
                // console.log("El usuario esta viendo otra cuenta ajena")
                dataUserExterno(idExterna);
            }

        });
        xmlhttp.send("idExterna=" + idExterna);
    }
}

//Función que ajustará el menu de navegación cuando se mire a un usuario diferente del conectado 
function ajustesUserExterno(id) {
    // console.log("Viendo las cosas de '" + id + "'");
    document.getElementById("listaDeseos").hidden = true;
    document.getElementById("configuracion").hidden = true;
    document.getElementById("listaDeseos2").hidden = true;
    document.getElementById("configuracion2").hidden = true;

    document.getElementById("perfil").href = "perfil.html?id=" + id;
    document.getElementById("perfil2").href = "perfil.html?id=" + id;

    document.getElementById("juegosComprados").href = "juegosComprados.html?id=" + id;
    document.getElementById("juegosComprados2").href = "juegosComprados.html?id=" + id;

    document.getElementById("juegosPublicados").href = "juegosSubidos.html?id=" + id;
    document.getElementById("juegosPublicados2").href = "juegosSubidos.html?id=" + id;
}

//Función que manda recoger la información del usuario activo, y la manda colocar en la pagina
function dataUserConectado() {
    // console.log("Verificando rango conectado");
    var dataUser = obtenerDataUser("buscarUsuarioActivo.php");
    // console.log(dataUser);
    ponerContenidoUser(dataUser);
    if (dataUser[0][6] != null && dataUser[0][6] != "") {
        // console.log("El user externo tiene imagen, poniendo...");
        document.getElementById("imgPerfil").src = dataUser[0][6];
    }
}

//Función que manda recoger la información de un usuario especificado, y la manda colocar en la pagina
function dataUserExterno(id) {
    const dataUser = obtenerDataUser("buscarUsuarioID.php", id);
    // console.log(dataUser);
    ponerContenidoUser(dataUser);
    ajustesUserExterno(id);
    if (dataUser != null) {
        if (dataUser[0][6] != null && dataUser[0][6] != "") {
            document.getElementById("imgPerfil").src = dataUser[0][6];
            // console.log("El user externo tiene imagen, poniendo...");
        }
    }
}

//Función que obtiene la información del usuario deseado segun la url mandada, y la devuelve
function obtenerDataUser(url, id) {
    var xmlhttp = new XMLHttpRequest();
    var datosUser;
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/" + url, false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        datosUser = JSON.parse(datos.target.response);
    });
    xmlhttp.send("id=" + id);
    return datosUser;
}

//Función que coloca la informacion del usuario mandado en la página
function ponerContenidoUser(jsonDatos) {
    if (jsonDatos != null) {
        // console.log("Cogiendo datos del usuario");
        document.getElementById("usernamePerfil").innerText = jsonDatos[0][3];
        document.title = "Perfil de " + jsonDatos[0][3];

        if (jsonDatos[0][5] != null && jsonDatos[0][5] != '')
            document.getElementById("descripcionPerfil").innerText = jsonDatos[0][5];
        else {
            document.getElementById("descripcionPerfil").innerText = "No tienes ninguna descripcion escrita. ¡Animate a escribir algo sobre ti!";
        }

        if (jsonDatos[0][7] != null || jsonDatos[0][8] != null || jsonDatos[0][9] != null) {
            if (jsonDatos[0][8] == null || jsonDatos[0][8] == "")
                document.getElementById("facebookCol").hidden = true;
            else
                document.getElementById("facebookPerfil").href = jsonDatos[0][8];

            if (jsonDatos[0][7] == null || jsonDatos[0][7] == "")
                document.getElementById("twitterCol").hidden = true;
            else
                document.getElementById("twitterPerfil").href = jsonDatos[0][7];

            if (jsonDatos[0][9] == null || jsonDatos[0][9] == "")
                document.getElementById("instagramCol").hidden = true;
            else
                document.getElementById("instagramPerfil").href = jsonDatos[0][9];
        }
        else {
            document.getElementById('cardRedes').hidden = true;
            document.getElementById('cardNoRedes').removeAttribute('hidden');
        }

        if (jsonDatos[0][10] == 1 && jsonDatos[0][11] == 1) {
            document.getElementById("imgPerfil").classList.add('border', 'border-4', 'border-info');
        }
        else if (jsonDatos[0][10] == 1) {
            document.getElementById("imgPerfil").classList.add('border', 'border-4', 'border-warning');
        }
        else if (jsonDatos[0][11] == 1) {
            document.getElementById("imgPerfil").classList.add('border', 'border-4', 'border-info');
        }
        else if (jsonDatos[0][10] == 0 && jsonDatos[0][11] == 0) {
            document.getElementById("imgPerfil").classList.add('border', 'border-4', 'border-success');
        }

    }
    else {
        console.log("No hay info, el user no existe");
        errorUsuarioNoExiste();
    }
}

//Función que hace aparecer la caja de error de la página cuando no se cumple los requisitos
function errorUsuarioNoExiste() {
    document.getElementById("contentCuerpo").hidden = true;
    document.getElementById("errorUser").hidden = false;
}



