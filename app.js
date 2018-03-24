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
    $('#buttonsHolder').empty(); 

//Looping through array //
   for (var i = 0; i < netflixShows.length; i++) {

       var a = $("<button>");
       a.addClass("btn btn -default");
       a.attr("data-name", netflixShows[i]); 

    // Provide Button Text with value of Netflix Shows //
       a.text(netflixShows[i]);

       $("#buttonsHolder").append(a);  // <-- Appending the new button to it's HTML div //
       $("#userInput").val('');
    };
}; 

// Event Listener //

$("#search").on("click", function (event) {
    event.preventDefault(); // <-- prevents the page from refreshing

    var tvShow = $("#userInput").val().trim(); // <-- Get user text from input box 

    netflixShows.push(tvShow); // <-- Adding user input to our array

    showButtons ();
});

$(document).on("click", ".tvShow", displayGifs) 

showButtons(); // <-- Display tv show list 

});

// Get and store value from button //
function displayGifs() {
   var tvShow = $(this).attr("data-name");

// Constructing queryURL
    //var apiKey = "MK0cvZOOOfzvXyxD6dKC4HumUEx6jLUE";//

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvShow + "&api_key=jMK0cvZOOOfzvXyxD6dKC4HumUEx6jLUE&limit=10";
console.log(queryURL);
// Perfoming an AJAX request 

$.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {

  // Storing the array as variable name 
     var giphy = response.data; 

  // Looping through the array in queryURL

    for(var i=0; i<giphy.length; i++){
     
    var netflixGifs = $('id="gifHolder')

//  Gif Rating //
    var pOne = $("<p>").text("Rating: " + giphyArr[i].rating);
    var netflixImage = $('<img data-state="still">')

    netflixImage.attr('src', giphy[i].images.fixed_height_still.url)
    netflixImage.attr('data-animate', giphy[i].images.fixed_height.url)
    netflixImage.attr('data-still', giphy[i].images.fixed_height_still.url)
    netflixImage.attr('class', 'gif img-responsive')
            
    netflixdGifs.append(pOne);
    netflixGifs.append(netflixImage);

//Fit the gifs that iterate out onto page into their own rows of 2 with 5 total rows
if (i < 2){
    $('#gifRowOne').append(foodGifs)
  }
  else if (i > 2 && i < 5) {
    $('#gifRowTwo').append(foodGifs);
  }
  else if (i > 4 && i < 7){
    $('#gifRowThree').append(foodGifs);
  }
  else if (i > 6 && i < 9) {
    $('#gifRowFour').append(foodGifs);
  }
  else if (i > 8 && i < 11) {
    $('#gifRowFive').append(foodGifs);
  };
}
})
}


// Toggle Function //
$(document).on("click", ".gif", function(){

var still = $(this).attr("data-still");
var animate = $(this).attr("data-animate");

if ($(this).attr("data-state") === "still"){
  $(this).attr("src", animate);
  $(this).attr("data-state", "animate");
}
else {
  $(this).attr("src", still);
  $(this).attr("data-state", "still");
}
})
    