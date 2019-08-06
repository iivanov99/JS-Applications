const userModel = function () {
    
    const register = (params) => {
        const user = {
            username: params.username,
            password: params.password,
        };

        const url = `/user/${storage.appKey}`;
        const authString = `Basic ${btoa(`${storage.appKey}:${storage.appSecret}`)}`;

        const headers = {
            headers: {
                Authorization: authString
            },
            body: JSON.stringify(user)
        };

        return requester.post(url, headers);
    };

    const login = (params) => {
        const user = {
            username: params.username,
            password: params.password
        };

        const url = `/user/${storage.appKey}/login`;
        const authString = `Basic ${btoa(`${user.username}:${user.password}`)}`;

        const headers = {
            headers: {
                Authorization: authString
            },
            body: JSON.stringify(user)
        };

        return requester.post(url, headers);
    };

    const logout = () => {
        const url = `/user/${storage.appKey}/_logout`
        const headers = {
            headers: {}
        };

        return requester.post(url, headers);
    };

    return {
        register,
        login,
        logout
    }
}();