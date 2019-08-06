const userController = function () {

    const getRegister = function (context) {
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/user/register-page.hbs');
        });
    };

    const postRegister = function (context) {
        helper.notify('loading', 'Loading...');

        if (helper.passwordCheck(context.params)) {
            userModel.register(context.params)
                .then(helper.handler)
                .then(data => {
                    helper.stopNofity();
                    helper.notify('success', 'You have been registered successfuly!');
                    storage.saveUser(data);
                    context.redirect('#/home');
                })
                .catch(er => {
                    helper.stopNofity();
                    helper.notify('error', 'This username is already taken!');
                })
        } else {
            helper.stopNofity();
            helper.notify('error', 'Password and Re-Password should match!');
        }
    };

    const getLogin = function (context) {
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/user/login-page.hbs')
        });
    };

    const postLogin = function (context) {
        helper.notify('loading', 'Loading...');
        
        userModel.login(context.params)
            .then(helper.handler)
            .then(data => {
                helper.stopNofity();
                helper.notify('success', 'You have been logged in successfuly!');
                storage.saveUser(data);
                context.redirect('#/home');
            })
            .catch(er => {
                helper.stopNofity();
                helper.notify('error', 'Invalid username or password!');
            });
    };

    const logout = function (context) {
        userModel.logout()
            .then(helper.handler)
            .then(() => {
                storage.deleteUser();
                context.redirect('#/home');
            });
    };

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout
    }
}();