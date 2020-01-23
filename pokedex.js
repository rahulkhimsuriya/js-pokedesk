// No. of Pokemon
const pokemon_number = 150;
const poke_container = document.getElementById('poke_container');

// Colors Based on Pokemmon Types
const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
};
// Create Pokemon Types Array;
const main_types = Object.keys(colors);

// Get Pokemon
const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

// Fetch Pokemons
const fetchPokemon = async () => {
  for (let i = 1; i <= pokemon_number; i++) {
    await getPokemon(i);
  }
};
fetchPokemon();

// Create Pokemon Card
function createPokemonCard(pokemon) {
  // Create Element
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');

  // Set Pokemon Id
  pokemonEl.setAttribute('id', pokemon.id);

  // Pokemon Name
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  // Pokemon Type
  const poke_types = pokemon.types.map(el => el.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);

  // Background Color
  const bg_color = colors[type];
  pokemonEl.style.backgroundColor = bg_color;

  const pokeInnerHTML = `
    <div class="img-container">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
      }.png" />
    </div>
    <div class="info">
      <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type}</span></small>
    </div>
  `;

  pokemonEl.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonEl);
}
