var listaUsers;
var listaGeneros;
var listaJuegos;

verifyUser()

function verifyUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien")
        }
    }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        console.log(jsonDatos);
        if (jsonDatos != null) {
            if (jsonDatos[0][11] != 1){
                console.log("Se ha accedido aqui sin permiso. Echando");
                window.location = "index.html";
            }
        }
        else {
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "index.html";
        }
    });
    xmlhttp.send();
}

// // --------------------------------------------------------------------------------------------------------------
// // Seccion Consultar User

function tableUsers() {
    var contentTBody="<tbody>";
    // var tabla =  document.getElementById("tablaUser");
    var tabla =  document.getElementById("tablaUsuarios");
    tabla.innerHTML = '';
    tabla.innerHTML += '<thead><tr><th>id</th><th>email</th><th>nombreCompleto</th><th>username</th><th>password</th><th>descripcion</th><th>imagenUsuario</th><th>userTwitter</th><th>userFacebook</th><th>userInstagram</th><th>esUser</th><th>esDeveloper</th><th>esAdmin</th><th>Editar</th><th>Eliminar</th></tr></thead>';
   
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/usuarios/buscarUsuario.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaUsers = JSON.parse(datos.target.response);
        for(var i = 0; i < listaUsers.length; i++){
            contentTBody += "<tr>";
             for(var j = 0; j < 13; j++){
                 if(listaUsers[i][j] == '')
                     contentTBody += "<td id='id"+i+"_"+j+"'>null</td>";
                 else
                     contentTBody += "<td id='id"+i+"_"+j+"'>"+listaUsers[i][j]+"</td>";
             }
             if(i==0)
                 contentTBody +='<td></td><td></td>';
             else{
                 contentTBody += '<td> <button type="button" onclick="rellenarModalEditUser('+i+')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editarUser"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" /></svg></button></td>';
                 contentTBody += '<td> <button type="button" onclick="rellenarModalDeleteUser('+i+')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borrarUser"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" /> </svg> </button> </td>';
             }
             contentTBody += "</tr>";
         }
         contentTBody += "</tbody>";
         tabla.innerHTML += contentTBody
    });
    xmlhttp.send();
}

function rellenarModalEditUser(idListaUser) {
    document.getElementById("editNombre").value = listaUsers[idListaUser][2];
    document.getElementById("editUsername").value = listaUsers[idListaUser][3];
    document.getElementById("editEmail").value = listaUsers[idListaUser][1];
    document.getElementById("editDescripcion").value = listaUsers[idListaUser][5];
    document.getElementById("editTwitter").value = listaUsers[idListaUser][7];
    document.getElementById("editFacebook").value = listaUsers[idListaUser][8];
    document.getElementById("editInstagram").value = listaUsers[idListaUser][9];
    if(listaUsers[idListaUser][11] == 1){
        document.getElementById("developer1").checked  = true;
        document.getElementById("developer2").checked  = false;
    }
    else{
        document.getElementById("developer1").checked  = false;
        document.getElementById("developer2").checked  = true;
    }

    if(listaUsers[idListaUser][12] == 1){
        document.getElementById("admin1").checked  = true;
        document.getElementById("admin2").checked  = false;
    }
    else{
        document.getElementById("admin1").checked  = false;
        document.getElementById("admin2").checked  = true;
    }

    var modalBottom = document.getElementById("footerEditarUser");
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar sin guardar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-primary" onclick="editarUser('+listaUsers[idListaUser][0]+')">Guardar cambios</button>';
}

