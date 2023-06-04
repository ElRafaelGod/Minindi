setInterval('comprobarBodySize()',200);
setInterval('comprobarBodyWidth()',200);

function verifyRango(){
    // console.log("Verificando rango");
    comprobarCookies();
    // mostrarCookies();
    recuerdameActivado();
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, buscando el usuario activo")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        // console.log(jsonDatos);
        if (jsonDatos != null) {
            // console.log("Hay contenido en el session");
            var esDeveloper = jsonDatos[0][10];
            var esAdmin = jsonDatos[0][11];

            revisarCesta();
            
            //Si el usuario es un desarrollador, oculta el icono para que pueda pedir el rango de developer
            if(esDeveloper == 1){
                if(document.getElementById("atajoDeveloper")){
                    document.getElementById("atajoDeveloper").hidden = true;
                }
            }

            //Si el usuario activo tiene una imagen puesta, se la coloca
            if(jsonDatos[0][6] != ''){
                document.getElementById("botonUser1").src = jsonDatos[0][6];
                document.getElementById("botonUser2").src = jsonDatos[0][6];

                if(document.getElementById("oldImagen")){
                    document.getElementById("oldImagen").src = jsonDatos[0][6];
                }
            }
                
            if (esDeveloper == 1 && esAdmin == 1) {
                // console.log("Bienvenido, administrador");
                document.getElementById("registro").hidden = true;
                document.getElementById("botonUser1").classList.add('border', 'border-2', 'border-info');
                document.getElementById("botonUser2").classList.add('border', 'border-2', 'border-info');
            }
            else if(esDeveloper == 1){
                // console.log("Bienvenido, desarrollador");
                document.getElementById("registro").hidden = true;
                document.getElementById("adminView").hidden = true;
                document.getElementById("botonUser1").classList.add('border', 'border-2', 'border-warning');
                document.getElementById("botonUser2").classList.add('border', 'border-2', 'border-warning');
            }

            else if(esAdmin == 1){
                // console.log("Bienvenido, administrador");
                document.getElementById("registro").hidden = true;
                document.getElementById("botonUser1").classList.add('border', 'border-2', 'border-info');
                document.getElementById("botonUser2").classList.add('border', 'border-2', 'border-info');
            }

            else if(esDeveloper == 0 && esAdmin == 0){
                // console.log("Bienvenido, usuario");    
                document.getElementById("registro").hidden = true;
                document.getElementById("subirJuego").hidden = true;
                document.getElementById("adminView").hidden = true;
                document.getElementById("botonUser1").classList.add('border', 'border-2', 'border-success');
                document.getElementById("botonUser2").classList.add('border', 'border-2', 'border-success');
            }
        }
        else {
            // console.log("No ha iniciado sesion nadie");
            document.getElementById("cesta").hidden = true;
            document.getElementById("subirJuego").hidden = true;
            document.getElementById("adminView").hidden = true;
            document.getElementById("botonUser1").hidden = true;
            document.getElementById("botonUser2").hidden = true;
        }
    });
    xmlhttp.send();
    document.querySelector('.loading-overlay').style.display = 'none';
}

// function colocarImagen(id) {
//     var rutaTemporal;
//     var xmlhttp = new XMLHttpRequest();
//     // xmlhttp.onreadystatechange = function () {
//     //     if (this.readyState == 4 && this.status == 200) {
//     //         console.log("Parece que va bien, coloquemos la imagen...")
//     //     }
//     // }
//     xmlhttp.open("POST", "php/usuarios/imagenUserColocar.php", true);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.addEventListener("load", function (datos) {
//         // rutaTemporal = "ArchivosTemporales/"+ datos.target.response;
//         // rutaTemporal = "Storage/fotosPerfil/"+datos.target.response;
//         rutaTemporal = datos.target.response;
//         console.log(rutaTemporal);
//         // console.log(rutaTemporal);
//         // console.log(datos.target.response);
//         document.getElementById("botonUser1").src = rutaTemporal;
//         document.getElementById("botonUser2").src = rutaTemporal;

//         if(document.getElementById("oldImagen")){
//             document.getElementById("oldImagen").src = rutaTemporal;
//         }

//         // setTimeout('borrarFichero("'+rutaTemporal+'")',1000);
//     });
//     xmlhttp.send('id=' + id);
// }

