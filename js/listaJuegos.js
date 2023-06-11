var listaJuegos = [];
var numGeneros;
var hayFiltracion = false;
var copiaListaJuegos = [];
var numRecargas = 1;
var ordenMuestra = "true";
var masValorados = "false";
var listaPuntuaciones = [];
// var filtroOrden = false;
// var filtroValoracion = false;
// var filtro

//Función que al hacer scroll en la página, si se cumple las condiciones, muestra un boton flotante para subir de nuevo
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btn-flotante").style.display = "block";
      } else {
        document.getElementById("btn-flotante").style.display = "none";
      }
};

//A traves de jQuery, una vez que el documento ha sido cargado totalmente, carga su codigo dado:
//-Se comprueba si se encuentran los filtradores "orden" y/o "valoracion", que afectarán a la forma de mostrar los juegos
//-Si se incluye el filtrador "genero", se buscarán los juegos aplicando el filtro de los generos
//-Si no, se cargarán todos los juegos validados
$(document).ready(function () {
    cargarGeneros();

    //Miramos si hay que ordenar de alguna manera
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("orden1")) {
        ordenMuestra = urlParams.get("orden1");
        mostrarFiltros('orden');
    }
    if (urlParams.has("orden2")) {
        ordenMuestra = urlParams.get("orden2");
        mostrarFiltros('orden');
    }

    if (urlParams.has("valoracion1")) {
        masValorados = urlParams.get("valoracion1");
        mostrarFiltros('valoracion');
    }
    if (urlParams.has("valoracion2")) {
        masValorados = urlParams.get("valoracion2");
        mostrarFiltros('valoracion');
    }

    //Miramos si generos que filtrar
    var query = window.location.search;
    if (query.includes("genero")){
        mostrarFiltros();
        busquedaFiltracion();
    }
    else{
        cargarJuegos();
    }
});

//Función que obtiene las ids de los generos seleccionados para filtrar, construye el mensaje para mandar a la llamada
//de busqueda de juegos, recibe un listado con los juegos que cumplen el filtro de generos, manda obtener la informacion
//de los juegos, retira de la lista los juegos no validados, y los manda imprimir
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
        colocarIndicadorGenero(generosFiltracion[i]);
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

//Función en el que se obtiene la información del juego mandado
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

//Función que crea una nueva lista, rellena con solo los juegos validados de la lista de juegos obtenidos, y la devuelve
function retirarNoValidados() {
    var nuevaLista = [];
    for (i = 0; i < listaJuegos.length; i++) {
        if (listaJuegos[i][9] == 1) {
            nuevaLista.push(listaJuegos[i])
        }
    }
    return nuevaLista;
}

