var searchFormEl = document.getElementById('recipe-search');
var searchIngridientsEl = document.querySelector("#ingredients-search");
var searchQueryEl = document.querySelector("#find-recipes-input");
var searchBtnEl = document.querySelector("#search-btn");
var resultsContainerEl = document.querySelector("#results");
var recipeListEl = document.getElementById("recipe-list");
var recipeCardForm = document.getElementById('recipe-card-form');
var titleInputEl = document.getElementById('title-input');
var nutritionInfoEl = document.getElementById('nutrition-info');
var recipeUrl = document.getElementById('recipe-url');
var recipeCardArray = [];


//Listen for Find Recipes search and trigger search API
searchBtnEl.addEventListener('click', function (event) {
  event.preventDefault();
  var searchQueryIn = searchIngridientsEl.value;
  nutritionFacts(searchQueryIn);
  recipeSearch(searchQueryIn);
});


//Listen for ingredient search submit and trigger API functions
searchFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  event.stopPropagation();
  var searchQuery = searchQueryEl.value;
  recipeSearch(searchQuery);
});


//Function to query nutrition facts API
function nutritionFacts(query) {
  if (query) {
    const url =
      "https://edamam-edamam-nutrition-analysis.p.rapidapi.com/api/nutrition-data?ingr=" +
      query +
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
        var errorMessage = document.createElement('p');
        errorMessage.textContent = "No nutrition information found. Be sure to specify ingredient amounts and check spelling."
        resultsContainerEl.appendChild(errorMessage);
      });
  }
}

//Function to query recipe search API
function recipeSearch(query) {
  console.log(query)
  if (query) {
    const url =
      "https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2?type=public&q=" +
      query;

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
                var errorMessage = document.createElement('p');
                errorMessage.textContent = "No recipes found with the specifed ingredients or search terms."
                recipeListEl.appendChild(errorMessage);
              });
  }
}



// Save nutrition data from API, format and print to screen
function displayResults(data) {
  resultsContainerEl.innerHTML = '';
  var displayMacros = document.createElement('strong');
  var linebreak = document.createElement('hr')
  displayMacros.textContent = 'Nutrition Breakdown:'
  displayMacros.setAttribute('class', 'font-extrabold text-lg');
  resultsContainerEl.appendChild(displayMacros);
  resultsContainerEl.appendChild(linebreak);

  var calorieEl = Math.floor(data.calories);
  var carbsEl = Math.floor(data.totalNutrients.CHOCDF.quantity);
  var proteinEl = Math.floor(data.totalNutrients.PROCNT.quantity);
  var fatEl = Math.floor(data.totalNutrients.FAT.quantity);
  var sugarEl = Math.floor(data.totalNutrients.SUGAR.quantity);
  var cholEl = Math.floor(data.totalNutrients.CHOLE.quantity);
  var fiberEl = Math.floor(data.totalNutrients.FIBTG.quantity);
  var sodiumEl = Math.floor(data.totalNutrients.NA.quantity);

  var displayCalorieEl = document.createElement('li');
  var displayCarbsEl = document.createElement('li');
  var displayProteinEl = document.createElement('li');
  var displayFatEl = document.createElement('li');
  var displaySugarEl = document.createElement('li');
  var displayCholEl = document.createElement('li');
  var displayFiberEl = document.createElement('li');
  var displaySodiumEl = document.createElement('li');

  displayCalorieEl.textContent = 'Calories: ' + calorieEl ;
  displayCarbsEl.textContent = 'Carbohydrates: ' + carbsEl + 'mg';
  displayProteinEl.textContent = 'Protein: ' + proteinEl + 'g';
  displayFatEl.textContent = 'Fat: ' + fatEl + 'g';
  displaySugarEl.textContent = 'Sugar: ' + sugarEl + 'g';
  displayCholEl.textContent = 'Cholesterol: ' + cholEl + 'mg';
  displayFiberEl.textContent = 'Fiber: ' + fiberEl + 'g';
  displaySodiumEl.textContent = 'Sodium: ' + sodiumEl + 'mg';

  resultsContainerEl.appendChild(displayCalorieEl);
  resultsContainerEl.appendChild(displayCarbsEl);
  resultsContainerEl.appendChild(displayProteinEl);
  resultsContainerEl.appendChild(displayFatEl);
  resultsContainerEl.appendChild(displaySugarEl);
  resultsContainerEl.appendChild(displayCholEl);
  resultsContainerEl.appendChild(displayFiberEl);
  resultsContainerEl.appendChild(displaySodiumEl);
  console.log(resultsContainerEl);

  // var saveNutriBtn = document.createElement('button');
  // saveNutriBtn.textContent = 'Save Nutrition Info';
  // saveNutriBtn.setAttribute('class', 'text-white bg-green-900 hover:bg-green-700 hover:underline rounded py-2 px-6 w-full');
  // resultsContainerEl.appendChild(saveNutriBtn);

  // saveNutriBtn.dataset.calories = Math.floor(data.hits.recipe.calories)
  // saveNutriBtn.dataset.carbs = Math.floor(data.hits.recipe.totalNutrients.CHOCDF.quantity)
  // saveNutriBtn.dataset.protein = Math.floor(data.hits.recipe.totalNutrients.PROCNT.quantity)
  // saveNutriBtn.dataset.fat = Math.floor(data.hits.recipe.totalNutrients.FAT.quantity)
  // saveNutriBtn.dataset.sugar = Math.floor(data.hits.recipe.totalNutrients.SUGAR.quantity)
  // saveNutriBtn.dataset.chol = Math.floor(data.hits.recipe.totalNutrients.CHOLE.quantity)
  // saveNutriBtn.dataset.fiber = Math.floor(data.hits.recipe.totalNutrients.FIBTG.quantity)
  // saveNutriBtn.dataset.sodium = Math.floor(data.hits.recipe.totalNutrients.NA.quantity)

  // saveNutriBtn.addEventListener('click', function() {openModal(event.target.dataset.calories,event.target.dataset.carbs,event.target.dataset.protein,event.target.dataset.fat,event.target.dataset.sugar,event.target.dataset.chol,event.target.dataset.fiber,event.target.dataset.sodium)})
}


