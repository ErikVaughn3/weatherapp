//search button
$(document).ready(function () {
    $("#search-button").on("click", function () {
        var searchValue = $("#location-input").val();
        $("#location-input").val("")
        weatherNow(searchValue);
        weatherForecast(searchValue);
    });
//history   
    var history = JSON.parse(localStorage.getItem("history")) || [];
    if (history.length > 0) {
        weatherNow(history[history.length - 1]);
    }
    for (var i = 0; i < history.length; i++) {
        insertRow(history[i]);
    }
    
    function insertRow(text) {
        var listItem = $("<li>").addClass("list-group-item").text(text);
        $(".history").append(listItem);
    }

    $(".history").on("click", "li", function (){
        weatherNow($(this).text());
        weatherForecast($(this).text());
    });
    function weatherNow(searchValue) {
        $.ajax({
            type: "GET",
            URL: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=000f632bba0da9e4dca6508a249b9158&units=imperial",
        }).then(function (data) {
            if (history.indexOf(searchValue) === -1) {
                history.push(searchValue);
                localStorage.setItem("history", JSON.stringify(history));
                insertRow(searchValue);
            }
            $("#today").empty();

            var title = $("<h4>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");

            var card = $("<div>").addClass("card");
            var cardContent = $("<div>").addClass("card-content");
            var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + "°F");
            var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + "mph");
            var humidity = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
            var longitude = data.coord.lon
            var latitude = data.coord.lat

            $.ajax({
                type: "GET",
                URL: "https://https://api.openweathermap.org/data/2.5/uvi?appid=000f632bba0da9e4dca6508a249b9158&lat=" + latitude + "&lon=" + longitude,
            }).then(function (response) {
                console.log(response);

                var uvColor;
                var uvOutput = response.value;
                var btn = $("<span>").addClass("btn btn-md").text(uvOutput);
                var uvIndex = $("<p>").addClass("card-text").text("UV Index: ");
                
                if (uvOutput < 3) {
                    btn.addClass("btn-success");
                } else if (uvOutput < 7) {
                    btn.addClass("btn-warning");
                } else {
                    btn.addClass("btn-danger");
                }

                cardContent.append(uvIndex);
                $("#today .card-content").append(uvIndex.append(btn));
            });

            cardContent.append(title, temp, humidity, wind);
            card.append(cardContent);
            $("#today").append(card);
            console.log(data);
        });
    }

    function weatherForecast(searchValue) {
        $.ajax({
            type: "GET",
            URL: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=000f632bba0da9e4dca6508a249b9158&units=imperial",
        }).then(function (data) {
            console.log(data);
        })


        
    }       
});