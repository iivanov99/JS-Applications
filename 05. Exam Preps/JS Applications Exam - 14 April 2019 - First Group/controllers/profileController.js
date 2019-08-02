const profileController = function () {

    const getProfilePage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        eventModel.getMyEvents()
            .then(helper.handler)
            .then(data => {
                context.eventsCount = data.length;
                context.events = data;

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/user/profile-page.hbs');
                });
            });
    };

    return {
        getProfilePage
    }
}();