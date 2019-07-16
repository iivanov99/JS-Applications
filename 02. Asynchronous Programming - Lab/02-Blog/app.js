const SELECTORS = {
    loadPostsBtn: '#btnLoadPosts',
    postsSelect: '#posts',
    viewPostBtn: '#btnViewPost',
    postTitle: '#post-title',
    postBodyUl: '#post-body',
    postCommentsUl: '#post-comments'
};

const getLoadPostsButton = () => document.querySelector(SELECTORS.loadPostsBtn);

const getPostsSelect = () => document.querySelector(SELECTORS.postsSelect);

const getViewPostButton = () => document.querySelector(SELECTORS.viewPostBtn);

const getPostTile = () => document.querySelector(SELECTORS.postTitle);

const getPostBodyUl = () => document.querySelector(SELECTORS.postBodyUl);

const getPostCommentsUl = () => document.querySelector(SELECTORS.postCommentsUl);

const createOptions = (selectElement, posts) => {
    for (const id in posts) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = posts[id].title;
        selectElement.appendChild(option);
    }
};

const loadPosts = () => {
    const postsSelect = getPostsSelect();
    const url = 'https://blog-apps-c12bf.firebaseio.com/posts.json';
    postsSelect.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(posts => createOptions(postsSelect, posts));
};

const findCommentByIdAndDisplayIt = (ulElement, comments, searchedId) => {
    for (const key in comments) {
        if (comments[key].postId === searchedId) {
            const li = document.createElement('li');
            li.id = comments[key].id;
            li.textContent = comments[key].text;
            ulElement.appendChild(li);
        }
    }
};

const displayPostComments = (post) => {
    const postCommentsUl = getPostCommentsUl();
    const url = `https://blog-apps-c12bf.firebaseio.com/comments.json`;
    postCommentsUl.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(comments => findCommentByIdAndDisplayIt(postCommentsUl, comments, post.id));
};

const displayPostInfo = (post) => {
    const postTitle = getPostTile();
    const postBodyUl = getPostBodyUl();
    postTitle.textContent = post.title;
    postBodyUl.textContent = post.body;
};

const viewSelectedPost = () => {
    const id = getPostsSelect().value;
    const url = `https://blog-apps-c12bf.firebaseio.com/posts/${id}.json`;

    fetch(url)
        .then(response => response.json())
        .then(post => {
            displayPostInfo(post);
            displayPostComments(post);
        });
};

(function attachEvents() {
    const loadPostsBtn = getLoadPostsButton();
    const viewPostBtn = getViewPostButton();
    loadPostsBtn.addEventListener('click', loadPosts);
    viewPostBtn.addEventListener('click', viewSelectedPost);
})();