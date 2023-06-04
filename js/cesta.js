var totalJuegos = 0;
var listaId = [];
verifyUser();

$(document).ready(function () {
    juegosEnCesta();
});

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
        if (jsonDatos == null) {
            console.log("Se ha accedido aqui sin permiso. Echando");
            window.location = "registro.html";
        }
    });
    xmlhttp.send();
}

function juegosEnCesta() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Revisemos el contenido de la cesta")
        }
    }
    xmlhttp.open("POST", "php/cesta/buscarJuegosCesta.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respuesta = JSON.parse(datos.target.response);    
        listaId = respuesta; 
        console.log(respuesta); 
        console.log(Object.keys(respuesta).length);
        if(Object.keys(respuesta).length != 0){
            console.log("Hay juegos en la cesta");
            console.log("Hay juegos en la cesta");
            document.getElementById("errorCesta").hidden= true;
            if(Object.keys(respuesta).length > 3){
                document.getElementById("footer").classList.remove("fixed-bottom");
            }

            for(i = 0; i < Object.keys(respuesta).length; i++){
                buscarJuego(respuesta[i]);
            }
            totalJuegos = parseFloat(totalJuegos).toFixed(2);
            document.getElementById("precioFinal").textContent = totalJuegos+"€";
        }  
        else{
            console.log("La cesta esta vacia");
            errorCestaVacia()
        }
    });
    xmlhttp.send();
}

function errorCestaVacia() {
    console.log("ocultando cosas");
    // document.getElementById("listaCesta").hidden= true;
    document.getElementById("listaCesta").classList.add('d-none');
    document.getElementById("cajaPrecio").hidden= true;
    document.getElementById("errorCesta").hidden= false;
}

function buscarJuego(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    console.log(idJuego);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Cojamos el juego que es")
        }
    }
    xmlhttp.open("POST", "php/juegos/buscarJuegosID.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        respJuego = JSON.parse(datos.target.response);
        cargarJuego(respJuego);
    });
    xmlhttp.send("idJuego="+idJuego);
}

function cargarJuego(juego) {
    var cuerpoListaDeseos =  document.getElementById("cajaCesta");
    // var rutaTemporal;

    console.log(juego);
    // rutaTemporal = "/ArchivosTemporales/"+colocarMiniatura(juego[0][0], juego[0][6]);

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
    // totalJuegos = parseFloat(totalJuegos).toFixed(2)
    console.log("Total en este momento: " +totalJuegos);
}

// function colocarMiniatura(idJuego) {
//     var rutaRecogida;
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Parece que va bien, colocando la miniatura...")
//         }
//     }
//     xmlhttp.open("POST", "php/juegos/miniaturaColocar.php", false);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.addEventListener("load", function (datos) {
//         rutaRecogida = datos.target.response;
//     });
//     xmlhttp.send("idJuego="+idJuego);
//     return rutaRecogida;
// }

// function borrarFichero(rutaFichero) {
//     rutaFichero = rutaFichero.substring(0, (rutaFichero.length - 2));
//     console.log(rutaFichero);
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Borrando elemento")
//         }
//     }
//     xmlhttp.open("POST", "php/borrar/borrarFichero.php", true);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.send("rutaFichero=" + rutaFichero);
// }

function quitToCesta(idJuego) {
    console.log("Bien, borraremos esto de la cesta");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Quitemos el juego de la cesta")
        }
    }
    console.log(idJuego);
    xmlhttp.open("POST", "php/cesta/borrarJuegoCesta.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idJuego="+idJuego);
    console.log("Borrado con exito");
    location.replace("cesta.html");
}

function confirmCompra(){
    console.log("Funciona confirmCompra");
    console.log(totalJuegos);
    console.log(listaId);
    vaciarJuegosComprar();
    if (totalJuegos == 0) {
        console.log("Todo lo comprado es gratis, comprando todo");
        asegurarCompra()
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Quitemos el juego de la cesta")
            }
        }
        xmlhttp.open("POST", "php/cesta/confirmarCompra.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send();
        console.log("Juego comprado con exito");
        location.replace("juegosComprados.html");
    }
    else{
        console.log("Hay cosas que pagar, PAGAAA");
        asegurarCompra();
        location.replace("confirmarCompra.html");

    }
}

function asegurarCompra(){
    for(i = 0; i < listaId.length; i++){
        console.log(listaId[i]);
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("Aseguremos qué juegos van a ser comprados")
            }
        }
        xmlhttp.open("POST", "php/cesta/asegurarJuegosComprar.php", false);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("idJuego="+listaId[i]+
                     "&precioTotal="+totalJuegos);
        // location.replace("cesta.html");
    }
}

function vaciarJuegosComprar(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Vaciando la lista de juegos a comprar")
        }
    }
    xmlhttp.open("POST", "php/cesta/vaciarJuegosComprar.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
    console.log("Juego comprado con exito");
}
// function mostrarToast(toast,idJuego) {
//     var toastLiveExample = document.getElementById(toast);
//     var cuerpoToast = document.getElementById(toastCuerpo);
//     cuerpoToast.innerHTML = '<p class="mb-2">El juego se ha retirado de tu cesta correctamente</p>'

//     var toast = new bootstrap.Toast(toastLiveExample);
//     toast.show();
// }