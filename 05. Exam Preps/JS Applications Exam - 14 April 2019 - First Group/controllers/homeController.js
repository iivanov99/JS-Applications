const homeController = function () {
    
    const getHome = function (context) {
        if(storage.getData('userInfo')) {
            
        }

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'
        }).then(function () {
            this.partial('../views/home/homepage.hbs');
        });
    };

    return {
        getHome
    }
}();