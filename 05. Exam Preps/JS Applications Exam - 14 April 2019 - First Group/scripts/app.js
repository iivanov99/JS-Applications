const app = Sammy('#root', function(){
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/logout', userController.logout);
    
    // Events
    this.get('#/createEvent', eventController.getCreateEventPage);
});

(() => {
    app.run('#/home');
})();