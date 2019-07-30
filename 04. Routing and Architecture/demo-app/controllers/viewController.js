const viewController = function () {
    const getHome = (context) => {
        context.partial('./views/home.hbs');
    };

    const getAbout = (context) => {
        context.partial('./views/about.hbs');
    };

    const getRegister = (context) => {
        context.partial('./views/register-page.hbs');
    };

    const postRegister = (context) => {
        const { username, email, password } = context.params;

        if (username && email && password) {
            const user = { username, email };
            context.user = user;
            context.partial('./views/register-successful-page.hbs');
        } else {
            context.partial('./views/register-failed-page.hbs');
        }
    };

    const getBooks = (context) => {
        context.books = booksModel.getAllBooks();
        context.partial('./views/books.hbs');
    };

    const getBookInfo = (context) => {
        const bookId = parseInt(context.params.id);
        const book = booksModel
            .getAllBooks()
            .find(book => book.id === bookId);

        if (book) {
            context.book = book;
            context.partial('./views/book-info.hbs');
        }
    };

    const getContact = (context) => {
        context.contact = contactModel.getContact();
        context.partial('./views/contact.hbs');
    };

    return {
        getHome,
        getAbout,
        getRegister,
        postRegister,
        getBooks,
        getBookInfo,
        getContact
    }
}();