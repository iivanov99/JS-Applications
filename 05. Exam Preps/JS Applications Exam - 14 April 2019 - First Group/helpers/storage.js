const storage = function () {
    const appKey = 'kid_HyiR73gXS';
    const appSecret = '5519279c812941669b8a526787d7efde';

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