var prueba;
var result = "";
var req = new XMLHttpRequest();
function bus() {

    var result = "";
    var req = new XMLHttpRequest();
    var porNombre = document.getElementsByName("q")[0].value;
    var numero_pag = document.getElementById("paginas").value;
    //document.getElementById("resultado").innerHTML=porNombre;
    // Creación de la petición HTTP

    // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
    req.open("GET", "http://www.omdbapi.com/?apikey=eabd474&s=" + porNombre + "&page=" +  numero_pag, false);
    // Envío de la petición
    req.send(null);

    var data = JSON.parse(req.responseText)
    
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
        });
        document.getElementById("informacion").innerHTML = detalles;   
    }
   
    $(document).ready(function () {
             
        var rowsShown = 5;
        var rowsTotal = $('#mia tbody tr').length;
        var numPages = rowsTotal / rowsShown;
        for (i = 0; i < numPages; i++) {
            var pageNum = i + 1;
            $('.menu').append('<a href="#" rel="' + i + '">' + pageNum + '</a> ');
        }
        $('#mia tbody tr').hide();
        $('#mia tbody tr').slice(0, rowsShown).show();
        $('.menu a:first').addClass('active');
        $('.menu a').bind('click', function () {
            $('.menu a').removeClass('active');
            $(this).addClass('active');
            var currPage = $(this).attr('rel');
            var startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $('#mia tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
                css('display', 'table-row').animate({ opacity: 1 }, 300);
        });
    });
}


