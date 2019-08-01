const eventController = function(){

    const getCreateEventPage = function (context) {
        if (storage.getData('userInfo')) {
            helper.setLoggedInHeaderInfo(context);

            context.loadPartials({
                header: '../views/common/header.hbs',
                footer: '../views/common/footer.hbs'
            }).then(function(){
                this.partial('../views/events/create-event-page.hbs')
            });
        }
    };

    return {
        getCreateEventPage
    }
}();