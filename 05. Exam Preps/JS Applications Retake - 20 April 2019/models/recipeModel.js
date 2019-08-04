const recipeModel = function () {

    const createRecipe = (params) => {
        const url = `/appdata/${storage.appKey}/recipes`;

        const headers = {
            headers: {},
            body: JSON.stringify({ ...params })
        };

        return requester.post(url, headers);
    };

    const getRecipes = () => {
        const url = `/appdata/${storage.appKey}/recipes`;

        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const getRecipe = (recipeId) => {
        const url = `/appdata/${storage.appKey}/recipes/${recipeId}`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const editRecipe = function (context) {

    };

    return {
        createRecipe,
        getRecipes,
        getRecipe
    }
}();