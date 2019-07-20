const domElements = {
    getInfoBtn: document.querySelector('#getInfo'),
    booksUl: document.querySelector('#books'),
    paintingsUl: document.querySelector('#paintings'),
    songsUl: document.querySelector('#songs'),
    authorInput: document.querySelector('#author'),
    titleInput: document.querySelector('#title'),
    createPaintingBtn: document.querySelector('#createPainting')
};

const authInfo = `Basic ${btoa('guest:guest')}`;

const displayAllBooks = (element, books) => {
    element.innerHTML = '';
    const fragment = document.createDocumentFragment();
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.author}, ${book.name}`;
        li.style.color = 'green';
        fragment.appendChild(li);
    });
    element.appendChild(fragment);
};

const dispalyAllPaintings = (element, paintings) => {
    element.innerHTML = '';
    const fragment = document.createDocumentFragment();
    paintings.forEach(painting => {
        const li = document.createElement('li');
        li.textContent = `${painting.title}, ${painting.author}`;
        li.style.color = 'blue';
        fragment.appendChild(li);
    });
    element.appendChild(fragment);
};

const displayAllSongs = (element, songs) => {
    element.innerHTML = '';
    const fragment = document.createDocumentFragment();
    songs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = `${song.name}, ${song.author}`;
        li.style.color = 'red';
        fragment.appendChild(li);
    });
    element.appendChild(fragment);
};

const clearInput = () => {
    domElements.authorInput.value = '';
    domElements.titleInput.value = '';
};

const getAllBooks = async function () {
    const url = 'https://baas.kinvey.com/appdata/kid_HJuMl2lGB/books';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        }
    });
    const books = await response.json();
    displayAllBooks(domElements.booksUl, books);
};

const getAllPaintings = async function () {
    const url = 'https://baas.kinvey.com/appdata/kid_HJuMl2lGB/paintings';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        }
    });
    const paintings = await response.json();
    dispalyAllPaintings(domElements.paintingsUl, paintings);
};

const getAllSongs = async function () {
    const url = 'https://baas.kinvey.com/appdata/kid_HJuMl2lGB/songs';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        }
    });
    const songs = await response.json();
    displayAllSongs(domElements.songsUl, songs);
};

const createPainting = async function () {
    const newBook = {
        author: domElements.authorInput.value,
        title: domElements.titleInput.value
    };
    const url = 'https://baas.kinvey.com/appdata/kid_HJuMl2lGB/paintings';
    await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': authInfo,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBook)
    });
    clearInput();
    getAllPaintings();
};

(function attachEvents() {
    domElements.getInfoBtn.addEventListener('click', getAllBooks);
    domElements.getInfoBtn.addEventListener('click', getAllPaintings);
    domElements.getInfoBtn.addEventListener('click', getAllSongs);
    domElements.createPaintingBtn.addEventListener('click', createPainting);
})();