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
    if (validarNombre(nombreCompleto.value) &&
        validarUsername(username.value) &&
        validarCorreo(email.value) &&
        validadPassword(password1.value) &&
        duplicaCorrecta(password1.value, password2.value) && 
        validarCaptcha()) {

        console.log("Los valores obligatorios son validos");

        if(!correoLibre(email.value)){
            console.log("El correo es invalido");
            window.scrollTo({
                top:0, behavior:"smooth"
              })
            document.getElementById("errorEmail").removeAttribute("hidden");
            document.getElementById("errorEmail").textContent = "Este correo ya esta en uso. Use otro diferente";
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

function validarCaptcha(){
    var response = grecaptcha.getResponse();
    // console.log(response);
    if (response.length <= 0)
        return false;
    else
        return true;
}

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
