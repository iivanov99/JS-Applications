const SELECTORS = {
    stopId: '#stopId',
    stopNameDiv: '#stopName',
    busesUl: '#buses',
};

const getStopId = () => document.querySelector(SELECTORS.stopId);

const getStopNameDiv = () => document.querySelector(SELECTORS.stopNameDiv);

const getBusesUl = () => document.querySelector(SELECTORS.busesUl);

const appendStopName = (el, name) => {
    el.textContent = name;
};

const appendBusTimers = (el, buses) => {
    for (const bus in buses) {
        const li = document.createElement('li');
        li.textContent = `Bus ${bus} arrives in ${buses[bus]} minutes`;
        el.appendChild(li);
    }
};

const appendError = (el) => {
    el.textContent = 'Error';
}

const clearInput = (el) => {
    el.value = '';
};

const getInfo = () => {
    const stopId = getStopId();
    const stopNameDiv = getStopNameDiv();
    const busesUl = getBusesUl();
    busesUl.innerHTML = '';

    fetch(`https://judgetests.firebaseio.com/businfo/${stopId.value}.json`)
        .then(res => {
            if (res.status !== 200) {
                appendError(stopNameDiv);
                return;
            }

            return res.json();
        })
        .then(busesData => {
            appendStopName(stopNameDiv, busesData.name);
            appendBusTimers(busesUl, busesData.buses);
        });

    clearInput(stopId);
};