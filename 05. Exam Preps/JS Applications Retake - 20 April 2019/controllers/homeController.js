const homeController = function () {

    const getHome = function (context) {

        const loadTemplate = () => {
            context.loadPartials({
                header: '../views/common/header.hbs',
                footer: '../views/common/footer.hbs'
            }).then(function () {
                this.partial('../views/home/homepage.hbs');
            });
        };

        if (storage.getData('userInfo')) {
            helper.setLoggedInHeaderInfo(context);

            recipeModel.getRecipes()
                .then(helper.handler)
                .then((data) => context.recipes = data)
                .then(() => loadTemplate());
        } else {
            loadTemplate();
        }
    };

    return {
        getHome
    }
}();