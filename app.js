// Psuedo Code //
    // Create an array of the gif topics 
    // Create a button for each gif topic 
    // Use a for loop that appends a button to each string in array
    // User should grab 10 static, non-animated gifs from GIPHY API
    // When user should click still GIPHY image, it should animate (pause/play)
    // Under each gif, display it's rating (PG, G, etc.)
    // Create a form for the page that takes user input and adds it to topics array
    // Make a function call that takes each topic in array and remakes the buttons on page
// =========================================================================================================== //
$(document).ready(function() {

// Topics array //

var netflixShows = ["Shameless", "Girl Boss", "Narcos", "New Girl", "Santa Clarita Diet"];

// Creating buttons from the array //

function showButtons () {

//Looping through array //
   for (var i = 0; i < netflixShows.length; i++) {

       var addButton = $("<button>");

       addButton.addClass("btn btn-default");
       addButton.attr("type", "button"); 
       addButton.append(netflixShows[i]);
       addButton.attr("value", netflixShows[i]);

       $("#buttonsHolder").append(addButton);  // <-- Appending the new button to it's HTML div //

       console.log(netflixShows);
    }
}

showButtons(); // <-- Calling my function 

// Getting API info using AJAX //

// Constructing a queryURL

function getGifs(tvShow) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=MK0cvZOOOfzvXyxD6dKC4HumUEx6jLUE&limit=10";

    console.log(queryURL);

//var apiKey = "MK0cvZOOOfzvXyxD6dKC4HumUEx6jLUE"//

// Performing AJAX request with queryURL //
    
$.ajax({
    url: queryURL, 
    method: "GET", 
}).done(function(response) {
    console.log(response.data);
    imageResults(response); 

});

}
// Creating images in the div //

function imageResults(response) {
    $("#gifHolder").empty(); 

    for (var j = 0; i <response.data.length; j++) {
        var gifImg = $("<img>"); 
        gifImg.addClass("gifImgs img-thumbmail grid-item");
        gifImg.attr("src", response.data[j].images.fixed_width_still.url);
        gifImg.attr("data-state", "still");
        gifImg.attr("data-still", response.data[j].images.fixed_width_still.url);
        gifImg.attr("data-animate", results[j].images.fixed_width.url);

    // Creating a paragraph tag with the gif's rating & appending it//
        var gifRating = $("<p>");
        gifRating.append ("Rating: " + response.data[j].rating); 

    // Creating a div tag for gif's rating & appending it //
        var gifWithRating = $("<div>");
        gifWithRating.append(gifImg, gifRating);
        gifWithRating.addClass("gridItem");
        $("#gifHolder").append(gifWithRating);
    }

}

// On Click Functions //

// When user adds a new button //

    $(document).on("click", ".gifImgs", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    
    // Existing Buttons //

    $(document).on("click", ".topicBtn", function() {
        console.log("click");
        getGifs($(this).attr("value"));
        console.log($(this).attr("value"));
    });

    $("#search").on("click", function() {
        event.preventDefault();

        var searchShow = $(".form-control").val();
        console.log(searchShow);
        $(".form-control").empty();

        netflixShows.push(searchShow);
        $("#buttonsHolder").empty();
        showButtons();
        getGifs(searchShow);
    });

})