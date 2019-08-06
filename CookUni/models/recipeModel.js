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

    const editRecipe = (params) => {
        const url = `/appdata/${storage.appKey}/recipes/${params.recipeId}`;

        const recipeData = { ...params };
        delete recipeData.recipeId;

        const headers = {
            headers: {},
            body: JSON.stringify(recipeData)
        };

        return requester.put(url, headers);
    };

    const delRecipe = (recipeId) => {
        const url = `/appdata/${storage.appKey}/recipes/${recipeId}`;

        const headers = {
            headers: {}
        };

        return requester.del(url, headers);
    };

    return {
        createRecipe,
        getRecipes,
        getRecipe,
        editRecipe,
        delRecipe
    }
}();