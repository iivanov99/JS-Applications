const app = Sammy('#content', function () {
    this.use('Handlebars', 'hbs');

    this.get('#/home', viewController.getHome);
    this.get('#/about', viewController.getAbout);

    this.get('#/register', viewController.getRegister);
    this.post('#/register', viewController.postRegister);

    this.get('#/books', viewController.getBooks);
    this.get('#/books/:id', viewController.getBookInfo);

    this.get('#/contact', viewController.getContact);
});

$(() => app.run('#/home'));