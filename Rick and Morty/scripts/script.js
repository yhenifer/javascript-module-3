function buildRoot(){
    const root = document.getElementById("root")
    root.innerHTML =
    '<div id="content">' +
    '<div id="sidebar">' +
    '<div id="episodes"></div>' +
    '<button id="loadMore">Load More</button>' +
    '</div>' +
    '<div id="main"></div>' +
    '</div>' +
    '<div id="header"><h1>Rick and Morty</h1></div>'
}

function loadEpisodes(url) {
    fetch(url || "https://rickandmortyapi.com/api/episode")
    .then (res => res.json())
    .then(episodes => showEpisodeLinks(episodes))
    .catch(reason => console.log(reason))

}

function showEpisodeLinks(episodes) {
    const episodesContainer = document.getElementById("episodes")
    episodes.results
    .map(createEpisodeLink)
    .forEach(node => episodesContainer.appendChild(node))
    const loadMore = document.getElementById("loadMore")
    if (episodes.info.next) {
        loadMore.onclick = () => loadEpisodes(episodes.info.next);
    }else{
        loadMore.classList.add("hidden")
    }
}

function createEpisodeLink(episode) {
    const episodeLink = document.createElement("div");
    episodeLink.classList.add("episodeLink");
    episodeLink.innerText = episode.name;
    episodeLink.addEventListener("click", () => showEpisodeDetail(episode));
    return episodeLink;
  }

  function showEpisodeDetail(episode) {
      const main = document.getElementById("main");
      main.innerHTML = `<h2>${episode.name}</h2>` + `<h3>${episode.episode} | ${episode.air_date} </h3>`;
    const charactersContainer = document.createElement("div");
    charactersContainer.id= "charactersContainer";
    main.appendChild(charactersContainer);
    episode.characters
    .forEach(characterUrl => createCharacterThumbnail(charactersContainer, characterUrl))
  }

  function createCharacterThumbnail(parent, characterUrl) {
    const div = document.createElement("div");
    div.classList.add("characterThumbnail");
    fetch(characterUrl)
      .then(res => res.json())
      .then(character => renderCharacterThumbnail(div, character));
    parent.appendChild(div);
  }
  function renderCharacterThumbnail(parent, character) {
      parent.addEventListener("click", () => showCharacterThumbnail(character));
    parent.innerHTML = `<img src=${character.image}>` +
    `<h4>${character.name}</h4>` +
    `<h5>${character.species} | ${character.status}</h5>`
  }
function showCharacterThumbnail(character){
    const main = document.querySelector("#main");
    main.innerHTML =
`<div><div class="characterThumbnailDetailHeader">
    <div><img src=${character.image}></div>
    <div><h2>${character.name}</h2>` +
    `<h3>${character.status} | ${character.specie} | ${character.gender} | ${character.origin.name} </h3>
    <div class="buttonLocation"><button id="buttonLocation">Location</button></div></div></div>
    <div class="characterThumbnailDetail"></div>
    </div> `;

    const buttonLocation = document.querySelector("#buttonLocation");
    buttonLocation.addEventListener("click", () => renderLocation(character.origin.url));
    console.log(character.origin.name);

    character.episode.forEach((episode) => {
        fetch(episode)
          .then((res) => res.json())
          .then((episodes) => {
            const characterThumbnailEpisodes = document.querySelector(".characterThumbnailDetail");
            const characterThumbnailEpisodesDetail = document.createElement("div");
            characterThumbnailEpisodesDetail.className = "characterThumbnailEpisodesDetail";
            characterThumbnailEpisodes.appendChild(characterThumbnailEpisodesDetail);
            characterThumbnailEpisodesDetail.innerHTML = `<div class="numberEpisode"><h3>Episode - ${episodes.id}</h3><h4 class="title">${episodes.episode}</h4></div>`;
            characterThumbnailEpisodesDetail.onclick = () => showEpisodeDetail(episodes);
          });
      });
    }

    function renderLocation(origin) {
        fetch(origin)
          .then((res) => res.json())
          .then((origin) => {
            const characterThumbnailDetailHeader = document.querySelector(".characterThumbnailDetailHeader");
            characterThumbnailDetailHeader.innerHTML = "<div><div>" + `<h1>${origin.name}</h1><h3>${origin.type} - ${origin.dimension}</h3>` + "</div>";
            const characterThumbnail = document.querySelector(".characterThumbnailDetail");
            characterThumbnail.innerHTML = "";
            origin.residents.forEach((resident) => {
              fetch(resident)
                .then((res) => res.json())
                .then((character) => {
                  const cardEpisode = document.createElement("div");
                  cardEpisode.innerHTML = `<img src="${character.image}"><h4>${character.name}</h4><h5>${character.species} | ${character.status}</h5></div></div>`;
                  cardEpisode.className = "characterThumbnail";
                  console.log(character.url);
                  cardEpisode.onclick = () => showCharacterThumbnail(character);
                  characterThumbnail.appendChild(cardEpisode);
                });
            });
          });
      }
      
     
  buildRoot();
  loadEpisodes();