var searchFormEl = document.getElementById('search-form');
var searchUrlInputEl = document.querySelector("#url-input");
var searchIngridientsEl = document.querySelector("#ingredients-search");
var searchBtnEl = document.querySelector("#search-btn");
var resultsContainerEl = document.querySelector("#results");
var recipeListEl = document.querySelector("#recipe-list");

function getApi() {
  var searchQueryUrl = searchUrlInputEl.value;
  var searchQueryIn = searchIngridientsEl.value;

  if (searchQueryIn || searchQueryUrl) {
    const url =
      "https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=" +
      searchQueryIn +
      "&nutrition-type=cooking";

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
        displayResults(data);
      });
  }
}

function displayResults(data) {
  resultsContainerEl.innerHTML = '';

  var calorieEl = data.calories;
  var carbsEl = data.totalNutrients.CHOCDF;
  var proteinEl = data.totalNutrients.PROCNT;
  var fatEl = data.totalNutrients.FAT;
  var sugarEl = data.totalNutrients.SUGAR;
  var cholEl = data.totalNutrients.CHOLE;
  var fiberEl = data.totalNutrients.FIBTG;
  var sodiumEl = data.totalNutrients.NA;

  var displayCalorieEl = document.createElement('li');
  var displayCarbsEl = document.createElement('li');
  var displayProteinEl = document.createElement('li');
  var displayFatEl = document.createElement('li');
  var displaySugarEl = document.createElement('li');
  var displayCholEl = document.createElement('li');
  var displayFiberEl = document.createElement('li');
  var displaySodiumEl = document.createElement('li');

  displayCalorieEl.textContent = 'Calories: ' + calorieEl;
  displayCarbsEl.textContent = 'Carbohydrates: ' + carbsEl;
  displayProteinEl.textContent = 'Protein: ' + proteinEl;
  displayFatEl.textContent = 'Fat: ' + fatEl;
  displaySugarEl.textContent = 'Sugar: ' + sugarEl;
  displayCholEl.textContent = 'Cholesterol: ' + cholEl;
  displayFiberEl.textContent = 'Fiber: ' + fiberEl;
  displaySodiumEl.textContent = 'Sodium: ' + sodiumEl;

  resultsContainerEl.appendChild(displayCalorieEl);
  resultsContainerEl.appendChild(displayCarbsEl);
  resultsContainerEl.appendChild(displayProteinEl);
  resultsContainerEl.appendChild(displayFatEl);
  resultsContainerEl.appendChild(displaySugarEl);
  resultsContainerEl.appendChild(displayCholEl);
  resultsContainerEl.appendChild(displayFiberEl);
  resultsContainerEl.appendChild(displaySodiumEl);
  console.log(resultsContainerEl);
}

searchBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  getApi();
});