function editarUser(idUser) {
    console.log("Editando a usuario "+ idUser);
    var nombreCompleto = document.getElementById("editNombre").value;
    var username = document.getElementById("editUsername").value;
    var email = document.getElementById("editEmail").value;
    var descripcion = document.getElementById("editDescripcion").value;
    var enlaceTwitter = document.getElementById("editTwitter").value;
    var enlaceFacebook = document.getElementById("editFacebook").value;
    var enlaceInstagram = document.getElementById("editInstagram").value;

    if(document.getElementById("developer1").checked)
        var esDeveloper = 1;
    else
        var esDeveloper = 0;

    if(document.getElementById("admin1").checked)
        var esAdmin = 1;
    else
        var esAdmin = 0;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/usuarios/modificarUsuario.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id='+ idUser + 
                 '&nombre='+ nombreCompleto + 
                 '&username='+ username + 
                 '&email='+ email + 
                 '&descripcion='+ descripcion + 
                 '&enlaceTwitter='+ enlaceTwitter + 
                 '&enlaceFacebook='+ enlaceFacebook + 
                 '&enlaceInstagram='+ enlaceInstagram + 
                 '&esDeveloper='+ esDeveloper + 
                 '&esAdmin='+ esAdmin );
    window.location = "adminView.html";
}

function rellenarModalDeleteUser(idSelectUser) {
    var modalBottom = document.getElementById("footerBorrarUser");
    document.getElementById("infoUser").textContent = listaUsers[idSelectUser][3] + " (id: "+listaUsers[idSelectUser][0]+")";
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-danger" onclick="borrarUser('+listaUsers[idSelectUser][0]+')">Eliminar</button>';
}

function borrarUser(idUser) {
    console.log("Borrando a usuario "+ idUser);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/usuarios/borrarUsuario.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id='+idUser);
    window.location = "adminView.html";
}

// // --------------------------------------------------------------------------------------------------------------
// // Seccion Consultar Juegos

function tableJuegos() {
    var contentTBody="<tbody>";
    var tabla =  document.getElementById("tablaJuegos");
    tabla.innerHTML = '';
    tabla.innerHTML += '<thead><tr><th>id</th><th>idUsuario</th><th>nombreJuego</th><th>descripcion</th><th>precio</th><th>enlaceJuego</th><th>miniatura</th><th>video</th><th>enlaceDemo</th><th>validado</th><th>Editar</th><th>Eliminar</th></tr></thead>';
   
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/juegos/buscarJuegos.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        console.log(listaJuegos);
        for(var i = 0; i < listaJuegos.length; i++){
            contentTBody += "<tr>";
             for(var j = 0; j < 10; j++){
                 if(listaJuegos[i][j] == '')
                     contentTBody += "<td id='id"+i+"_"+j+"'>null</td>";
                 else
                     contentTBody += "<td id='id"+i+"_"+j+"'>"+listaJuegos[i][j]+"</td>";
             }
             contentTBody += '<td> <button type="button" onclick="rellenarModalEditJuegos('+i+')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editarJuego"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" /></svg></button></td>';
             contentTBody += '<td> <button type="button" onclick="rellenarModalDeleteJuegos('+i+')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borrarJuego"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" /> </svg> </button> </td>';
             // if(i==0)
             //     contentTBody +='<td></td><td></td>';
             // else{
             // }
             contentTBody += "</tr>";
         }
         contentTBody += "</tbody>";
         tabla.innerHTML += contentTBody
    });
    xmlhttp.send(); 
}

function rellenarModalEditJuegos(idListaJuego) {
    document.getElementById("editTituloJuego").value = listaJuegos[idListaJuego][2];
    document.getElementById("editDescripcionJuego").value = listaJuegos[idListaJuego][3];
    document.getElementById("editPrecioJuego").value = listaJuegos[idListaJuego][5];

    if(listaJuegos[idListaJuego][9] == 1){
        document.getElementById("validado1").checked  = true;
        document.getElementById("validado2").checked  = false;
    }
    else{
        document.getElementById("validado1").checked  = false;
        document.getElementById("validado2").checked  = true;
    }

    var modalBottom = document.getElementById("footerEditarJuego");
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar sin guardar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-primary" onclick="editarJuego('+listaJuegos[idListaJuego][0]+')">Guardar cambios</button>';
}

