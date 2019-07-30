const requester = function () {
    const baseUrl = 'https://baas.kinvey.com';

    const get = (url, headers) => {
        headers.method = 'GET';
        return makeRequest(baseUrl + url, headers);
    };

    const post = (url, headers) => {
        headers.method = 'POST';
        return makeRequest(baseUrl + url, headers);
    };

    const put = (url, headers) => {
        headers.method = 'PUT';
        return makeRequest(baseUrl + url, headers);
    };

    const del = (url, headers) => {
        headers.method = 'DELETE';
        return makeRequest(baseUrl + url, headers);
    };

    const makeRequest = (url, headers) => {
        headers.headers['Content-Type'] = 'application/json';

        if(storage.getData('userInfo')) {
            const authToken = JSON.parse(storage.getData('authToken'));
            headers.headers['Authorization'] = `Kinvey ${authToken}`;
        }

        return fetch(url, headers);
    };

    return {
        get,
        post,
        put,
        del
    }
}();