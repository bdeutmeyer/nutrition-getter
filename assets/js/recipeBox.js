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
    event.preventDefault();
    event.stopPropagation();
    recipeCardForm.style.display = 'none';
}

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

    recipeCardArray.push(newRecipe);
    localStorage.setItem('recipe', JSON.stringify(recipeCardArray));
    recipeCardForm.style.display = 'none';

    printSavedRecipes();
});

function printSavedRecipes() {
    // added check if array is empty
    if (recipeCardArray.length === 0) {
        var localRecipeArray = JSON.parse(localStorage.getItem('recipe'));

        if (localRecipeArray !== null) {
            recipeCardArray = localRecipeArray;
        }
    }
    console.log(recipeCardArray)

    //added clear container 
    recipeBoxContainerEl.innerHTML = '';

        for (var i=0; i<recipeCardArray.length; i++) {
            var recipeCard = document.createElement('section');
            recipeBoxContainerEl.appendChild(recipeCard);

            var recipeURL = recipeCardArray[i].url;
            if (recipeURL.startsWith('http')) {} else {
                recipeURL = 'https://' + recipeURL
            }
            var displayAnchor = document.createElement('a');
            displayAnchor.setAttribute('href',recipeURL);
            displayAnchor.setAttribute('target', '_blank');
            recipeCard.setAttribute('class', 'border border-2 border-slate-600 rounded p-2');
            recipeCard.appendChild(displayAnchor);
        
            var recipeName = recipeCardArray[i].title;
            var displayName = document.createElement('h3');
            var linebreak = document.createElement('hr')
            displayName.textContent = recipeName;
            displayName.setAttribute('class', 'font-extrabold leading-loose');
            displayAnchor.appendChild(displayName);
            recipeCard.appendChild(linebreak);

            
            //added to split text on p element
            var recipeNutri = recipeCardArray[i].body;
            var paragraphs = recipeNutri.split('\n'); 
            paragraphs.forEach(function (paragraphText) {
                var displayNutri = document.createElement('p');
                displayNutri.textContent = paragraphText.trim(); 
                recipeCard.appendChild(displayNutri);
            });

// delete button    
            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Discard Recipe';
            deleteButton.setAttribute('class','text-white text-sm bg-slate-600 hover:bg-slate-500 hover:underline rounded py-1 px-4 w-full');
            deleteButton.dataset.index = i; 
    
            deleteButton.addEventListener('click', function () {
                var deleteIndex = this.dataset.index;
                recipeCardArray.splice(deleteIndex, 1); 
                localStorage.setItem('recipe', JSON.stringify(recipeCardArray)); 
                printSavedRecipes(); 
            });
            recipeCard.appendChild(deleteButton);
        }
}

//keeps displaying arrays 
printSavedRecipes();

