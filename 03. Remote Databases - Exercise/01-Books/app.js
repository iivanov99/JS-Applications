const elements = {
    titleInput: document.querySelector('#title'),
    authorInput: document.querySelector('#author'),
    isbnInput: document.querySelector('#isbn'),
    loadBooksButton: document.querySelector('#loadBooks'),
    submitButton: document.querySelector('#submit'),
    editButton: document.querySelector('#edit'),
    cancelEditButton: document.querySelector('#cancelEdit'),
    tableBody: document.querySelector('#booksInfo')
};

const authInfo = `Basic ${btoa('guest:guest')}`;
const baseUrl = 'https://baas.kinvey.com/appdata/kid_S1NCg-ZzB/books';

const deleteBook = async (bookId) => {
    await fetch(`${baseUrl}/${bookId}`, {
        method: 'DELETE',
        headers: {
            Authorization: authInfo
        }
    });
    loadAllBooks();
};

const displayEditMenu = (book) => {
    const { titleInput, authorInput, isbnInput, submitButton, editButton, cancelEditButton } = elements;
    const { title, author, isbn, _id } = book

    editButton.value = _id;

    titleInput.value = title;
    authorInput.value = author;
    isbnInput.value = isbn;

    submitButton.style.display = 'none';
    editButton.style.display = 'inline-block';
    cancelEditButton.style.display = 'inline-block';
};

const displayAllBooks = (books) => {
    elements.tableBody.innerHTML = '';

    books.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML += `<td>${book.title}</td>`;
        tr.innerHTML += `<td>${book.author}</td>`;
        tr.innerHTML += `<td>${book.isbn}</td>`;
        tr.innerHTML += `<td><button>Edit</button><button>Delete</button></td>`;

        tr.querySelectorAll('button')[0].addEventListener('click', () => displayEditMenu(book));
        tr.querySelectorAll('button')[1].addEventListener('click', () => deleteBook(book._id));

        elements.tableBody.appendChild(tr);
    });
};

const loadAllBooks = async () => {
    elements.tableBody.innerHTML = 'Loading...';
    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        }
    });
    const books = await response.json();
    displayAllBooks(books);
};

const isFormValid = (title, author, isbn) => {
    if (title && author && isbn) {
        return true;
    }
    return false;
};

const clearInputFields = (...args) => {
    args.forEach(arg => {
        arg.value = '';
    });
};

const createBook = async (ev) => {
    ev.preventDefault();
    const { titleInput, authorInput, isbnInput } = elements;

    if (isFormValid(titleInput.value, authorInput.value, isbnInput.value)) {
        const newBook = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        };

        await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': authInfo,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        loadAllBooks();
        clearInputFields(titleInput, authorInput, isbnInput);
    }
};

const hideEditMenu = () => {
    const { titleInput, authorInput, isbnInput, submitButton, editButton, cancelEditButton } = elements;

    clearInputFields(titleInput, authorInput, isbnInput);

    submitButton.style.display = 'block';
    editButton.style.display = 'none';
    cancelEditButton.style.display = 'none';
};

const editBook = async function (ev) {
    ev.preventDefault();
    const { titleInput, authorInput, isbnInput } = elements;

    const editedBook = {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
    };

    await fetch(`${baseUrl}/${this.value}`, {
        method: 'PUT',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedBook)
    });

    hideEditMenu();
    loadAllBooks();
};

const cancelEditMenu = (ev) => {
    ev.preventDefault();
    hideEditMenu();
};

(function attachEvents() {
    const { loadBooksButton, submitButton, editButton, cancelEditButton } = elements;
    loadBooksButton.addEventListener('click', loadAllBooks);
    submitButton.addEventListener('click', createBook);
    editButton.addEventListener('click', editBook);
    cancelEditButton.addEventListener('click', cancelEditMenu);
})();