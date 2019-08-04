const app = Sammy('#root', function(){
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/logout', userController.logout);

    // Cinema
    this.get('#/createMovie', cinemaController.getCreateMoviePage);
    this.post('#/createMovie', cinemaController.postCreateMovie);

    this.get('#/cinema', cinemaController.getCinema);
    this.get('#/myMovies', cinemaController.getMyMoviesPage);
    this.get('#/details/:movieId', cinemaController.getMovieDetailsPage);

    this.get('#/edit/:movieId', cinemaController.getEditMoviePage);
    this.post('#/edit/:movieId', cinemaController.postEditMovie);

    this.get('#/delete/:movieId', cinemaController.deleteMovie);
});

(() => {
    app.run('#/home')
})();