function editarJuego(idJuego) {
    console.log("Editando a juego "+ idJuego);
    var tituloJuego = document.getElementById("editTituloJuego").value;
    var descripcionJuego = document.getElementById("editDescripcionJuego").value;
    var precioJuego = document.getElementById("editPrecioJuego").value;

    if(document.getElementById("validado1").checked)
        var validado = 1;
    else
        var validado = 0;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/juegos/modificarJuegoAdmin.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('idJuego='+ idJuego + 
                 '&titulo='+ tituloJuego + 
                 '&descripcion='+ descripcionJuego + 
                 '&precio='+ precioJuego +
                 '&validado='+validado);

    window.location = "adminView.html";
}

function rellenarModalDeleteJuegos(idSelectJuego) {
    var modalBottom = document.getElementById("footerBorrarJuego");
    document.getElementById("infoJuego").textContent = listaJuegos[idSelectJuego][2] + " (id: "+listaJuegos[idSelectJuego][0]+") ";
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-danger" onclick="borrarJuego('+listaJuegos[idSelectJuego][0]+')">Eliminar</button>';
}

function borrarJuego(idJuego) {
    console.log("Borrando a juego "+ idJuego);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/juegos/borrarJuego.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('idJuego='+idJuego);
    window.location = "adminView.html";
}

// // --------------------------------------------------------------------------------------------------------------
// // Seccion Consultar Genero
function tableGeneros() {
    var contentTBody="<tbody>";
    var tabla =  document.getElementById("tablaGeneros");
    tabla.innerHTML = '';
    tabla.innerHTML += '<thead><tr><th>id</th><th>nombreGenero</th><th>descripcion</th><th>Editar</th><th>Eliminar</th></tr></thead>';
   
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/generos/buscarGeneros.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaGeneros = JSON.parse(datos.target.response);
        for(var i = 0; i < listaGeneros.length; i++){
            contentTBody += "<tr>";
             for(var j = 0; j < 3; j++){
                 if(listaGeneros[i][j] == '')
                     contentTBody += "<td id='id"+i+"_"+j+"'>null</td>";
                 else
                     contentTBody += "<td id='id"+i+"_"+j+"'>"+listaGeneros[i][j]+"</td>";
             }
             contentTBody += '<td> <button type="button" onclick="rellenarModalEditGenero('+i+')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editarGenero"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"> <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" /></svg></button></td>';
             contentTBody += '<td> <button type="button" onclick="rellenarModalDeleteGenero('+i+')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borrarGenero"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" /> </svg> </button> </td>';
             contentTBody += "</tr>";
         }
         contentTBody += "</tbody>";
         tabla.innerHTML += contentTBody;
    });
    xmlhttp.send();
}

function rellenarModalEditGenero(idListaGenero) {
    document.getElementById("editNombreGenero").value = listaGeneros[idListaGenero][1];
    document.getElementById("editDescripcionGenero").value = listaGeneros[idListaGenero][2];

    var modalBottom = document.getElementById("footerEditarGenero");
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar sin guardar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-primary" onclick="editarGenero('+listaGeneros[idListaGenero][0]+')">Guardar cambios</button>';
}

function editarGenero(idUser) {
    console.log("Editando a usuario "+ idUser);
    var nombreGenero = document.getElementById("editNombreGenero").value;
    var descripcionGenero = document.getElementById("editDescripcionGenero").value;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/generos/modificarGenero.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('idGenero='+ idUser + 
                 '&newNombreGenero='+ nombreGenero +
                 '&newDescripcionGenero='+ descripcionGenero);
    window.location = "adminView.html";
}

function rellenarModalDeleteGenero(idSelectGenero) {
    var modalBottom = document.getElementById("footerBorrarGenero");
    document.getElementById("infoGenero").textContent = listaGeneros[idSelectGenero][1] + " (id: "+listaGeneros[idSelectGenero][0]+")";
    modalBottom.innerHTML = '';
    modalBottom.innerHTML += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>';
    modalBottom.innerHTML += '<button type="button" class="btn btn-danger" onclick="borrarGenero('+listaGeneros[idSelectGenero][0]+')">Eliminar</button>';
}

