const aboutController = function () {
    
    const getAbout = function (context) {
        if (storage.getData('userInfo')) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = true;
            context.username = username;
        }

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'
        }).then(function () {
            this.partial('../views/about/about.hbs');
        });
    };

    return {
        getAbout
    }
}();