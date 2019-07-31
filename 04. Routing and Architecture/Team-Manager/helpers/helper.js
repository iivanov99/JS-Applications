const helper = function() {
    
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
        return params.password === params.repeatPassword;
    };

    return {
        handler,
        passwordCheck
    }
}();