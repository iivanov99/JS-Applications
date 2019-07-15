const SELECTORS = {
    msgContainer: '#messages',
    nameInputEl: '#author',
    msgInputEl: '#content',
    sendBtn: '#submit',
    refreshBtn: '#refresh'
};

const getMsgContainer = () => document.querySelector(SELECTORS.msgContainer);

const getNameInputEl = () => document.querySelector(SELECTORS.nameInputEl);

const getMsgInputEl = () => document.querySelector(SELECTORS.msgInputEl);

const getSendButton = () => document.querySelector(SELECTORS.sendBtn);

const getRefreshButton = () => document.querySelector(SELECTORS.refreshBtn);

const displayAll = (container, messages) => {
    Object.values(messages)
        .forEach(msg => {
            container.value += `${msg.author}: ${msg.content}\n`;
        });
};

const displayMessages = () => {
    const msgContainer = getMsgContainer();
    msgContainer.value = '';
    const url = 'https://rest-messanger.firebaseio.com/messanger.json';

    fetch(url)
        .then(res => res.json())
        .then(messages => displayAll(msgContainer, messages));
};

const clearMessageInput = (nameEl, msgEl) => {
    nameEl.value = '';
    msgEl.value = '';
}

const submitMessage = () => {
    const nameInputElement = getNameInputEl();
    const msgInputElement = getMsgInputEl();
    const url = 'https://rest-messanger.firebaseio.com/messanger.json';

    const newMsg = {
        author: nameInputElement.value,
        content: msgInputElement.value
    };

    fetch(url, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newMsg)
    })
        .then(() => {
            clearMessageInput(nameInputElement, msgInputElement);
        });

};

(function attachEvents() {
    getRefreshButton().addEventListener('click', displayMessages);
    getSendButton().addEventListener('click', submitMessage);
})();