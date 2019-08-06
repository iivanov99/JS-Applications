const offerController = function () {

    const getCreateOfferPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs',
        }).then(function () {
            this.partial('../views/offers/create-offer.hbs');
        });
    };

    const postCreateOffer = function (context) {
        const { product, description, price, pictureUrl } = context.params;

        if (product, description, price, pictureUrl) {
            helper.notify('loading', 'Loading...');

            offerModel.createOffer(context.params)
                .then(helper.handler)
                .then(() => {
                    helper.stopNotify();
                    helper.notify('success', 'Your offer was created successfully!');
                    context.redirect('#/dashboard');
                });
        } else {
            helper.notify('error', 'All fields should be filled!');
        }
    };

    const getDashboardPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        offerModel.getAllOffers()
            .then(helper.handler)
            .then(data => {
                context.offers = data
                const currentCreator = JSON.parse(storage.getData('userInfo'))._acl.creator;

                for (let i = 0; i < data.length; i++) {
                    const offer = data[i];
                    context.offers[i].isCreator = offer._acl.creator === currentCreator;
                }
            })
            .then(() => {
                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                }).then(function () {
                    this.partial('../views/dashboard/dashboard-page.hbs');
                });
            })
    };

    const getOfferDetailsPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        offerModel.getOffer(context.params.offerId)
            .then(helper.handler)
            .then(data => Object.keys(data).forEach(key => context[key] = data[key]))
            .then(() => {
                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                }).then(function () {
                    this.partial('../views/offers/offer-details.hbs');
                });
            });
    };

    const getOfferDeletePage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        offerModel.getOffer(context.params.offerId)
            .then(helper.handler)
            .then(data => Object.keys(data).forEach(key => context[key] = data[key]))
            .then(() => {
                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                }).then(function () {
                    this.partial('../views/offers/delete-offer.hbs');
                });
            });
    };

    const postDeleteOffer = function (context) {
        helper.notify('loading', 'Loading...');

        offerModel.deleteOffer(context.params.offerId)
            .then(helper.handler)
            .then(() => {
                helper.stopNotify();
                helper.notify('success', 'Your offer was deleted successfully!');
                context.redirect('#/dashboard');
            });
    };

    const getEditOfferPage = function (context) {
        helper.setLoggedInHeaderInfo(context);

        offerModel.getOffer(context.params.offerId)
            .then(helper.handler)
            .then(data => Object.keys(data).forEach(key => context[key] = data[key]))
            .then(() => {
                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                }).then(function () {
                    this.partial('../views/offers/edit-offer.hbs');
                });
            });
    };

    const postEditOffer = function (context) {
        helper.notify('loading', 'Loading...');

        offerModel.editOffer(context.params)
            .then(helper.handler)
            .then(() => {
                helper.stopNotify();
                helper.notify('success', 'Your offer was edited successfully!');
                context.redirect('#/dashboard');
            });
    };

    return {
        getCreateOfferPage,
        postCreateOffer,
        getDashboardPage,
        getOfferDetailsPage,
        getOfferDeletePage,
        postDeleteOffer,
        getEditOfferPage,
        postEditOffer,
    }
}();