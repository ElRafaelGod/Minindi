var listaUsers;
var listaGeneros;
var listaJuegos;
verifyUser()

//Función que verifica que el usuario conectado es considerado valido para visitar la pagina
function verifyUser() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        // console.log(jsonDatos);
        //Si los datos recibidos del usuario conectado son null (no hay una cuenta activa), o no es administrador, se redirige a otra página
        if (jsonDatos != null) {
            if (jsonDatos[0][11] != 1) {
                // console.log("Se ha accedido aqui sin permiso. Echando");
                window.location = "index.html";
            }
        }
        else {
            // console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "index.html";
        }
    });
    xmlhttp.send();
}

// // --------------------------------------------------------------------------------------------------------------
// // Seccion Consultar User

//Función que crea la tabla con la información de los usuarios
function tableUsers() {
    var contentTBody = "<tbody>";
    var tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = '';
    tabla.innerHTML += '<thead><tr>' +
        '<th>email</th>' +
        '<th>nombreCompleto</th>' +
        '<th>username</th>' +
        '<th>descripcion</th>' +
        '<th>userTwitter</th>' +
        '<th>userFacebook</th>' +
        '<th>userInstagram</th>' +
        '<th>esDeveloper</th>' +
        '<th>esAdmin</th>' +
        '<th>Editar</th>' +
        '<th>Eliminar</th>' +
        '</tr></thead>';

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/buscarUsuario.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaUsers = JSON.parse(datos.target.response);
        for (var i = 0; i < listaUsers.length; i++) {
            contentTBody += "<tr>";
            contentTBody += "<td id='id" + i + "_0'>" + listaUsers[i][1] + "</td>" + //Email 
                            "<td id='id" + i + "_1'>" + listaUsers[i][2] + "</td>" + //Nombre completo
                            "<td id='id" + i + "_2'>" + listaUsers[i][3] + "</td>" + //Username
                            "<td id='id" + i + "_3'>" + listaUsers[i][5] + "</td>" + //Descripcion
                            "<td id='id" + i + "_4'>" + listaUsers[i][7] + "</td>" + //UserTwitter
                            "<td id='id" + i + "_5'>" + listaUsers[i][8] + "</td>" + //UserFacebook
                            "<td id='id" + i + "_6'>" + listaUsers[i][9] + "</td>" + //UserInstagram
                            "<td id='id" + i + "_7'>" + listaUsers[i][10] + "</td>" + //EsDeveloper
                            "<td id='id" + i + "_8'>" + listaUsers[i][11] + "</td>"; //EsAdmin
            if (i == 0)
                contentTBody += '<td></td><td></td>';
            else {
                contentTBody += '<td> <button type="button" onclick="rellenarModalEditUser(' + i + ')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editarUser"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" /></svg></button></td>';
                contentTBody += '<td> <button type="button" onclick="rellenarModalDeleteUser(' + i + ')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borrarUser"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" /> </svg> </button> </td>';
            }
            contentTBody += "</tr>";
        }
        contentTBody += "</tbody>";
        tabla.innerHTML += contentTBody
    });
    xmlhttp.send();
}

//Función que rellena la ventana emergente para editar un usuario con la información del usuario deseado
function rellenarModalEditUser(idListaUser) {
    document.getElementById("editNombre").value = listaUsers[idListaUser][2];
    document.getElementById("editUsername").value = listaUsers[idListaUser][3];
    document.getElementById("editEmail").value = listaUsers[idListaUser][1];
    document.getElementById("editDescripcion").value = listaUsers[idListaUser][5];
    document.getElementById("editTwitter").value = listaUsers[idListaUser][7];
    document.getElementById("editFacebook").value = listaUsers[idListaUser][8];
    document.getElementById("editInstagram").value = listaUsers[idListaUser][9];
    if (listaUsers[idListaUser][11] == 1) {
        document.getElementById("developer1").checked = true;
        document.getElementById("developer2").checked = false;
    }
    else {
        document.getElementById("developer1").checked = false;
        document.getElementById("developer2").checked = true;
    }

    if (listaUsers[idListaUser][12] == 1) {
        document.getElementById("admin1").checked = true;
        document.getElementById("admin2").checked = false;
    }
    else {
        document.getElementById("admin1").checked = false;
        document.getElementById("admin2").checked = true;
    }

    var modalBottom = document.getElementById("footerEditarUser");
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar sin guardar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-primary" onclick="editarUser(' + listaUsers[idListaUser][0] + ')">Guardar cambios</button>';
}

