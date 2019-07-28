const booksModel = function () {
    const books = [
        {
            id: 1,
            title: 'Encyclopedia of Modern Bodybuilding',
            author: 'Arnold Schwarzenegger',
            date: '1997'
        },
        {
            id: 2,
            title: 'Slav Life',
            author: 'Pesho',
            date: '2005'
        }
    ];

    const getAllBooks = () => {
        return books;
    };

    const addBook = (book) => {
        books.push(book);
    };

    return {
        getAllBooks,
        addBook
    }
}();