const domElements = {
    booksContainer: document.querySelector('#booksInfo'),
    loadBooksButton: document.querySelector('#loadBooks'),
    submitButton: document.querySelector('#submit'),
    titleInput: document.querySelector('#title'),
    authorInput: document.querySelector('#author'),
    isbnInput: document.querySelector('#isbn'),
    editSubmitBtn: document.querySelector('#edit'),
    editCancelBtn: document.querySelector('#cancelEdit')
};

const authInfo = `Basic ${btoa('guest:guest')}`;

const createTd = (name) => {
    const td = document.createElement('td');
    td.textContent = name;
    return td;
};

const displayAllBooks = (element, books) => {
    domElements.booksContainer.innerHTML = '';

    books.forEach(book => {
        const deleteBook = async function () {
            const url = `https://baas.kinvey.com/appdata/kid_S1NCg-ZzB/books/${book._id}`;
            await fetch(url, {
                method: 'DELETE',
                headers: { 'Authorization': authInfo }
            });
            loadAllBooks();
        };

        const displayEditButtons = function () {
            const { submitButton, editSubmitBtn, editCancelBtn, titleInput, authorInput, isbnInput } = domElements;

            titleInput.value = book.title;
            authorInput.value = book.author;
            isbnInput.value = book.isbn;

            editSubmitBtn.id = book._id;
            submitButton.style.display = 'none';
            editSubmitBtn.style.display = 'inline-block';
            editCancelBtn.style.display = 'inline-block';
        };

        const tr = document.createElement('tr');

        const titleTd = createTd(book.title);
        const authorTd = createTd(book.author);
        const isbnTd = createTd(book.isbn);
        const actionTd = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', displayEditButtons);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteBook);

        actionTd.appendChild(editBtn);
        actionTd.appendChild(deleteBtn);

        tr.appendChild(titleTd);
        tr.appendChild(authorTd);
        tr.appendChild(isbnTd);
        tr.appendChild(actionTd);

        element.appendChild(tr);
    });
};

const loadAllBooks = async function () {
    domElements.booksContainer.innerHTML = 'Loading...';
    const url = 'https://baas.kinvey.com/appdata/kid_S1NCg-ZzB/books';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authInfo
        }
    });
    const books = await response.json();
    displayAllBooks(domElements.booksContainer, books);
};

const isFormValid = (title, author, isbn) => {
    if (title && author && isbn) {
        return true;
    }
    return false;
};

const clearInput = () => {
    const { titleInput, authorInput, isbnInput } = domElements;
    titleInput.value = '';
    authorInput.value = '';
    isbnInput.value = '';
};

const createBook = async function (event) {
    event.preventDefault();
    const { titleInput, authorInput, isbnInput } = domElements;

    if (isFormValid(titleInput.value, authorInput.value, isbnInput.value)) {
        const url = 'https://baas.kinvey.com/appdata/kid_S1NCg-ZzB/books';
        const newBook = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        };

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': authInfo
            },
            body: JSON.stringify(newBook)
        });

        loadAllBooks();
    }

    clearInput();
};

const hideEditMenu = () => {
    const { submitButton, editSubmitBtn, editCancelBtn } = domElements;

    clearInput();

    submitButton.style.display = 'block';
    editSubmitBtn.style.display = 'none';
    editCancelBtn.style.display = 'none';
};

const editBook = async function (ev) {
    ev.preventDefault();
    const { submitButton, editSubmitBtn, editCancelBtn, titleInput, authorInput, isbnInput } = domElements;

    const updatedBook = {
        title: titleInput.value,
        author: authorInput.value,
        isbn: isbnInput.value
    };

    const url = `https://baas.kinvey.com/appdata/kid_S1NCg-ZzB/books/${this.id}`;
    
    await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json',
            'Authorization': authInfo
        },
        body: JSON.stringify(updatedBook)
    });

    loadAllBooks();
    hideEditMenu();
};

const cancelEdit = (ev) => {
    ev.preventDefault();
    hideEditMenu();
};

(function attachEvents() {
    domElements.loadBooksButton.addEventListener('click', loadAllBooks);
    domElements.submitButton.addEventListener('click', createBook);
    domElements.editCancelBtn.addEventListener('click', cancelEdit);
    domElements.editSubmitBtn.addEventListener('click', editBook);
})();