//Función que edita la información del usuario deseado con la información mandada
function editarUser(idUser) {
    var nombreCompleto = document.getElementById("editNombre").value;
    var username = document.getElementById("editUsername").value;
    var email = document.getElementById("editEmail").value;
    var descripcion = document.getElementById("editDescripcion").value;
    var enlaceTwitter = document.getElementById("editTwitter").value;
    var enlaceFacebook = document.getElementById("editFacebook").value;
    var enlaceInstagram = document.getElementById("editInstagram").value;

    if (document.getElementById("developer1").checked)
        var esDeveloper = 1;
    else
        var esDeveloper = 0;

    if (document.getElementById("admin1").checked)
        var esAdmin = 1;
    else
        var esAdmin = 0;

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/modificarUsuario.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id=' + idUser +
        '&nombre=' + nombreCompleto +
        '&username=' + username +
        '&email=' + email +
        '&descripcion=' + descripcion +
        '&enlaceTwitter=' + enlaceTwitter +
        '&enlaceFacebook=' + enlaceFacebook +
        '&enlaceInstagram=' + enlaceInstagram +
        '&esDeveloper=' + esDeveloper +
        '&esAdmin=' + esAdmin);
    window.location = "adminView.html";
}

//Función que rellena la ventana emergente para borrar un usuario con la información del usuario deseado
function rellenarModalDeleteUser(idSelectUser) {
    var modalBottom = document.getElementById("footerBorrarUser");
    document.getElementById("infoUser").textContent = listaUsers[idSelectUser][3] + " (id: " + listaUsers[idSelectUser][0] + ")";
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-danger" onclick="borrarUser(' + listaUsers[idSelectUser][0] + ')">Eliminar</button>';
}

//Función que borrar al usuario deseado
function borrarUser(idUser) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/borrarUsuario.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id=' + idUser);
    window.location = "adminView.html";
}

// // --------------------------------------------------------------------------------------------------------------
// // Seccion Consultar Juegos

//Función que crea la tabla con la información de los juegos
function tableJuegos() {
    var contentTBody = "<tbody>";
    var tabla = document.getElementById("tablaJuegos");
    tabla.innerHTML = '';
    tabla.innerHTML += '<thead><tr>' +
                            '<th>nombreJuego</th>' +
                            '<th>descripcion</th>' +
                            '<th>precio</th>' +
                            '<th>validado</th>' +
                            '<th>Editar</th>' +
                            '<th>Eliminar</th>' +
                        '</tr></thead>';

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegos.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        console.log(listaJuegos);
        for (var i = 0; i < listaJuegos.length; i++) {
            contentTBody += "<tr>";
            contentTBody += "<td id='id" + i + "_0'>" + listaJuegos[i][2] + "</td>" + //Nombre del juego 
                            "<td id='id" + i + "_2'>" + listaJuegos[i][3] + "</td>" + //Descripcion del juego
                            "<td id='id" + i + "_3'>" + listaJuegos[i][5] + "</td>" + //Precio del juego
                            "<td id='id" + i + "_4'>" + listaJuegos[i][9] + "</td>" ; //EsValidado
            contentTBody += '<td> <button type="button" onclick="rellenarModalEditJuegos(' + i + ')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editarJuego"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" /></svg></button></td>';
            contentTBody += '<td> <button type="button" onclick="rellenarModalDeleteJuegos(' + i + ')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borrarJuego"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" /> </svg> </button> </td>';
            contentTBody += "</tr>";
        }
        contentTBody += "</tbody>";
        tabla.innerHTML += contentTBody
    });
    xmlhttp.send();
}

