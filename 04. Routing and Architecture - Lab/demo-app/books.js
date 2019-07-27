const books = function () {
    const all = [
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

    const getAll = () => {
        return all;
    };

    const addBook = (book) => {
        all.push(book);
    };

    return {
        getAll,
        addBook
    }
}();