const getUsername = () => document.querySelector('#username').value;

const getReposUl = () => document.querySelector('#repos');

function loadRepos() {
    const username = getUsername();
    const reposUl = getReposUl();
    reposUl.innerHTML = '';

    const appendRepo = (repo) => {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.href = repo.html_url;
        a.textContent = repo.full_name;

        li.appendChild(a);
        reposUl.appendChild(li);
    }

    const appendError = (err) => {
        const li = document.createElement('li');
        li.textContent = err;
        reposUl.appendChild(li);
    }

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then((reposData) => reposData.forEach(repoData => appendRepo(repoData)))
        .catch(err => appendError(err));
}