const recipeController = function () {

    const getShareRecipePage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'
        }).then(function () {
            this.partial('../views/recipes/share-recipe.hbs');
        });
    };

    const postShareRecipe = function (context) {
        recipeModel.createRecipe(context.params)
            .then(helper.handler)
            .then(() => context.redirect('#/home'));
    };

    const getRecipeDetailsPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        recipeModel.getRecipe(context.params.recipeId)
            .then(helper.handler)
            .then(data => {
                Object.keys(data).forEach(key => context[key] = data[key]);
                const recipeCreator = data._acl.creator;
                const currentCreator = JSON.parse(storage.getData('userInfo'))._acl.creator;
                context.isCreator = recipeCreator === currentCreator;
            })
            .then(() => {
                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/recipes/recipe-details.hbs');
                });
            });
    };

    const getEditRecipePage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        recipeModel.getRecipe(context.params.recipeId)
            .then(helper.handler)
            .then(data => Object.keys(data).forEach(key => context[key] = data[key]))
            .then(() => {
                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/recipes/edit-recipe.hbs');
                });
            });
    };

    const postEditRecipe = function(context) {
        
    };

    return {
        getShareRecipePage,
        postShareRecipe,
        getRecipeDetailsPage,
        getEditRecipePage,
        postEditRecipe
    }
}();