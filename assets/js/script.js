
var searchFormEl = document.getElementById('search-form');
var searchUrlInputEl = document.querySelector("#url-input");
var searchIngridientsEl = document.querySelector("#ingredients-search");

var searchBtnEl = document.querySelector("#search-btn");
var resultsContainerEl = document.querySelector("#results");
var recipeListEl = document.querySelector("#recipe-list");

function getApi() {
  //   var searchQueryUrl = searchUrlInputEl.value;
    var searchQueryIn = searchIngridientsEl.value;
  
  
    if (searchQueryIn) {
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
        })
        .catch(function (error) {
          console.error(error); 
        });
    }
  
  // <<< ------------ second api -------->>>>>
    console.log(searchQueryIn)
      if (searchQueryIn) {
        const url =
          "https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=" +
          searchQueryIn;
    
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "2e845e8009mshc295949c74088fcp167a1djsn8494e03546dc",
            "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
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
                    displayRecipes(data);
                  })
                  .catch(function (error) {
                    console.error(error); 
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


function displayRecipes(data) {
  for (var i=0; i<5; i++) {
    var recipeCard = document.createElement('section');
    recipeListEl.appendChild(recipeCard);

    var recipeName = data.hits[i].recipe.label;
    var displayName = document.createElement('h3');
    displayName.textContent = recipeName;
    recipeCard.appendChild(displayName);

    var recipeCuisine = data.hits[i].recipe.cuisineType;
    var displayCuisine = document.createElement('p');
    displayCuisine.textContent = recipeCuisine;
    recipeCard.appendChild(displayCuisine);

    var recipeCalories = data.hits[i].recipe.calories;
    var displayCalories = document.createElement('p');
    displayCalories.textContent = 'Calories: ' + recipeCalories;
    recipeCard.appendChild(displayCalories);    

    var recipeSource = data.hits[i].recipe.source;
    var displaySource = document.createElement('p');
    displaySource.textContent = recipeSource;
    displaySource.setAttribute('html',data.hits[i].recipe.url)
    recipeCard.appendChild(displaySource);  
    
    
  }
  
}


searchBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  getApi();
});

