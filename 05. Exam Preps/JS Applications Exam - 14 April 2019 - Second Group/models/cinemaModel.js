const cinemaModel = function () {

    const getAllMovies = () => {
        const url = `/appdata/${storage.appKey}/movies`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const createMovie = (params) => {
        const url = `/appdata/${storage.appKey}/movies`;
        const headers = {
            headers: {},
            body: JSON.stringify({ ...params })
        };

        return requester.post(url, headers);
    };

    const getMovie = (movieId) => {
        const url = `/appdata/${storage.appKey}/movies/${movieId}`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const getMyMovies = () => {
        const userId = JSON.parse(storage.getData('userInfo'))._id;
        const url = `/appdata/${storage.appKey}/movies?query={"_acl.creator":"${userId}"}`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const editMovie = (params) => {
        const url = `/appdata/${storage.appKey}/movies/${params.movieId}`;

        const movieData = { ...params };
        delete movieData.movieId;

        const headers = {
            headers: {},
            body: JSON.stringify(movieData)
        };

        return requester.put(url, headers);
    };

    const deleteMovie = (movieId) => {
        const url = `/appdata/${storage.appKey}/movies/${movieId}`;
        const headers = {
            headers: {}
        };

        return requester.del(url, headers);
    };

    return {
        getAllMovies,
        createMovie,
        getMovie,
        getMyMovies,
        editMovie,
        deleteMovie
    }

}();