//Función que rellena la ventana emergente para editar un juego con la información del juego deseado
function rellenarModalEditJuegos(idListaJuego) {
    document.getElementById("editTituloJuego").value = listaJuegos[idListaJuego][2];
    document.getElementById("editDescripcionJuego").value = listaJuegos[idListaJuego][3];
    document.getElementById("editPrecioJuego").value = listaJuegos[idListaJuego][5];

    if (listaJuegos[idListaJuego][9] == 1) {
        document.getElementById("validado1").checked = true;
        document.getElementById("validado2").checked = false;
    }
    else {
        document.getElementById("validado1").checked = false;
        document.getElementById("validado2").checked = true;
    }

    var modalBottom = document.getElementById("footerEditarJuego");
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar sin guardar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-primary" onclick="editarJuego(' + listaJuegos[idListaJuego][0] + ')">Guardar cambios</button>';
}

//Función que edita la información del juego deseado con la información mandada
function editarJuego(idJuego) {
    var tituloJuego = document.getElementById("editTituloJuego").value;
    var descripcionJuego = document.getElementById("editDescripcionJuego").value;
    var precioJuego = document.getElementById("editPrecioJuego").value;

    if (document.getElementById("validado1").checked)
        var validado = 1;
    else
        var validado = 0;

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/modificarJuegoAdmin.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('idJuego=' + idJuego +
        '&titulo=' + tituloJuego +
        '&descripcion=' + descripcionJuego +
        '&precio=' + precioJuego +
        '&validado=' + validado);

    window.location = "adminView.html";
}

//Función que rellena la ventana emergente para borrar un juego con la información del juego deseado
function rellenarModalDeleteJuegos(idSelectJuego) {
    var modalBottom = document.getElementById("footerBorrarJuego");
    document.getElementById("infoJuego").textContent = listaJuegos[idSelectJuego][2] + " (id: " + listaJuegos[idSelectJuego][0] + ") ";
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-danger" onclick="borrarJuego(' + listaJuegos[idSelectJuego][0] + ')">Eliminar</button>';
}

//Función que borrar el juego deseado
function borrarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/borrarJuego.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('idJuego=' + idJuego);
    window.location = "adminView.html";
}

// // --------------------------------------------------------------------------------------------------------------
// // Seccion Consultar Genero

//Función que crea la tabla con la información de los generos
function tableGeneros() {
    var contentTBody = "<tbody>";
    var tabla = document.getElementById("tablaGeneros");
    tabla.innerHTML = '';
    tabla.innerHTML += '<thead><tr><th>id</th><th>nombreGenero</th><th>descripcion</th><th>Editar</th><th>Eliminar</th></tr></thead>';

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/generos/buscarGeneros.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaGeneros = JSON.parse(datos.target.response);
        for (var i = 0; i < listaGeneros.length; i++) {
            contentTBody += "<tr>";
            for (var j = 0; j < 3; j++) {
                if (listaGeneros[i][j] == '')
                    contentTBody += "<td id='id" + i + "_" + j + "'>null</td>";
                else
                    contentTBody += "<td id='id" + i + "_" + j + "'>" + listaGeneros[i][j] + "</td>";
            }
            contentTBody += '<td> <button type="button" onclick="rellenarModalEditGenero(' + i + ')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editarGenero"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" /></svg></button></td>';
            contentTBody += '<td> <button type="button" onclick="rellenarModalDeleteGenero(' + i + ')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borrarGenero"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" /> </svg> </button> </td>';
            contentTBody += "</tr>";
        }
        contentTBody += "</tbody>";
        tabla.innerHTML += contentTBody;
    });
    xmlhttp.send();
}

//Función que rellena la ventana emergente para editar un genero con la información del genero deseado
function rellenarModalEditGenero(idListaGenero) {
    document.getElementById("editNombreGenero").value = listaGeneros[idListaGenero][1];
    document.getElementById("editDescripcionGenero").value = listaGeneros[idListaGenero][2];

    var modalBottom = document.getElementById("footerEditarGenero");
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar sin guardar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-primary" onclick="editarGenero(' + listaGeneros[idListaGenero][0] + ')">Guardar cambios</button>';
}

//Función que edita la información del genero deseado con la información mandada
function editarGenero(idUser) {
    var nombreGenero = document.getElementById("editNombreGenero").value;
    var descripcionGenero = document.getElementById("editDescripcionGenero").value;

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/generos/modificarGenero.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('idGenero=' + idUser +
        '&newNombreGenero=' + nombreGenero +
        '&newDescripcionGenero=' + descripcionGenero);
    window.location = "adminView.html";
}

