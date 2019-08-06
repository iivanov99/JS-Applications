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
        if (helper.passwordCheck(context.params)) {
            helper.notify('loading', 'Loading...');

            userModel.register(context.params)
                .then(helper.handler)
                .then(data => {
                    helper.stopNotify();
                    helper.notify('success', 'You have registered successfully!');
                    storage.saveUser(data);
                    context.redirect('#/home');
                })
                .catch(() => {
                    helper.stopNotify();
                    helper.notify('error', 'Username is already taken!');
                    helper.clearInputFields();
                })
        } else {
            helper.stopNotify();
            helper.notify('error', 'Both passwords must be the same!');
            helper.clearInputFields();
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
                helper.stopNotify();
                helper.notify('success', 'You have logged in successfully!');
                storage.saveUser(data);
                context.redirect('#/home');
            })
            .catch(() => {
                helper.stopNotify();
                helper.notify('error', 'Incorrect username or password!');
                helper.clearInputFields();
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

    const getProfilePage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        context.username = JSON.parse(storage.getData('userInfo')).username;
        context.numberOfPurchases = JSON.parse(storage.getData('userInfo')).numberOfPurchases;

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/user/profile-page.hbs');
        });
    };

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout,
        getProfilePage
    }
}();