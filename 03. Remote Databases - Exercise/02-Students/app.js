const elements = {
    tableBody: document.querySelector('#students'),
    studentIdInput: document.querySelector('#studentId'),
    firstNameInput: document.querySelector('#firstName'),
    lastNameInput: document.querySelector('#lastName'),
    facultyNumberInput: document.querySelector('#facultyNumber'),
    gradeInput: document.querySelector('#grade'),
    loadStudentsBtn: document.querySelector('#loadStudents'),
    createStudentBtn: document.querySelector('#createStudent')
};

const authInfo = `Basic ${btoa('guest:guest')}`;
const baseUrl = 'https://baas.kinvey.com/appdata/kid_S1NCg-ZzB/students';

const displayAllStudents = (students) => {
    elements.tableBody.innerHTML = '';
    students = students.sort((a, b) => a.studentId - b.studentId);

    students.forEach(student => {
        const tr = document.createElement('tr');

        tr.innerHTML += `<td>${student.studentId}</td>`;
        tr.innerHTML += `<td>${student.firstName}</td>`;
        tr.innerHTML += `<td>${student.lastName}</td>`;
        tr.innerHTML += `<td>${student.facultyNumber}</td>`;
        tr.innerHTML += `<td>${student.grade}</td>`;

        elements.tableBody.appendChild(tr);
    });
};

const loadAllStudents = async () => {
    elements.tableBody.innerHTML = 'Loading...';

    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authInfo
        }
    });

    const students = await response.json();
    displayAllStudents(students);
};

const isInputValid = (...inputFields) => {
    isValid = true;
    inputFields.forEach(inputField => {
        if (!inputField.value) {
            isValid = false;
        }
    });
    return isValid;
};

const clearInputFields = (...inputFields) => {
    inputFields.forEach(inputField => {
        inputField.value = '';
    });
};

const createStudent = async (ev) => {
    ev.preventDefault();
    const { studentIdInput, firstNameInput, lastNameInput, facultyNumberInput, gradeInput } = elements;

    if (isInputValid(studentIdInput, firstNameInput, lastNameInput, facultyNumberInput, gradeInput)) {
        const newStudent = {
            studentId: studentIdInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            facultyNumber: facultyNumberInput.value,
            grade: gradeInput.value
        };

        await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Authorization': authInfo,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        });

        loadAllStudents();
    }

    clearInputFields(studentIdInput, firstNameInput, lastNameInput, facultyNumberInput, gradeInput);
};

(function attachEvents() {
    elements.loadStudentsBtn.addEventListener('click', loadAllStudents);
    elements.createStudentBtn.addEventListener('click', createStudent);
})();