const contactModel = function () {
    const contact = {
        name: 'Ivelin',
        lastName: 'Ivanov',
        phoneNumber: '+359 87 123 1234'
    };

    const getContact = () => {
        return contact;
    };

    return {
        getContact
    }
}();