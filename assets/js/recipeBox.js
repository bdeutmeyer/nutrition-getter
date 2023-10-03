var modalTestBtn = document.getElementById('modal-test-btn');
var recipeBoxContainerEl = document.getElementById('recipe-box-container');
var recipeBoxHeaderEl = document.getElementById('recipe-box-header');
var recipeCardForm = document.getElementById('recipe-card-form');
var titleInputEl = document.getElementById('title-input');
var recipeBodyEl = document.getElementById('recipe-body');
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
        body: recipeBodyEl.value,
        url: recipeUrl.value,
        // nutInfo: nutInfo
    }

    recipeCardArray.push(newRecipe);
    localStorage.setItem('recipe', JSON.stringify(recipeCardArray));
    recipeCardForm.style.display = 'none';
});