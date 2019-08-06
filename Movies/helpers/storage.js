const storage = function () {
    const appKey = 'kid_Skn4JpbmB';
    const appSecret = 'e725d0e198c245fe96a76588ca327f92';

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