const domElements = {
    loadBtn: document.querySelector('button.load'),
    addBtn: document.querySelector('button.add'),
    catchesDiv: document.querySelector('#catches'),
    anglerInputEl: document.querySelector('#addForm input.angler'),
    weightInputEl: document.querySelector('#addForm input.weight'),
    speciesInputEl: document.querySelector('#addForm input.species'),
    locationInputEl: document.querySelector('#addForm input.location'),
    baitInputEl: document.querySelector('#addForm input.bait'),
    captureTimeInputEl: document.querySelector('#addForm input.captureTime')
};

const handler = (response) => {
    if (response.status !== 200) {
        throw new Error('Error', response.status);
    }
    return response.json();
};

const createLabel = (labelContent) => {
    const label = document.createElement('label');
    label.textContent = labelContent;
    return label;
};

const createInput = (inputType, inputClass, inputValue) => {
    const input = document.createElement('input');
    input.type = inputType;
    input.classList.add(inputClass);
    input.value = inputValue;
    return input;
};

const createBtn = (btnContent, btnClass) => {
    const btn = document.createElement('button');
    btn.classList.add(btnClass);
    btn.textContent = btnContent;
    return btn;
};

const appendCatchRow = (catchDiv, labelElement, inputElement) => {
    const hr = document.createElement('hr');
    catchDiv.appendChild(labelElement);
    catchDiv.appendChild(inputElement);
    catchDiv.appendChild(hr);
};

const loadCatches = (catches) => {
    domElements.catchesDiv.innerHTML = '';

    for (const id in catches) {
        const catchInfo = catches[id];

        const deleteCatch = () => {
            const url = `https://fisher-game.firebaseio.com/catches/${id}.json`;

            fetch(url, { method: 'delete' })
                .then(() => displayAllCatches());
        };

        const updateCatch = function () {
            const currentCatchDiv = this.parentNode;

            const angler = currentCatchDiv.querySelector('input.angler').value;
            const weight = currentCatchDiv.querySelector('input.weight').value;
            const species = currentCatchDiv.querySelector('input.species').value;
            const location = currentCatchDiv.querySelector('input.location').value;
            const bait = currentCatchDiv.querySelector('input.bait').value;
            const captureTime = currentCatchDiv.querySelector('input.captureTime').value;

            const url = `https://fisher-game.firebaseio.com/catches/${id}.json`;

            const updatedCatch = {
                angler,
                weight,
                species,
                location,
                bait,
                captureTime
            };

            fetch(url, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCatch)
            })
                .then(() => displayAllCatches());
        };

        const catchDiv = document.createElement('div');
        catchDiv.classList.add('catch');
        catchDiv.setAttribute('data-id', "<id-goes-here>");

        const anglerLabel = createLabel('Angler');
        const anglerInput = createInput('text', 'angler', catchInfo.angler);

        const weightLabel = createLabel('Weight');
        const weightInput = createInput('number', 'weight', catchInfo.weight);

        const speciesLabel = createLabel('Species');
        const speciesInput = createInput('text', 'species', catchInfo.species);

        const locationLabel = createLabel('Location');
        const locationInput = createInput('text', 'location', catchInfo.location);

        const baitLabel = createLabel('Bait');
        const baitInput = createInput('text', 'bait', catchInfo.bait);

        const captureTimeLabel = createLabel('Capture Time');
        const captureTimeInput = createInput('number', 'captureTime', catchInfo.captureTime);

        const updateBtn = createBtn('Update', 'update');
        updateBtn.addEventListener('click', updateCatch);
        const deleteBtn = createBtn('Delete', 'delete');
        deleteBtn.addEventListener('click', deleteCatch);

        appendCatchRow(catchDiv, anglerLabel, anglerInput);
        appendCatchRow(catchDiv, weightLabel, weightInput);
        appendCatchRow(catchDiv, speciesLabel, speciesInput);
        appendCatchRow(catchDiv, locationLabel, locationInput);
        appendCatchRow(catchDiv, baitLabel, baitInput);
        appendCatchRow(catchDiv, captureTimeLabel, captureTimeInput);
        catchDiv.appendChild(updateBtn);
        catchDiv.appendChild(deleteBtn);

        domElements.catchesDiv.appendChild(catchDiv);
    }
};

const displayAllCatches = () => {
    const url = 'https://fisher-game.firebaseio.com/catches.json';

    fetch(url)
        .then(handler)
        .then(catches => loadCatches(catches));
};

const clearAddCatchInput = () => {
    const { anglerInputEl, weightInputEl, speciesInputEl, locationInputEl, baitInputEl, captureTimeInputEl } = domElements;
    anglerInputEl.value = '';
    weightInputEl.value = '';
    speciesInputEl.value = '';
    locationInputEl.value = '';
    baitInputEl.value = '';
    captureTimeInputEl.value = '';
};

const createCatch = () => {
    const { anglerInputEl, weightInputEl, speciesInputEl, locationInputEl, baitInputEl, captureTimeInputEl } = domElements;

    if (anglerInputEl.value && weightInputEl.value && speciesInputEl.value &&
        locationInputEl.value && baitInputEl.value && captureTimeInputEl.value) {
        const catchToCreate = {
            angler: anglerInputEl.value,
            weight: weightInputEl.value,
            species: speciesInputEl.value,
            location: locationInputEl.value,
            bait: baitInputEl.value,
            captureTime: captureTimeInputEl.value
        };

        const url = 'https://fisher-game.firebaseio.com/catches.json';

        fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(catchToCreate)
        })
            .then(() => {
                displayAllCatches();
                clearAddCatchInput();
            });
    }
};

(function attachEvents() {
    domElements.loadBtn.addEventListener('click', displayAllCatches);
    domElements.addBtn.addEventListener('click', createCatch);
})();