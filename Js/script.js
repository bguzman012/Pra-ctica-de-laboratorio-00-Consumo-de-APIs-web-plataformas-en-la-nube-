var req = new XMLHttpRequest();
function bus() {

    var prueba;
    var result = "";


    var porNombre = document.getElementsByName("q")[0].value;
    var numero_pag = document.getElementById("paginas").value;
    //document.getElementById("resultado").innerHTML=porNombre;
    // Creación de la petición HTTP

    // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
    req.open("GET", "http://www.omdbapi.com/?apikey=eabd474&s=" + porNombre + "&page=" + numero_pag, false);
    // Envío de la petición
    req.send(null);


    var data = JSON.parse(req.responseText)

    console.log(data)

    var detalles = "";


    if (porNombre == "") {
        detalles = "<tr>" +
            "<td colspan='5'> Sin informacion disponible...</td>" +
            "</tr>";
        document.getElementById("informacion").innerHTML = detalles;
    } else {
        data.Search.forEach(movie => {
            detalles += "<tr>" +
                "<td><a href='#' onclick=\"buscarPorID('" + movie.imdbID + "')\">Mas detalles </td>" +
                "<td>" + movie.Title + "</td>" +
                "<td>" + movie.Year + "</td>" +
                "<td>" + movie.Type + "</td>" +
                "<td><img src=" + movie.Poster + "</td>" +
                "</tr>";
            console.log(movie.imdbID)
        });
        document.getElementById("informacion").innerHTML = detalles;
        document.getElementById('action').innerHTML = "";
    }

    $(document).ready(function () {

        var rowsShown = 5;
        var rowsTotal = $('#mia tbody tr').length;
        var numPages = rowsTotal / rowsShown;
        var indices = "";
        for (i = 0; i < numPages; i++) {
            var pageNum = i + 1;
            indices += '<a href="#" rel="' + i + '">' + pageNum + '</a> ';
        };
        document.getElementById('menu').innerHTML = indices;
        $('#mia tbody tr').hide();
        $('#mia tbody tr').slice(0, rowsShown).show();
        $('#menu a:first').addClass('active');
        $('#menu a').bind('click', function () {
            $('#menu a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('#mia tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                css('display', 'table-row').animate({ opacity: 1 }, 300);
        });

    });
}

function buscarPorID(clave) {
    var peticion = ""
    var data = ""
    var detalles = ""
    var clave2 = clave
    console.log(clave2)
    peticion = "http://www.omdbapi.com/?apikey=eabd474&i=" + clave2 + "&plot=full"
    req.open("GET", peticion, false);
    // Envío de la petición
    req.send(null);

    var data = JSON.parse(req.responseText)

    console.log(data);
    var year = data.Year;
    console.log(year);
    var rated = data.Rated;
    console.log(rated);
    var released = data.Released;
    console.log(released);
    var runtime = data.Runtime;
    console.log(runtime);
    var actors = data.Actors;
    console.log(actors);
    var country = data.Country;
    console.log(country);
    var director = data.Director;
    console.log(director);
    var genre = data.Genre;
    console.log(genre);
    var language = data.Language;
    console.log(language);
    var plot = data.Plot;
    console.log(plot);
    var poster = data.Poster;
    console.log(poster);

    var template = document.getElementById('index').innerHTML;

    console.log(template);

    var compile = Handlebars.compile(template);

    var compiledHTML = compile({

        name: `${data.Title}`,
        poster: `${data.Poster}`,
        rated: `Clasificacion: <strong>${data.Rated}</strong>`,
        year: `Fecha de lanzamiento : <strong>${data.Released}</strong>`,
        runtime: `Duracion: <strong>${data.Runtime}</strong>`,
        genre: `Genero: <strong>${data.Genre}</strong>`,
        director: `Director: <strong>${data.Director}</strong>`,
        plot: `<strong>Sinopsis:</strong> ${data.Plot}`,
    });
    document.getElementById('action').innerHTML = compiledHTML;


}




