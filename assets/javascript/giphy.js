// Array of Bands
var bands = ["Pink Floyd", "Led Zeppelin", "Pearl Jam", "Rage Against The Machine"];
// Function to display Gifs
function displayGifs() {
  // Method to delete band gifs prior to loading new ones
  $("#bands-display").empty();
  //
  var bands = $(this).attr("data-bands");
  // API key for band giphy url 
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bands + "&apikey=qDbPluXgfXDVwNDnEsM3lSq5IxCA7lLe&limit=7&rating=PG-13";
  // ajax method to obtain url's and the corresponding data
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;

    // For-loop to cycle the array of bands
    for (var i = 0; i < results.length; i++) {
      // Create new div for bands with class
      var bandsDiv = $("<div>");
      bandsDiv.addClass("bands-div");

      // Create variable for gifs and the image tag
      var gifImg = $("<img>");
      // Add class to identify gif images
      gifImg.addClass("gif");
      // Attribute gifs to results 
      gifImg.attr("src", results[i].images.fixed_height_still.url);
      // Atrribute gifs to bands array including new inserts
      gifImg.attr("alt", bands + [i]);
      // Attribute gifs to data
      gifImg.attr("data-state", "still");
      // Attribute gifs to results in array + new inserts with proper image 
      gifImg.attr("data-still", results[i].images.fixed_height_still.url);
      // Attribute gifts to results in array + new inserts with proper animation in images
      gifImg.attr("data-animate", results[i].images.fixed_height.url);

      // Connect bandsDiv and gifs through html
      bandsDiv.html(gifImg);

      // Create p tag to grab gifRating
      var gifRating = $("<p>");
      // Attach text to rating of each gif in the array + gifs added by user
      gifRating.text("Rating: " + results[i].rating);
      // Load gifRating prior to each band gif
      bandsDiv.prepend(gifRating);

      // Find and Load bands
      $("#bands-display").prepend(bandsDiv);
    }
  })
};

// Function to empty 
function renderButtons() {
  $("#buttons-display").empty();


  // For loop to cycle array
  for (i = 0; i < bands.length; i++) {
    // Create buttons for each band
    var bandsBtn = $("<button>");
    // Attach text to each band button + added band buttons
    bandsBtn.text(bands[i]);
    // Add class to identify band buttons
    bandsBtn.addClass("bands-btn");
    // Add atrribute to identify data from each button/band in the array + added bands
    bandsBtn.attr("data-bands", bands[i]);

    // Append band buttons to identified buttons display
    $("#buttons-display").append(bandsBtn);
  }
};

// Create function to add bands in the event user presses button
$("#add-bands").on("click", function (event) {
  // Method to cancel add bands
  event.preventDefault();

  // Declare variable for added bands to attach value
  var bandsInput = $("#bands-input").val().trim();
  // Attach new band input to the band array
  bands.push(bandsInput);

  renderButtons();
});

// Function to display gifs
$(document).on("click", ".bands-btn", displayGifs);

// Function to animate gifs
$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state");
// If/Else statements to animate image or still image after clicking
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

renderButtons();