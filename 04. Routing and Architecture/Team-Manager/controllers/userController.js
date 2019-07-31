const userController = function () {

    const getRegister = function (context) {
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/register/registerPage.hbs');
        });
    };

    const postRegister = function (context) {
        if (helper.passwordCheck(context.params)) {
            userModel.register(context.params)
                .then(helper.handler)
                .then(data => {
                    storage.saveUser(data);
                    context.redirect('#/home');
                });
        } else {
            throw new Error('The password doesn\'t macth!');
        }
    };

    const getLogin = function (context) {
        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/login/loginPage.hbs')
        });
    };

    const postLogin = function (context) {
        userModel.login(context.params)
            .then(helper.handler)
            .then(data => {
                storage.saveUser(data);
                context.redirect('#/home');
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