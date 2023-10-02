var searchUrlInputEl = document.querySelector("#url-input");
var searchIngredientsEl = document.querySelector("#ingredients-search");
var searchBtnEl = document.querySelector("#search-btn");
var resultsContainerEl = document.querySelector("#results");
var recipeListEl = document.querySelector("#recipe-list");

function getApi() {
  var searchQueryUrl = searchUrlInputEl.value;
  var searchQueryIn = searchIngredientsEl.value;

  if (searchQueryIn || searchQueryUrl) {
    const url =
      "https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=" +
      searchQueryIn +
      "&nutrition-type=cooking";
    //   'https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=%3CREQUIRED%3E&nutrition-type=cooking';

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1715b24a43msh9b5023d4aa71c9bp108651jsn692826a37b09",
        "X-RapidAPI-Host": "edamam-edamam-nutrition-analysis.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Response failed");
        }
      })
      .then(function (data) {
        console.log(data);
        // displayResults(data);
        
      })
      .catch(function (error) {
        console.error(error); 
      });
  }
}

// var displayResults = function(data){
//     resultsContainerEl.innerHTML = '';


// }