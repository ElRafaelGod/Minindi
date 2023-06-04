var listaJuegos = [];
var numGeneros;
var hayFiltracion = false;
var copiaListaJuegos = [];
var numRecargas = 1;
var ordenMuestra = "true";
var masValorados = "false";
var listaPuntuaciones = [];

$(document).ready(function () {
    cargarGeneros();

    //Miramos si hay que ordenar de alguna manera
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("orden1")) {
        ordenMuestra = urlParams.get("orden1");
    }
    if (urlParams.has("orden2")) {
        ordenMuestra = urlParams.get("orden2");
    }

    if (urlParams.has("valoracion1")) {
        masValorados = urlParams.get("valoracion1");
    }
    if (urlParams.has("valoracion2")) {
        masValorados = urlParams.get("valoracion2");
    }

    // console.log(masValorados);
    // console.log(ordenMuestra); 

    //Miramos si generos que filtrar
    var query = window.location.search;
    if (query.includes("genero")){
        busquedaFiltracion();
    }
    else{
        cargarJuegos();
    }
});

function busquedaFiltracion() {
    var generosFiltracion = [];
    var numero = 0;
    var valorAMandar = "";
    const urlParams = new URLSearchParams(window.location.search);

    for (i = 0; i < numGeneros; i++) {
        var nombreVariable = 'genero' + i;
        if (urlParams.has(nombreVariable + '_1')) {
            generosFiltracion.push(urlParams.get(nombreVariable + '_1'));
        }

        if (urlParams.has(nombreVariable + '_2')) {
            generosFiltracion.push(urlParams.get(nombreVariable + '_2'));
        }
    }

    for (i = 0; i < generosFiltracion.length; i++) {
        if (i == 0)
            valorAMandar += "genero" + numero + "=" + generosFiltracion[i];
        else
            valorAMandar += "&genero" + numero + "=" + generosFiltracion[i];
        numero++;
    }

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Hagamos la busqueda de la filtracion")
    //     }
    // }
    xmlhttp.open("POST", "php/generoPorJuego/buscarJuegosPorGenero.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        var idsJuegos = JSON.parse(datos.target.response);
        // console.log(idsJuegos);
        if (idsJuegos.length != 0) {
            for (i = 0; i < idsJuegos.length; i++) {
                obtenerJuego(idsJuegos[i]);
            }
            listaJuegos = retirarNoValidados();
            colocarJuego(listaJuegos);
        }
        else {
            document.getElementById("textoNoJuegos").textContent = "Parece que no hay ningun juego con ese genero...";
            document.getElementById("noJuegos").removeAttribute("hidden");
        }
    });
    xmlhttp.send(valorAMandar);
}

function obtenerJuego(idJuego) {
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
        listaJuegos.push(respJuego[0])
    });
    xmlhttp.send("idJuego=" + idJuego);
}

function retirarNoValidados() {
    var nuevaLista = [];
    for (i = 0; i < listaJuegos.length; i++) {
        if (listaJuegos[i][9] == 1) {
            nuevaLista.push(listaJuegos[i])
        }
    }
    return nuevaLista;
}