function borrarGenero(idGenero) {
    console.log("Borrando a usuario "+ idGenero);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/generos/borrarGenero.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('id='+idGenero);
    window.location = "adminView.html";
}

// // --------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------
// // Seccion Añadir User
function addUser() {
    var nombreCompleto = document.getElementById("nombre");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password1 = document.getElementById("password1");
    var password2 = document.getElementById("password2");
    //Valores opcionales
    var imagen = document.getElementById("fotoPerfil");
    var descripcion = document.getElementById("descripcionUser");
    var enlaceTwitter = document.getElementById("twitter");
    var enlaceFacebook = document.getElementById("facebook");
    var enlaceInstagram = document.getElementById("instagram");

    // return false;


    // if (validarNombre(nombreCompleto.value) &&
    //     validarUsername(username.value) &&
    //     validarCorreo(email.value) &&
    //     validadPassword(password1.value) &&
    //     duplicaCorrecta(password1.value, password2.value) && 
    //     validarCaptcha()) {
    if (validarNombre(nombreCompleto.value) &&
        validarUsername(username.value) &&
        validarCorreo(email.value) &&
        validadPassword(password1.value) &&
        duplicaCorrecta(password1.value, password2.value)) {

        console.log("Los valores obligatorios son validos");

        if(!correoLibre(email.value)){
            console.log("El correo es invalido");
            return false;
        }
        // else{
        //     console.log("El correo es valido");
        // }

        if(validarTwitter(enlaceTwitter.value) &&
           validarFacebook(enlaceFacebook.value) &&
           validarInstagram(enlaceInstagram.value)){

            console.log("Los valores no obligatorios son validos");
            return true;
        }
        else{
            if(!validarTwitter(enlaceTwitter.value))
                document.getElementById("errorTwitter").removeAttribute("hidden");
            if(!validarFacebook(enlaceFacebook.value))
                document.getElementById("errorFacebook").removeAttribute("hidden");;
            if(!validarInstagram(enlaceInstagram.value))
                document.getElementById("errorInstagram").removeAttribute("hidden");;
        }
        return false;
    }

    else {
        console.log("No es valido");
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
        // if (!validarCaptcha())
        //     document.getElementById("errorCaptcha").removeAttribute("hidden");
    }
    return false;

}

function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

function confirmTerms(campo) {
    if (campo.checked)
        document.getElementById("submitButton").disabled = false;
    else
        document.getElementById("submitButton").disabled = true;
}

function validarNombre(nombre) {
    // console.log("Validando nombre: " + nombre);
    if (nombre.length <= 0)
        return false;
    else
        return true;
}

function validarUsername(username) {
    // console.log("Validando username: " + username);
    if (username.length < 5) {
        return false;
    }
    else
        return true;
}

function validarCorreo(correo) {
    // console.log("Validando correo: " + correo);
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (validEmail.test(correo)) {
        return true;
    }
    else {
        return false;
    }
}

function validadPassword(password) {
    // console.log("Validando password: " + password);
    if (password.length < 6)
        return false;
    else
        return true;
}

function duplicaCorrecta(password, password2) {
    // console.log("Validando password y password2: " + password + ", " + password2);
    if (password == password2)
        return true;
    else
        return false;
}

function validarTwitter(urlTwitter){
    if(urlTwitter.length == 0)
        return true;
    else{
        if(urlTwitter.includes("twitter.com/"))
            return true;
        else
            return false;
    }
}

function validarFacebook(urlFacebook){
    if(urlFacebook.length == 0)
        return true;
    else{
        if(urlFacebook.includes("facebook.com/"))
            return true;
        else
            return false;
    }
}

function validarInstagram(urlInstagram){
    if(urlInstagram.length == 0)
        return true;
    else{
        if(urlInstagram.includes("instagram.com/"))
            return true;
        else
            return false;
    }
}

// function validarCaptcha(){
//     var response = grecaptcha.getResponse();
//     // console.log(response);
//     if (response.length <= 0)
//         return false;
//     else
//         return true;
// }

