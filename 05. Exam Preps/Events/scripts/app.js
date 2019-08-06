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
    this.post('#/createEvent', eventController.postCreateEvent);

    this.get('#/eventDetails/:eventId', eventController.getEventDetailsPage);

    this.get('#/editEvent/:eventId', eventController.getEditEventPage);
    this.post('#/editEvent/:eventId', eventController.postEditEvent);

    this.get('#/deleteEvent/:eventId', eventController.deleteEvent);

    // Profile
    this.get('#/profile', profileController.getProfilePage);
});

(() => {
    app.run('#/home');
})();