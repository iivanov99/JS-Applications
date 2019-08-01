const aboutController = function () {
    
    const getAbout = function (context) {
        helper.setHeaderProperties(context);

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