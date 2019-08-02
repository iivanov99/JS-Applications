const eventModel = function () {

    const getAllEvents = () => {
        const url = `/appdata/${storage.appKey}/events`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const createEvent = (params) => {
        const url = `/appdata/${storage.appKey}/events`;

        const eventData = {
            ...params,
            organizer: JSON.parse(storage.getData('userInfo')).username,
            peopleInterestedIn: 0
        };

        const headers = {
            headers: {},
            body: JSON.stringify(eventData)
        };

        return requester.post(url, headers);
    };

    const getEvent = (eventId) => {
        const url = `/appdata/${storage.appKey}/events/${eventId}`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    const editEvent = (params) => {
        const url = `/appdata/${storage.appKey}/events/${params.eventId}`;

        const eventData = { ...params };
        delete eventData.eventId;

        const headers = {
            headers: {},
            body: JSON.stringify(eventData)
        };

        return requester.put(url, headers);
    };

    const deleteEvent = (eventId) => {
        const url = `/appdata/${storage.appKey}/events/${eventId}`;
        headers = {
            headers: {}
        };

        return requester.del(url, headers);
    };

    const getMyEvents = () => {
        const userId = JSON.parse(storage.getData('userInfo'))._id;
        const url = `/appdata/${storage.appKey}/events?query={"_acl.creator":"${userId}"}`;
        const headers = {
            headers: {}
        };

        return requester.get(url, headers);
    };

    return {
        getAllEvents,
        createEvent,
        getEvent,
        editEvent,
        deleteEvent,
        getMyEvents
    }
}();