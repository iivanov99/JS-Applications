const SELECTORS = {
    username: '#username',
    repo: '#repo',
    commitsUl: '#commits'
};

const getUsernameElement = () => document.querySelector(SELECTORS.username);

const getRepoElement = () => document.querySelector(SELECTORS.repo);

const getCommitsUl = () => document.querySelector(SELECTORS.commitsUl);

const appendCommits = (ulElement, commits) => {
    commits.forEach(c => {
        const li = document.createElement('li');
        li.textContent = `${c.commit.author.name}: ${c.commit.message}`;
        ulElement.appendChild(li);
    });
};

const appendError = (ulElement, error) => {
    const li = document.createElement('li');
    li.textContent = `Error: ${error.status} (${error.statusText})`;
    ulElement.appendChild(li);
};

const loadCommits = () => {
    const commitsUl = getCommitsUl();
    const username = getUsernameElement().value;
    const repo = getRepoElement().value;
    const url = `https://api.github.com/repos/${username}/${repo}/commits`;
    commitsUl.innerHTML = '';

    fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }

            appendError(commitsUl, response);
        })
        .then(commits => appendCommits(commitsUl, commits));
};