//Función que rellena la ventana emergente para borrar un genero con la información del genero deseado
function rellenarModalDeleteGenero(idSelectGenero) {
    var modalBottom = document.getElementById("footerBorrarGenero");
    document.getElementById("infoGenero").textContent = listaGeneros[idSelectGenero][1] + " (id: " + listaGeneros[idSelectGenero][0] + ")";
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-danger" onclick="borrarGenero(' + listaGeneros[idSelectGenero][0] + ')">Eliminar</button>';
}

//Función que borrar el genero deseado
function borrarGenero(idGenero) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/generos/borrarGenero.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id=' + idGenero);
    window.location = "adminView.html";
}

// // --------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------
// // Seccion Añadir User

//Función para añadir un nuevo usuario
function addUser() {
    var nombreCompleto = document.getElementById("nombre");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password1 = document.getElementById("password1");
    var password2 = document.getElementById("password2");
    //Valores opcionales
    var enlaceTwitter = document.getElementById("twitter");
    var enlaceFacebook = document.getElementById("facebook");
    var enlaceInstagram = document.getElementById("instagram");

    if (validarNombre(nombreCompleto.value) &&
        validarUsername(username.value) &&
        validarCorreo(email.value) &&
        validadPassword(password1.value) &&
        duplicaCorrecta(password1.value, password2.value)) {

        console.log("Los valores obligatorios son validos");

        if (!correoLibre(email.value)) {
            // console.log("El correo es invalido");
            return false;
        }

        if (validarTwitter(enlaceTwitter.value) &&
            validarFacebook(enlaceFacebook.value) &&
            validarInstagram(enlaceInstagram.value)) {

            // console.log("Los valores no obligatorios son validos");
            return true;
        }
        //Si no son todos validos, se muestra mensaje de error en el campo erroneo
        else {
            if (!validarTwitter(enlaceTwitter.value))
                document.getElementById("errorTwitter").removeAttribute("hidden");
            if (!validarFacebook(enlaceFacebook.value))
                document.getElementById("errorFacebook").removeAttribute("hidden");;
            if (!validarInstagram(enlaceInstagram.value))
                document.getElementById("errorInstagram").removeAttribute("hidden");;
        }
        return false;
    }
    //Si no son todos validos, se muestra mensaje de error en el campo erroneo
    else {
        // console.log("No es valido");
        if (!validarNombre(nombreCompleto.value))
            document.getElementById("errorNombre").removeAttribute("hidden");
        if (!validarUsername(username.value))
            document.getElementById("errorUsername").removeAttribute("hidden");
        if (!validarCorreo(email.value))
            document.getElementById("errorEmail").removeAttribute("hidden");
        if (!validadPassword(password1.value))
            document.getElementById("errorPasswd1").removeAttribute("hidden");
        if (!duplicaCorrecta(password1.value, password2.value))
            document.getElementById("errorPasswd2").removeAttribute("hidden");
    }
    return false;

}

//Función que oculta el campo mandado
function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

//Función que habilita el boton para validar el formulario al aceptarse los terminos y condiciones
function confirmTerms(campo) {
    if (campo.checked)
        document.getElementById("submitButton").disabled = false;
    else
        document.getElementById("submitButton").disabled = true;
}

//Funcion que valida que el campo de "Nombre y apellidos" cumpla las condiciones dadas
function validarNombre(nombre) {
    if (nombre.length <= 0)
        return false;
    else
        return true;
}

//Funcion que valida que el campo de "Username" cumpla las condiciones dadas
function validarUsername(username) {
    if (username.length < 5) {
        return false;
    }
    else
        return true;
}

//Funcion que valida que el campo de "Email" cumpla las condiciones dadas
function validarCorreo(correo) {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(correo)) {
        return true;
    }
    else {
        return false;
    }
}

//Funcion que valida que el campo de "Contraseña" cumpla las condiciones dadas
function validadPassword(password) {
    if (password.length >= 8) {
        if (password.match(/[A-Z]/)) {
            if (password.match(/\d/)) {
                return true;
            }
            else
                return false;
        }
        else
            return false;
    }
    else
        return false;
}

