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

  div.dataset.name = character.name
  h3.textContent = character.name

  div.addEventListener('pointerenter', createBorder)
  div.addEventListener('pointerleave', removeBorder)

  div.appendChild(h3)
  characterListDiv.appendChild(div)
}

function createBorder(e) {
  this.style.border = '1px solid black'
}

function removeBorder(e) {
  this.style.border = 'none'
}