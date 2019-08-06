const storage = function () {
    const appKey = 'kid_SJ6IO4NQS';
    const appSecret = 'f42b5b1b5e5f410c9ca2602bf56305e9';

    const getData = (key) => {
        return localStorage.getItem(key + appKey);
    };

    const saveData = (key, value) => {
        localStorage.setItem(key + appKey, JSON.stringify(value));
    };

    const saveUser = (data) => {
        saveData('userInfo', data);
        saveData('authToken', data._kmd.authtoken);
    };

    const deleteUser = () => {
        localStorage.removeItem('userInfo' + appKey);
        localStorage.removeItem('authToken'+ appKey);
    };

    return {
        appKey,
        appSecret,
        getData,
        saveData,
        saveUser,
        deleteUser
    }
}();