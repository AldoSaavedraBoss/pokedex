import axios from 'axios';
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const getAllPokemon = async () => {
  let data = [];
  for (let i = 1; i <= 20; i++) {
    let pokemon = await axios.get(baseUrl + `${i}`);
    data = data.concat(pokemon.data);
  }

  return data;
};

const getPokemonById = async id => {
  const request = await axios.get(`${baseUrl}${id}`);

  return request.data;
};

export default { getAllPokemon, getPokemonById };
