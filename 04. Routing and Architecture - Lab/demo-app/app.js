const app = Sammy('#content', function () {
    const showHomepage = () => {
        this.swap('<h1 class="content-info">Hello from the home page<h1>');
    };

    const showAbout = () => {
        this.swap('<h1 class="content-info">Welcome to About Page<h1>');
    };

    const showContact = () => {
        const h1 = document.createElement('h1');

        h1.classList.add('content-info');
        h1.textContent = 'Contact';
        h1.innerHTML = `<p>Number: +359 87 123 1234</p>
        <p>Name: Ivelin</p>
        <p>Last Name: Ivanov</p>`;

        this.swap(h1);
    };

    const loadAllBooks = () => {
        const fragment = document.createDocumentFragment();

        const h1 = document.createElement('h1');
        h1.classList.add('content-info');
        h1.textContent = 'All books: ';
        fragment.appendChild(h1);

        books
            .getAll()
            .forEach(book => {
                const div = document.createElement('div');
                div.classList.add('books-info');
                div.innerHTML += `<h2><a href="/#/books/${book.id}">ID:${book.id}</a></h2>
                <h2>Title: ${book.title}</h2>
                <h2>Author: ${book.author}</h2>
                <h2>Release Date: ${book.author}</h2>
                <br>`;
                fragment.appendChild(div);
            });

        this.swap(fragment);
    };

    const loadBook = (context) => {
        const book = books
            .getAll()
            .find(book => book.id === Number(context.params.id));

        if (book) {
            this.swap(`
            <h1 class="content-info">Here is your book information:<h1>
            <div class="content-info">
                <h5>Title: ${book.title}</h5>
                <h5>Author: ${book.author}</h5>
                <h5>Release Date: ${book.author}</h5>
            <div>`);
        }
    };

    const loadLoginForm = () => {
        this.swap(`
            <form method="POST" action="#/login">
                <label for="username">Username:</label><br>
                <input type="text" name="username" placeholder="Username..."><br>
                <label for="password">Password:</label><br>
                <input type="password" name="password" placeholder="Password..."><br>
                <br>
                <button type="submit">Login</button>
            </form>
        `);
    };

    const userLogin = (context) => {
        const { username, password } = context.params;

        if (username && password) {
            this.swap(`<h1 class="content-info">User ${context.params.username} has successfully logged in!</h1>`);
        } else {
            this.swap(`<h1 class="invalid-user-info">Please enter username and password!</h1>`);
        }
    };

    this.get('/', showHomepage);
    this.get('#/about', showAbout);
    this.get('#/contact', showContact);
    this.get('#/books', loadAllBooks);
    this.get('#/books/:id', loadBook);
    this.get('#/login', loadLoginForm);
    this.post('#/login', userLogin);
});

$(() => app.run());