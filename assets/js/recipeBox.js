var modalTestBtn = document.getElementById('modal-test-btn');
var recipeBoxContainerEl = document.getElementById('recipe-box-container');
var recipeBoxHeaderEl = document.getElementById('recipe-box-header');
var recipeCardForm = document.getElementById('recipe-card-form');
var closeBtn = document.getElementById('close');


modalTestBtn.onclick = function() {
    recipeCardForm.style.display = 'block';
}

closeBtn.onclick = function() {
    recipeCardForm.style.display = 'none';

}