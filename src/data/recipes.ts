const recipes = [
    {
        id: 0,
        author: "Jean-Claude",
        title: "Belge",
        time: 7,
        small_description: "En attente de validation",
        full_description: "En attente de rédaction"
    },
    {
        id: 1,
        author: "Moi",
        title: "Test deux",
        time: 0,
        small_description: "En attente de validation",
        full_description: "En attente de rédaction"
    }
];

export const getRecipes = () => recipes;

export const getRecipe = (id: number) => recipes.find(recipe => recipe.id === id);