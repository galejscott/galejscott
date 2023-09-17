console.log('script.js loaded');

document.querySelector('#btnGen').addEventListener('click', () => {
    if (document.querySelector('#pokemon') !== null) {
        document.querySelector('#pokemon').remove();
    };
    
    getPokemon();
})



async function getPokemon() {
    const response = await fetch('/pokemon');
    const pokedex = await response.json();
    console.log(pokedex)
    let randomNum = Math.floor(Math.random() * 1010);
    console.log(randomNum);
    let pokemon = pokedex[randomNum];
    console.log(pokemon);
    let pokeName = pokemon.name;
    console.log(pokemon.name);
    let pokeArrayId = pokemon.id;
    let pokeId = pokeArrayId.toString().padStart(3, '0');
    console.log(pokeId);
    let pokeImageUrl =`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeId}.png`;
    console.log(pokeImageUrl);
    let pokeAlt = pokemon.name;
    
    
    let pokemonDiv = document.createElement('div');
    pokemonDiv.id = 'pokemon';
    document.querySelector('#pokeWrapper').appendChild(pokemonDiv);

    let pokeNameDiv = document.createElement('div');
    pokeNameDiv.id = 'pokeName';
    pokeNameDiv.textContent = pokeName;
    document.querySelector('#pokemon').appendChild(pokeNameDiv);

    let pokeImg = document.createElement('img');
    pokeImg.id = 'pokeImage';
    pokeImg.src = pokeImageUrl;
    pokeImg.alt = pokeAlt;
    document.querySelector('#pokemon').appendChild(pokeImg);
    
};

