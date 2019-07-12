const SELECTORS = {
    infoSpan: '.info',
    departBtn: '#depart',
    arriveBtn: '#arrive'
};

const currentStop = {
    name: '',
    nextId: 'depot'
};

const getInfoSpan = () => document.querySelector(SELECTORS.infoSpan);

const getDepartButton = () => document.querySelector(SELECTORS.departBtn);

const getArriveButton = () => document.querySelector(SELECTORS.arriveBtn);

const result = (function () {
    const infoSpan = getInfoSpan();
    const departBtn = getDepartButton();
    const arriveBtn = getArriveButton();

    const depart = function () {
        url = `https://judgetests.firebaseio.com/schedule/${currentStop.nextId}.json`;

        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    infoSpan.textContent = 'Error';
                    departBtn.disabled = true;
                    arriveBtn.disabled = true;
                    return;
                }
                return response.json()
            })
            .then(stopInfo => {
                currentStop.name = stopInfo.name;
                currentStop.nextId = stopInfo.next;

                infoSpan.textContent = `Next stop ${currentStop.name}`;
                departBtn.disabled = true;
                arriveBtn.disabled = false;
            });
    };

    const arrive = function () {
        infoSpan.textContent = `Arriving at ${currentStop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    };

    return {
        depart,
        arrive
    };
})();