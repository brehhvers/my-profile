const usuario = "brehhvers";


//#region REPO.HTML
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const repositorio = getParameterByName('repositorio');

fetch(`https://api.github.com/repos/${usuario}/${repositorio}`)
    .then(response => response.json())
    .then(data => {

        document.querySelector('#repo-nome').textContent = data.name;
        document.querySelector('#repo-descricao').textContent = data.description;
        document.querySelector('#repo-data-criacao').textContent = data.created_at;
        document.querySelector('#repo-linguagem').textContent = data.language;
        document.querySelector('#repo-topicos').textContent = data.topics.join(', ') || "None";
        document.querySelector('#repo-estrelas').textContent = data.stargazers_count;
        document.querySelector('#repo-forks').textContent = data.forks_count;
        document.querySelector('#repo-link-github').href = data.html_url;
        document.querySelector('#repo-link-github').textContent = data.html_url;
    })
    .catch(error => console.error(error));

//#endregion