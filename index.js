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
  div.addEventListener('click', showMoreInfo)

  div.appendChild(h3)
  characterListDiv.appendChild(div)
}

function createBorder(e) {
  this.style.border = '1px solid black'
}

function removeBorder(e) {
  this.style.border = 'none'
}

function showMoreInfo(e) {
  const characterName = this.dataset.name;
  const character = characters.find(char => char.name === characterName);

  console.log(character)

  const birthYear = document.createElement('p')
  const eyeColor = document.createElement('p')
  const gender = document.createElement('p')

  birthYear.textContent = `Birth Year: ${character.birth_year}`
  eyeColor.textContent = `Eye Color: ${character.eye_color}`
  gender.textContent = `Gender: ${character.gender}`

  fetch(character.homeworld)
    .then(resp => resp.json())
    .then(planet => {
      console.log(planet)
      if(this.id !== "active") {
        console.log(this)
        const planetName = document.createElement('p')
        planetName.textContent = `Homeworld: ${planet.name}`
        this.appendChild(planetName)
        this.appendChild(gender)
        this.appendChild(birthYear)
        this.appendChild(eyeColor)
        this.id = "active"
      }
    })



}