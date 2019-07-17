const domElements = {
    updateBtn: document.querySelector('button.update'),
    deleteBtn: document.querySelector('button.delete'),
    loadBtn: document.querySelector('button.load'),
    addBtn: document.querySelector('button.add')
};

const handler = (response) => {
    if (response.status !== 200) {
        throw new Error('Error', response.status);
    }

    return response.json();
}

const listAllCatches = () => {
    const url = 'https://fisher-game.firebaseio.com/catches.json';

    fetch(url)
        .then(handler)
};


(function attachEvents() {
    domElements.loadBtn.addEventListener('click', listAllCatches);
})();