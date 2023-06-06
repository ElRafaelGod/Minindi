var validado = false;
var email;
var codedURL;

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
    esValido();
}

function esValido() {
    const urlParams = new URLSearchParams(window.location.search);
    email = urlParams.get('email');
    codedURL = urlParams.get('codedURL');
    console.log(email);
    console.log(codedURL);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Comprobemos si es valido")
        }
    }
    xmlhttp.open("POST", "php/usuarios/recuperacionEsCodigoValido.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const esValido = datos.target.response;
        console.log(esValido);
        if (esValido == 1) {
            console.log("Se ha cumplido todo, procede a cambiar de contraseña");
            validado = true;
        }
        else{
            console.log("No es correcto, alejate de aqui");
            window.location = "registro.html";
        }
    });
    xmlhttp.send("email="+email+
                "&codedURL="+codedURL);
}

function cambiarPassword() {
    console.log("Cambiando contraseña");
    var newPassword1 = document.getElementById("newPasswd1");
    var newPassword2 = document.getElementById("newPasswd2");
    if(validarPassword(newPassword1.value) &&
        duplicaCorrecta(newPassword1.value, newPassword2.value) &&
        validado){
            console.log("Contraseña valida, cambiando");

            document.getElementById("cambiarPassword").hidden = true;
            document.getElementById("passwordCambiada").removeAttribute("hidden");
            setTimeout(redirigir, 5000);

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Cambiando la contraseña")
                }
            }
            xmlhttp.open("POST", "php/usuarios/recuperacionModificarPasswd.php", false);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("email="+email+
                        "&passwd="+newPassword1.value);
        }
    else{
        if (!validarPassword(newPassword1.value))
            document.getElementById("errorPasswd1").removeAttribute("hidden");
        if (!duplicaCorrecta(newPassword1.value, newPassword2.value))
            document.getElementById("errorPasswd2").removeAttribute("hidden");
    }
}

function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

function validarPassword(password) {
    // console.log("Validando password: " + password);
    if (password.length >= 8){
        if(password.match(/[A-Z]/)){
            if(password.match(/\d/)){
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

function duplicaCorrecta(password, password2) {
    if (password == password2)
        return true;
    else
        return false;
}

function redirigir(){
    window.location = "registro.html";
}