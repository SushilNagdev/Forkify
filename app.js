const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes');

// Function to fetch recipes from Forkify API
async function fetchRecipes(query) {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`);
        const data = await response.json();

        if (data.results === 0) {
            recipesContainer.innerHTML = `<p>No recipes found for "${query}". Please try a different search term.</p>`;
            return;
        }

        displayRecipes(data.data.recipes);
    } catch (error) {
        recipesContainer.innerHTML = `<p>Error fetching recipes. Please try again later.</p>`;
        console.error('Error:', error);
    }
}

// Function to display recipes
function displayRecipes(recipes) {
    recipesContainer.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <img src="${recipe.image_url}" alt="${recipe.title}">
            <h2 class="recipe-title">${recipe.title}</h2>
            <p class="recipe-publisher">Publisher: ${recipe.publisher}</p>
        `;

        recipesContainer.appendChild(recipeCard);
    });
}

// Event listeners for search button and enter key
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) fetchRecipes(query);
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) fetchRecipes(query);
    }
});
