const usuario = "brehhvers";

//#region  PERFIL
const foto = document.querySelector('#avatar');
const nome = document.querySelector('#nome');
const bio = document.querySelector('#bio');
const localizacao = document.querySelector('#localizacao');
const website = document.querySelector('#website');
const seguidores = document.querySelector('#seguidores');
const empresa = document.querySelector('#empresa');

fetch(`https://api.github.com/users/${usuario}`)
  .then(resposta => resposta.json())
  .then(dados => {
    foto.src = dados.avatar_url;
    nome.textContent = dados.name;
    bio.textContent = dados.bio;
    localizacao.textContent = dados.location;
    website.href = dados.blog;
    website.textContent = dados.blog;
    seguidores.textContent = dados.followers;
    empresa.textContent = dados.company;
  })
  .catch(error => console.error(error));
//#endregion

//#region REPOSITORIOS
const view_repositorios = document.querySelector('#repo-grid');


fetch(`https://api.github.com/users/${usuario}/repos?per_page=5`)
  .then(resposta => resposta.json())
  .then(repos => {
    console.log(repos);
    for (const repo of repos) {
      const card = document.createElement('div');
      card.classList.add('card', 'border-light', 'rounded', 'shadow');
      card.style.width = '18rem';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body', 'bg-sweet-green');

      const titulo = document.createElement('h5');
      titulo.classList.add('card-title');
      titulo.textContent = repo.name;

      const descricao = document.createElement('p');
      descricao.classList.add('card-text');
      descricao.textContent = repo.description || 'Sem descrição';

      const cardFooter = document.createElement('div');
      cardFooter.classList.add('text-center', 'card-footer', 'bg-sweet-green');

      const estrelas = document.createElement('p');
      estrelas.textContent = `Estrelas: ${repo.stargazers_count}`; 

      const forks = document.createElement('p');
      forks.textContent = `Forks: ${repo.forks_count}`;

      const link = document.createElement('a');
      link.href = repo.html_url;
      link.classList.add('btn', 'btn-strawberry');
      link.target = '_blank';
      link.textContent = 'Ver detalhes';

      cardBody.appendChild(titulo);
      cardBody.appendChild(descricao);
      cardBody.appendChild(estrelas);
      cardBody.appendChild(forks);
      cardFooter.appendChild(link);
      card.appendChild(cardBody);
      card.appendChild(cardFooter);

      view_repositorios.appendChild(card);
    }
  })
  .catch(error => console.error(error));
//#endregion