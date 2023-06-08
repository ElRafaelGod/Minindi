var totalJuegos = 0;
var listaId = [];
verifyUser();

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado
$(document).ready(function () {
    juegosEnCesta();
});

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
        //Si los datos recibidos del usuario conectado son null (no hay una cuenta activa), se redirige a otra página
        if (jsonDatos == null) {
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

//Función que comprueba el contenido de la cesta del usuario. Si tiene contenido, lo imprime y calcula el precio total de la compra
function juegosEnCesta() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Revisemos el contenido de la cesta")
    //     }
    // }
    xmlhttp.open("POST", "php/cesta/buscarJuegosCesta.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respuesta = JSON.parse(datos.target.response);    
        listaId = respuesta; 
        if(Object.keys(respuesta).length != 0){
            document.getElementById("errorCesta").hidden= true;
            for(i = 0; i < Object.keys(respuesta).length; i++){
                buscarJuego(respuesta[i]);
            }
            totalJuegos = parseFloat(totalJuegos).toFixed(2);
            document.getElementById("precioFinal").textContent = totalJuegos+"€";
        }  
        else{
            // console.log("La cesta esta vacia");
            errorCestaVacia()
        }
    });
    xmlhttp.send();
}

//Función que cambia la caja visual por la usada para las cajas
function errorCestaVacia() {
    document.getElementById("listaCesta").classList.add('d-none');
    document.getElementById("cajaPrecio").hidden= true;
    document.getElementById("errorCesta").hidden= false;
}

//Función que busca la información del juego mandado, y manda la información a colocar
function buscarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Cojamos el juego que es")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respJuego = JSON.parse(datos.target.response);
        cargarJuego(respJuego);
    });
    xmlhttp.send("idJuego="+idJuego);
}

//Función que imprime el juego mandado en pantalla, y añade su valor al precio final de la compra
function cargarJuego(juego) {
    var cuerpoListaDeseos =  document.getElementById("cajaCesta");

    var contentCuerpoJuegos =   '<div class="col-2">'+
                                   '<div class="card juegoCesta m-3">'+
                                     '<img class="img-fluid" src="'+juego[0][6]+'" alt="imagenJuego">'+
                                   '</div>'+
                                 '</div>'+
                                 '<div class="col-6 text-start">'+juego[0][2]+'</div>'+
                                 '<div class="col-2 text-end ">'+
                                   '<span>'+juego[0][5]+'€</span>'+
                                 '</div>'+
                                 '<div class="col text-start border-start">'+
                                   '<button type="button" class="btn btn-danger" onclick="quitToCesta('+juego[0][0]+')"> Quitar'+
                                     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" /></svg>'+
                                 '</div>'+
                                ' <div class="col-12">'+
                                   '<hr class="m-0">'+
                                '</div>';
    
    cuerpoListaDeseos.innerHTML += contentCuerpoJuegos;
    totalJuegos += parseFloat(juego[0][5]);
    // console.log("Total en este momento: " +totalJuegos);
}

//Función que retira el juego elegido de la cesta
function quitToCesta(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Quitemos el juego de la cesta")
    //     }
    // }
    xmlhttp.open("POST", "php/cesta/borrarJuegoCesta.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego="+idJuego);
    location.replace("cesta.html");
}

//Función que, en caso de que el total de precio sea 0, realiza la compra de los juegos en la cesta. Sino, asegura los juegos
//de la cesta, y redirige la pantalla a ConfirmarCompra.
function confirmCompra(){
    vaciarJuegosComprar();
    if (totalJuegos == 0) {
        asegurarCompra()
        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Quitemos el juego de la cesta")
        //     }
        // }
        xmlhttp.open("POST", "php/cesta/confirmarCompra.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        location.replace("juegosComprados.html");
    }
    else{
        asegurarCompra();
        location.replace("confirmarCompra.html");

    }
}

//Función que asegura los juegos en la cesta en otra sesion de reserva
function asegurarCompra(){
    for(i = 0; i < listaId.length; i++){
        var xmlhttp = new XMLHttpRequest();
        // xmlhttp.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log("Aseguremos qué juegos van a ser comprados")
        //     }
        // }
        xmlhttp.open("POST", "php/cesta/asegurarJuegosComprar.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("idJuego="+listaId[i]+
                     "&precioTotal="+totalJuegos);
    }
}

//Función que vacia la sesion con los juegos en reserva para comprar
function vaciarJuegosComprar(){
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Vaciando la lista de juegos a comprar")
    //     }
    // }
    xmlhttp.open("POST", "php/cesta/vaciarJuegosComprar.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}