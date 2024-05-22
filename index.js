const characterListDiv = document.getElementById("character-list")

let characters = []

document.addEventListener("DOMContentLoaded", function() {
  fetchAllCharacters(1)
})

function fetchAllCharacters(page) {
  fetch("https://swapi.dev/api/people/?page=" + page)
    .then(resp => resp.json())
    .then(data => {
      // recursion
      characters = characters.concat(data.results)
      if(data.next) {
        fetchAllCharacters(page + 1)
      } else {
        console.log('done loading')
        renderAllCharacters()
      }
    })
}

function renderAllCharacters() {
  characters.forEach(character => renderCharacter(character))
}

function renderCharacter(character) {
  const div = document.createElement('div')
  const h3 = document.createElement('h3')
  h3.textContent = character.name

  div.appendChild(h3)
  characterListDiv.appendChild(div)
}