//Funcion que valida que "Contraseña" y "Confirmar contraseña" sean lo mismo
function duplicaCorrecta(password, password2) {
    if (password == password2)
        return true;
    else
        return false;
}

//Funcion que valida que el campo de "twitter" cumpla las condiciones dadas
function validarTwitter(urlTwitter) {
    if (urlTwitter.length == 0)
        return true;
    else {
        if (urlTwitter.includes("twitter.com/"))
            return true;
        else
            return false;
    }
}

//Funcion que valida que el campo de "facebook" cumpla las condiciones dadas
function validarFacebook(urlFacebook) {
    if (urlFacebook.length == 0)
        return true;
    else {
        if (urlFacebook.includes("facebook.com/"))
            return true;
        else
            return false;
    }
}

//Funcion que valida que el campo de "instagram" cumpla las condiciones dadas
function validarInstagram(urlInstagram) {
    if (urlInstagram.length == 0)
        return true;
    else {
        if (urlInstagram.includes("instagram.com/"))
            return true;
        else
            return false;
    }
}

//Funcion que valida que el correo introducido no este ya en uso
function correoLibre(correo) {
    var estaLibre = true;
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioEmail.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        var respuesta = datos.target.response.toString();
        respuesta = respuesta.replaceAll(" ", '');
        if (respuesta == "false") {
            estaLibre = false;
        }

    });
    xmlhttp.send("email=" + correo);
    return estaLibre;
}

// // --------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------
// // Seccion Añadir Genero

//Función para añadir un nuevo genero
function addGenero() {
    var nombreGenero = document.getElementById("addNombreGenero");
    var descripcionGenero = document.getElementById("addDescripcionGenero");

    console.log(nombreGenero.value);
    console.log(descripcionGenero.value);

    if (nombreGenero.value.length >= 5) {
        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Parece que va bien")
        //     }
        // }
        xmlhttp.open("POST", "php/generos/addGenero.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("nombreGenero=" + nombreGenero.value +
            "&descripcionGenero=" + descripcionGenero.value);
        window.location = "adminView.html";
    }
    else {
        document.getElementById("errorNombreGenero").removeAttribute("hidden");
    }
}

//Función que habilita el boton para validar el formulario de introducir un nuevo genero
function confirmGenero(campo) {
    if (campo.checked)
        document.getElementById("submitGeneroButton").disabled = false;
    else
        document.getElementById("submitGeneroButton").disabled = true;
}

// // --------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------
// // Seccion Revisar Juegos

//Función para obtener e imprimir una lista con los juegos que no han sido validados
function obtenerJuegosNoValidados() {
    var cartaJuego = document.getElementById("cardJuegosNoValidados");
    cartaJuego.innerHTML = '';

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien");
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosNoValidados.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        // console.log(listaJuegos);
        for (var i = 0; i < listaJuegos.length; i++) {
            // colocarJuego(listaJuegos[i][5],listaJuegos[i][0]);
            var contentTBody = "<div class='card' id='cardJuego" + listaJuegos[i][0] + "'>" +
                "<div class='card-header'>" +
                "<div class='row'>" +
                "<div class='col-7'>" +
                "<h2>" + listaJuegos[i][2] + "</h2>" +
                "</div>" +
                "<div class='col'>" +
                "<button class='btn btn-danger float-end ms-3 mb-1' id='rechazarJuego" + listaJuegos[i][0] + "'>Rechazar</button>" +
                "<button class='btn btn-dark float-end ms-3 mb-1'  id='validarJuego" + listaJuegos[i][0] + "'>Validar</button>" +
                "<button class='btn btn-dark float-end ms-3 mb-1'  id='descargarJuego" + listaJuegos[i][0] + "'>Descargar</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
            cartaJuego.innerHTML += contentTBody;
            document.getElementById("descargarJuego" + listaJuegos[i][0]).setAttribute("onclick", "colocarJuego('" + listaJuegos[i][4] + "')");
            document.getElementById("validarJuego" + listaJuegos[i][0]).setAttribute("onclick", "validarJuego('" + listaJuegos[i][0] + "')");
            document.getElementById("rechazarJuego" + listaJuegos[i][0]).setAttribute("onclick", "rechazarJuego('" + listaJuegos[i][0] + "')");
        }
    });
    xmlhttp.send();
}

