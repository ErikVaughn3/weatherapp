//search button
$(document).ready(function () {
    $("#search-button").on("click", function () {
        var searchValue = $("#location-input").val();
        $("#location-input").val("")
        weatherFunction(searchValue);
        weatherForecast(searchValue);
    });
    
    var history = JSON.parse(localStorage.getItem("history"));
    if (history.length > 0) {
        weatherFunction(history[history.length - 1]);
    }
    for (var i = 0; i < history.length; i++) {
        createRow(history[i]);
    }
    

})