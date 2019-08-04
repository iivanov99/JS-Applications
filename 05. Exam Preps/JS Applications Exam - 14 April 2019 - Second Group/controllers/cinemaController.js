const cinemaController = function () {

    const getCinema = function (context) {
        helper.setLoggedInHeaderInfo(context);

        cinemaModel.getAllMovies()
            .then(helper.handler)
            .then(data => {
                context.movies = data.sort((a, b) => b.tickets - a.tickets);

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/cinema/all-movies.hbs');
                });
            });
    };

    const getCreateMoviePage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'
        }).then(function () {
            this.partial('../views/cinema/create-movie.hbs');
        });
    };

    const postCreateMovie = function (context) {
        cinemaModel.createMovie(context.params)
            .then(helper.handler)
            .then(() => context.redirect('#/home'));
    };

    const getMovieDetailsPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        cinemaModel.getMovie(context.params.movieId)
            .then(helper.handler)
            .then(data => {
                Object.keys(data).forEach(key => context[key] = data[key]);

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/cinema/movie-details.hbs');
                });
            });
    };

    const getMyMoviesPage = function (context) {
        helper.setLoggedInHeaderInfo(context);


        cinemaModel.getMyMovies()
            .then(helper.handler)
            .then(data => {
                context.movies = data;

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/cinema/my-movies.hbs');
                });
            })
    };

    const getEditMoviePage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        cinemaModel.getMovie(context.params.movieId)
            .then(helper.handler)
            .then(data => {
                Object.keys(data).forEach(key => context[key] = data[key]);

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/cinema/edit-movie.hbs');
                });
            })
    };

    const postEditMovie = function (context) {
        cinemaModel.editMovie(context.params)
            .then(helper.handler)
            .then(() => context.redirect('#/home'));
    };

    const deleteMovie = function (context) {
        cinemaModel.deleteMovie(context.params.movieId)
            .then(helper.handler)
            .then(() => context.redirect('#/home'));
    };

    return {
        getCinema,
        getCreateMoviePage,
        postCreateMovie,
        getMovieDetailsPage,
        getMyMoviesPage,
        getEditMoviePage,
        postEditMovie,
        deleteMovie
    }
}();