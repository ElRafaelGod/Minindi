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
        //Si los datos recibidos del usuario conectado no son null (hay una cuenta activa), se redirige a otra página
        if (jsonDatos != null) {
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "index.html";
        }
    });
    xmlhttp.send();
}

//Función que, una vez comprobado que los campos mandados son validos, se manda iniciar sesión con la cuenta deseada.
//-Si hay algo incorrecto en los valores mandados, muestra un mensaje de error
//-Sino, inicia sesion correctamente, y si se ha seleccionado la opcion "Recuerdame", coloca la cookie "Recuerdame"
// para que el usuario siga activo aunque cierre el ordenador
function buscarUser() {
    // console.log("Funcion 'Iniciar sesion'");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    if (validarCorreo(email.value) && password.value.length > 0) {
        // console.log("Todo correcto, buscando user");
        if(document.getElementById("recuerdame").checked)
            var recuerdame = 1;
        else
            var recuerdame = 0;

        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Parece que va bien")
        //     }
        // }
        xmlhttp.open("POST", "php/usuarios/iniciarSesion.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.addEventListener("load", function (datos) {
            var resp = datos.target.response;
            resp = resp.replaceAll(" ", '');
            // console.log(resp);
            if(resp == 'true'){
                // console.log("Usuario existente correcto. Bienvenido");
                if(recuerdame == 1)
                    recordarUsuario();

                redirigir();
            }
            else{
                alert("El correo electronico o la contraseña son incorrectos");
                // console.log("O el email o la contraseña estan mal");
            }
        });
        xmlhttp.send("email="+email.value+
                     "&passwd="+password.value);
    }
    else {
        // console.log("Algo esta mal");
        if (!validarCorreo(email.value))
            document.getElementById("errorEmail").removeAttribute("hidden");
        if (!password.value > 0)
            document.getElementById("errorPassword").removeAttribute("hidden");
    }
}

//Función que imprime un mensaje de error encima del registro en caso de no haber una uno ya puesto anteriormente
function alert(message) {
    if (document.getElementById("errorRegistro").hasChildNodes()) {
        document.getElementById("errorRegistro").removeChild(document.getElementById("errorRegistro").childNodes[0]);
    }
    var wrapper = document.createElement('div');
    wrapper.innerHTML = '<div class="alert alert-danger alert-dismissible container" role="alert">' + 
                            message + 
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    document.getElementById("errorRegistro").append(wrapper);
}

//Función que oculta el campo mandado
function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

//Función que valida que el correo pasado cumpla las condiciones puestas
function validarCorreo(correo) {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return validEmail.test(correo);
}

//Función que valida que la contraseña pasada cumpla las condiciones puestas
function validadPassword(password) {
    if (password.length < 6)
        return false;
    else
        return true;
}

//Función que coloca la cookie "Recuerdame" al usuario activo
function recordarUsuario(){
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/recuerdame.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

//Funcion que redirige al usuario a la URL guardada en la sesion para redirigir
function redirigir() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien")
    //     }
    // }
    xmlhttp.open("POST", "php/cookiesSessions/redirigirGuardado.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const ruta = datos.target.response;
        // console.log(ruta);
        if (ruta != '') 
            window.location = ruta;
        else
            window.location = 'index.html';
    });
    xmlhttp.send();
}



