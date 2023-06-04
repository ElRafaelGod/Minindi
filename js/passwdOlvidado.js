verifyUser();

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
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "index.html";
        }
    });
    xmlhttp.send();
}

function mandarCorreoRecuperar() {
    var email = document.getElementById('email').value;
    // console.log(email);

    if(existeElCorreo(email)){
        console.log("El correo existe, mandemos correo para que pueda cambiar contraseña");
        document.getElementById("inicioSesion").hidden = true;
        document.getElementById("correoMandado").removeAttribute("hidden");
        document.getElementById("reenviarBoton").setAttribute("onclick","enviarCorreo('"+email+"')");
        enviarCorreo(email);
    }
    else{
        console.log("El correo no existe, salta error");
        if (document.getElementById("errorCorreo").hasChildNodes()) {
            document.getElementById("errorCorreo").removeChild(document.getElementById("errorCorreo").childNodes[0]);
        }
        var wrapper = document.createElement('div');
        wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible container" role="alert">' + 
                                'No hay ninguna cuenta asignada a este correo electronico. Intentalo de nuevo' + 
                            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        document.getElementById("errorCorreo").append(wrapper);
    }
}

function enviarCorreo(email){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Mandemos el correo");
        }
    }
    xmlhttp.open("POST", "php/usuarios/recuperacionMandarCorreo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("email="+email);
}

function existeElCorreo(correo) {
    var correoExiste = true;
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
        if(respuesta == "true"){
            console.log("El usuario no existe");
            correoExiste = false;
        }
    });
    xmlhttp.send("email="+correo);
    return correoExiste;
}