function correoLibre(correo) {
    // console.log("Entrando a mirara correro");
    var estaLibre = true;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioEmail.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        var respuesta = datos.target.response.toString();
        respuesta = respuesta.replaceAll(" ", '');
        if(respuesta == "false"){
            // console.log("Se supone que es false");
            estaLibre = false;
        }
        // else{
        //     console.log("Se supone que es true");
        // }
        
        // console.log(estaLibre);

    });
    xmlhttp.send("email="+correo);
    return estaLibre;
}

// // --------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------
// // Seccion Añadir Genero
function addGenero() {
    console.log("Introduciendo un nuevo genero");
    var nombreGenero = document.getElementById("addNombreGenero");
    var descripcionGenero = document.getElementById("addDescripcionGenero");

    console.log(nombreGenero.value);
    console.log(descripcionGenero.value);

    if (nombreGenero.value.length >= 5) {
        console.log("Todo correcto, metiendo nuevo user");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Parece que va bien")
            }
        }
        xmlhttp.open("POST", "php/generos/addGenero.php",true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("nombreGenero=" + nombreGenero.value +
                     "&descripcionGenero=" + descripcionGenero.value);
        window.location = "adminView.html";
    }
    else {
        document.getElementById("errorNombreGenero").removeAttribute("hidden");
    }
}

// // --------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------
// // Seccion Revisar Juegos
function obtenerJuegosNoValidados() {
    var cartaJuego =  document.getElementById("cardJuegosNoValidados");
    cartaJuego.innerHTML = '';

    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien");
        }
    }
    xmlhttp.open("POST", "php/juegos/buscarJuegosNoValidados.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        console.log(listaJuegos);
        for(var i = 0; i < listaJuegos.length; i++){
            // colocarJuego(listaJuegos[i][5],listaJuegos[i][0]);
            var contentTBody=   "<div class='card' id='cardJuego"+listaJuegos[i][0]+"'>" + 
                                    "<div class='card-header'>" +
                                        "<div class='row'>"+
                                            "<div class='col-7'>"+
                                                "<h2>"+listaJuegos[i][2]+"</h2>"+
                                            "</div>"+
                                            "<div class='col'>"+
                                                "<button class='btn btn-danger float-end ms-3 mb-1' id='rechazarJuego"+listaJuegos[i][0]+"'>Rechazar</button>" +
                                                "<button class='btn btn-dark float-end ms-3 mb-1'  id='validarJuego"+listaJuegos[i][0]+"'>Validar</button>" +
                                                "<button class='btn btn-dark float-end ms-3 mb-1'  id='descargarJuego"+listaJuegos[i][0]+"'>Descargar</button>" +
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>";
            cartaJuego.innerHTML += contentTBody;
            document.getElementById("descargarJuego"+listaJuegos[i][0]).setAttribute("onclick","colocarJuego('"+listaJuegos[i][4]+"')");
            document.getElementById("validarJuego"+listaJuegos[i][0]).setAttribute("onclick","validarJuego('"+listaJuegos[i][0]+"')");
            document.getElementById("rechazarJuego"+listaJuegos[i][0]).setAttribute("onclick","rechazarJuego('"+listaJuegos[i][0]+"')");
         }
    });
    xmlhttp.send();
}

function colocarJuego(rutaJuego) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien, colocando juego sin validar");
        }
    }
    xmlhttp.open("POST", "php/juegos/sacarNombreFichero.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        var nombreFichero = datos.target.response;
        console.log(nombreFichero);
        DownloadFromUrl(nombreFichero,rutaJuego);
    });
    xmlhttp.send("rutaJuego="+rutaJuego);
}

function DownloadFromUrl(fileName,rutaJuego) {
    var link = document.createElement('a');
    link.href = rutaJuego.replace('C:/wamp64/www/', '');
    link.download = fileName.substring(0, (fileName.length-2));

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}      

function borrarFichero(rutaFichero) {
    console.log(rutaFichero);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Borrando elemento")
        }
    }
    xmlhttp.open("POST", "php/borrar/borrarFichero.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("rutaFichero=" + rutaFichero);
}

function validarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien, validemos el juego de id "+idJuego);
        }
    }
    xmlhttp.open("POST", "php/juegos/validarJuego.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego="+idJuego);
    // window.location = "adminView.html";

    var elem = document.getElementById("cardJuego"+idJuego);

    elem.parentNode.removeChild(elem);

    mostrarToast('validacionAceptada');
}

function rechazarJuego(idJuego) {
    console.log("Rechazando el juego con id "+idJuego);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien, rechazando el juego con id "+idJuego);
        }
    }
    xmlhttp.open("POST", "php/juegos/borrarJuego.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego="+idJuego);
    // window.location = "adminView.html";

    // console.log("Rechazando el user "+idUser);

    var elem = document.getElementById("cardJuego"+idJuego);
    elem.parentNode.removeChild(elem);

    mostrarToast('validacionRechazada');
    // quitarSolicitudDeveloper(idUser);
}

// // --------------------------------------------------------------------------------------------------------------
// // --------------------------------------------------------------------------------------------------------------
// // Seccion Solicitudes Developer
function obtenerSolicitudesDeveloper() {
    document.getElementById("cardUsuarioNoDeveloper").innerHTML = "";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Cojamos la lista de solicitudes");
        }
    }
    xmlhttp.open("POST", "php/usuarios/developerComprobarSolicitudes.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaIdUsers = JSON.parse(datos.target.response);
        console.log(listaIdUsers);
        if (listaIdUsers == null) {
            console.log("No hay solicitudes");
        }
        else{
            for(var i = 0; i < listaIdUsers.length; i++){
                // obtenerDatosUser(listaIdUsers[i][1]);
                colocarUser(listaIdUsers[i]);
             }
        }
    });
    xmlhttp.send();
}

function colocarUser(datosUser) {
    console.log(datosUser);
    var contentTBody=   "<div class='card' id='cardAscenso"+datosUser[0]+"'>" + 
                            "<div class='card-header'>" +
                                "<div class='row'>"+
                                    "<div class='col-7'>"+
                                        "<a class='text-decoration-none text-dark fs-2 userNameURL' href='perfil.html?id="+datosUser[0]+"'>"+datosUser[3]+"</a>"+
                                    "</div>"+
                                    "<div class='col'>"+
                                        "<button class='btn btn-danger float-end ms-3 mb-1' id='rechazarAscenso"+datosUser[0]+"'>Rechazar</button>" +
                                        "<button class='btn btn-success float-end ms-3 mb-1'  id='validarAscenso"+datosUser[0]+"'>Ascender usuario</button>" +
                                    "</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>";

    document.getElementById("cardUsuarioNoDeveloper").innerHTML += contentTBody;

    document.getElementById("validarAscenso"+datosUser[0][0]).setAttribute("onclick","validarDeveloper('"+datosUser[0][0]+"')");
    document.getElementById("rechazarAscenso"+datosUser[0][0]).setAttribute("onclick","rechazarDeveloper('"+datosUser[0][0]+"')");
}

function validarDeveloper(idUser) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Ascendiendo al user "+idUser);
        }
    }
    xmlhttp.open("POST", "php/usuarios/developerAscender.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idUser="+idUser);

    var elem = document.getElementById("cardAscenso"+idUser);
    elem.parentNode.removeChild(elem);

    mostrarToast('ascensoAceptado')
    quitarSolicitudDeveloper(idUser);
}

function rechazarDeveloper(idUser) {
    console.log("Rechazando el user "+idUser);

    var elem = document.getElementById("cardAscenso"+idUser);
    elem.parentNode.removeChild(elem);

    mostrarToast('ascensoRechazado')
    quitarSolicitudDeveloper(idUser);
}

function quitarSolicitudDeveloper(idUser) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Ascendiendo al user "+idUser);
        }
    }
    xmlhttp.open("POST", "php/usuarios/developerBorrarSolicitud.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idUser="+idUser);
}

function mostrarToast(toast) {
    var toastLiveExample = document.getElementById(toast);
    var toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
}




