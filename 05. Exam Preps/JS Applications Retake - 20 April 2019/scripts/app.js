const app = Sammy('#rooter', function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/logout', userController.logout);

    // Recipes
    this.get('#/shareRecipe', recipeController.getShareRecipePage);
    this.post('#/shareRecipe', recipeController.postShareRecipe);

    this.get('#/details/:recipeId', recipeController.getRecipeDetailsPage);

    this.get('#/edit/:recipeId', recipeController.getEditRecipePage);
    this.post('#/edit/:recipeId', recipeController.postEditRecipe);
});

(() => {
    app.run('#/home');
})();