// function borrarFichero(rutaFichero) {
//     rutaFichero = rutaFichero.substring(0, (rutaFichero.length-2));
//     // console.log(rutaFichero);
//     var xmlhttp = new XMLHttpRequest();
//     // xmlhttp.onreadystatechange = function () {
//     //     if (this.readyState == 4 && this.status == 200) {
//     //         console.log("Borrando elemento")
//     //     }
//     // }
//     xmlhttp.open("POST", "php/borrar/borrarFichero.php", true);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.send("rutaFichero="+rutaFichero);
// }

function revisarCesta() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Revisemos el contenido de la cesta")
    //     }
    // }
    xmlhttp.open("POST", "php/cesta/buscarJuegosCesta.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        numJuegos = JSON.parse(datos.target.response);     
        // numJuegos = datos.target.response;     
        // console.log(numJuegos); 
        if(Object.keys(numJuegos).length != 0){
            // console.log("Hay juegos en la cesta");

            if(document.getElementById("cantidadCesta")){
                // console.log("Existe el elemento CantidadCesta");
                document.getElementById("cantidadCesta").textContent = Object.keys(numJuegos).length;
            }
            else{
                // console.log("No existe el elemento CantidadCesta");
                cantidadCesta = '<span class="badge rounded-pill bg-danger" id="cantidadCesta">'+
                                    Object.keys(numJuegos).length+
                                '</span>'
                document.getElementById("cesta").innerHTML += cantidadCesta;
            }

        }  
        else{
            // console.log("La cesta esta vacia");
            if(document.getElementById("cantidadCesta")){
                // console.log("Existe el elemento CantidadCesta");
                document.getElementById("cantidadCesta").remove();
            }
        }
    });
    xmlhttp.send();
}

function comprobarCookies(){
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Comprobemos si ha cookies...")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/cookiesAceptadas.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        var respuesta = datos.target.response;
        // console.log("'"+respuesta+"'");
        if(respuesta == ''){
            // console.log("No se han aceptado las cookies del lugar");
            var cookieToast = '<div id="coockieToast" class="toast fixed-bottom position-fixed bottom-0 start-50 translate-middle-x p-3 border border-2" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">'+
                                  '<div class="text-center toast-body">'+
                                    '<p class="fw-bold">Esta pagina web hace uso de Cookies, asi que te pedimos que las aceptes.</p>'+
                                    '<a class="link-dark" href="infoCookies.html" target="_blank">Leer sobre las Cookies</a>'+
                                    '<div class="mt-2 pt-2 border-top text-center">'+
                                      '<button type="button" class="btn btn-dark border border-2 btn-sm" data-bs-dismiss="toast" onclick="acceptCookies()">Aceptar cookies</button>'+
                                    '</div>'+
                                  '</div>'+
                                '</div>';
            document.body.innerHTML += cookieToast;

            var toastLiveExample = document.getElementById('coockieToast');
            var toast = new bootstrap.Toast(toastLiveExample);
            toast.show();

        }
        // else
        //     console.log("Has aceptado las cookies :D");
    });
    xmlhttp.send();
}

function acceptCookies() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Aceptamos las cookies")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/colocarCookies.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function recuerdameActivado() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Busquemos si existe algun recuerdame")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/recuerdameExiste.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const respuesta = datos.target.response;
        // console.log(respuesta);
        // if (respuesta != "") {
        //     console.log("Existe un recuerdame");
        // }
        // else
        //     console.log("Esta vacio");

    });
    xmlhttp.send();
}

function cerrarSesion() {
    console.log("Cerrando sesion");
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/usuarios/cerrarSesion.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    borrarCookies();
    window.location="registro.html";

    // mostrarCookies();
}

function borrarCookies() {
    // console.log("Borrando un recuerdame");
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/recuerdameBorrar.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function comprobarBodySize() {
    if(document.body.scrollHeight >= 695)
        document.getElementById('footer').classList.remove("fixed-bottom");
    else
        document.getElementById('footer').classList.add("fixed-bottom");
}

function comprobarBodyWidth() {
    if(document.body.scrollWidth >= 900){
        if(document.getElementById('inicioSesion')){
            document.getElementById('inicioSesion').classList.add("w-50");
            document.getElementById('inicioSesion').classList.remove("w-75");
        }
        if(document.getElementById('correoMandado')){
            document.getElementById('correoMandado').classList.add("w-50");
            document.getElementById('correoMandado').classList.remove("w-75");
        }
    }
    else{
        if(document.getElementById('inicioSesion')){
            document.getElementById('inicioSesion').classList.add("w-75");
            document.getElementById('inicioSesion').classList.remove("w-50");
        }
        if(document.getElementById('correoMandado')){
            document.getElementById('correoMandado').classList.add("w-75");
            document.getElementById('correoMandado').classList.remove("w-50");
        }
    }
}