//Función para obtener de forma correcta el nombre del juego a descargar, y solicitar su descarga
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
        DownloadFromUrl(nombreFichero, rutaJuego);
    });
    xmlhttp.send("rutaArchivo=" + rutaJuego);
}

//Función para descargar un archivo con el nombre y la ruta dada
function DownloadFromUrl(fileName, rutaJuego) {
    var link = document.createElement('a');
    link.href = rutaJuego;
    link.download = fileName.substring(0, (fileName.length - 2));

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

//Función para validar el juego deseado
function validarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, validemos el juego de id " + idJuego);
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/validarJuego.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego=" + idJuego);

    var elem = document.getElementById("cardJuego" + idJuego);

    elem.parentNode.removeChild(elem);
    mostrarToast('validacionAceptada');
}

//Función para rechazar el juego deseado
function rechazarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, rechazando el juego con id " + idJuego);
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/borrarJuego.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego=" + idJuego);

    var elem = document.getElementById("cardJuego" + idJuego);
    elem.parentNode.removeChild(elem);
    mostrarToast('validacionRechazada');
}

// // --------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------
// // Seccion Solicitudes Developer

//Función para obtener la lista de usuarios que solicitan ascender
function obtenerSolicitudesDeveloper() {
    document.getElementById("cardUsuarioNoDeveloper").innerHTML = "";
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Cojamos la lista de solicitudes");
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/developerComprobarSolicitudes.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaIdUsers = JSON.parse(datos.target.response);
        console.log(listaIdUsers);
        if (listaIdUsers != null) {
            for (var i = 0; i < listaIdUsers.length; i++) {
                colocarUser(listaIdUsers[i]);
            }
        }
    });
    xmlhttp.send();
}

//Función para imprimir una lista con los usuarios que solicitan ascender a developer
function colocarUser(datosUser) {
    var contentTBody = "<div class='card' id='cardAscenso" + datosUser[0] + "'>" +
        "<div class='card-header'>" +
        "<div class='row'>" +
        "<div class='col-7'>" +
        "<a class='text-decoration-none text-dark fs-2 userNameURL' href='perfil.html?id=" + datosUser[0] + "'>" + datosUser[3] + "</a>" +
        "</div>" +
        "<div class='col'>" +
        "<button class='btn btn-danger float-end ms-3 mb-1' id='rechazarAscenso" + datosUser[0] + "'>Rechazar</button>" +
        "<button class='btn btn-success float-end ms-3 mb-1'  id='validarAscenso" + datosUser[0] + "'>Ascender usuario</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

    document.getElementById("cardUsuarioNoDeveloper").innerHTML += contentTBody;

    document.getElementById("validarAscenso" + datosUser[0][0]).setAttribute("onclick", "validarDeveloper('" + datosUser[0][0] + "')");
    document.getElementById("rechazarAscenso" + datosUser[0][0]).setAttribute("onclick", "rechazarDeveloper('" + datosUser[0][0] + "')");
}

//Función para validar el ascenso del usuario deseado
function validarDeveloper(idUser) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Ascendiendo al user " + idUser);
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/developerAscender.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idUser=" + idUser);

    var elem = document.getElementById("cardAscenso" + idUser);
    elem.parentNode.removeChild(elem);

    mostrarToast('ascensoAceptado')
    quitarSolicitudDeveloper(idUser);
}

//Función para rechazar el ascenso del usuario deseado
function rechazarDeveloper(idUser) {
    var elem = document.getElementById("cardAscenso" + idUser);
    elem.parentNode.removeChild(elem);

    mostrarToast('ascensoRechazado')
    quitarSolicitudDeveloper(idUser);
}

//Función para borrar la solicitud de ascenso del usuario deseado
function quitarSolicitudDeveloper(idUser) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Ascendiendo al user " + idUser);
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/developerBorrarSolicitud.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idUser=" + idUser);
}

//Función para mostrar el mensaje emergente que se especifique
function mostrarToast(toast) {
    var toastLiveExample = document.getElementById(toast);
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}

