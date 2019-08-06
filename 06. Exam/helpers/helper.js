const helper = function () {

    const handler = (response) => {
        if (response.status >= 400) {
            throw new Error(`Something went wrong: ${response.statusText}`);
        }

        if (response.status !== 204) {
            return response.json();
        }

        return response;
    };

    const passwordCheck = function (params) {
        return params.password === params.rePassword;
    };

    const setLoggedInHeaderInfo = (context) => {
        const username = JSON.parse(storage.getData('userInfo')).username;
        context.loggedIn = true;
        context.username = username;
    };

    const notify = (type, message) => {
        if (type === 'success' || type === 'error' || type === 'loading') {
            const notification = document.getElementById(`${type}Notification`);
            notification.textContent = message;
            notification.style.display = 'block';
            notification.addEventListener('click', () => notification.style.display = 'none');
        }
    };

    const stopNotify = () => {
        Array.from(document.getElementById('notifications').children)
            .forEach(notification => {
                notification.style.display = 'none';
            });
    };

    const clearInputFields = () => {
        Array.from(document.querySelectorAll('div.input-group input'))
            .forEach(inputField => inputField.value = '');
    };

    return {
        handler,
        passwordCheck,
        setLoggedInHeaderInfo,
        notify,
        stopNotify,
        clearInputFields
    }
}();