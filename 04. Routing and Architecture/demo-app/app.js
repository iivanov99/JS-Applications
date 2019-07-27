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
                div.classList.add('content-info');
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

    this.get('/', showHomepage);
    this.get('#/about', showAbout);
    this.get('#/contact', showContact);
    this.get('#/books', loadAllBooks);
    this.get('#/books/:id', loadBook);
});

$(() => app.run());