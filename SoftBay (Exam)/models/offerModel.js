const offerModel = function () {

    const createOffer = (params) => {
        const url = `/appdata/${storage.appKey}/offers`;

        const headers = {
            headers: {},
            body: JSON.stringify({ ...params })
        };

        return requester.post(url, headers);
    };

    const getAllOffers = () => {
        const url = `/appdata/${storage.appKey}/offers`;

        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const getOffer = (offerId) => {
        const url = `/appdata/${storage.appKey}/offers/${offerId}`;

        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const deleteOffer = (offerId) => {
        const url = `/appdata/${storage.appKey}/offers/${offerId}`;

        const headers = {
            headers: {}
        };

        return requester.del(url, headers);
    };

    const editOffer = (params) => {
        const url = `/appdata/${storage.appKey}/offers/${params.offerId}`;

        const offerData = { ...params };
        delete offerData.offerId;

        const headers = {
            headers: {},
            body: JSON.stringify(offerData)
        };

        return requester.put(url, headers);
    };

    return {
        createOffer,
        getAllOffers,
        getOffer,
        deleteOffer,
        editOffer
    }
}();