//Save top 5 recipes, print to screen and add Save Recipe buttons
function displayRecipes(data) {
  recipeListEl.innerHTML = '';
  var display = document.createElement('strong');
  var linebreak = document.createElement('hr')
  display.textContent = 'Recipes you may enjoy:'
  display.setAttribute('class', 'font-extrabold text-lg');
  recipeListEl.appendChild(display);
  recipeListEl.appendChild(linebreak);

  for (var i=0; i<5; i++) {
    var recipeCard = document.createElement('section');
    recipeCard.setAttribute('class', 'flex justify-between border border-slate-400 rounded m-2 p-2')
    recipeListEl.appendChild(recipeCard);

    var recipeName = data.hits[i].recipe.label;
    var displayName = document.createElement('h3');
    var cardSection = document.createElement('div');
    displayName.textContent = recipeName;
    displayName.setAttribute('class', 'font-extrabold leading-loose');
    cardSection.appendChild(displayName);
    
    var recipeCuisine = data.hits[i].recipe.cuisineType;
    var displayCuisine = document.createElement('p');
    displayCuisine.textContent = recipeCuisine;
    cardSection.appendChild(displayCuisine);

    var recipeCalories = Math.floor(data.hits[i].recipe.calories);
    var displayCalories = document.createElement('p');
    displayCalories.textContent = 'Calories: ' + recipeCalories;
    cardSection.appendChild(displayCalories);    

    var recipeSource = data.hits[i].recipe.source;
    var displaySource = document.createElement('a');
    displaySource.textContent = recipeSource;
    displaySource.setAttribute('href',data.hits[i].recipe.url);
    displaySource.setAttribute('class', 'hover:underline');
    cardSection.appendChild(displaySource);
    recipeCard.appendChild(cardSection);

    var saveBtn = document.createElement('button');
    saveBtn.textContent = "Save Recipe";
    saveBtn.setAttribute('class','text-white bg-green-900 hover:bg-green-700 hover:underline rounded py-2 px-6 w-1/4');
    recipeCard.appendChild(saveBtn);

    // Save API data as data fields on button elements in order to prepopulate modal
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

    saveBtn.addEventListener('click', function() {openModal(event.target.dataset.name,event.target.dataset.url,event.target.dataset.calories,event.target.dataset.carbs,event.target.dataset.protein,event.target.dataset.fat,event.target.dataset.sugar,event.target.dataset.chol,event.target.dataset.fiber,event.target.dataset.sodium)})
    
  }
  
  document.getElementById('main').appendChild(recipeListEl);
  
}


// Open Add Recipe modal and pre-populate with data fields
function openModal(title,url,calories,carbs,protein,fat,sugar,chol,fiber,sodium) {

  console.log(('Calories: ' + calories + "\n" + 'Carbohydrates: ' + carbs + 'mg'))
  titleInputEl.setAttribute('value',title);
  recipeUrl.setAttribute('value',url);
  nutritionInfoEl.value = ('Calories: ' + calories + "\n" + 'Carbohydrates: ' + carbs + 'mg' + "\n" + 'Protein: ' + protein + 'g' + "\n" + 'Fat: ' + fat + 'g' + "\n" + 'Sugar: ' + sugar + 'g' + "\n" + 'Cholesterol: ' + chol + 'mg' + "\n" + 'Fiber: ' + fiber + 'g' + "\n" + 'Sodium: ' + sodium + 'mg')

  recipeCardForm.style.display = 'block';
}


// Listen for Add Recipe modal submit-- add to local storage and load Recipe Box page
recipeCardForm.addEventListener('submit', function(event) {
  event.preventDefault();
  event.stopPropagation();

  //added if card form input empty return alert preventing empty output to display
  if (!titleInputEl.value || !nutritionInfoEl.value || !recipeUrl.value) {
      alert("Please fill in all fields");
      return;
  }

  var newRecipe = {
      title: titleInputEl.value,
      body: nutritionInfoEl.value,
      url: recipeUrl.value,
  }

    // added check if array is empty
    if (recipeCardArray.length === 0) {
      var localRecipeArray = JSON.parse(localStorage.getItem('recipe'));

      if (localRecipeArray !== null) {
          recipeCardArray = localRecipeArray;
      }
  }

  console.log(recipeCardArray)
  recipeCardArray.push(newRecipe);
  console.log(recipeCardArray);

  localStorage.setItem('recipe', JSON.stringify(recipeCardArray));
  recipeCardForm.style.display = 'none';

  window.location.href = "./recipe-box.html"
});