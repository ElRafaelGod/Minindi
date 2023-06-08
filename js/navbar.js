setInterval('comprobarBodySize()',200);
setInterval('comprobarBodyWidth()',200);

//Función que comprueba el rango del usuario activo, modificando la barra de navegación y el icono del usuario según el rango del usuario
function verifyRango(){
    comprobarCookies();
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

//Función que revisa el contenido de la cesta del usuario, modificando el numero que se muestra según el numero de juegos 
//metidos en la cesta
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

//Función que comprueba si el usuario ha aceptado las cookies. Si no los ha aceptado, crea un mensaje emergente para aceptarlas
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

//Función que acepta y coloca las cookies al usuario
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

//Función que comprueba si la cookie "Recuerdame" esta activa. De estarlo, hace iniciar la sesión del usuario recordado
function recuerdameActivado() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Busquemos si existe algun recuerdame")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/recuerdameExiste.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

//Función para cerrar la sesión del usuario conectado, borrando las sesiones y la cookie "Recuerdame"
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

//Función para borrar la cookie "Recuerdame"
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

//Función para comprobar la altura del body, para recolocar el pie de página de forma dinamica
function comprobarBodySize() {
    if(document.body.scrollHeight >= 695)
        document.getElementById('footer').classList.remove("fixed-bottom");
    else
        document.getElementById('footer').classList.add("fixed-bottom");
}

//Función para comprobar la anchura del body, para reescalar los formularios pequeños asignados de forma dinamica
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

//Función que activa la pantalla de cargando y quita la interactividad en la pantalla
function activarPantallaCargando() {
    document.querySelector('.loading-overlay').style.display = 'flex';
}


