const SELECTORS = {
    phonebookUl: '#phonebook',
    loadBtn: '#btnLoad',
    personInputEl: '#person',
    phoneInputEl: '#phone',
    createBtn: '#btnCreate'
};

const getPhonebookUl = () => document.querySelector(SELECTORS.phonebookUl);

const getLoadButton = () => document.querySelector(SELECTORS.loadBtn);

const getPersonInputElement = () => document.querySelector(SELECTORS.personInputEl);

const getPhoneInputElement = () => document.querySelector(SELECTORS.phoneInputEl);

const getCreateButton = () => document.querySelector(SELECTORS.createBtn);

function appendContact(element, contact, id) {
    const li = document.createElement('li');
    li.textContent = `${contact.person}: ${contact.phone}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteContact);

    li.appendChild(deleteBtn);
    element.appendChild(li);

    function deleteContact() {
        const url = `https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`;

        fetch(url, { method: 'delete' })
            .then(() => loadPhonebook());
    }
}

function loadPhonebook() {
    const phonebookUl = getPhonebookUl();
    phonebookUl.innerHTML = '';
    const url = `https://phonebook-nakov.firebaseio.com/phonebook.json`;

    fetch(url)
        .then(data => data.json())
        .then(phonebook => {
            for (const id in phonebook) {
                appendContact(phonebookUl, phonebook[id], id);
            }
        });
};

function clearInput() {
    getPersonInputElement().value = '';
    getPhoneInputElement().value = '';
}

function createContact() {
    const personInputElement = getPersonInputElement();
    const phoneInputElement = getPhoneInputElement();
    const url = `https://phonebook-nakov.firebaseio.com/phonebook.json`;

    fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ person: personInputElement.value, phone: phoneInputElement.value })
    })
        .then(() => {
            loadPhonebook();
            clearInput();
        });
};

(function attachEvents() {
    const createButton = getCreateButton();
    const loadButton = getLoadButton();
    loadButton.addEventListener('click', loadPhonebook);
    createButton.addEventListener('click', createContact);
})();