//Función que reordena la lista de juegos a imprimir por los mejor valorados, y devuelve la nueva lista ordenada
function reordenarMasValorados(listaDataJuegos) {
    // console.log("Entre en más valorados");
    var mediaValoraciones = [];

    //Se busca las valoraciones realizadas a los juegos
    for (i = 0; i < listaDataJuegos.length; i++) {
        buscarValoraciones(listaDataJuegos[i][0]);
    }

    //Se guarda en una nueva lista la id del juego y su valoracion
    for (i = 0; i < listaPuntuaciones.length; i++) {
        mediaValoraciones.push([listaPuntuaciones[i][2], listaPuntuaciones[i][3]])
    }

    //Recorre la lista con las valoraciones, y en caso de haber más de una del mismo juego, las suma y hace la media
    const sumas = {};
    var numRepes = 1;
    for (i = 0; i < mediaValoraciones.length; i++) {
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

    //Crea una nueva lista en la que se introduce los juegos valorados, con la media realizada
    const valoracionesOrdenadas = [];
    for (const key in sumas) {
        valoracionesOrdenadas.push([parseInt(key), sumas[key]]);
    }

    // Reordena la nueva lista de juegos valorados, ordenandolos por mayor a menor valoracion
    valoracionesOrdenadas.sort(function (a, b) {
        return b[1] - a[1];
    });

    //Crea una nueva lista de juegos, en la que se introduce primero los juegos con valoraciones, de los mejor valorados a los menos
    //valorados, y prosigue rellenando la nueva lista con los juegos faltantes de la lista original, procurando no repetir ningun juego
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

    // console.log(nuevaListaJuegos);
    return nuevaListaJuegos;
}

//Función que busca las valoraciones de los juegos
function buscarValoraciones(idJuego) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, carguemos los juegos validados")
    //     }
    // }
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

//Función para imprimir los juegos comprados en pantalla, aplicando los filtros de "orden" y "valoracion" si han sido aplicados.
//Si hay más de 12 juegos para imprimir, se imprimen inicialmente 12, y se habilita el boton de "Cargar Más"
function colocarJuego(listaDataJuegos) {
    var cuerpoJuegos = document.getElementById("cuerpoJuegos");
    if (ordenMuestra == "true")
        listaDataJuegos.reverse();
    
    if (masValorados == "true") {
        listaDataJuegos = reordenarMasValorados(listaDataJuegos);
    }

    // console.log(listaDataJuegos);
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

//Función que con jQuery hace aparecer la caja determinada
function fadeInJuego(idCaja) {
    $(idCaja).fadeIn(1000); 
}

//Función para buscar los juegos validados
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

//Función para cargar los generos en las listas de filtracion
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

//Función para cargar más juegos de la lista superior a 12
function cargarMas() {
    var cuerpoJuegos = document.getElementById("cuerpoJuegos");

    for (var i = (12 * numRecargas); i < copiaListaJuegos.length; i++) {
        //console.log("Añadiendo el juego numero " + i);
        var contentCuerpoJuegos = '<div style="display: none;" class="col-4 col-md-3 my-3 box'+copiaListaJuegos[i][0]+'">' +
                                    '<div class="card cardJuego">' +
                                        '<img class="img-fluid" src="' + copiaListaJuegos[i][6] + '" alt="imagenJuego">' +
                                        '<div class="card-body">' +
                                            '<h5 class="card-title">' + copiaListaJuegos[i][2] + '</h5>' +
                                            '<a href="detalleJuego.html?id=' + copiaListaJuegos[i][0] + '" class="stretched-link"></a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

        cuerpoJuegos.innerHTML += contentCuerpoJuegos;
        setTimeout('fadeInJuego(".box'+copiaListaJuegos[i][0]+'")', 200);

    }
    numRecargas++;

    if ((12 * numRecargas) >= copiaListaJuegos.length) {
        // console.log("Ya se han puesto todos los juegos");
        document.getElementById("cargarMas").setAttribute("hidden", "true");
    }
}

//Función para subir la vista de la pantalla al principio
function irArriba() {
  document.documentElement.scrollTop = 0; 
}

//Función que imprime las etiquetas de los filtros "Orden" y "Valoración" en caso de ser incluidos
function mostrarFiltros(caracteristica) {
    if (document.getElementById("cajaMuestraFiltros").hasAttribute("hidden")) {
        document.getElementById("cajaMuestraFiltros").removeAttribute("hidden");
    }
    if (caracteristica == "orden") {
        if (ordenMuestra == "true") {
            document.getElementById('cajaFiltros').innerHTML += '<button class="btn btn-dark mx-1" disabled>Más recientes primero</button>';
        }
        else{
            document.getElementById('cajaFiltros').innerHTML += '<button class="btn btn-dark mx-1" disabled>Más antiguos primero</button>';
        } 
    }

    if (caracteristica == "valoracion") {
        document.getElementById('cajaFiltros').innerHTML += '<button class="btn btn-dark mx-1" disabled>Mejor valorados primero</button>';
    }
}

//Función que imprime las etiquetas de los generos usados en la filtracion 
function colocarIndicadorGenero(idGenero) {
    var xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log("Parece que va bien, coloquemos los generos del juego")
    //     }
    // }
    xmlhttp.open("POST", "php/generos/buscarGenero.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.addEventListener("load", function (datos) {
        nombreGenero = datos.target.response;
        document.getElementById('cajaFiltros').innerHTML += '<button class="btn btn-dark mx-1" disabled>'+nombreGenero+'</button>';
    });
    xmlhttp.send("idGenero="+idGenero);
}
