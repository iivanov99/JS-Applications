const storage = function () {
    const appKey = 'kid_ry11xjnfB';
    const appSecret = '177e995ae7a24015b48351d9657155c7';

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