function reordenarMasValorados(listaDataJuegos) {
    console.log("Entre en más valorados");
    var mediaValoraciones = [];

    for (i = 0; i < listaDataJuegos.length; i++) {
        buscarValoraciones(listaDataJuegos[i][0]);
    }

    for (i = 0; i < listaPuntuaciones.length; i++) {
        mediaValoraciones.push([listaPuntuaciones[i][2], listaPuntuaciones[i][3]])
    }

    // Sumar los valores correspondientes
    const sumas = {};
    var numRepes = 1;
    for (let i = 0; i < mediaValoraciones.length; i++) {
        const key = mediaValoraciones[i][0];
        const value = mediaValoraciones[i][1];

        if (sumas[key]) {
            numRepes++;
            sumas[key] += parseInt(value);
        } else {
            numRepes = 1;
            sumas[key] = parseInt(value);
        }

        sumas[key] = sumas[key] / numRepes;
    }

    // Crear el nuevo array con los resultados
    const valoracionesOrdenadas = [];
    for (const key in sumas) {
        valoracionesOrdenadas.push([parseInt(key), sumas[key]]);
    }

    valoracionesOrdenadas.sort(function (a, b) {
        return b[1] - a[1];
    });

    var nuevaListaJuegos = [];
    for (i = 0; i < listaDataJuegos.length; i++) {
        if (valoracionesOrdenadas.length > 0) { 
            if (listaDataJuegos[i][0] == valoracionesOrdenadas[0][0]) {
                nuevaListaJuegos.push(listaDataJuegos[i]);
                valoracionesOrdenadas.shift();
                i = -1;
            }
        }
        else{
            for (j = 0; j < nuevaListaJuegos.length; j++) {
                var noExiste = true;
                if (listaDataJuegos[i][0] == nuevaListaJuegos[j][0]) {
                    noExiste = false;
                    break;
                }
            }
            if (noExiste) {
                nuevaListaJuegos.push(listaDataJuegos[i]);
                j = -1;
            }
        }
    }

    console.log(nuevaListaJuegos);
    return nuevaListaJuegos;
}

function buscarValoraciones(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Parece que va bien, carguemos los juegos validados")
        }
    }
    xmlhttp.open("POST", "php/puntuaje/buscarValoraciones.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        valoracion = JSON.parse(datos.target.response);
        if (valoracion != null) {
            if (valoracion.length > 1) {
                for (j = 0; j < valoracion.length; j++) {
                    listaPuntuaciones.push(valoracion[j]);
                }
            }
            else {
                listaPuntuaciones.push(valoracion[0]);
            }
        }
    });
    xmlhttp.send("idJuego=" + idJuego);
}

function colocarJuego(listaDataJuegos) {
    var cuerpoJuegos = document.getElementById("cuerpoJuegos");
    if (ordenMuestra == "true")
        listaDataJuegos.reverse();
    
    if (masValorados == "true") {
        listaDataJuegos = reordenarMasValorados(listaDataJuegos);
    }

    console.log(listaDataJuegos);
    if (listaDataJuegos.length == 0) {
        document.getElementById("noJuegos").removeAttribute("hidden");
    }
    else{
        copiaListaJuegos = listaDataJuegos;
    
        if (listaDataJuegos.length > 12) {
            var repeticiones = 12;
            document.getElementById("cargarMas").removeAttribute("hidden");
        }
        else
            var repeticiones = listaDataJuegos.length;
    
        for (var i = 0; i < repeticiones; i++) {        
            var contentCuerpoJuegos = '<div style="display: none;" class="col-4 col-md-3 my-3 box'+listaDataJuegos[i][0]+'">' +
                                    '<div class="card cardJuego">' +
                                        '<img class="img-fluid" src="' + listaDataJuegos[i][6] + '" alt="imagenJuego">' +
                                        '<div class="card-body">' +
                                            '<h5 class="card-title">' + listaDataJuegos[i][2] + '</h5>' +
                                            '<a href="detalleJuego.html?id=' + listaDataJuegos[i][0] + '" class="stretched-link"></a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';
    
            cuerpoJuegos.innerHTML += contentCuerpoJuegos;
            setTimeout('fadeInJuego(".box'+listaDataJuegos[i][0]+'")', 200)
        }
    }
}

function fadeInJuego(idCaja) {
    $(idCaja).fadeIn(1000); 
}

function cargarJuegos() {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, carguemos los juegos validados")
    //     }
    // }
    xmlhttp.open("POST", "php/juegos/buscarJuegosValidados.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaJuegos = JSON.parse(datos.target.response);
        // console.log(listaJuegos);
        if (listaJuegos == null) {
            document.getElementById("noJuegos").removeAttribute("hidden");
        }
        else {
            colocarJuego(listaJuegos);
        }
    });
    xmlhttp.send();
}

