verifyUser();
cestaConContenido();

function verifyUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Verifiquemos si al menos eres un usuario")
        }
    }
    xmlhttp.open("POST", "php/usuarios/buscarUsuarioActivo.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const jsonDatos = JSON.parse(datos.target.response);
        console.log(jsonDatos);
        if (jsonDatos == null) {
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

function cestaConContenido() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Miremos si tienes contenido en la cesta")
        }
    }
    xmlhttp.open("POST", "php/cesta/buscarJuegosCesta.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        const contenidoCesta = JSON.parse(datos.target.response);
        console.log(contenidoCesta);
        console.log(contenidoCesta.length);
        if (contenidoCesta.length == 0) {
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "cesta.html";
        }
    });
    xmlhttp.send();
}

function comprobarFormulario() {
    var nombreTarjeta = document.getElementById("nombreTarjeta");
    var numeroTarjeta = document.getElementById("numTarjeta");
    var fechaCad = document.getElementById("caducidad");
    var CVC = document.getElementById("cvc");

    if (validarNombreTarjeta(nombreTarjeta.value) &&
        validarNumTarjeta(numeroTarjeta.value) &&
        validarFechaCad(fechaCad.value) &&
        validadCVC(CVC.value)) {

        console.log("Los valores obligatorios son validos");
        confirmCompra();
    }
    else {
        console.log("No es valido");
        if (!validarNombreTarjeta(nombreTarjeta.value))
            document.getElementById("errorNombreTarjeta").removeAttribute("hidden");
        if (!validarNumTarjeta(numeroTarjeta.value))
            document.getElementById("errorNumTarjeta").removeAttribute("hidden");
        if (!validarFechaCad(fechaCad.value))
            document.getElementById("errorFechaCad").removeAttribute("hidden");
        if (!validadCVC(CVC.value))
            document.getElementById("errorCVC").removeAttribute("hidden");
    }
    return false;
}

function applyHidden(campo) {
    if (!document.getElementById(campo).hasAttribute("hidden"))
        document.getElementById(campo).hidden = true;
}

function validarNombreTarjeta(nombreTarjeta) {
    var validNombreTarjeta = /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/;
    if (validNombreTarjeta.test(nombreTarjeta)) {
        return true;
    }
    else {
        return false;
    }
}

function validarNumTarjeta(numeroTarjeta) {
    numeroTarjeta = parseInt(numeroTarjeta);
    if(numeroTarjeta == NaN)
        return false;
    else{
        if (numeroTarjeta.toString().length == 16) {
            return true;
        }
        else
            return false;
    }
}

function validarFechaCad(fechaCad) {
    fechaCad = parseInt(fechaCad);
    if(fechaCad == NaN)
        return false;
    else{
        if (fechaCad.toString().length == 4) {
            return true;
        }
        else
            return false;
    }
}

function validadCVC(cvc) {
    cvc = parseInt(cvc);
    if(cvc == NaN)
        return false;
    else{
        if (cvc.toString().length == 3) {
            return true;
        }
        else
            return false;
    }
}

function confirmCompra(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Finalizando la compra")
        }
    }
    xmlhttp.open("POST", "php/cesta/confirmarCompra.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    console.log("Juego comprado con exito");
    location.replace("juegosComprados.html");
}

