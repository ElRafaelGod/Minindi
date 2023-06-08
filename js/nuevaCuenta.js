verifyUser();

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

//Función que verifica que los campos del formulario son correctos, y si los son, crea un nuevo usuario.
//Sino, se muestra un mensaje de error en aquellos campos que sea incorrectos
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

    //Se comprueba que los campos principales son validos
    if (validarNombre(nombreCompleto.value) &&
        validarUsername(username.value) &&
        validarCorreo(email.value) &&
        validadPassword(password1.value) &&
        duplicaCorrecta(password1.value, password2.value) && 
        validarCaptcha()) {

        //Se comprueba que el correo puesto este libre
        if(!correoLibre(email.value)){
            // console.log("El correo es invalido");
            window.scrollTo({
                top:0, behavior:"smooth"
              })
            document.getElementById("errorEmail").removeAttribute("hidden");
            document.getElementById("errorEmail").textContent = "Este correo ya esta en uso. Use otro diferente";
            return false;
        }

        //Se comprueban los campos opcionales en caso de que se hayan rellenado
        if(validarTwitter(enlaceTwitter.value) &&
           validarFacebook(enlaceFacebook.value) &&
           validarInstagram(enlaceInstagram.value)){

            // console.log("Los valores no obligatorios son validos");
            activarPantallaCargando();
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
        // console.log("No es valido");
        window.scrollTo({
            top:0, behavior:"smooth"
          })
      
        if (!validarNombre(nombreCompleto.value))
            document.getElementById("errorNombre").removeAttribute("hidden");
        if (!validarUsername(username.value))
            document.getElementById("errorUsername").removeAttribute("hidden");
        if (!validarCorreo(email.value)){
            document.getElementById("errorEmail").removeAttribute("hidden");
            document.getElementById("errorEmail").textContent = "Introduce un correo electronico valido de formato 'ejemplo@ejemplo.com'";
        }
        if (!validadPassword(password1.value))
            document.getElementById("errorPasswd1").removeAttribute("hidden");
        if (!duplicaCorrecta(password1.value, password2.value))
            document.getElementById("errorPasswd2").removeAttribute("hidden");
        if (!validarCaptcha())
            document.getElementById("errorCaptcha").removeAttribute("hidden");
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

//Funcion que valida que "Contraseña" y "Confirmar contraseña" sean lo mismo
function duplicaCorrecta(password, password2) {
    if (password == password2)
        return true;
    else
        return false;
}

//Funcion que valida que el campo de "twitter" cumpla las condiciones dadas
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

//Funcion que valida que el campo de "facebook" cumpla las condiciones dadas
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

//Funcion que valida que el campo de "instagram" cumpla las condiciones dadas
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

//Función que valida que el captcha ha sido aceptado
function validarCaptcha(){
    var response = grecaptcha.getResponse();
    if (response.length <= 0)
        return false;
    else
        return true;
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
        if(respuesta == "false"){
            // console.log("Se supone que es false");
            estaLibre = false;
        }
    });
    xmlhttp.send("email="+correo);
    return estaLibre;
}