function cargarGeneros() {
    var cajaGeneros1 = document.getElementById("generoList1");
    var cajaGeneros2 = document.getElementById("generoList2");

    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Recogiendo los generos");
    //     }
    // }
    xmlhttp.open("POST", "php/generos/buscarGeneros.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        listaGeneros = JSON.parse(datos.target.response);
        numGeneros = listaGeneros.length;
        // console.log(listaGeneros);
        for (var i = 0; i < listaGeneros.length; i++) {
            cajaGeneros1.innerHTML += '<div class="col-12 col-xl-6">' +
                '<div class="form-check">' +
                '<input class="form-check-input" type="checkbox" value="' + listaGeneros[i][0] + '" id=genero1_' + i + ' name=genero' + i + '_1>' +
                '<label class="form-check-label" for="genero1_' + i + '"> ' + listaGeneros[i][1] + ' </label>' +
                '</div> </div>';

            cajaGeneros2.innerHTML += '<div class="col-6">' +
                '<div class="form-check">' +
                '<input class="form-check-input" type="checkbox" value="' + listaGeneros[i][0] + '" id=genero2_' + i + ' name=genero' + i + '_2>' +
                '<label class="form-check-label" for="genero2_' + i + '"> ' + listaGeneros[i][1] + ' </label>' +
                '</div> </div>';
        }
    });
    xmlhttp.send();
}

function cargarMas() {
    var cuerpoJuegos = document.getElementById("cuerpoJuegos");
    var rutaTemporal;

    // console.log("Cargar más contenido, en ello");
    // console.log(copiaListaJuegos);
    // console.log(copiaListaJuegos.length);

    for (var i = (12 * numRecargas); i < copiaListaJuegos.length; i++) {
        console.log("Añadiendo el juego numero " + i);
        rutaTemporal = "/ArchivosTemporales/" + colocarMiniatura(copiaListaJuegos[i][0], copiaListaJuegos[i][6]);
        var contentCuerpoJuegos = '<div style="display: none;" class="col-4 col-md-3 my-3 box'+copiaListaJuegos[i][0]+'">' +
                                    '<div class="card cardJuego">' +
                                        '<img class="img-fluid" src="' + rutaTemporal + '" alt="imagenJuego">' +
                                        '<div class="card-body">' +
                                            '<h5 class="card-title">' + copiaListaJuegos[i][2] + '</h5>' +
                                            '<a href="detalleJuego.html?id=' + copiaListaJuegos[i][0] + '" class="stretched-link"></a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

        cuerpoJuegos.innerHTML += contentCuerpoJuegos;
        setTimeout('fadeInJuego(".box'+copiaListaJuegos[i][0]+'")', 200);
        setTimeout('borrarFichero("'+rutaTemporal+'")',1000);

    }
    numRecargas++;

    if ((12 * numRecargas) >= copiaListaJuegos.length) {
        // console.log("Ya se han puesto todos los juegos");
        document.getElementById("cargarMas").setAttribute("hidden", "true");
    }
}

// function colocarMiniatura(idJuego) {
//     var rutaRecogida;
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Colocando la miniatura...")
//         }
//     }
//     xmlhttp.open("POST", "php/juegos/miniaturaColocar.php", false);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.addEventListener("load", function (datos) {
//         rutaRecogida = datos.target.response;
//         console.log(rutaRecogida);
//     });
//     xmlhttp.send("idJuego=" + idJuego);     
//     return rutaRecogida;
// }

// function borrarFichero(rutaFichero) {
//     rutaFichero = rutaFichero.substring(0, (rutaFichero.length-2));
//     console.log(rutaFichero);
//     var xmlhttp = new XMLHttpRequest();
//     xmlhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("Borrando elemento")
//         }
//     }
//     xmlhttp.open("POST", "php/borrar/borrarFichero.php", true);
//     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xmlhttp.send("rutaFichero="+rutaFichero);
// }