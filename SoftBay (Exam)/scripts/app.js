const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    this.get('#/logout', userController.logout);
    this.get('#/profile', userController.getProfilePage);

    // Offers
    this.get('#/createOffer', offerController.getCreateOfferPage);
    this.post('#/createOffer', offerController.postCreateOffer);

    this.get('#/dashboard', offerController.getDashboardPage);
    
    this.get('#/details/:offerId', offerController.getOfferDetailsPage);

    this.get('#/delete/:offerId', offerController.getOfferDeletePage);
    this.post('#/delete/:offerId', offerController.postDeleteOffer);

    this.get('#/edit/:offerId',offerController.getEditOfferPage);
    this.post('#/edit/:offerId', offerController.postEditOffer);
});

(() => {
    app.run('#/home');
})();