var modalTestBtn = document.getElementById('modal-test-btn');
var recipeBoxContainerEl = document.getElementById('recipe-box-container');
var recipeBoxHeaderEl = document.getElementById('recipe-box-header');
var recipeCardForm = document.getElementById('recipe-card-form');
var titleInputEl = document.getElementById('title-input');
var nutritionInfoEl = document.getElementById('nutrition-info');
var recipeUrl = document.getElementById('recipe-url');
var closeBtn = document.getElementById('close');
var saveBtn = document.getElementById('save-button');
var recipeCardArray = [];


modalTestBtn.onclick = function() {
    recipeCardForm.style.display = 'block';
}

closeBtn.onclick = function(event) {
    event.stopPropagation();
    recipeCardForm.style.display = 'none';
}

recipeCardForm.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var newRecipe = {
        title: titleInputEl.value,
        body: nutritionInfoEl.value,
        url: recipeUrl.value,
    }

    recipeCardArray.push(newRecipe);
    localStorage.setItem('recipe', JSON.stringify(recipeCardArray));
    recipeCardForm.style.display = 'none';

printSavedRecipes();
});

function printSavedRecipes() {

    var localRecipeArray = JSON.parse(localStorage.getItem('recipe'));

    if (localRecipeArray == null) {
        recipeCardArray = [];
    } else {
        recipeCardArray = localRecipeArray
    }

    console.log(recipeCardArray)

    if (recipeCardArray == null) {} else {

        for (var i=0; i<recipeCardArray.length; i++) {
            var recipeCard = document.createElement('section');
            recipeBoxContainerEl.appendChild(recipeCard);

            var recipeURL = recipeCardArray[i].url;
            var displayAnchor = document.createElement('a');
            displayAnchor.setAttribute('href',recipeURL);
            recipeCard.setAttribute('class', 'border border-2 border-slate-600 rounded p-2');
            recipeCard.appendChild(displayAnchor);
        
            var recipeName = recipeCardArray[i].title;
            var displayName = document.createElement('h3');
            displayName.textContent = recipeName;
            displayName.setAttribute('style', 'font-weight: bolder; font-size: 125%');
            displayAnchor.appendChild(displayName);

            var recipeNutri = recipeCardArray[i].body;
            var displayNutri = document.createElement('p');
            displayNutri.textContent = recipeNutri;
            recipeCard.appendChild(displayNutri);

        }
    }
    
}