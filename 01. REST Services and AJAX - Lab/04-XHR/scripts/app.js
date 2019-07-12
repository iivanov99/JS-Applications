function loadRepos() {
   const getResponseContainer = () => document.querySelector('#res');

   const req = new XMLHttpRequest();
   req.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
         getResponseContainer().textContent = this.responseText;
      }
   }
   req.open('GET', 'https://api.github.com/users/testnakov/repos', true);
   req.send();
}