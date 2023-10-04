var searchFormEl = document.getElementById('search-form');
var searchUrlInputEl = document.querySelector("#url-input");
var searchIngridientsEl = document.querySelector("#ingredients-search");
var searchBtnEl = document.querySelector("#search-btn");
var resultsContainerEl = document.querySelector("#results");
var recipeListEl = document.getElementById("recipe-list");
var recipeCardForm = document.getElementById('recipe-card-form');
var titleInputEl = document.getElementById('title-input');
var nutritionInfoEl = document.getElementById('nutrition-info');
var recipeUrl = document.getElementById('recipe-url');

//add on the text area box a placeholder that says 
// "1 cup rice, 10 oz chickpeas", etc. Enter each ingredient on a new line."

function getApi() {
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

  var calorieEl = Math.floor(data.calories);
  var carbsEl = Math.floor(data.totalNutrients.CHOCDF.quantity);
  var proteinEl = Math.floor(data.totalNutrients.PROCNT.quantity);
  var fatEl = Math.floor(data.totalNutrients.FAT.quantity);
  var sugarEl = Math.floor(data.totalNutrients.SUGAR.quantity);
  var cholEl = Math.floor(data.totalNutrients.CHOLE.quantity);
  var fiberEl = Math.floor(data.totalNutrients.FIBTG.quantity);
  var sodiumEl = Math.floor(data.totalNutrients.NA.quantity);

  var displayMacros = document.createElement('strong');
  var displayCalorieEl = document.createElement('li');
  var displayCarbsEl = document.createElement('li');
  var displayProteinEl = document.createElement('li');
  var displayFatEl = document.createElement('li');
  var displaySugarEl = document.createElement('li');
  var displayCholEl = document.createElement('li');
  var displayFiberEl = document.createElement('li');
  var displaySodiumEl = document.createElement('li');

  displayMacros.textContent = 'Nutrition Facts';
  displayCalorieEl.textContent = 'Calories: ' + calorieEl ;
  displayCarbsEl.textContent = 'Carbohydrates: ' + carbsEl + 'mg';
  displayProteinEl.textContent = 'Protein: ' + proteinEl + 'g';
  displayFatEl.textContent = 'Fat: ' + fatEl + 'g';
  displaySugarEl.textContent = 'Sugar: ' + sugarEl + 'g';
  displayCholEl.textContent = 'Cholesterol: ' + cholEl + 'mg';
  displayFiberEl.textContent = 'Fiber: ' + fiberEl + 'g';
  displaySodiumEl.textContent = 'Sodium: ' + sodiumEl + 'mg';

  resultsContainerEl.appendChild(displayMacros);
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
  recipeListEl.innerHTML = '';

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
    var displaySource = document.createElement('a');
    displaySource.textContent = recipeSource;
    displaySource.setAttribute('href',data.hits[i].recipe.url)
    recipeCard.appendChild(displaySource);  

    var saveBtn = document.createElement('button');
    saveBtn.textContent = "Save Recipe"
    saveBtn.setAttribute('class','text-white bg-green-700 rounded py-2 px-6 w-full')
    recipeCard.appendChild(saveBtn)

    saveBtn.dataset.url = data.hits[i].recipe.url
    saveBtn.dataset.name = data.hits[i].recipe.label
    saveBtn.dataset.calories = Math.floor(data.hits[i].recipe.calories)
    saveBtn.dataset.carbs = Math.floor(data.hits[i].recipe.totalNutrients.CHOCDF.quantity)
    saveBtn.dataset.protein = Math.floor(data.hits[i].recipe.totalNutrients.PROCNT.quantity)
    saveBtn.dataset.fat = Math.floor(data.hits[i].recipe.totalNutrients.FAT.quantity)
    saveBtn.dataset.sugar = Math.floor(data.hits[i].recipe.totalNutrients.SUGAR.quantity)
    saveBtn.dataset.chol = Math.floor(data.hits[i].recipe.totalNutrients.CHOLE.quantity)
    saveBtn.dataset.fiber = Math.floor(data.hits[i].recipe.totalNutrients.FIBTG.quantity)
    saveBtn.dataset.sodium = Math.floor(data.hits[i].recipe.totalNutrients.NA.quantity)


    saveBtn.addEventListener('click', function() {openModal(event.target.dataset.name,event.target.dataset.url,event.target.dataset.calories,event.target.dataset.carbs)})
    
  }
  
  document.getElementById('main').appendChild(recipeListEl);
  
}


function openModal(title,url,calories,carbs) {

  console.log(('Calories: ' + calories + "\n" + 'Carbohydrates: ' + carbs + 'mg'))
  titleInputEl.setAttribute('value',title);
  recipeUrl.setAttribute('value',url);
  nutritionInfoEl.setAttribute('value',('Calories: ' + calories + "\n" + 'Carbohydrates: ' + carbs + 'mg'))



  recipeCardForm.style.display = 'block';
}


searchBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  getApi();
});
