const eventController = function () {

    const getCreateEventPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'
        }).then(function () {
            this.partial('../views/events/create-event-page.hbs')
        });
    };

    const postCreateEvent = function (context) {
        eventModel.createEvent(context.params)
            .then(helper.handler)
            .then(() => context.redirect('#/home'));
    };

    const getEventDetailsPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        eventModel.getEvent(context.params.eventId)
            .then(helper.handler)
            .then(data => {
                Object.keys(data).forEach(key => context[key] = data[key]);
                context.isOrganizer = JSON.parse(storage.getData('userInfo')).username === data.organizer;

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/events/event-details-page.hbs');
                });
            });
    };

    const getEditEventPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        eventModel.getEvent(context.params.eventId)
            .then(helper.handler)
            .then(data => {
                Object.keys(data).forEach(key => context[key] = data[key]);

                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs'
                }).then(function () {
                    this.partial('../views/events/edit-event-page.hbs');
                });
            })
    };

    const postEditEvent = function (context) {
        eventModel.editEvent(context.params)
            .then(helper.handler)
            .then(() => context.redirect('#/home'));
    };

    const deleteEvent = function (context) {
        eventModel.deleteEvent(context.params.eventId)
            .then(helper.handler)
            .then(() => context.redirect('#/home'));
    };

    return {
        getCreateEventPage,
        postCreateEvent,
        getEventDetailsPage,
        getEditEventPage,
        postEditEvent,
        deleteEvent
    }
}();