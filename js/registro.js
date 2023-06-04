verifyUser()
setInterval('comprobarBodyWidth()',200);

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

function buscarUser() {
    // console.log("Funcion 'Iniciar sesion'");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    console.log(email.value + "," + password.value);
    // console.log(validEmail.test(email.value));

    if (validarCorreo(email.value) && password.value.length > 0) {
        console.log("Todo correcto, buscando user");
        if(document.getElementById("recuerdame").checked)
            var recuerdame = 1;
        else
            var recuerdame = 0;

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Parece que va bien")
            }
        }
        xmlhttp.open("POST", "php/usuarios/iniciarSesion.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.addEventListener("load", function (datos) {
            var resp = datos.target.response;
            resp = resp.replaceAll(" ", '');
            console.log(resp);
            if(resp == 'true'){
                console.log("Usuario existente correcto. Bienvenido");
                // location.replace("index.html");
                if(recuerdame == 1)
                    recordarUsuario();

                redirigir();
            }
            else{
                alert("El correo electronico o la contraseña son incorrectos");
                console.log("O el email o la contraseña estan mal");
            }
        });
        xmlhttp.send("email="+email.value+
                     "&passwd="+password.value);
    }
    else {
        console.log("Algo esta mal");
        if (!validarCorreo(email.value))
            document.getElementById("errorEmail").removeAttribute("hidden");
        if (!password.value > 0)
            document.getElementById("errorPassword").removeAttribute("hidden");
    }
}

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

function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

function validarCorreo(correo) {
    // console.log("Validando correo: " + correo);
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return validEmail.test(correo);
}

function validadPassword(password) {
    // console.log("Validando password: " + password);
    if (password.length < 6)
        return false;
    else
        return true;
}

function recordarUsuario(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien")
        }
    }
    xmlhttp.open("POST", "php/cookiesSessions/recuerdame.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function redirigir() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien")
        }
    }
    xmlhttp.open("POST", "php/cookiesSessions/redirigirGuardado.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const ruta = datos.target.response;
        console.log(ruta);
        if (ruta != '') 
            window.location = ruta;
        else
            window.location = 'index.html';
    });
    xmlhttp.send();
}



