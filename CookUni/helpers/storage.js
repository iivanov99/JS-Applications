const storage = function () {
    const appKey = 'kid_BJL4J7XXH';
    const appSecret = 'a789bd3b9c7e43b1b52193a3b712aa04';

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